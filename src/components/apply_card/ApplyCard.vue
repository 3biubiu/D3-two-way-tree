<template>
    <tis-modal class="form-modal" v-model="ApplyCardModal" scrollable title="申请查看" :mask-closable="false">
        <div class="message-box">
            <tis-row :gutter="16">
                <tis-col :span="6">
                    <p class="left-title">联系人名称：</p>
                </tis-col>
                <tis-col :span="18">
                    <p class="right-info">{{applyInfo.name}}</p>
                </tis-col>
            </tis-row>
            <tis-row :gutter="16" class="mt16">
                <tis-col :span="6">
                    <p class="left-title">联系人负责人：</p>
                </tis-col>
                <tis-col :span="18">
                    <p class="right-info">{{applyInfo.managerName}}</p>
                </tis-col>
            </tis-row>
            <tis-row :gutter="16" class="mt16">
                <tis-col :span="6">
                    <p class="left-title">备注：</p>
                </tis-col>
                <tis-col :span="18">
                    <tis-input class="right-textarea" type="textarea" v-model="applyData.remark" />
                </tis-col>
            </tis-row>
            <tis-row :gutter="16" class="mt16">
                <tis-col :span="6">
                    <p class="left-title">通知类型：</p>
                </tis-col>
                <tis-col :span="18">
                    <CheckboxGroup v-model="notice">
                        <Checkbox label="phone_call_status">电话</Checkbox>
                        <Checkbox label="qq_push_status">企业微信</Checkbox>
                        <Checkbox label="app_push_status">选哪儿APP</Checkbox>
                    </CheckboxGroup>
                </tis-col>
            </tis-row>
        </div>
        <div slot="footer">
            <tis-button type="text" @click="hide">取消</tis-button>
            <tis-button type="primary" @click="okApplyCard" :loading="loading">确定</tis-button>
        </div>
    </tis-modal>
</template>

<script>
    import $api from'@/api/item/item_detail/index.js';
    import utils from '@/utils';
    export default {
        props : {
            moreCardModal:Boolean,
            applyInfo:{
                type:Object,
                default:()=>{return{}}
            },
        },
        data(){
            return{
                card:{},
                loading:false,
                ApplyCardModal:false,
                notice:['qq_push_status'],
                applyData:{
                    itemId:'',
                    remark:'',
                    phone_call_status:false,
                    qq_push_status:true,
                    wx_push_status:false,
                    send_message_status:false,
                    app_push_status:false,
                    cardId:this.applyInfo.id,
                    manager:this.applyInfo.manager,
                    type:6,
                },
                applyNotice:['ewx'],
                applyContent:{
                    itemId:'',
                    cate:'',
                    remark:'',
                    managerUid:'',
                    notificationType:[]
                }//申请查看项目的填写内容
            }
        },
        watch:{
            notice: {
                handler(newVal, oldVal) {
                    this.applyData.phone_call_status = (newVal.indexOf("phone_call_status")==-1)?false : true;
                    this.applyData.qq_push_status = (newVal.indexOf("qq_push_status")==-1)?false : true;
                    this.applyData.wx_push_status = (newVal.indexOf("wx_push_status")==-1)?false : true;
                    this.applyData.send_message_status = (newVal.indexOf("send_message_status")==-1)?false : true;
                    this.applyData.app_push_status = (newVal.indexOf("app_push_status")==-1)?false : true;
                },
                deep: true
            },
            applyNotice:{
                handler(newVal,oldVal){
                    if(newVal.indexOf("app")==-1){
                        this.applyContent.notificationType.push("app");
                    }
                    if(newVal.indexOf("ewx")==-1){
                        this.applyContent.notificationType.push("ewx");
                    }
                    if(newVal.indexOf("voice")==-1){
                        this.applyContent.notificationType.push("voice");
                    }
                    this.applyContent.notificationType = JSON.parse(JSON.stringify(this.applyNotice));
                    // console.log(newVal)
                },
                deep:true
            },
            applyInfo(newVal,oldVal){
                this.applyContent.managerUid = newVal.manager;
                this.applyContent.remark = '';//初始化备注
                this.applyNotice = ['ewx'];//初始化通知类型
            }
        },
        methods:{
            /**
            * 关闭申请弹窗确定
            * @author liluyao & 2020-3-12 21:36:54
            */
            async okApplyCard(){
                this.loading = true
                let res = await $api.applyCard(this.applyData);
                this.loading = false
                if(res.code ==200){
                    utils.notice(res.msg,'success');
                    this.ApplyCardModal = false;
                    this.$emit("update-is-auth",2)
                }else{
                    utils.notice(res.msg,'error');
                    return;
                }
            },


            /**
             * 弹窗点击取消
             */
            hide(){
                this.ApplyCardModal = false
            },
            /**
                * 关闭申请弹窗取消
                * @param id
                * @author liluyao & 2020-3-12 21:37:48
                */
            show(){
                this.applyData = {
                    itemId:'',
                    remark:'',
                    phone_call_status:false,
                    qq_push_status:true,
                    wx_push_status:false,
                    send_message_status:false,
                    app_push_status:false,
                    cardId:this.applyInfo.id,
                    manager:this.applyInfo.manager,
                    type:6,
                };
                this.ApplyCardModal = true;
            },
            /**
             * 关闭申请弹窗取消
             * @author liluyao & 2020-3-12 21:37:48
             * @param cardId
             * @param manager
             */
            showNew(cardId,manager){
                this.applyData = {
                    itemId:'',
                    remark:'',
                    phone_call_status:false,
                    qq_push_status:true,
                    wx_push_status:false,
                    send_message_status:false,
                    app_push_status:false,
                    cardId:cardId,
                    manager:manager,
                    type:6,
                };
                this.ApplyCardModal = true;
            },
        }
    }
</script>
<style lang="less" scoped>
    @import "./apply_card.less";
</style>
