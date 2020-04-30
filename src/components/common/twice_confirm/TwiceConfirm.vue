
<template>
    <Modal
        v-model="show"
        :title="title">
        <p v-html="content"></p>
        <textarea v-if="placeholder" class="textarea" v-model="textareaValue" :placeholder="placeholder"></textarea>
        <p v-show="noPromptShow">
            <Checkbox @on-change="recordNoPrompt()" v-model="noPrompt" style="margin-top: 15px">不再提醒</Checkbox>
        </p>
        <div slot="footer" style="text-align: left;">
            <Button type="success" :loading="loading" @click="confirm">确定</Button>
            <Button class="ghost" type="default" @click="show=false">取消</Button>
        </div>
    </Modal>
</template>
<script>
export default {
    name: 'tabs',
    data(){
        return {
            loading: false,
            show: false,
            title: '',
            content: '',
            placeholder:"",
            textareaValue:'',
            noPromptShow:false,
            noPrompt:false,
            okCallback: function(){},
        };
    },
    methods: {
        recordNoPrompt(){
            this.$emit("recordNoPrompt",this.noPrompt);
        },
        //重置
        reset(){
            this.show = false;
            this.loading = false;
            this.title = '';
            this.content = '';
            this.textareaValue = "";
            this.okCallback = function(){};
        },
        //确定
        confirm(){
            this.setLoading(true);
            this.hideConfirmModal();
            this.okCallback();
            if(this.placeholder){
                this.$emit("twiceConfirm",this.textareaValue);
            }            
            if(this.show){
                this.loading= false;
            }
        },
        //显示
        showConfirmModal(){
            this.show = true;
        },
        //隐藏
        hideConfirmModal(){
            this.show = false;
            this.noPromptShow = false;
        },
        //设置
        setConfig(title='', content='',placeholder='', okCallback=function(){}){
            this.title = title;
            this.content = content;
            this.placeholder = placeholder;
            this.okCallback = okCallback;
        },
        //控制loading
        setLoading(loading){
            this.loading = loading;
        },
        //初始化
        init(title='', content='',placeholder='', okCallback=function(){}){
            this.reset();
            this.setConfig(title, content,placeholder, okCallback);
            this.showConfirmModal();
        }
    },
    mounted(){
        
    }
};
</script>
<style lang="less" scoped>
    .textarea{
        width:100%;
        margin-top:15px;
        height: 73px;
        min-height: 73px;
        max-height: 115px;
        overflow-y: hidden;
        font-size: 14px;
        line-height: 20px;
        padding: 4px 7px;
        border: 1px solid #dcdee2;
        border-radius: 4px;
        color: #333;
        background-color: #fff;
        background-image: none;
        position: relative;
        cursor: text;
        -webkit-transition: border 0.2s ease-in-out, background 0.2s ease-in-out, -webkit-box-shadow 0.2s ease-in-out;
        transition: border 0.2s ease-in-out, background 0.2s ease-in-out, -webkit-box-shadow 0.2s ease-in-out;
        transition: border 0.2s ease-in-out, background 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
        transition: border 0.2s ease-in-out, background 0.2s ease-in-out, box-shadow 0.2s ease-in-out, -webkit-box-shadow 0.2s ease-in-out;
    }
    .ghost{
        color: #495060;
        background-color: transparent;
        border-color: #dddee1;
    }
    .ghost:hover {
        color: #28b294;
        background-color: transparent;
        border-color: #28b294;
    }

</style>