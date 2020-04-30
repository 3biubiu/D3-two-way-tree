<template>
    <Modal
        class="form-modal new-push-men"
        v-model="showStatus"
        :title="title">
        <div class="modal-box">
            <!--搜索-->
            <Select v-model="groupSelect" style="width:200px" @on-change="groupChange">
                <Option v-for="item in groupList" :value="item.value" :key="item.value">{{ item.name }}</Option>
            </Select>
            <Input class="push-men-input" v-model="keyword" size="large" placeholder="请输入姓名" clearable @on-enter="getUsers"></Input>
            <Button class="push-men-btn" type="primary" @click="getUsers">搜索</Button>
        </div>
        <div style="margin-top: 20px">
            <user-transfer-basic ref="userTransferBasic" :title='["选择项","已选项"]' :default-right-list="defaultRightList" :transfer-list="transferList" :loading="transferLoading" @onchange="changeSelect"></user-transfer-basic>
        </div>
        <!-- <div style="padding-top: 15px;padding-left: 10px;color: #666">
            <div style="float:left">通知方式：</div>
            <div class="notice-type">
                <RadioGroup v-model="noticeType" @on-change="mseeageSpecial">
                    <Radio :label="0">不发送</Radio>
                    <Radio :label="1">系统短信</Radio>
                    <Radio :label="2">自定义短信</Radio>
                    <Radio :label="5">微信通知</Radio>
                    <Radio :label="3">QQ通知</Radio>
                </RadioGroup>
                <div v-show="specialMsgText">
                    <span>【选哪儿】您收到了{{msgCount}}条新的成交推送，内容为：</span>
                    <i-input style="margin-top: 10px"  type="textarea" :rows="3" placeholder="请输入自定义短信内容" v-model="textArea"></i-input>
                    <span>请登录选哪儿网查看。</span>
                </div>
            </div>
        </div> -->

        <div slot="footer">
            <Button type="text" @click="hide">取消</Button>
            <Button type="primary" :loading="finishBtnStatus" @click="finishSelect">确定</Button>
        </div>
    </Modal>
</template>

<script>
    import UserTransferBasic from "./DealPush";
    import $api from "@/api/clinch_a_deal/index.js";
    import $pluginApi from "@/api/plugin/plugin.js";
    import utils from "@/utils";
    import { createNamespacedHelpers } from 'vuex'
    const { mapState, mapGetters, mapMutations, mapActions } = createNamespacedHelpers('itemDetail')
    export default {
        components : {
            UserTransferBasic
        },
        props : {
            moreCardModal:Boolean,
            //模态框标题
            title : {
                type : String,
                default : "推送项目"
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
            }
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
                //搜索项的输入
                keyword : "",

                //穿梭框loading状态
                transferLoading : true,
                //穿梭框备选项
                transferList : [],
                //穿梭框选中项
                transferData : [],
                //通知方式
                noticeType: 1,
                //自定义短信
                // specialMsgText:false,
                //自定义短信内容
                // textArea:'',
                msgCount:1
            };
        },
        watch:{
            showStatus(newVal,oldVal){
                if(newVal || this.moreCardModal){   //弹窗打开
                    this.SET_SCROLL_DISABLED(true);
                }else{
                    this.SET_SCROLL_DISABLED(false);
                }
            }
        },
        created(){
            this.initSearchList();
        },

        methods : {
            //初始化数据
            init(){
                //初始化数据
                this.transferData = [];
                //选中的部门选项
                // this.groupSelect = "all";
                //默认选中
                this.groupSelect = this.defaultGroup;
                //搜索项的输入
                this.keyword = "";
                //初始化人员列表
                this.getUsers();
            },
            // mseeageSpecial(){
            //     if(this.noticeType == 2 || this.noticeType == '2'){
            //         this.specialMsgText = true;
            //     }else{
            //         this.specialMsgText = false;
            //     }
            // },
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
                    $api.getRecentContactUsers(this.keyword,this.groupSelect).then(res => {
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

                    //关键字模糊搜索
                    for(let n = 0; n < res.length ; n++){
                        if(res[n].username.indexOf(this.keyword) >= 0){
                            this.transferList.push(res[n]);
                        }
                    }

                    this.transferList = [].concat(this.transferList);
                    this.transferLoading = false;
                }


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
            show(defaultList=[],$noticeType=1){
                this.init();
                let _self = this;
                this.$nextTick(()=>{
                    _self.$refs.userTransferBasic.resetRightList(defaultList)
                });
                if(defaultList && defaultList.length > 0){
                    this.changeSelect(defaultList);
                }
                this.noticeType = $noticeType;
                // this.specialMsgText = $noticeType*1 === 2;
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
                this.$emit("do-push",this.transferData,this.noticeType,this.textArea);
            },
            ...mapMutations(['SET_SCROLL_DISABLED']),
        },
    };
</script>

<style lang="less">
    .new-push-men{
        .ivu-transfer-list {
            height: 400px;
            width: 196px;
        }
        .transfer{
            width: 476px;
            margin-left: 0;
        }
        .modal-box{
            width:500px;
            margin: 0 auto;
        }
        .push-men-input{
            width: 200px;
            overflow: hidden;
            margin-left: 3px;
            .ivu-input{
                height: 32px;
            }
        }
        .push-men-btn{
            height: 32px;
            line-height: 1;
            margin-left: 3px;
            .ivu-btn{
                line-height: 1;
            }
        }
    }
</style>