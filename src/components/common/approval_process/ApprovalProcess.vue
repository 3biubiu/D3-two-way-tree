
<template>
    <div>
        <div style="margin-top:50px;" v-if="promissionData.length>0">
            <label style="line-height: 40px;font-size:14px;">审批意见</label>
            <Input style="width:95%" v-model="approvalData.remark" type="textarea" :autosize="{minRows: 3,maxRows: 5}" placeholder="请输入审批意见"></Input>
        </div>
        <div class="buttons">
            <Button @click="partakeApproval" type="success" v-if="approval_identity == 'PARTITION'">参与分成</Button>
            <Button @click="noPartakeApproval" type="error" v-if="approval_identity == 'PARTITION'">不参与分成</Button>
            <Button
                    v-if="approval_identity != 'PARTITION'"
                    class="btns" @click="approveApproval(item.map_data)"
                    :type="item.map_data.value=='pass'?'success':item.map_data.value=='refuse'?'error':'info'"
                    v-for="(item,index) in promissionData" :key="index">{{item.label}}
            </Button>
            <Button @click="transferApproval" type="success" v-if="promissionData.length>0 && approval_identity != 'PARTITION'">转审</Button>
            <Button @click="modifyApproval" type="success" v-if="(detailsInfo.status=='REFUSE' || detailsInfo.status=='WAIT' || detailsInfo.status=='CANCEL') && detailsInfo.addUid == uid">修改</Button>
            <Button  class="ghost" @click="cancelApproval" type="default" v-if="(detailsInfo.status=='DOING' || detailsInfo.status=='WAIT') && detailsInfo.addUid == uid ">撤销</Button>
        </div>
    </div>
</template>
<script>
import $api from "@/api/adjust_grades/index.js";
import utils from "@/utils";
import Cookies from 'js-cookie'


export default {
    props: {
        detailsInfo: {
            type: Object,
            default: () => {
                return {};
            }
        },
        promissionData:{
            type:Array,
            default:() =>{
                return []
            }
        },
        approval_identity:'',
    },
    data(){
        return{
            approvalData:{
                remark:'',
                id:'',
                key:'',
                value:''
            },
            uid:null,
        }
    },
    components: {

    },
    watch:{
        approvalData:{
            handler(newVal){

            },
            deep:true
        }
    },
    created() {
        this.uid = Cookies.get('uid');
    },
    methods: {
        /**
        * 处理申请方法
        *
        * @param {Object} map_data
        *
        */
        approveApproval(map_data){
            this.approvalData.key = map_data.key;
            this.approvalData.value = map_data.value;
            if(map_data.value == 'pass'){
                this.$emit("passApproval",this.approvalData);
            }else if(map_data.value == 'refuse'){
                this.$emit("refuseApproval",this.approvalData);
            }
        },
        /**
        * 参与派发事件给父组件
        *
        */
        partakeApproval(){
            this.$emit("partakeApproval",this.approvalData);
        },
        /**
        * 不参与派发事件给父组件
        *
        */
        noPartakeApproval(){
            this.$emit("noPartakeApproval",this.approvalData);
        },
        /**
         * 转审派发事件给父组件
         *
         */
        transferApproval(){
            this.$emit("transferApproval");
        },
        /**
        * 修改派发事件给父组件
        *
        */
        modifyApproval(){
            this.$emit("modifyApproval");
        },
        /**
        * 撤销派发事件给父组件
        *
        */
        cancelApproval(){
            this.$emit("cancelApproval");
        },
    },
    mounted(){

    }
};
</script>

<style lang="less" scoped>
    .textarea {
        width: 95%;
        height: 110px;
        line-height: 20px;
        font-size: 14px;
        color: #333;
        outline: none;
        padding: 10px;
    }
    .buttons {
        margin-top: 40px;
        margin-bottom: 20px;
        .btns{
            margin-right: 5px;
            &:nth-child(2){
                margin-right: 0;
            }
        }
    }
    .ghost:hover {
        color: #28b294!important;
        background-color: transparent;
        border-color: #28b294!important;
    }
</style>
