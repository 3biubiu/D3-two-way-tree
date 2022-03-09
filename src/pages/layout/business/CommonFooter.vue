<template>
    <footer id="footer-bar">
        <!-- 底部 -->
        <p id="footer-copyright">
            © 2015 <a href="http://www.tanikawa.com/" target="_blank">Tanikawa.</a> Powered by <a href="http://www.xuannaer.com" target="_blank">xuannaer.com.hhhh</a>
        </p>
        <tis-right-pendant
            ref="rightPendant"
            :show-feedback="true"
            :upload-url="uploadUrl"
            :back-name="feedbackForm.username"
            :compaint-link="compaintLink"
            @submit-feedback="submitFeedback"
            @finish-upload="finishUpload"
            @handle-remove="handleRemove">
            </tis-right-pendant>
    </footer>
</template>
<script>
import $api from "@/api/index.js";
import utils from "@/utils";
import Cookie from 'js-cookie';
import config from "@/config.js";
export default {
    components:{
    },
    data() {
        return {
            feedbackForm:{   //问题反馈表单数据
                username:Cookie.get("username"),
                contact:"",
                url:"https://tis.xuannaer.com/index/admin_index",
                content:"",
                resource:[]
            },
            //划过消息图标时的显示
            showFeedback: false,
            compaintLink: config.compaintLink,
            uploadUrl: ''
        }
    },
    computed:{
    },
    watch: {
        showFeedback: function(newVal){
            if(newVal === true){
                this.$refs.rightPendant.$refs.feedbackUpload.fresh();
            }
        }
    },
    methods: {
        /*
        * 提交表单
        */
        submitFeedback(){
            // let status = true;
            // this.$refs.rightPendant.validate((valid)=>{
            //     status = status && valid;
            // });
            // if(status === false){
            //     return ;
            // }
            // this.feedbackForm.resource = this.$refs.feedbackUpload.getFileIds();

            let res = $api.saveProblemFeedback(this.feedbackForm);
            res.then(result=>{
              if (result.code == 200){
                  this.$TisMessage.success(反馈成功);
                  this.resetForm();
              }

            })
            this.showFeedback = false;
        },
        /**
        * (上传完成)更新上传文件数据
        * @param {Array} list 上传文件列表
        */
        finishUpload(list) {
            this.feedbackForm.resource = list;
        },
        /**
        * 删除
        * @param {object} file 文件
        */
        handleRemove(file) {
            this.$refs.rightPendant.$refs.feedbackUpload.deleteFile(file);
            this.$TisMessage.success('删除成功')
            this.feedbackForm.resource.splice(this.files.findIndex(item => item.id === file.id), 1);
        }
    },
    mounted() {
    }
};
</script>


<style scoped>
@import './common_footer.less';
</style>
