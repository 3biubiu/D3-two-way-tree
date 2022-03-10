
<template>
    <tis-modal
        class="twice-confirm"
        :closable="false"
        :mask-closable="false"
        v-model="show"
        :width="width">
        <div class="twice-confirm-title">
            <i v-if="showIcon" class="ivu-icon" :class="{'ivu-icon-ios-help-circle':iconType=='warning','ivu-icon-ios-close-circle':iconType=='error','ivu-icon-ios-checkmark-circle':iconType=='success'}"></i>
            <p>{{title}}</p>
        </div>
        <p v-if="content" class="twice-confirm-content">{{content}}</p>
        <div slot="footer">
            <tis-button class="ghost" type="default" @click="cancel">取消</tis-button>
            <tis-button type="primary" :loading="loading" @click="confirm">确定</tis-button>
        </div>
    </tis-modal>
</template>
<script>
export default {
    name: 'tabs',
    props:{
        // 标题
        title:{
            type:String,
            default:'确认要删除该项目吗？'
        },
        // 弹窗的内容描述区域文案
        content:{
            type:String,
            default:''
        },
        // 二次弹窗的宽度
        width:{
            type:Number|String,
            default:'400'
        },
        // 是否展示icon
        showIcon:{
            type:Boolean,
            default:true
        },
        // icon类型 警告-warning 错误-error 成功-success
        iconType:{
            type:String,
            default:'warning'
        },
        //是否需要请求接口后关闭弹窗---点击确认
        waitApi:{
            type:Boolean,
            default:true
        }
    },
    data(){
        return {
            loading: false,
            show: false,
        };
    },
    methods: {
        //确定
        confirm(){
            this.loading = true;
            this.$emit('confirm')
            if(!this.waitApi){
                this.cancel();
                this.loading = false;
            }
        },
        //显示
        showConfirmModal(){
            this.show = true;
        },
        //隐藏
        cancel(){
            this.$emit('cancel')
            this.show = false;
        },
    },
    mounted(){
        
    }
};
</script>
<style lang="less">
    .twice-confirm{
        .itis-modal-body{
            padding: @space-32 @space-32 0;
        }
        .itis-modal-footer{
            border: none;
            padding: @space-24 @space-32;
        }
        .twice-confirm-title{
            display: flex;
            p{
                flex: 1;
                font-size: @font-size-16;
                font-weight: bold;
                color: @black-1-color;
            }
        }
        .ivu-icon{
            margin-right: @space-8;
            font-size: 22px;
        }
        .ivu-icon-ios-help-circle{
            color: @orange-2-color;
        }
        .ivu-icon-ios-close-circle{
            color: @red-2-color;
        }
        .ivu-icon-ios-checkmark-circle{
            color: @green-2-color;
        }
        .twice-confirm-content{
            font-size: @font-size-14;
            color: @black-2-color;
            margin-top: @space-8;
        }
    }
</style>