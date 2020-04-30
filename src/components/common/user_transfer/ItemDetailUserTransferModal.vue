<template>
    <Modal class="form-modal" width="600px"
            v-model="showStatus"
            :title="title">
        <div style="margin: 0 auto;">
            <!--搜索-->
            <span class="choose-company">选择单位</span>
            <business-search type="3" placeHolder="选哪儿官方" @selectOne="companyChange" :id="'${config.adminCompany}'" name="选哪儿官方" style="width: 160px;display: inline-block;vertical-align: middle;margin-left: 8px"></business-search>
            <Select v-model="groupSelect" style="width:160px" @on-change="groupChange">
                <Option v-for="item in groupList" :value="item.value" :key="item.value" style="color: #333333">{{ item.name }}</Option>
            </Select>
            <Input search v-model="keyword" size="large" style="width:160px;color:#666666" placeholder="姓名"  @on-search="clickSearch" />
        </div>
        <div style="margin-top: 20px">
            <user-transfer-basic ref="userTransferBasic" :default-right-list="defaultRightList" :transfer-list="transferList" :loading="transferLoading" :title="['人员列表','推送列表']" @onchange="changeSelect"></user-transfer-basic>
        </div>

        <Checkbox v-model="sendmsgArr.pushcard" class="push-card" true-value="1" false-value="0">推送名片信息</Checkbox>
        <RadioGroup v-model="sendmsgArr.msgtype" style="margin-top: -5px;">
            <Radio label="1">不发送</Radio>
            <Radio label="2">系统短信</Radio>
            <Radio label="3">自定义短信</Radio>
            <Radio label="4">QQ通知</Radio>
        </RadioGroup>
        <div class="msg" v-show="sendmsgArr.msgtype==2">
            <p>【选哪儿】你收到了1条新的项目，项目ID：{{itemId}}</p>
            <p>请登录选哪儿网或者app查看。</p>
        </div>
        <div class="msg" v-show="sendmsgArr.msgtype==3">
            <p>【选哪儿】你收到了1条新的项目，内容为</p>
            <textarea v-model="sendmsgArr.tuisongbeizhu" rows="2" style="width: 100%;height: auto;display: block"></textarea>
            <p>请登录选哪儿网或者app查看。</p>
        </div>
        <div slot="footer">
            <Button type="text" @click="hide" style="width: 70px; border: none;">取消</Button>
            <Button type="primary" :loading="finishBtnStatus" @click="finishSelect" style="width: 70px; border: none;">推送</Button>
        </div>
    </Modal>
</template>

<script>
    import BusinessSearch from "@/components/common/super_cascade_select/SuperBusinessSearchSelect.vue";
    import UserTransferBasic from "./UserTranfer";
    import $api from "@/api/clinch_a_deal/index.js";
    import $pluginApi from "@/api/plugin/plugin.js";
    import utils from "@/utils";
    import config from "@/config.js";
    export default {
        components : {
            UserTransferBasic,
            BusinessSearch
        },
        props : {
            //模态框标题
            title : {
                type : String,
                default : "项目推送"
            },
            //是否需要额外选项[recent:最近联系人,frequent:常用联系人]
            extra : {
                type : Array,
                default: ()=>{return []}
            },
            //部门下拉默认选中项all-全部，recent-最近联系人，frequent-常用联系人
            defaultGroup : {
                type : String,
                default : "all",
            },
            defaultRightList:{
                type:Array,
                default:()=>{return []}
            },
            itemId : {
                type : String,
                default : "",
            },
        },
        data() {
            return {
                //modal显示状态
                showStatus : false,
                //确定按钮状态
                finishBtnStatus : false,

                //存储部门-人关系
                groupUsersData : [],
                //部门备选项
                groupList : [
                    {"name" : "全部联系人" , "value" : "all"},
                ],
                //选中的部门选项
                groupSelect : "",
                //选中的单位选项
                companySelect : "",
                //搜索项的输入
                keyword : "",

                //穿梭框loading状态
                transferLoading : true,
                //穿梭框备选项
                transferList : [],
                //穿梭框选中项
                transferData : [],

                //推送相关选项
                sendmsgArr:{
                    'msgtype':'1',
                    'pmstuisong':'1',
                    'pushcard':'1',
                    'tuisongbeizhu':'{ 标题： 联系人： 手机： }'
                },
            };
        },
        created(){

        },
        methods : {
            //初始化数据
            init(){
                //初始化数据
                this.transferData = [];
                //选中的部门选项
                // this.groupSelect = "all";
                //默认选中
                if (this.companySelect==config.adminCompany||this.companySelect==""){
                    this.groupSelect="recent";
                }else {
                    this.groupSelect = this.defaultGroup;
                }
                //搜索项的输入
                this.keyword = "";
                this.sendmsgArr.msgtype = "1";
                //初始化人员列表
                this.getUsers();
            },
            //获取部门-人的数据
            initSearchList(){
                $pluginApi.plugInGroupUser().then(data=>{
                    this.groupUsersData = data ? data.list : [];
                    let defaultList = [
                        {"name" : "全部联系人" , "value" : "all"},
                    ];
                    if(this.extra.indexOf("recent") !== -1){
                        //有最近联系人
                        defaultList.push({"name" : "最近联系人" , "value" : "recent"});
                    }
                    if(this.extra.indexOf("frequent") !== -1){
                        //常用联系人
                        defaultList.push({"name" : "常用联系人" , "value" : "frequent"});
                    }
                    let resList= [];
                    for(let i = 0 ; i < this.groupUsersData.length ; i++){
                        resList.push({"name" : this.groupUsersData[i].name,"value" : this.groupUsersData[i].id});
                    }

                    this.groupList = [...defaultList,...resList];
                    //初始化
                    this.init();
                });
            },
            //搜索按钮点击后获取人员列表
            getUsers(){
                this.transferLoading = true;
                this.transferList = [];
                this.$nextTick(()=>{
                    if(this.$refs.userTransferBasic){
                        this.$refs.userTransferBasic.resetCheckbox();
                    }
                });
                let res = [];
                if(this.groupSelect === "recent" || this.groupSelect === "frequent"){
                    //最近联系人||常用联系人[调接口]
                    $pluginApi.getRecentContactUsers(this.groupSelect).then(res => {
                        this.transferLoading = false;
                        if(res.code !== "200"){
                            utils.notice(res.msg,"error");
                        }else{
                            this.transferList = [].concat(res.data);
                        }
                    });
                }else{
                    if(this.groupSelect === "all"){
                        //全部联系人
                        for(let i = 0 ; i< this.groupUsersData.length ; i++){
                            res = [...res,...this.groupUsersData[i].second_level];
                            res = [...new Set(res)];
                        }
                    }else{
                        //所选部门人员
                        for(let i = 0 ; i< this.groupUsersData.length ; i++){
                            if(this.groupUsersData[i].id === this.groupSelect) {
                                res = [...this.groupUsersData[i].second_level];
                                break;
                            }
                        }
                    }
                    this.transferList = [].concat(res);
                }

                //单位筛选
                let res2=[];
                if (this.companySelect != "") {
                    //所选部门人员
                    for(let m = 0 ; m< this.transferList.length ; m++){
                        if(this.transferList[m].company_id == this.companySelect) {
                            res2.push(this.transferList[m])
                        }
                    }
                    this.transferList = res2;
                }
                this.transferLoading = false;

            },

            /**
             * 这里被迫单独加点击搜索图标的逻辑
             */
            clickSearch(){
                this.transferLoading = true;
                this.transferList = [];
                this.$nextTick(()=>{
                    if(this.$refs.userTransferBasic){
                        this.$refs.userTransferBasic.resetCheckbox();
                    }
                });

                //先把这个部门变成全部
                this.groupSelect = "all";
                //全部联系人
                let res = [];
                for(let i = 0 ; i< this.groupUsersData.length ; i++){
                    res = [...res,...this.groupUsersData[i].second_level];
                    res = [...new Set(res)];
                }
                this.transferList = [].concat(res);

                //单位筛选
                let res2=[];
                if (this.companySelect != "") {
                    //所选部门人员
                    for(let m = 0 ; m< this.transferList.length ; m++){
                        if(this.transferList[m].company_id == this.companySelect) {
                            res2.push(this.transferList[m])
                        }
                    }
                    this.transferList = [].concat(res2);
                }


                // 关键字模糊搜索
                let res3=[];
                for(let n = 0; n < this.transferList.length ; n++){
                    if(this.transferList[n].username.indexOf(this.keyword) >= 0){
                        res3.push(this.transferList[n]);
                    }
                }
                this.transferList = [].concat(res3);
                this.transferLoading = false;
            },

            /**
             * 部门下拉框change事件
             */
            groupChange(value){
                this.keyword = "";
                this.getUsers();
            },
            //------------------modal相关
            /**
             * modal显示
             * @param {array} defaultList 右侧默认值
             */
            show(defaultList=[]){
                this.initSearchList();
                let _self = this;
                this.$nextTick(()=>{
                    _self.$refs.userTransferBasic.resetRightList(defaultList)
                });
                if(defaultList && defaultList.length > 0){
                    this.changeSelect(defaultList);
                }
                this.showStatus = true;
            },
            //modal关闭
            hide(){
                this.showStatus = false;
            },
            //穿梭框变化时
            changeSelect(data){
                // let res = [];
                // for(let i = 0 ; i < data.length ; i ++ ){
                //     res.push(data[i].uid);
                // }
                // res = [...new Set(res)];
                // this.transferData = res;
                this.transferData = data;
            },
            //确认选择
            finishSelect(){
                this.$emit("finish-select",this.transferData,this.sendmsgArr);
            },

            companyChange(data){
                this.companySelect=data.id;
                //这里为了让默认是选哪官方
                if (this.companySelect==""){
                    this.companySelect=config.adminCompany;
                }
                this.keyword = "";
                //重新调一下获取人的接口
                $pluginApi.transferModelUserForPush({'companyId':this.companySelect}).then(data=>{
                    this.groupUsersData = data ? data.list : [];
                    let defaultList = [
                        {"name" : "全部联系人" , "value" : "all"},
                    ];
                    if(this.extra.indexOf("recent") !== -1 && this.companySelect==config.adminCompany){
                        //有最近联系人
                        defaultList.push({"name" : "最近联系人" , "value" : "recent"});
                    }
                    if(this.extra.indexOf("frequent") !== -1 && this.companySelect==config.adminCompany){
                        //常用联系人
                        defaultList.push({"name" : "常用联系人" , "value" : "frequent"});
                    }
                    let resList= [];
                    for(let i = 0 ; i < this.groupUsersData.length ; i++){
                        resList.push({"name" : this.groupUsersData[i].name,"value" : this.groupUsersData[i].id});
                    }

                    this.groupList = [...defaultList,...resList];
                    //初始化
                    this.init();
                });
            }
        },
    };
</script>

<style lang="less" scoped>
    @import "./item_detail_user_transfer_modal.less";
</style>
