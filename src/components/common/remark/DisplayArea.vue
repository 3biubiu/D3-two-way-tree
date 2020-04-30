<template>
    <div class="remark-left">
        <div class="title">跟进信息</div>
        <!--搜索区域-->
        <div class="search">
            <remark-search
                ref="remarkSearch"
                :search-options="searchOptions"
                @on-search="updateSearch">
            </remark-search>
        </div>
        <!--列表区域-->
        <div class="list">
            <Spin fix v-if="listLoading"></Spin>
            <!--置顶区域-->
            <div class="top-part" v-if="(topList && topList.length > 0)">
                <div class="top-tip">
                    <i class="iconfont icondingbu"></i>
                    置顶信息
                </div>
                <div v-for="(top,tIndex) in topList" :key="getUuid('dateline')">
                    <one-remark
                        ref="topRemark"
                        :remark="top"
                        :is-top="true"
                        :id="id"
                        @jump-comment="jumpComment"
                        @change-top="changeTop"
                        @delete-one="deleteRemark"
                        @edit-one="editRemark"
                        @change-reply="changeReply"
                        @fast-at="fastAt"
                        @send-sms="sendSms">
                    </one-remark>
                </div>
            </div>
            <!--列表部分-->
            <div class="list-part">
                <div v-for="(clouds,dIndex) in remarkList" :key="getUuid('dateline')">
                    <!--时间轴-->
                    <div class="time-box">
                        <!--圆环-->
                        <div class="time-point"></div>
                        <!--日期-->
                        <div class="time-block">{{dIndex}}</div>
                        <!--日历-->
                        <Poptip :options="{modifiers: {computeStyle:{gpuAcceleration: false,},preventOverflow :{boundariesElement: 'window'}},eventsEnabled:false}"  content="content of tooltip" placement="right" v-if="dateLine&&dateLine.length>0"  trigger="hover">
                            <a class="time-line"><i class="iconfont iconbacksee"></i></a>
                            <div slot="content">
                                <div class="time-select">
                                    <p class="time-title">我的跟进历史</p>
                                    <template v-for="dateYear in dateLine">
                                        <div class="year">{{dateYear.year}}</div>
                                            <template v-for="dateSon in dateYear.son">
                                                <div class="month-box">
                                                    <a class="month" :class="{'active':dIndex.slice(5,7)==dateSon.month}">{{dateSon.month}}</a>
                                                    <ul class="day-box ivu-timeline">
                                                        <li v-for="dateDay in dateSon.son" class="ivu-timeline-item" :class="{'active':dIndex.slice(5)==dateDay}">
                                                            <div class="ivu-timeline-item-head"></div>
                                                            <div class="ivu-timeline-item-content">
                                                                <a class="day" @click="jumpDay(dateYear.year,dateSon.month,dateDay)">{{dateDay}}</a>
                                                            </div>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </template>
                                    </template>
                                </div>
                            </div>
                        </Poptip>
                    </div>
                    <!--一条备注-->
                    <one-remark v-for="(cloud,cIndex) in remarkList[dIndex]" :key="getUuid('cloud')"
                                ref="listRemark"
                                :remark="remarkList[dIndex][cIndex]"
                                :id="id"
                                @jump-comment="jumpComment"
                                @change-top="changeTop"
                                @delete-one="deleteRemark"
                                @edit-one="editRemark"
                                @change-reply="changeReply"
                                @fast-at="fastAt"
                                @send-sms="sendSms">
                    </one-remark>
                </div>
            </div>
        </div>

        <!--编辑备注-->
        <Modal
            class="form-modal"
            v-model="editShow"
            title="修改备注"
            @on-ok="doEdit">
            <Form label-position="top">
                <Row :gutter="16">
                    <Col span="24">
                        <FormItem label="">
                            <at-area ref="atArea" v-model="editData.content" :avoid-email="false" :members="members" @at="atCallBack" @input="hasAtCallBack">
                                <Input type="textarea" placeholder="请输入备注信息" :autosize="{minRows: 4}" @on-blur="closeAtPanel" />
                                <!--具名插槽的attribute用法-->
                                <template v-slot:item="userName">
                                    <span :title="userName.item">{{userName.item}}</span>
                                </template>
                            </at-area>
                        </FormItem>
                        <FormItem label="通知已经@过的人">
                            <CheckboxGroup v-model="editData.chooseUser">
                                <Checkbox v-for="item in editData.atUser" :label="item.uid" :key="getUuid('chooseUser')">{{item.username}}</Checkbox>
                            </CheckboxGroup>
                        </FormItem>
                        <FormItem label="短信提醒">
                            <CheckboxGroup :value="editData.sendType" @on-change="changeEditAtUser">
                                <Checkbox label="1">系统短信</Checkbox>
                                <Checkbox label="2">详细短信（显示回复内容）</Checkbox>
                            </CheckboxGroup>
                        </FormItem>
                    </Col>
                </Row>
            </Form>
        </Modal>

        <!--发短信弹窗-->
        <send-sms ref="sms" :item-id="id"></send-sms>
    </div>
</template>

<script>
    //备注左侧展示区域
    import OneRemark from "./OneRemark";
    import RemarkSearch from "./Search";
    import AtArea from 'vue-at/dist/vue-at-textarea';
    import SendSms from "@/components/item_detail/card_message/SendSms";
    import $api from "@/api/item/item_detail/index.js";
    import utils from "@/utils.js";
    import config from "@/config.js"
    export default {
        name: "display-area",
        components:{
            OneRemark,
            RemarkSearch,
            AtArea,
            SendSms
        },
        props : {
            //备注数据
            remarkData : {
                type : Object,
                default : ()=>{return {list:[],top:[],latest:{},dateInfo:[]}}
            },
            //项目|单位id
            id : {
                type : String,
                default :""
            }
        },
        data(){
            return {
                listLoading : false,
                //搜索备选项
                searchOptions:{
                    //跟进单位
                    company : {"0" : "全部"},
                    //mot方案
                    motScheme : {"0" :   "全部"},
                    //mot类型
                    motType : {"0" :   "全部"},
                    //备注人员
                    addUser : {"0" :   "全部"},
                    //联系对象
                    contactUser : {"0" :   "全部"},
                    //联系类型
                    contactType : {"0" :   {"name" : "全部","count":0}},
                },
                //搜索条件
                searchData : {
                    //跟进单位
                    companyId : "0",
                    //是否只显示有效跟进1-是
                    effectiveStatus : false,
                    //是否显示由恢复生成的备注1-是
                    showComment : false,
                    //是否显示手动激活mot的备注
                    showManualMot : false,
                    //备注时间
                    cloudTime : "0",
                    //备注时间搜索范围
                    cloudTimeRange : [],
                    //mot方案
                    motScheme : "0",
                    //mot类型
                    motType : "0",
                    //备注人员uid0-表示全部
                    addUser : "0",
                    //联系对象0-表示全部
                    contactId : "0",
                    //联系类型0-表示全部
                    contactType : "0",
                },
                //待编辑的数据
                editData : {
                    //备注id
                    id : "",
                    //备注内容
                    content : "",
                    //at成功的人
                    atUser : [],
                    //通知的人选中
                    chooseUser : [],
                    //发送短信的类型选中
                    sendType : [],
                },
                editShow : false,
                members: [],
                defaultMembers:['项目录入人', '所有跟进人', '还在回访的人'],
                allMembers:[],
                atPersonList:{},    //@人员总数据
                atEditorArr:[],    //@项目录入人组
                atFollowArr:[],    //@所有跟进人组
                atVisitorArr:[],    //@还在回访的人组
            }
        },
        computed : {
            //时间轴
            dateLine (){
                let list = this.remarkData.dateInfo;
                return list
            },
            //置顶备注
            topList (){
                let list = [...this.remarkData.top];
                list = list ? list : [];
                return list;
            },
            //备注列表
            remarkList (){
                let list = {};
                let search = {
                    //跟进单位
                    company : {"0" : "全部"},
                    //mot方案
                    motScheme : {"0" :   "全部"},
                    //mot类型
                    motType : {"0" :   "全部"},
                    //备注人员
                    addUser : {"0" :   "全部"},
                    //联系对象
                    contactUser : {"0" :   "全部"},
                    //联系类型
                    contactType : {"0" :   {"name" : "全部","count":0}},
                };
                search.company[config.adminCompany] = '选哪儿官方';
                if(!this.remarkData.list && this.remarkData.list.length <= 0){
                    return {};
                }
                let data = [...this.remarkData.list];
                for(let i = 0 ; i < data.length ; i++){
                    //先判断这条数据是否符合搜索条件
                    let check = true;
                    for(let k in this.searchData){
                        switch (k) {
                            case "companyId":
                                if(this.searchData[k] && this.searchData[k] !== '0' && this.searchData[k] !== data[i].identifyCompanyId){
                                    check = false;
                                }
                                break;
                            case "effectiveStatus":
                                if(this.searchData[k] && this.searchData[k] === true && data[i].effectiveFollow !== '2'){
                                    check = false;
                                }
                                break;
                            case "showComment":
                                if(this.searchData[k] !== true && data[i].isComment === '1'){
                                    check = false;
                                }
                                break;
                            case "showManualMot":
                                if(this.searchData[k] !== true && data[i].isManualActive ==='1'){
                                    check = false;
                                }
                                break;
                            case "cloudTime":
                                //备注时间
                                if(this.searchData[k] && this.searchData[k] !== '0'){
                                    // 获取当天 13:59:59 点的时间戳
                                    let timeStamp = new Date(new Date().setHours(0, 0, 0, 0)) / 1000 + 86400 - 1;
                                    let daysAgoStamp = timeStamp - 86400 *this.searchData[k] ;
                                    let cloudTime = new Date(data[i].dateline);
                                    let cloudTimeStamp = cloudTime.getTime() / 1000;
                                    if(cloudTimeStamp < daysAgoStamp || cloudTimeStamp >= timeStamp){
                                        check = false;
                                    }
                                };
                                break;
                            case "cloudTimeRange":
                                //备注时间
                                if(this.searchData[k] && this.searchData[k].join("").length > 0){
                                    let startTime = new Date(this.searchData[k][0]).getTime() /1000;
                                    let endTime = new Date(this.searchData[k][1]).getTime() / 1000 + 86044 - 1;
                                    let cloudTime = new Date(data[i].dateline);
                                    let cloudTimeStamp = cloudTime.getTime() / 1000;
                                    if(cloudTimeStamp < startTime || cloudTimeStamp >= endTime){
                                        check = false;
                                    }
                                }
                                break;
                            case "motScheme":
                                if(this.searchData[k] && this.searchData[k] !== '0' && data[i].schemeMotId !== this.searchData[k]){
                                    check = false;
                                }
                                break;
                            case "motType":
                                if(this.searchData[k] && this.searchData[k] !== '0' && data[i].motType !== this.searchData[k]){
                                    check = false;
                                }
                                break;
                            case "addUser":
                                if(this.searchData[k] && this.searchData[k] !== '0' && data[i].uid !== this.searchData[k]){
                                    check = false;
                                }
                                break;
                            case "contactId":
                                if(this.searchData[k] && this.searchData[k] !== '0' && data[i].contactUid !== this.searchData[k]){
                                    check = false;
                                }
                                break;
                            case "contactType":
                                if(this.searchData[k] && this.searchData[k] !== '0' && data[i].contactType !== this.searchData[k]){
                                    check = false;
                                }
                                break;
                            default:
                                break;
                        }
                        if(check === false){
                            break;
                        }
                    }
                    //向search整理搜索条件
                    //跟进单位
                    if(!search.company.hasOwnProperty[data[i].identifyCompanyId] && data[i].identifyCompanyId!==undefined && data[i].identifyCompanyId!=='0' && data[i].identifyCompanyId!==String(config.adminCompany)){
                        search.company[data[i].identifyCompanyId] = data[i].identifyCompanyName + (data[i].itemMotId&&data[i].itemMotId!=='0' ? "（身份）":"");
                    }
                    //向search整理搜索条件
                    //mot方案
                    if(!search.motScheme.hasOwnProperty[data[i].schemeMotId] && data[i].schemeMotId!==undefined && data[i].schemeMotId){
                        search.motScheme[data[i].schemeMotId] = data[i].schemeMotName+"MOT";
                    }
                    //mot类型
                    if(!search.motType.hasOwnProperty(data[i].motType) && data[i].motType!==undefined){
                        search.motType[data[i].motType] = data[i].motName;
                    }
                    //备注人员
                    if(!search.addUser.hasOwnProperty(data[i].uid) && data[i].uid!==undefined){
                        search.addUser[data[i].uid] = data[i].username;
                    }
                    //联系对象
                    if(!search.contactUser.hasOwnProperty(data[i].contactUid) && data[i].contactUid!==undefined){
                        search.contactUser[data[i].contactUid] = data[i].contactUsername;
                    }
                    //联系类型
                    if(!search.contactType.hasOwnProperty(data[i].contactType) && data[i].contactType!==undefined){
                        search.contactType[data[i].contactType] = {
                            'name' : data[i].contactTypeName,
                            'count' : 1
                        };
                    }else{
                        search.contactType[data[i].contactType]['count'] ++ ;
                    }
                    if(!check){
                        continue;
                    }
                    let date = data[i].dateline.split(" ")[0];
                    if(!list[date]){
                        list[date] = [];
                    }
                    list[date].push(data[i]);
                }
                //更新呢搜索条件备选项
                this.searchOptions = Object.assign({},search);
                this.listLoading = false;
                return list;
            },
            /**
             * 实时抽取@的人有哪些
            * @author liujuan & 2020-3-18 11:31:55
            */
            getAtUsers(){
                let reg = /@(\#([^\s]+)\#)?(([\u4e00-\u9fa5]([\u4e00-\u9fa5]|\(|\)|\（|\）)+[0-9]*)(\s{1}))/g;
                let res = this.editData.content.match(reg);
                let list = [];
                res = res ? res : [];
                if(res.length > 0){
                    for(let i=0;i<res.length;i++){
                        res[i] = res[i].substr(1).trim();
                        list.push(res[i]);
                    }
                }else{
                    list = res;
                }

                return list;
            },
            //备注加载状态
            remarkLoading (){
                let data = this.$store.getters['itemDetail/remarkFinishStatus'];
                return data;
            },
        },
        watch:{
            remarkLoading(val,old){
                if(val===true&&old===false&&this.$route.params.cloud_id){
                    let _this = this;
                    this.$nextTick(()=>{
                        _this.jumpComment(_this.$route.params.cloud_id)
                    });
                }
            },
            /**
             * 处理at人操作
             */
            atCurrent(val,old){
                if(val!=='项目录入人 ' && val!=='所有跟进人 ' && val!=='还在回访的人 '&&this.newNote.length>=this.oldNote.length){
                    //删除的时候不执行
                    this.atOnePerson();
                }
            },
        },
        created(){
            this.init();
        },
        methods : {
            /**
             * 初始化数据
             * @author zyz 2020-4-22 09:22:56
             */
            init(){
                this.searchOptions = {
                    //跟进单位
                    company : {"0" : "全部"},
                    //mot方案
                    motScheme : {"0" :   "全部"},
                    //mot类型
                    motType : {"0" :   "全部"},
                    //备注人员
                    addUser : {"0" :   "全部"},
                    //联系对象
                    contactUser : {"0" :   "全部"},
                    //联系类型
                    contactType : {"0" :   {"name" : "全部","count":0}},
                };
                this.searchData = {
                    //跟进单位
                    companyId : "0",
                    //是否只显示有效跟进1-是
                    effectiveStatus : false,
                    //是否显示由恢复生成的备注1-是
                    showComment : false,
                    //是否显示手动激活mot的备注
                    showManualMot : false,
                    //备注时间
                    cloudTime : "0",
                    //备注时间搜索范围
                    cloudTimeRange : [],
                    //mot方案
                    motScheme : "0",
                    //mot类型
                    motType : "0",
                    //备注人员uid0-表示全部
                    addUser : "0",
                    //联系对象0-表示全部
                    contactId : "0",
                    //联系类型0-表示全部
                    contactType : "0",
                };
                this.editData = {
                    //备注id
                    id : "",
                        //备注内容
                    content : "",
                    //通知的人选中
                    chooseUser : [],
                    //at成功的人
                    atUser : [],
                    //发送短信的类型
                    sendType : [],
                }
            },
            /**
             * 基于时间生成唯一key
             * @author zyz 2020-4-22 09:22:56
             * @param {String} str 字符串前缀
             * @return {String}
             */
            getUuid(str){
                let S4 = ()=>{
                    return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
                };
                return str + '-' + (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
            },
            /**
             * 变更搜索条件触发
             * @author zyz 2020-4-22 09:22:56
             * @param {Object} data 搜索条件
             */
            updateSearch(data){
                if(!data){
                    return false;
                }
                this.listLoading = true;
                setTimeout(()=>{
                    this.searchData = Object.assign({},data);
                },1);

            },
            /**
             * 点时间轴跳转对应月份备注
             * @author zyz 2020-4-22 09:22:56
             * @param {String} year 年
             * @param {String} month 月
             * @param {String} day 日
             */
            jumpDay(year,month,day){
                this.$refs.remarkSearch.changeSearch("showComment",true);
                this.$refs.remarkSearch.changeSearch("showManualMot",true)
                let ele = `.item_detail_cloud_date_${year}-${day}`;
                this.$nextTick(()=>{
                    this.autoJump(ele);
                });
            },
            /**
             * 分发锚点调整回复对应备注事件
             * @author zyz 2020-4-22 09:22:56
             * @param {String} id 对应备注id
             */
            jumpComment(id){
                this.$refs.remarkSearch.changeSearch("showComment",true);
                this.$refs.remarkSearch.changeSearch("showManualMot",true)
                let ele = `#item_detail_cloud_jump_${id}`;
                this.$nextTick(()=>{
                    this.autoJump(ele);
                });
            },
            /**
             * 全自动锚点定位
             * @author zyz 2020-4-22 09:22:56
             * @param {String} ele 节点名
             */
            autoJump(ele){
                let parentTop = document.getElementById("item-info-box").offsetTop - 66;//50的高度是给定位导航的，16是名片顶部的padding
                let anchor = document.querySelector(ele);
                if(!anchor){
                    return false;
                }
                //todo 这块的高度定位有问题
                document.body.scrollTop = anchor.offsetTop + parentTop; // chrome
                document.documentElement.scrollTop = anchor.offsetTop + parentTop; // firefox
            },
            /**
             * 点击回复备注部分做出相应改变
             * @param {String} name 所点击回复备注的人
             * @author zhouna & 2020-04-01 19:39:14
             */
            changeReply(name){
                this.$emit("change-reply",name);
            },
             /**
             * 改变置顶状态
              * @author zyz 2020-4-22 09:22:56
             * @param {Boolean} status 改变的制定状态
             * @param {String} id 备注id
             */
            changeTop(id,status){
                if(!id){
                    return false;
                }
                this.$emit("change-top",id,status);
            },
            /**
             * 删除备注
             * @author zyz 2020-4-22 09:22:56
             * @param {String} id 备注id
             */
            deleteRemark(id){
                this.$emit("delete-remark",id);
            },
            /**
             * 编辑备注
             * @author zyz 2020-4-22 09:22:56
             * @param {String} id 备注id
             * @param {String} content 备注内容
             * @param {Array} atUser at的人信息
             */
            async editRemark(id,content,atUser){
                if(!id){
                    return false;
                }
                this.editData = {
                    "id"    :   id,
                    "content"   :   this.removeHtmlTag(content),
                    "atUser"    :   [...atUser],
                    "sendType"  :   [],
                    "chooseUser" : [],
                };
                this.editShow = true;
                // this.$nextTick(()=>{
                //     this.editShow = true;
                // });
                await this.initAtPerson();
            },
            /**
             * 滤掉字符串内html标签
             * @author zyz 2020-4-22 09:22:56
             * @param {string} str 待过滤的字符串
             */
            removeHtmlTag(str=""){
                str = str.replace(/<\/?[^>]*>/g, '');
                return str;
            },
            /**
             * 用来保证textarea失去焦点自动关闭at框的方法
             * @author zyz 2020-4-22 09:22:56
             * @param {string} data @时输入的内容
             */
            closeAtPanel(data){
                setTimeout(()=>{
                    this.$refs.atArea.closePanel();
                },200);
            },
            /**
             * 初始化at人的数据
             * @author zyz 2020-4-22 09:22:56
             */
            async initAtPerson(){
                let res = await $api.getAtList(this.id);
                this.atPersonList = Object.assign({},res.data);
                // 默认数据
                this.defaultMembers = [];
                for(let item of this.atPersonList.defaultUser){
                    switch(item.realName){
                        case '项目录入人':
                            this.atEditorArr = [];
                            for(let i of item.list){
                                this.atEditorArr.push(i.realName);
                            }
                            break;
                        case '所有跟进人':
                            this.atFollowArr = [];
                            for(let i of item.list){
                                this.atFollowArr.push(i.realName);
                            }
                            break;
                        case '还在回访的人':
                            this.atVisitorArr = [];
                            for(let i of item.list){
                                this.atVisitorArr.push(i.realName);
                            }
                            break;
                        default:
                            this.defaultMembers.push(item.realName);
                            break;
                    }
                }
                let personDefault =['项目录入人', '所有跟进人', '还在回访的人'];
                this.defaultMembers = this.defaultMembers.concat(personDefault)
                // 所有数据
                for(let item of this.atPersonList.allUser){
                    this.allMembers.push(item.realName);
                }
            },

            /**
             * at单个用户执行方法
             * @author zhouna & 2020-03-31 11:28:19
             */
            async atOnePerson(){
                let data = this.atCurrent;
                if(data&&this.allMembers.indexOf(data.substr(0, data.length - 1)) !== -1){
                    let person = await $api.personAuth(data.substr(0, data.length - 1));
                    let that = this;
                    if(person.code =='500'){
                        this.$Modal.confirm({
                            title: '温馨提示',
                            content:'<p>'+person.msg+'</p>',
                            okText: '是',
                            cancelText: '否',
                            onCancel: async () => {
                                that.removeChars(that.editData.content,'@'+data,'')
                            }
                        });
                    }
                }
            },
            /**
             * 删除@的人
             * @author liujuan & 2020-3-18 11:31:55
             */
            removeChars(sourse,chars,replace){
                let reg  = new RegExp(chars,'gi');
                let result = sourse.replace(reg,replace);
                this.editData.content = result;
            },
            /**
             * at人时触发的回调函数
             * @param {string} data @时输入的内容
            * @author liujuan & 2020-3-18 11:31:55
            */
            atCallBack(data){
                // 修改默认数据还是全部数据
                if(data){
                    this.members = this.allMembers;
                }else{
                    this.members = this.defaultMembers;
                }
                this.atCurrent = data;
                let newData = this.getAtUsers;
            },
            /**
             * at成功一个用户后的回调函数
             * @param {string} data 被@的内容
            * @author liujuan & 2020-3-18 11:31:55
            */
            hasAtCallBack(data){
                let str = '';
                let dataList = [];
                switch(this.atCurrent){
                    case '项目录入人 ':
                        dataList = JSON.parse(JSON.stringify(this.atEditorArr));
                        break;
                    case '所有跟进人 ':
                        dataList = JSON.parse(JSON.stringify(this.atFollowArr));
                        break;
                    case '还在回访的人 ':
                        dataList = JSON.parse(JSON.stringify(this.atVisitorArr))
                        break;
                    default:
                        dataList = [];
                        break;
                }
                if(dataList.length>0){
                    for(let item of dataList){
                        str += "@"+item+' ';
                    }
                    this.removeChars(this.editData.content,'@'+this.atCurrent,str)
                }else if(this.atCurrent=='项目录入人 '||this.atCurrent=='所有跟进人 '||this.atCurrent=='还在回访的人 '){
                    //如果所有跟进人、还在回访的人列表为空
                    this.removeChars(this.editData.content,'@'+this.atCurrent,'')
                }
            },
            /**
             * 编辑备注checkbox二选一
             * @author zyz 2020-4-22 09:22:56
             * @param {Array} data checkbox组选中数据
             */
            changeEditAtUser(data){
                this.editData.sendType = data.length > 0 ? [data[data.length-1]] : [];
            },
            /**
             * 修改备注保存
             * @author zyz 2020-4-22 09:22:56
             */
            doEdit(){
                this.$emit("edit-remark",this.editData);
            },
            /**
             * 分发快速点击@事件
             * @author zyz 2020-4-22 09:22:56
             */
            fastAt(username){
                this.$emit("fast-at",username);
            },
            /**
             * 发短信弹窗
             * @author zyz 2020-4-22 09:22:56
             * @param {String} phone 手机号
             */
            sendSms(phone){
                if(!phone){
                    return false;
                }
                this.$refs.sms.show(phone);
            }
        }
    }
</script>

<style lang="less" scoped>
@import "display_area";
</style>
