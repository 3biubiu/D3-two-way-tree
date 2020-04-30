<template>
    <Modal
        class="form-modal pick-item-modal"
        v-model="showStatus"
        :title="title">
        <pick-item-transfer ref="userTransferBasic" :default-right-list="defaultRightList" :transfer-list="transferList" :loading="transferLoading" @onchange="changeSelect"></pick-item-transfer>
        <div slot="footer">
            <div class="baidu-search" @click="searchBaidu">搜索一下该手机号</div>
            <Button class="pick-item-btn" type="text" @click="hide">取消</Button>
            <Button class="pick-item-btn" type="primary" :loading="finishBtnStatus" @click="finishSelect">项目提取</Button>
        </div>
    </Modal>
</template>

<script>
    import PickItemTransfer from "./PickItemTransfer";
    import $api from "@/api/clinch_a_deal/index.js";
    import $pluginApi from "@/api/plugin/plugin.js";
    import utils from "@/utils";
    export default {
        components : {
            PickItemTransfer
        },
        props : {
            transferKeyword:String,
            transferList:Array,
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
                transferLoading : false,
                //穿梭框备选项
                // transferList : [],
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
            showStatus(newVal){
                console.log(newVal)
                if(!newVal){
                    this.$refs.userTransferBasic.pickItemSuccess = false;
                    this.$refs.userTransferBasic.itemIds = [];
                }
            }
        },
        created(){
            
        },

        methods : {   
            /**
                *  百度搜索
                * @param {String} keyword 搜索关键词
                * @author liujuan & 2020-4-3 13:40:21
            */
            searchBaidu(keyword){
                var newPage=window.open();
                newPage.location= `https://www.baidu.com/s?wd=${this.transferKeyword}`;
            },
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
                // this.getUsers();
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
                this.$refs.userTransferBasic.pickItemSuccess = false;
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
                this.$refs.userTransferBasic.pickItem();
                // this.$emit("do-push",this.transferData,this.noticeType,this.textArea);
            },


        },
    };
</script>

<style scoped>
    @import "./pick_item.less";
</style>