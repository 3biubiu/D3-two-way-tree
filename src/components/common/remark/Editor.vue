<template>
    <Form ref="formData" class="editor" :model="formData" label-position="top" :rules="remarkRule">
        <!-- 回复 -->
        <div class="replay" v-show="formData.isReply.id">
            <p class="title">回复{{formData.isReply.username}}</p>
            <CheckboxGroup class="replay-checkbox" v-model="formData.isSetTime">
                <Checkbox label="需要设置回访时间"></Checkbox>
            </CheckboxGroup>
        </div>
        <!-- 温度计 -->
        <div class="thermometer" v-show="!formData.isReply.id">
            <p class="title">添加跟进</p>
            <div class="thermometer-bg">
                <div class="thermometer-active" :style="{width:temperature+'%'}"></div>
            </div>
            <p class="thermometer-num">{{temperature}}℃</p>
        </div>
        <!-- 选项卡 -->
        <RadioGroup class="remarks-radio" v-show="!formData.isReply.id || formData.isSetTime.length>0" v-model="formData.status" @on-change="changeStatus">
            <Radio v-for="item in statusList" :key="item.key" :label="item.key">{{item.value}}</Radio>
        </RadioGroup>
        <!-- mot -->
        <FormItem class="mot-list" v-show="(formData.status!='3'&&itemCate!='10')&&(!formData.isReply.id || formData.isSetTime.length>0)">
            <label class="ivu-form-item-label contact-title"><span class="contact-star"></span>项目 MOT 及进度</label>
            <Select v-model="formData.motId" @on-change="changeMot">
                <Option v-for="(item,index) in motList" :value="item.itemMotId" :key="index" :title="item.motName">{{item.motName}}</Option>
            </Select>
            <a @click="addMot" class="add">没有要跟进的MOT？<span>添加 MOT</span></a>
        </FormItem>
        <!-- 进度 -->
        <FormItem v-if="formData.status!='3'&&(!formData.isReply.id || formData.isSetTime.length>0)" :class="{'only-progress':itemCate=='10'}" :prop="!closeContact?'progressId':''" :label="itemCate=='10'?'项目进度':''">
            <Select class="item-progress" v-model="formData.progressId" clearable  @on-change="changeProgress" placeholder="请选择项目进度">
                <Option v-for="item in progressList" :value="item.value" :key="item.value" :title="item.name">{{ item.name }}</Option>
            </Select>
        </FormItem>
        <!-- 联系对象、联系类型 -->
        <div class="contact"  v-if="formData.status!='3'&&(!formData.isReply.id || formData.isSetTime.length>0)">
            <FormItem class="contact-item" prop="contactId">
                <label class="ivu-form-item-label contact-title"><span class="contact-star" v-if="!closeContact && !formData.isReply.id"></span>联系对象</label>
                <Select class="editor-link" v-model="formData.contactId" clearable :disabled="closeContact">
                    <Option v-for="(item,index) in personList" :value="item.id" :key="index" :title="item.name?item.name:'未填写'">{{ item.name?item.name:'未填写' }}</Option>
                </Select>
            </FormItem>
            <FormItem class="contact-item contact-type" label="联系类型" prop="contactType">
                <Select v-model="formData.contactType" clearable @on-change="changeContact">
                    <Option v-for="item in contactType" :value="item.key" :key="item.key">{{ item.value }}</Option>
                </Select>
            </FormItem>
        </div>
        <!-- 回访时间-->
        <div class="contact" v-if="formData.status!='3'&&(!formData.isReply.id || formData.isSetTime.length>0)">
            <div class="contact-time-tab">
                <span v-for="time in timeList" :key="time.key" :class="{'contact-time-active':timeChoice==time.key}" @click="calcateTime(time.key)">{{time.value}}</span>
            </div>
            <FormItem class="contact-item" label="回访时间">
                <DatePicker type="date" :value="formData.visitDate" :options="disabledTimeData" :clearable="dateClear" :editable="false" @on-change="changeVisitDate" placeholder="请选择"></DatePicker>
            </FormItem>
            <FormItem class="contact-item contact-type" :label="'\xa0'">
                <TimePicker format="HH:mm" :value="formData.visitTime" @on-change="changeVisitTime" :editable="false"  placeholder="请选择"></TimePicker>
            </FormItem>
        </div>
        <!-- 回访提醒方式-->
        <div class="contact-notice" v-show="formData.visitTime" v-if="formData.status!='3'&&(!formData.isReply.id || formData.isSetTime.length>0)">
            <FormItem label="回访提醒方式">
                <CheckboxGroup v-model="formData.visitType">
                    <Checkbox label="APP"></Checkbox>
                    <Checkbox label="微信"></Checkbox>
                    <Checkbox label="QQ"></Checkbox>
                    <Checkbox label="短信"></Checkbox>
                    <Checkbox label="电话"></Checkbox>
                </CheckboxGroup>
            </FormItem>
        </div>
        <!-- 回复内容 -->
        <!-- <div class="remarks-contents" v-show="formData.isSetTime.length>0">
            <p class="title">回复内容</p>
            <CheckboxGroup class="remarks-checkbox" v-model="formData.followType">
                <Checkbox label="有效跟进"></Checkbox>
            </CheckboxGroup>
        </div>  -->
        <!-- 备注内容/回复内容 -->
        <div class="remarks-contents">
            <p class="title">{{(formData.isReply.id)?'回复':'跟进'}}内容</p>
            <CheckboxGroup class="remarks-checkbox" v-model="formData.followType" v-show="!formData.isReply.id || formData.isSetTime.length>0">
                <Checkbox label="载体身份" :disabled="closeCarrier"></Checkbox>
                <Checkbox label="@其他单位"></Checkbox>
                <Checkbox v-show="itemCate=='10'" label="单位身份"></Checkbox>
            </CheckboxGroup>
        </div>
        <!-- 载体身份 -->
        <div class="carrier-identity" v-show="formData.followType.includes('载体身份')&&(!formData.isReply.id || formData.isSetTime.length>0)">
            <p class="title">载体身份</p>
            <business-search type="8" ref="identity" placeHolder="载体身份设置" @selectOne="identityChange" :readonly="closeCarrier"></business-search>
            <!-- <Select class="identity" v-model="formData.identityId" clearable :disabled="closeCarrier">
                <Option v-for="(item,index) in carrierList" :value="item.id" :key="index">{{ item.name }}</Option>
            </Select> -->
        </div>
        <!-- @其他单位 -->
        <div class="other-company" v-show="formData.followType.includes('@其他单位')&&(!formData.isReply.id || formData.isSetTime.length>0)">
            <business-search style="width: 200px" type="3" placeHolder="单位名称" @selectOne="(data)=>{getCompany(data,1)}" ref="company"></business-search>

            <Select class="depart" v-model="formData.departId" @on-change="changeDepart" clearable placeholder="部门">
                <Option v-for="(item,index) in departList" :value="item.id" :key="index" :title="item.name">{{ item.name }}</Option>
            </Select>
            <Select class="name" v-model="formData.personId" :label-in-value="true" @on-change="changeUser" clearable placeholder="姓名">
                <Option v-for="(item,index) in userList" :value="item.uid" :key="index" :title="item.username">{{ item.username }}</Option>
            </Select>
        </div>
        <!-- 单位身份 -->
        <div class="carrier-identity" v-show="formData.followType.includes('单位身份')&&(!formData.isReply.id || formData.isSetTime.length>0)">
            <p class="title">单位身份</p>
            <business-search type="3" cate-other="10" ref="search" placeHolder="单位身份设置" @selectOne="(data)=>{getCompany(data,2)}"></business-search>
        </div>
        <!-- 备注内容 -->
        <FormItem prop="remarkNote">
            <at-ta class="textarea-at" v-model="formData.remarkNote" ref="atTestArea" :avoid-email="false" :members="members"  @at="atCallBack" @input="hasAtCallBack">
                <Input type="textarea" @on-blur="closeAtPanel" :autosize="{minRows: 7}" placeholder="请输入跟进内容" @on-change="changeInput"></Input>
                <!--具名插槽的attribute用法-->
                <template v-slot:item="userName">
                    <span :title="userName.item">{{userName.item}}</span>
                </template>
            </at-ta>
        </FormItem>
        <!-- 提醒 -->
        <div class="notice">
            <div class="notice-type">
                <CheckboxGroup v-model="formData.extension" @on-change="changeExtension">
                    <Checkbox label="有效跟进"></Checkbox>
                    <Checkbox label="推送名片" v-show="showPush"></Checkbox>
                    <Checkbox v-show="formData.followType.includes('单位身份') && itemCate=='10'" label="更新到最新进展"></Checkbox>
                    <Checkbox label="紧急@"></Checkbox>
                </CheckboxGroup>
            </div>
            <div class="notice-note" v-show="showTips">
                <div class="notice-box" v-for="(tip,index) in tipType" :key="index">
                    <Tooltip v-if="tip.tips" :content="tip.tips" placement="top">
                        <span :class="{'active': tip.choice}" @click="changeIssend(index)">{{tip.name}}</span>
                    </Tooltip>
                    <span v-else :class="{'active': tip.choice}" @click="changeIssend(index)">{{tip.name}}</span>
                </div>
            </div>
        </div>
        <div :class="{'no-tips':!showTips}" class="editor-btn">
            <Button type="primary" class="btn editor-btn-first" @click="submitRemark" :loading="btnLoading">发布</Button>
            <Button class="btn" v-show="!formData.isReply.id && (authList.itemOwn=='1' || authList.itemOwn=='2')" @click="showOwnModal">{{authList.itemOwn==='2'?'独占延期':'项目独占'}}</Button>
            <Tooltip :content="'已激活（'+authList.itemCloseName+'），不可独占'" word-wrap trigger="hover" placement="top"  class="editor-tips" v-show="!formData.isReply.id && authList.itemOwn==='4'">
                <Button class="btn" @click="showOwnModal" disabled>项目独占</Button>
            </Tooltip>
            <Button class="btn" v-show="formData.isReply.id" @click="changeReply">取消</Button>
        </div>
        <Modal
            class="form-modal recovery-modal"
            v-model="openRecovery"
            title="回收原因"
            width="800"
            @on-ok="recoveryOk"
            @on-cancel="recoveryCancel">
            <div id="recovery-modal">
                <div class="recovery-top">
                    <Row :gutter="8">
                        <Col span="12">
                            <Input class="recovery-input" placeholder="请输入原因" v-model="recoveryData.course"></Input>
                        </Col>
                        <Col span="8">
                            <Select class="name" v-model="recoveryData.type" clearable placeholder="项目类型">
                                <Option v-for="(item,index) in recoveryReason" :value="item.id" :key="index">{{ item.name }}</Option>
                            </Select>
                        </Col>
                        <Col span="4">
                            <Button class="btn" type="primary" @click="searchType">搜索</Button>
                        </Col>
                    </Row>
                </div>
                <div class="recovery-type" v-for="(item,index) in recoveryReason" :key="index" :id="'recovery'+item.id">
                    <p class="recovery-title">{{item.name}}</p>
                    <div class="recovery-box">
                        <span class="recovery-reason" v-for="(reason,idx) in item.child" @click="chioceReason(reason)" :class="{'recovery-active':reason.isClick,'recovery-search':reason.isSearch}" :key="idx">{{reason.name}}</span>
                    </div>
                </div>
            </div>
        </Modal>
        <item-own ref="itemOwn"></item-own>
    </Form>
</template>

<script>
import BusinessSearch from "@/components/common/super_cascade_select/SuperBusinessSearchSelect.vue";
import ItemOwn from "@/pages/item/item_detail/business/item_header/business/itemOwn";
// import AtTa from 'vue-at/dist/vue-at-textarea';
import AtTa from "@/components/common/vue_at/AtTextarea.vue"
import $api from "@/api/item/item_detail/index.js";
import remarkRule from "@/validateRule/item/remark.js";
import utils from "@/utils.js";
import { itemStatus,contactType,timeList,progressOther,tipType } from "@/static_data/item_remark.js";
import { createNamespacedHelpers } from 'vuex';
import config from "@/config.js";
const { mapState, mapGetters, mapMutations, mapActions } = createNamespacedHelpers('itemDetail')

export default {
    components:{
        BusinessSearch,
        AtTa,
        ItemOwn
    },
    props : {
        remarkData : {   //备注数据
            type : Object,
            default : ()=>{return {list:[],top:[],latest:{},dateInfo:[]}}
        },
        reply:{
            type : Object,
            default : {}
        },
        //添加mot
        isAdd : {
            type : Boolean,
            default : false
        },
        atUsername : {
            type : String,
            default : ''
        },
    },
    data(){
        return{
            progressSum:0,//判断进度列表请求
            atCurrent:'',
            formData:{
                isReply:{},
                isSetTime:[],
                status : '',
                motId:'',
                progressId:'',
                progressType:'',
                progressCate:'',
                contactId:'',
                contactType:'',
                visitDate:'',
                visitTime:'',
                visitType:[],
                followType:[],
                companyId:'',
                companyIdentifyId:'',
                departId:'',
                personId:'',
                identityId:'',
                remarkNote:'',
                extension:[],
                reason:{
                    cate:[],
                    reason:[],
                }
            },
            temperature:'',  //温度计
            statusList:itemStatus,  //项目状态下拉数据
            contactType:contactType,   //联系类型下拉数据
            timeList:timeList,
            progressList:[], //项目进度下拉列表
            progressOther:progressOther,//项目类型为其他时的项目进度
            tipType:tipType,//提醒方式下拉
            carrierList:[], //载体下拉列表
            carrierDefaultList:[],//mot为基础跟进线时的下拉数据
            companyList:[],  //@其他单位-单位名称下拉列表
            departList:[],  //@其他单位-部门下拉列表
            userList:[],  //@其他单位-人员下拉列表
            atPersonList:{},    //@人员总数据
            atEditorArr:[],    //@项目录入人组
            atFollowArr:[],    //@所有跟进人组
            atVisitorArr:[],    //@还在回访的人组
            progressData:{   //请求节假日和进度接口传参
                cate:'',
                type:''
            },
            recoveryData:{//回收弹窗
                course:'',//回收原因
                type:''//项目类型
            },
            timeChoice:0,//回访时间点击选中
            closeContact:false,//联系对象选择框是否禁用
            closeCarrier:false,//载体身份是否只读
            showTips:false,//提醒方式是否展示
            showPush:false,//推送名片是否展示
            newNote:'',
            oldNote:'',
            atUser:[],//传给后端的去重后的数据
            members: [],
            defaultMembers:['项目录入人', '所有跟进人', '还在回访的人'],
            allMembers:[],
            companyName:'',//选中的单位名称
            remarkRule:remarkRule,
            openRecovery:false,//回收弹窗
            recoveryReason:[],//回收弹窗原因列表
            recoveryCount:0,
            itemCate:'',//该项目类型
            newTip:[],//当前点击的提醒方式
            hasAdd:false,//判断是否添加mot
            dateClear:false,//回访时间是否能清空
            btnLoading:false,//发布按钮点击loading
            isPush:true,//是否可以选中推送名片
            changeMotCount:0,//切换mot
            isChangePush:false,
            isAddMot:false,
            disabledTimeData:{    //不能选的回访时间
                disabledDate: date =>{
                    return date && date.valueOf() < Date.now() - 86400000
                }
            }
        }
    },
    computed:{
        defaultCompany() {    //@其他单位-单位名称默认选中值
            return {id: '', name: '相关单位'}
        },
        defaultIdentifyCompany() {    //单位身份默认选中值
            return {id: '', name: '相关单位'}
        },
        /**
             * 实时抽取@的人有哪些
            * @author liujuan & 2020-3-18 11:31:55
         */
        getAtUsers(){
            let reg = /@(\#([^\s]+)\#)?(([\u4e00-\u9fa5]([\u4e00-\u9fa5]|\(|\)|\（|\）)+[0-9]*)(\s{1}))/g;
            let res = this.formData.remarkNote.match(reg);
            let list = [];
            res = res ? res : [];
            if(res.length > 0){
                for(let i=0;i<res.length;i++){
                    res[i] = res[i].substr(1).trim();
                    list.push(res[i]);
                }
                this.showTips = true;
                this.showPush = true;
                if(this.formData.extension.indexOf('推送名片') == -1 && this.isPush && !this.isChangePush){
                    this.formData.extension.push('推送名片');
                    this.isChangePush = true;
                }
            }else{
                this.showTips = false;
                this.showPush = false;
                this.isChangePush = false;
                if(this.formData.extension.indexOf('推送名片') > -1){
                    this.formData.extension.splice(this.formData.extension.indexOf('推送名片'), 1);
                }
                list = res;
            }
            return list;
        },
        //用户权限
        authList(){
            let res = this.$store.getters['itemDetail/authListData'];
            return res;
        },
        ...mapState({
            motList(state){  //mot下拉数据
                let data = state.motData?[...state.motData]:[];
                let obj = {
                    motName:'基础跟进线',
                    companyId:'',
                    motId:"new",
                    itemMotId:'0'
                };
                data.unshift(obj);
                return data;
            },
            personList(state){ // 联系对象下拉数据
                let data = state.cardData.card?[...state.cardData.card]:[];
                let obj1 = {
                    id:"-1",
                    name:"同事"
                }
                let obj2 = {
                    id:"-2",
                    name:"园区人员"
                }
                data.push(obj1,obj2)
                return data;
            },
            cate(state){   //需求分类
                return state.itemBasicInfo.itemCateIds?state.itemBasicInfo.itemCateIds:[];
            },
            headerData(){
                let data = this.$store.getters['itemDetail/headerBasicInfo'];
                return data;
            }
        }),
    },
    watch:{
        //推送名片是否默认选中
        'formData.extension'(val,old){
            if(val.indexOf('推送名片')==-1 && old.indexOf('推送名片')>-1 && this.isChangePush){
                //手动将推送名片去掉
                this.isPush = false;
            }else{
                this.isPush = true;
            }
        },
        'formData.followType'(val,old){
            //取消勾选单位身份的时候把更新到最新进展取消勾选
            if(val.indexOf('单位身份')==-1 && old.indexOf('单位身份')>-1){
                if(this.formData.extension.indexOf('更新到最新进展')>-1){
                    this.formData.extension.splice(this.formData.extension.indexOf('更新到最新进展'), 1);
                }
            }
        },
        'formData.remarkNote'(newVal,oldVal){   //初始化表单数据
            this.newNote = newVal;
            this.oldNote = oldVal;
        },
        'formData.status'(val,old){
            this.defaultTime();//修改回访时间显示
        },
        atCurrent(val,old){
            if(val!='项目录入人 ' && val!='所有跟进人 ' && val!='还在回访的人 '&&this.newNote.length>=this.oldNote.length){
                //删除的时候不执行
                this.atOnePerson();
            }
        },
        remarkData: {   //初始化表单数据
            handler(newVal, oldVal) {
                if(Object.keys(newVal.latest).length > 0){
                    this.formData.status = newVal.latest.status?newVal.latest.status:'1';//状态默认为接洽中
                    this.formData.motId = newVal.latest.itemMotId&&this.itemCate!=='10'?newVal.latest.itemMotId:'0';
                    this.formData.progressId = newVal.latest.progress?newVal.latest.progress:'';//项目进度
                    this.formData.contactId = newVal.latest.contactUid?newVal.latest.contactUid:'';//联系对象
                }
                if(parseInt(newVal.latest.progress)>5 && this.itemCate=='10'){
                    this.formData.progressId = '';
                }
                if(this.personList.length>0 && newVal.latest.contactUid=="" && newVal.latest.contactUsername =='未填写'){
                    for(let item of this.personList){
                        if(item.name == ''){
                            this.formData.contactId = item.id;
                            return false;
                        }
                    }
                }
                if(this.motList.length>0&&newVal.list.length-oldVal.list.length>=1&&newVal.latest.isManualActive=='1'){
                    this.isAddMot = true;
                    this.$refs.formData.validateField('contactId')
                }
            },
            deep: true
        },
        cate(val,old){
            if(val.length>0&&JSON.stringify(val)!=JSON.stringify(old)){
                this.getReason();
            }
        },
        motList(val,old){
            if(val.length>old.length&&this.hasAdd){
                this.formData.motId = val[val.length-1].itemMotId;
                this.changeMot();
            }else if(this.formData.motId!=this.remarkData.latest.itemMotId ||this.changeMotCount==0){
                this.formData.motId = this.remarkData.latest.itemMotId?this.remarkData.latest.itemMotId:'0';
                this.changeMot();
            }
        },
        //切换回复和添加跟进
        reply(val,old){
            if(val.id!=this.formData.isReply.id){
                this.formData.isReply = JSON.parse(JSON.stringify(val))
                this.clearnData();
            }
        },
        //判断mot组件是否点击添加mot
        isAdd(val,old){
            this.hasAdd = val;
        },
        //快速@
        atUsername(val,old){
            if(val){
                //当val有值再添加
                this.formData.remarkNote += '@'+val+' ';
                let name = this.getAtUsers;
            }
        },
        //基础信息（用到私有温度和项目类型）
        headerData(val,old){
            this.initData();
        },
        //监听名片数据
        personList(val,old){
            if(val.length>0 && this.formData.contactId=="" && this.remarkData.latest.contactUsername =='未填写'){
                for(let item of val){
                    if(item.name == ''){
                        this.formData.contactId = item.id;
                        return false;
                    }
                }
            }
        },
        //切换@其他单位的部门
        'formData.departId'(val,old){
            this.formData.personId ='';
        }
    },
    created(){
        this.remarkRule.contactId = [
            {
                validator:(rule,value,callback)=>{
                    if(!this.formData.contactId && !this.closeContact && !this.formData.isReply.id && !this.isAddMot){
                        callback(new Error("请选择联系对象"));
                    }
                    this.isAddMot = false;
                    callback();
                },
                trigger: 'change'
            }
        ];
        this.remarkRule.remarkNote = [
            {
                validator:(rule,value,callback)=>{
                    setTimeout(()=>{
                        if(!this.formData.remarkNote){
                            callback(new Error("请输入备注信息"));
                        }else{
                            callback();
                        }
                    },1);
                },
                trigger: 'change,blur'
            }
        ];
    },
    mounted(){
        this.initAtPerson();
        this.modalHeight();//改变回收弹窗最大高度
    },
    methods:{
        /**
             * 获得提醒方式新添加的数据
             * @param {string} arr1 提醒方式最新数据
             * @param {string} arr2 提醒方式最新数据和旧数据的相同值
            * @author zhouna & 2020-04-01 13:53:10
         */
        getArrDifference(arr1, arr2) {
            return arr1.concat(arr2).filter(function(v, i, arr) {
                return arr.indexOf(v) === arr.lastIndexOf(v);
            });
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
             * at单个用户执行方法
             * @param {string} data 被@的内容
            * @author zhouna & 2020-03-31 11:28:19
        */
        async atOnePerson(){
            let data = this.atCurrent;
            if(data&&this.allMembers.indexOf(data.substr(0, data.length - 1)) !== -1){
                let person = await $api.personAuth(data.substr(0, data.length - 1));
                let that = this;
                if(person.code=='500'){
                    this.$Modal.confirm({
                        title: '温馨提示',
                        content:'<p>'+person.msg+'</p>',
                        okText: '是',
                        cancelText: '否',
                        onCancel: async () => {
                            that.removeChars(that.formData.remarkNote,'@'+data,'')
                        }
                    });
                }
            }
        },
        /**
            * at一个人
            * @param {string} data 被@的内容
            * @author liujuan & 2020-3-18 11:31:55
        */
        removeChars(sourse,chars,replace){
            let reg  = new RegExp(chars,'gi')
            let result = sourse.replace(reg,replace);
            this.formData.remarkNote = result;
        },
        /**
             * at成功一个用户后的回调函数
             * @param {string} data 被@的内容
            * @author liujuan & 2020-3-18 11:31:55
        */
        hasAtCallBack(data){
             // ['项目录入人', '所有跟进人', '还在回访的人'],
            let str = '';
            let dataList = [];
            switch(this.atCurrent){
                case '项目录入人 ':
                    dataList = JSON.parse(JSON.stringify(this.atEditorArr))
                    break;
                case '所有跟进人 ':
                    dataList = JSON.parse(JSON.stringify(this.atFollowArr))
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
                this.removeChars(this.formData.remarkNote,'@'+this.atCurrent,str)
            }else if(this.atCurrent=='项目录入人 '||this.atCurrent=='所有跟进人 '||this.atCurrent=='还在回访的人 '){
                //如果所有跟进人、还在回访的人列表为空
                this.removeChars(this.formData.remarkNote,'@'+this.atCurrent,'')
            }
        },
        /**
             * 用来保证textarea失去焦点自动关闭at框的方法
             * @param {string} data @时输入的内容
            * @author liujuan & 2020-3-18 11:31:55
        */
        closeAtPanel(data){
            setTimeout(()=>{
                this.$refs.atTestArea.closePanel();
            },200);
        },
        /**
             * 备注框内容改变
            * @author zhouna & 2020-03-30 19:46:54
        */
        changeInput(data){
            //删除输入框所有内容的时候提示框隐藏
            let note = this.getAtUsers;
            if(!event.data){
                this.showTips = false;
                this.showPush = false;
            }
        },
        /**
            * 修改@其他单位人员后添加进备注框
            * @author liujuan & 2020-3-13 16:34:33
         */
        changeUser(){
            let userName = '';
            for(let j = 0;j<this.userList.length;j++){
                if(this.userList[j].uid==this.formData.personId){
                    userName = this.userList[j].username;
                }
            }
            if(this.companyName&&userName){
                this.formData.remarkNote += "@#"+this.companyName+"#"+userName+" ";
            }
            let user = this.getAtUsers;
        },
        /**
            * 初始化at人的数据
            * @author liujuan & 2020-3-18 11:31:55
        */
        async initAtPerson(){
            let res = await $api.getAtList(this.$route.params.item_id);
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
         * @其他单位-单位名称选中后赋值
         * @param {Object} id 单位id
         * @author liujuan & 2020-3-13 16:34:33
         */
        async initData(){
             // 温度计数据
            this.temperature = this.headerData.private_ther;
            this.itemCate = this.headerData.cate;//该项目cate
            if(this.itemCate == '10'){
                this.formData.motId = '0'
                this.progressData.cate = this.itemCate;
                this.progressData.type = '0';
                this.progressList = JSON.parse(JSON.stringify(this.progressOther))
            }
            if(this.headerData.isShowDealModal && (this.itemCate=='1'||this.itemCate=='2'||this.itemCate=='7'||this.itemCate=='5'||this.itemCate=='4') && !this.headerData.deal_status){//成交之后就不弹了
                //判断是否弹成功弹窗
                this.$Modal.confirm({
                    title: '确认成功',
                    content: '<p>该项目已放入成功项目，请至 MOT 发起项目成交申请，或者将项目移出成功项目。</p>',
                    onOk: async () => {
                        this.$Modal.remove();
                        if(this.headerData.dealCondition){
                            //已上传确认书
                            this.jumpMot();
                            
                        }else{
                            //未上传确认书
                            setTimeout(()=>{
                                this.$emit('to-up-book')
                            },500)
                        }
                    }
                });
            }
            
            // 单位下拉数据
            let companySearchData = {
                companyId:this.formData.companyId
            }
            let company = await $api.getCompanyList(companySearchData);
            this.companyList = company.data;
            // 获取对接载体下拉
            let carrier = await $api.getCarrierIdentity();
            this.carrierDefaultList = carrier.data;//mot线为基础跟进线的载体下拉数据
            if(this.formData.motId=="0"){//基础跟进线
                this.carrierList = JSON.parse(JSON.stringify(this.carrierDefaultList))
            }
        },
        
        /**
            * 成功弹窗---已上传落户确认书
            * @author zhouna & 2020-04-20 19:26:00
        */
        jumpMot(){
            let href = '';
            switch(this.itemCate){
                case '1':
                    //土地
                    href = config.mmsHost +'/Spa/deal/deal_land/tab_deal_land/add_deal_land/item_id/'+this.headerData.id;
                    break;
                case '2':
                    //厂房
                    href = config.mmsHost +'/Spa/deal/deal_factory/tab_deal_factory/add_deal_factory/item_id/'+this.headerData.id;
                    break;
                case '7':
                    //仓库
                    href = config.mmsHost +'/Spa/deal/deal_repertory/tab_deal_repertory/add_deal_repertory/item_id/'+this.headerData.id;
                    break;
                case '5':
                    //注册
                    href = config.mmsHost +'/Spa/deal/deal_register/tab_deal_register/add_deal_register/item_id/'+this.headerData.id;
                    break;
                case '4':
                    //写字楼
                    href = config.mmsHost +'/Spa/deal/deal_building/tab_deal_building/add_deal_building/item_id/'+this.headerData.id;
                    break;
            }
            window.open(href, '_blank');
        },
        /**
            * 修改回访时间日期
            * @param {Number} date 日期
            * @author liujuan & 2020-03-30 17:45:57
        */
        changeVisitDate(date){
            this.formData.visitDate = date;
        },
        /**
            * 修改回访时间
            * @param {Number} time 回访时间
            * @author liujuan & 2020-3-16 17:29:51
        */
        changeVisitTime(time){
            this.formData.visitTime = time;
            if(this.formData.visitTime){
                if(this.formData.visitType.indexOf('APP') == -1){
                    this.formData.visitType.push('APP')
                }
                if(this.formData.visitType.indexOf('微信') == -1){
                    this.formData.visitType.push('微信')
                }
                if(this.formData.visitType.indexOf('QQ') == -1){
                    this.formData.visitType.push('QQ')
                }
            }else{
                this.formData.visitType = [];
            }
        },
        
        /**
            * 点击时间tab相应改变日期数据
            * @param {Number} days 
            * @author liujuan & 2020-3-16 17:29:51
         */
        async calcateTime(days){
            this.timeChoice = days;
            let now = new Date();
            let fastDate = new Date( now.setDate( now.getDate() + days ));
            let theYear ;
            let theMonth;
            let theDay;
            let h;
            let m;
            let day;
            let obj={
                theTime:fastDate.getTime()
            }
            let res = await $api.checkIsExistHoildy(obj);
            if(res.code == 200){
                fastDate = new Date( fastDate.setDate( fastDate.getDate() + parseInt(res.data) ));
                day = fastDate.getDay();
                if(day == 0 ){
                    //当前日期是周日
                    fastDate.setDate( fastDate.getDate() + 1);
                }else if(day == 6){
                    //当前日期是周六
                    fastDate.setDate( fastDate.getDate() + 2);
                }
                theYear = fastDate.getFullYear();
                theMonth = fastDate.getMonth() + 1;//12月为0，0-11
                theDay = fastDate.getDate();
                h = fastDate.getHours();       //获取当前小时数(0-23)
                m = fastDate.getMinutes();
                if(theMonth <= 9){
                    theMonth = '0'+theMonth;
                }
                if(theDay <= 9){
                    theDay = '0'+theDay;
                }                
            }else{
                fastDate = new Date( now.setDate( now.getDate() + days ));
                day = fastDate.getDay();
                if(day == 0 ){
                    fastDate.setDate( fastDate.getDate() + 1);
                }else if(day == 6){
                    fastDate.setDate( fastDate.getDate() + 2);
                }
                theYear = fastDate.getFullYear();
                theMonth = fastDate.getMonth() + 1;
                theDay = fastDate.getDate();
                h = fastDate.getHours();       //获取当前小时数(0-23)
                m = fastDate.getMinutes();
                if(theMonth <= 9){
                    theMonth = '0'+theMonth;
                }
                if(theDay <= 9){
                    theDay = '0'+theDay;
                }
            }
            this.formData.visitDate = theYear+'-'+theMonth+'-'+theDay;
        },
        /**
            * @其他单位-单位名称选中后赋值
            * @param {Object} data 单位对象
            * @param {Number} type
            * @author liujuan & 2020-3-13 16:34:33
         */
        async getCompany(data,type){
            // 部门下拉数据
            let departSearchData = {
                companyId:data.id,
            }
            let depart = await $api.getDepartList(departSearchData);
            if(type==1){   //@其他单位
                this.formData.companyId = data.id;
                this.departList = depart.data;
                this.companyName = data.name;
                if(this.formData.companyId == ''){
                    this.formData.departId = '';
                    this.companyName = '';
                    this.changeDepart();
                }
            }else{ //单位身份
                this.formData.companyIdentifyId = data.id;
            }
        },
        /**
            * 修改部门后对应修改人员下拉数据
            * @author liujuan & 2020-3-13 16:34:33
         */
        async changeDepart(){
            // 人员下拉数据
            let userSearchData = {
                companyId:this.formData.companyId,
                groupId:this.formData.departId,
            }
            if(!this.formData.companyId || !this.formData.departId){
                this.formData.personId ='';
                this.userList = [];
                this.changeUser();
            }else{
                //有单位和部门
                let user = await $api.getUserList(userSearchData);
                this.userList = user.data;
            }
        },
        /**
            * 切换状态为回收时显示弹窗
            * @author zhouna & 2020-3-23 10:30:00
         */
        changeStatus(){
            if(this.formData.status==3){
                //选择回收
                this.openRecovery = true;
                this.formData.contactType = "10"; //联系类型变为其他
                this.dateClear = true;//回访时间可清空
                this.formData.progressId = ''; // 项目进度
                this.formData.progressType = ''; // 项目进度
                this.formData.progressCate = ''; // 项目进度
                this.formData.contactId = ''; //联系对象
                this.formData.visitDate = ''; //回访日期
                this.formData.visitTime = ''; //回访时间
                this.formData.visitType = []; //回访提醒方式
                this.changeContact();
                if(this.formData.motId!='0'){
                    this.formData.motId = '0'; //项目Mot为0
                    this.changeMot();
                }
                if(this.formData.remarkNote==""||this.formData.remarkNote=="暂缓"){
                    this.formData.remarkNote="回收站";
                }
            }else{
                this.recoveryCancel();//取消选中的回收原因
                this.formData.contactType = "";
                this.dateClear = false;
                this.changeContact();
                if(this.formData.remarkNote=="暂缓"||this.formData.remarkNote=="回收站"){
                    this.formData.remarkNote="";
                }
            }
            if(this.formData.status==5){
                if(this.formData.remarkNote==""||this.formData.remarkNote=="回收站"){
                    this.formData.remarkNote="暂缓";
                }
            }
            if(this.formData.status==2){
                this.dateClear = true;
            }
            // this.defaultTime();//默认时间
        },
        /**
         * 发布之前--备注表单赋值
         * @author liujuan & 2020-3-13 16:34:33
         */
        submitRemarkData(){
            let obj = {
                itemId : this.$route.params.item_id,              //项目id
                cloudId: this.formData.isReply.id ? this.formData.isReply.id:'',              //回复的备注id
                cloudPrefix:this.formData.isReply.id ?this.formData.isReply.uid:[],//回复的备注的备注人uid
                status : this.formData.status,              //项目状态
                // contactId : this.formData.contactId,           //联系对象id（先不传）
                contact : "",             //联系对象name
                contactType : this.formData.contactType,         //联系类型id
                nextTime : this.formData.visitDate?this.formData.visitDate + " " + this.formData.visitTime:'',            //回访时间
                effectiveFollow : this.formData.extension.includes("有效跟进")?'1':'',     //跟进是否有效1-无效跟进2-有效跟进
                identityCompany : this.formData.companyIdentifyId?this.formData.companyIdentifyId:'',     //单位身份id(其他项目用到)
                goNewProgressing : this.formData.extension.includes("更新到最新进展")?'2':"1", //是否更新进度（其他项目用到）默认是1，其他项目：勾了是2
                progress : this.formData.progressId,            //项目进度id
                issend : '',              //发送短信类型1-系统短信2-详细短信
                cloud : this.formData.remarkNote,               //具体备注内容
                atUser : this.atUser&&this.atUser.length>0?this.atUser:[],              //提取出at的用户name
                commentAndCloud : this.formData.isSetTime.length>0?'1':'0',     //是否为回复1-是，0-否
                sendqq : '',              //是否发qq通知1-是
                emergency : this.formData.extension.includes("紧急@")?'1':'',           //是否为紧急@
                pushcard : this.formData.extension.includes("推送名片")?'1':'',            //是否推送名片信息
                progressType : this.itemCate=='10'?'':this.formData.progressType,        //项目进度值
                progressCate:this.itemCate=='10'?this.itemCate:this.formData.progressCate,        //项目进度值
                itemMotId : this.formData.motId,           //项目motid
                appPush : this.formData.visitType.includes("APP")?'1':'',             //回访提醒方式APP 1-发送
                wxPush : this.formData.visitType.includes("微信")?'1':'',              //回访提醒方式微信 1-发送
                qqPush : this.formData.visitType.includes("QQ")?'1':'',              //回访提醒方式qq通知 1-发送
                smsPush : this.formData.visitType.includes("短信")?'1':'',             //回访提醒方式短信 1-发送
                phonePush : this.formData.visitType.includes("电话")?'1':'',           //回访提醒方式电话 1-发送
                isfrom : "1",              //来源  1代表pc端
                carrierId : this.formData.followType.includes("载体身份")?this.formData.identityId:'', //载体身份关联载体indexId
                reason : this.formData.reason, //回收原因及分类
            }
            //转换名片没有名字的为未填写
            for(let item of this.personList){
                if(item.id == this.formData.contactId){
                    obj.contact = item.name?item.name:'未填写';
                }
            }
            if(this.tipType[0].choice){
                //选择了发送QQ通知（提醒方式里面）
                obj.sendqq = '1'
            }
            if(this.tipType[1].choice){
                obj.issend = '1'
            }else if(this.tipType[2].choice){
                obj.issend = '2'
            }
            return obj;
        },
        /**
         * 备注表单提交数据
         * @author liujuan & 2020-3-13 16:34:33
         */
        submitRemark(){
            this.testForm();//回复的话判断回复的备注还在不在
            let time = this.formData.visitDate.replace(/\-/g, '\.');
            let nowTime = Date.parse(new Date())/1000;//当前时间
            let choiceTime = utils.timeDiff(time+' '+this.formData.visitTime,'start')
            if(this.formData.status==2&& !this.formData.visitDate && this.formData.visitTime){
                utils.notice('请选择回访时间', 'error');
                return false;
            }
            if(this.formData.visitTime && choiceTime<=nowTime){
                //选择时间小于当前时间
               this.formData.visitTime = '';
               utils.notice('回访时间不能小于当前时间，请重新选择回访时间!', 'error');
               this.formData.visitType = [];
               return false;
            }
            let isRemarkValid = false;   //false直接提交，true弹二次弹窗
            let emailReg = /@([^\s\@])+/g;
            let rulReg = /@(\#([^\s]+)\#)?(([\u4e00-\u9fa5]([\u4e00-\u9fa5]|\(|\)|\（|\）)+[0-9]*)(\s{1}))/g;
            if(!(!this.formData.remarkNote.match(emailReg) && !this.formData.remarkNote.match(rulReg))){
                let lOne = this.formData.remarkNote.match(emailReg) ? this.formData.remarkNote.match(emailReg).length : 0;
                let lTwo = this.formData.remarkNote.match(rulReg) ? this.formData.remarkNote.match(rulReg).length : 0;
                if(lOne !== lTwo){
                    isRemarkValid = true;
                }
            }
            if(this.itemCate=='10' && !this.formData.isReply.id && (!this.formData.companyIdentifyId || this.formData.followType.indexOf('单位身份') == -1)){
                //当项目类型为其他的、备注为添加跟进、未选择单位身份
                utils.notice('请选择单位身份！', 'error');
                return false;
            }
            if(this.itemCate==='10' && this.formData.followType.indexOf('单位身份')==-1){
                //项目类型是其他，并且没勾单位身份(备注为回复)
                this.formData.companyIdentifyId = '';
            }
            //将@过的人拼成和备注框中相同格式
            let personList = '';
            for(let item of this.getAtUsers){
                personList += "@"+item+' ';
            }
            //进行@过的人去重
            this.atUser = [];
            let myset = new Set(this.getAtUsers);
            for(let val of myset){
                this.atUser.push(val)
            }
            this.$refs.formData.validate(async valid => {
                if(valid && isRemarkValid){
                    this.$Modal.confirm({
                        title: '@提醒',
                        content: '<p>检测到您@了别人没有在人名后面添加空格。如果是邮箱地址，点击确定直接提交！</p>',
                        onOk: async () => {
                            let submitData = this.submitRemarkData();
                            this.submitApi(submitData);
                        }
                    });
                }else if(valid && this.formData.remarkNote == personList){
                    utils.notice('请在@人后输入备注内容！', 'error');
                }else if (valid && !isRemarkValid) {
                    let submitData = this.submitRemarkData();
                    this.submitApi(submitData);
                }
            });
        },
        /**
         * 验证当前回复的备注是否存在
         * @author zhouna & 2020-04-03 13:45:22
         */
        testForm(){
            if(this.formData.isReply.id){
                let hasReply = false;
                for(let item of this.remarkData.list){
                    if(item.id == this.formData.isReply.id){
                        hasReply = true;
                    }
                }
                if(!hasReply){
                    utils.notice('该条跟进信息已被删除', 'error');
                    this.changeReply();
                    this.clearnData();
                    return false;
                }
            }
        },
        /**
         * 提交数据
         * @author zhouna & 2020-04-02 18:03:46
         * @param {Object} submitData 备注内容
         */
        async submitApi(submitData){
            this.btnLoading = true;
            let res;
            let type = '';
            if(this.formData.isReply.id){
                //回复
                res= await $api.submitReply(submitData);
                type = '1'
            }else{
                //添加
                res = await $api.submitRemark(submitData);
                type = '2'
            }
            this.btnLoading = false;
            if(res.code!='200'){
                utils.notice(res.msg, 'error');
            }else{
                this.$emit("submit-success",type);
            }

        },
         /**
         * 切换mot线
         * @author zhouna & 2020-3-26 14:28:56
         */
        async changeMot(){
            this.changeMotCount++;
            if(this.itemCate!=='10'){
                this.formData.progressId = '';
                this.formData.progressType = '';
                this.formData.progressCate = '';
                if (this.formData.followType.indexOf('载体身份') > -1) {
                    this.formData.followType.splice(this.formData.followType.indexOf('载体身份'), 1);
                }
            }
            //改变项目进度
            if(this.formData.motId=="0"){
                this.progressData.cate = this.itemCate;
                this.progressData.type = '0';
                //改变载体身份
                this.carrierList = JSON.parse(JSON.stringify(this.carrierDefaultList))
                this.formData.identityId = "";
                this.$refs.identity.theOne.id = '';
                this.$refs.identity.theOne.name = '';
                this.$refs.identity.clear();
                this.closeCarrier = false;
                this.formData.companyIdentifyId = '';
            }else{
                this.closeCarrier = true; //载体身份禁止
                for(let item of this.motList){
                    if(this.formData.motId==item.itemMotId){
                        this.progressData.cate = item.cate;
                        this.progressData.type = item.type;
                        this.formData.companyIdentifyId = item.companyId;
                        this.carrierList = [
                            {
                                id:item.carrierId,
                                name:item.carrierName
                            }
                        ]
                        this.formData.identityId = item.carrierId;
                        this.$refs.identity.theOne.id = item.carrierId;
                        this.$refs.identity.theOne.name = item.carrierName;
                    }
                }
            }
            //mot线不是基础跟进线
            if(this.carrierList.length==1 && this.formData.identityId!='0'){
                //有载体身份
                if(this.formData.followType.indexOf('载体身份') == -1){
                    this.formData.followType.push('载体身份')
                }
            }else if(this.carrierList.length==1 && this.formData.identityId=='0'){
                //无载体身份
                let index = this.formData.followType.indexOf('载体身份');
                if (index > -1) {
                    this.formData.followType.splice(index, 1);
                }
                // this.$refs.identity.clear();
            }
            if(this.itemCate!='10'&& this.formData.motId){
                let res = await $api.getItemParameter(this.progressData);
                this.progressList = res.data.itemProcessData;
                this.progressSum++;
            }else if(this.itemCate == '10'){
                this.progressList = JSON.parse(JSON.stringify(this.progressOther))
            }
            let isMotFirst = true;
            if(this.progressSum<=1&&this.remarkData.latest.progress){
                this.formData.progressId = this.remarkData.latest.progress;
                isMotFirst = false;
            }
            this.changeProgress(isMotFirst);//修改项目进度相关值
        },
        /**
         * 切换项目进度
         * @author zhouna & 2020-04-01 18:03:41
         * @param {Object} isMotFirst 判断是否是通过改变mot改变进度
         */
        async changeProgress(isMotFirst){
            if(this.formData.motId!='0' && this.itemCate!='10' && this.formData.progressId && isMotFirst){
                let checkRes = await $api.checkActivationStatus(this.formData.motId,false,this.formData.progressId);
                if(checkRes.code != '200'){
                    utils.notice(checkRes.msg,"error");
                    return false;
                }
            }
            for(let item of this.progressList){
                if(item.value == this.formData.progressId){
                    this.formData.progressType = item.progressType;
                    this.formData.progressCate = item.progressCate;
                }
            }
        },
        /**
         * 回收弹窗点击确定
         * @author zhouna & 2020-3-23 16:01:04
         */
        recoveryOk(){
            let that = this;
            this.formData.reason.reason = [];
            this.recoveryReason.forEach(function(val, index) {
                if(val.id==that.formData.reason.cate[0]){
                    val.child.forEach(function(child, idx) {
                        if(child.isClick){
                            that.formData.reason.reason.push(child.id)
                        }
                    })
                }
            })
        },
         /**
         * 回收弹窗点击取消
         * @author zhouna & 2020-3-23 16:02:03
         */
        recoveryCancel(){
            this.recoveryReason.forEach(function(val, index) {
                val.child.forEach(function(child, idx) {
                    child.isClick = false;
                    child.isSearch= false;
                })
            })
            this.formData.reason.cate = [];
            this.formData.reason.reason = [];
            this.recoveryData.type = '';
            this.recoveryData.course = '';
        },
        /**
         * 回收弹窗搜索
         * @author zhouna & 2020-3-23 16:59:22
         */
        searchType(){
            let that = this;
            if(that.recoveryData.type){
                //有选中类型
                if(that.recoveryData.course){
                    //有输入原因
                    that.recoveryReason.forEach(function(val, index) {
                        if(val.id==that.recoveryData.type){
                            val.child.forEach(function(child, idx) {
                                if(child.name.indexOf(that.recoveryData.course)>-1){
                                    child.isSearch= true;
                                }else{
                                    child.isSearch= false;
                                }
                            })
                        }
                    })
                }else{
                    that.clearnReason();
                }
                //跳转至类型锚点
                let anchor = document.getElementById('recovery'+that.recoveryData.type).offsetTop;
                that.$nextTick(()=>{
                    document.getElementById("recovery-modal").parentNode.scrollTop = anchor;
                });
            }else{
                //未选择类型
                if(that.recoveryData.course){
                    //有输入原因
                    let arr = [];
                    that.recoveryReason.forEach(function(val, index) {
                        val.child.forEach(function(child, idx) {
                            if(child.name.indexOf(that.recoveryData.course)>-1){
                                child.isSearch= true;
                                arr.push(child.parentId);
                            }else{
                                child.isSearch= false;
                            }
                        })
                    })
                    if(arr.length>0){
                        let top = document.getElementById('recovery'+arr[0]).offsetTop;
                        that.$nextTick(()=>{
                            document.getElementById("recovery-modal").parentNode.scrollTop = top;
                        });
                    }
                }else{
                    //没输入原因 跳转至原因第一种
                    let index = that.recoveryReason[0].id;
                    let top = document.getElementById('recovery'+index).offsetTop;
                    that.$nextTick(()=>{
                        document.getElementById("recovery-modal").parentNode.scrollTop = top;
                    });
                    that.clearnReason();
                }
            }
        },
        /**
         * 清空搜索的原因
         * @author zhouna & 2020-3-24 22:09:56
         */
        clearnReason(){
            this.recoveryReason.forEach(function(val, index) {
                val.child.forEach(function(child, idx) {
                    child.isSearch= false;
                })
            })
        },
        /**
         * 默认时间显示
         * @author zhouna & 2020-3-23 19:01:17
         */
        defaultTime(){
            switch(this.formData.status){
                case '4'://重点项目
                    this.calcateTime(7);
                    break;
                case '1'://接洽中
                    this.calcateTime(7);
                    break;
                case '5'://暂缓
                    this.calcateTime(60);
                    break;
                case '2'://成功
                    this.calcateTime(14);
                    break;
                default:
                    this.formData.visitDate = "";
                    break;
            }
        },
        /**
         * 获取回收弹窗回收原因数据
         * @author zhouna & 2020-3-24 13:59:18
         */
        async getReason(){
            let cateType = this.cate.join(',');
            let res = await $api.getRecoveryList(cateType);
            this.recoveryCount++;
            if(res.code==200){
                res.data = res.data.slice(0); // 深拷贝此数组
                res.data.forEach(function(val, index) {
                    val.child.forEach(function(child, idx) {
                        child.isClick = false;
                        child.isSearch= false;
                    })
                })
                this.recoveryReason = res.data;
            }
            if(this.formData.status=='3' && this.recoveryCount==1 && this.remarkData.latest.reason===''){
                this.openRecovery = true
            }
        },
        /**
         * 切换联系类型
         * @author zhouna & 2020-3-25 11:57:28
         */
        changeContact(){
            if(this.formData.contactType==9||this.formData.contactType==12||this.formData.contactType==10){
                let beforeType = this.formData.contactType;
                let beforeNote = this.formData.remarkNote;
                let progressId = this.formData.progressId;
                this.closeContact = true;
                this.formData.contactId = "";
                // this.formData.progressId = "";
                this.$refs.formData.resetFields();
                this.formData.contactType = beforeType;
                this.formData.remarkNote = beforeNote;
                this.formData.progressId = progressId;

            }else{
                this.closeContact = false;
            }

        },
        /**
         * 点击回收原因
         * @author zhouna & 2020-3-24 15:56:50
         */
        chioceReason(item){
            this.recoveryReason.forEach(function(val, index) {
                if(val.id!=item.parentId){
                    val.child.forEach(function(child, idx) {
                        child.isClick = false;
                    })
                }else{
                    item.isClick = !item.isClick;
                }
            })
            this.formData.reason.cate = [];
            this.formData.reason.cate.push(item.parentId);
        },
        /**
         * 修改输入框底下复选框（有效跟进、推送名片、紧急@）
         * @author zhouna & 2020-3-24 15:56:50
         */
        changeExtension(){
            if(this.formData.extension.includes('紧急@')){
                this.tipType[0].choice = true;
                this.tipType[2].choice = true;
                if(this.tipType[1].choice){
                    this.tipType[1].choice = false;
                }
            }else{
                this.tipType[0].choice = false;
                this.tipType[2].choice = false;
            }
        },
        /**
         * 修改提醒方式（QQ、简洁短信、详细短信）
         * @author zhouna & 2020-04-01 10:56:46
         */
        changeIssend(index){
            if(index==1){
                if(!this.tipType[1].choice&&this.tipType[2].choice){
                    this.tipType[2].choice = false;
                }
                this.tipType[index].choice = !this.tipType[index].choice;
            }else if(index==2){
                if(!this.tipType[2].choice&&this.tipType[1].choice){
                    this.tipType[1].choice = false;
                }
                this.tipType[index].choice = !this.tipType[index].choice;
            }else{
                this.tipType[0].choice = !this.tipType[0].choice;
            }
        },
        /**
         * 触发添加MOT事件
         */
        addMot(){
            this.$emit("add-mot");
            this.hasAdd = true;
        },
        /**
         * 点击回复备注里的取消
         * @author zhouna & 2020-04-01 19:39:14
         */
        changeReply(){
            this.$emit("change-reply",{});
            this.formData.isSetTime = [];//回复备注不勾选是否设置回访时间
        },
        /**
         * 弹出项目独占模态框
         * @author zhouna & 2020-04-02 15:17:30
         */
        showOwnModal(){
            if (this.authList.itemOwn!=='4'){
                if (this.authList.itemOwn==='2'){
                    this.$refs.itemOwn.type = 2;
                }
                this.$refs.itemOwn.show();
            }
        },
        /**
         * 切换回复/添加跟进进行数据清空
         * @author zhouna & 2020-04-02 11:57:18
         */
        clearnData(){
            this.$refs.formData.resetFields();
            this.formData.status = this.remarkData.latest.status?this.remarkData.latest.status:'1';//状态默认为接洽中
            this.formData.motId = this.remarkData.latest.itemMotId&&this.itemCate!=='10'?this.remarkData.latest.itemMotId:'0';
            this.formData.progressType = '';
            this.formData.progressCate = '';
            this.formData.contactId = this.remarkData.latest.contactUid;//联系对象
            this.formData.contactType = '';//联系类型
            this.formData.visitDate = '';//回访时间
            this.formData.visitTime = '';//回访时间
            this.formData.visitType = [];//提醒回访方式
            this.formData.followType = [];//跟进方式
            this.formData.companyId = '';//@其他单位id
            this.formData.companyIdentifyId = '';//单位身份id
            this.formData.departId = '';//@其他单位部门id
            this.formData.personId = '';//@其他单位人员id
            this.formData.identityId = '';//载体身份
            this.formData.remarkNote = '';//备注框输入内容
            this.formData.extension = [];//跟进方式
            this.formData.reason.cate = [];//回收的项目类型
            this.formData.reason.reason = [];//回收的原因
            this.showTips = false;//提醒方式是否展示
            this.showPush = false;//推送名片是否展示
            this.formData.isSetTime = [],//是否需要设置回访时间
            this.changeMot();
            this.defaultTime();//修改回访时间显示
            let _this = this;
            this.progressSum = 0;
            this.isChangePush = false;
            this.isPush = true;
            this.isAddMot = false;
            // if(this.itemCate=='10'){
                // this.$nextTick(()=>{
                    // _this.formData.progressId = _this.remarkData.latest.progress;//项目进度
                    // _this.changeProgress();//修改项目进度相关值
                // })
            // }

            for(let item of this.tipType){
                item.choice = false;
            }
            if(this.remarkData.latest.contactUid=="" && this.remarkData.latest.contactUsername){
                for(let item of this.personList){
                    if(item.name == ''){
                        this.formData.contactId = item.id;
                        break;
                    }
                }
            }
            this.$refs.company.clear();
            this.$refs.search.clear();
            this.$refs.identity.keyword = '';
            this.$refs.company.keyword = '';
            this.$refs.search.keyword = '';
        },
        /**
         * 修改回收弹窗最大高度
         * @author zhouna & 2020-04-10 10:42:18
         */
        modalHeight(){
            let _this = this;
            let winHeight = window.innerHeight || document.documentElement.clientHeight ||document.body.clientHeight;
            let reply = document.getElementsByClassName("recovery-modal");
            if(reply){
                reply[0].getElementsByClassName('ivu-modal-body')[0].style.maxHeight = (winHeight-320)+'px'
            }
            window.addEventListener("resize",()=>{
                winHeight = window.innerHeight || document.documentElement.clientHeight ||document.body.clientHeight;
                reply = document.getElementsByClassName("recovery-modal");
                if(reply){
                    reply[0].getElementsByClassName('ivu-modal-body')[0].style.maxHeight = (winHeight-320)+'px'
                }
            })
        },
        /**
         * 选择载体身份
         * @author zhouna & 2020-04-13 15:57:04
         * @param {Object} data 回调携带的数据
         */
        identityChange(data){
            this.formData.identityId = data.id;
        }
    }
}
</script>
<style lang="less">
    @import "./editor.less";
</style>
