<template>
    <footer id="footer-bar">
        <!-- 底部 -->
        <p id="footer-copyright">
            © 2015 <a href="http://www.tanikawa.com/" target="_blank">Tanikawa.</a> Powered by <a href="http://www.xuannaer.com" target="_blank">xuannaer.com.</a>
        </p>

    </footer>
</template>
<script>
import $ from 'jquery'
import $api from "@/api/index.js";
import utils from "@/utils";
import Cookie from 'js-cookie';
import SimpleUpload from "@/components/common/upload/simple_upload/SimpleUpload";
import LabelTip from "@/components/common/label_tip/LabelTip.vue";
import config from "@/config.js";
export default {
    components:{
        SimpleUpload,
        LabelTip
    },
    data() {
        return {
            feedbackForm:{   //问题反馈表单数据
                username:Cookie.get("username"),
                contact:"",
                url:"https://mms.xuannaer.com/index/admin_index",
                content:"",
                resource:[]
            },
            itemDetailPage : false,
            //划过手机图标时的显示
            showAppPhone: false,
            showLink:false,   //滑过显示有招招聘，企业邮箱，数据决策系统，智齿客服链接
            //划过消息图标时的显示
            showFeedback: false,
            //问题反馈表单的验证
            validateRules: {
                content: [{ required: true, message: '请填写反馈内容'}]
            },
            //上传组件的样式定义
            uploadOption: {
                cMyDropzone:{
                    padding: '0 10px',
                    minHeight:'146px'
                },
                cMyImg: {
                    width: '50px',
                    height: '50px'
                },
                cMyDelete: {
                    lineHeight: '20px'
                }
            },
            compaintLink: config.compaintLink,
        }
    },
    computed:{
        /**
         * 返回当前页面是否是项目详情页
         * return {Boolean}
         */
        isItemDetail(){
            //获取路由name
            let name = this.$route.name;
            if(["item_detail"].indexOf(name) > -1){
                return true;
            }
            return false;
        }
    },
    watch: {
        showFeedback: function(newVal){
            if(newVal === true){
                this.$refs.feedbackUpload.fresh();
            }
        }
    },
    methods: {
        clickFeedback(){
            this.showFeedback = true;
            this.feedbackForm.url = window.location.href;
        },
        /*
        * 回到顶部
        */
        toTop(){
            this.$parent.$refs.pageBody.scrollTo(0, 0);
        },
        /*
        * 动画显示
        */
        changeWidth(ele, wid=100){
            $('#' + ele + ' span').animate({width:wid},0);
        },
        /*
        * 提交表单
        */
        submitFeedback(){
            let status = true;
            this.$refs.refFeedback.validate((valid)=>{
                status = status && valid;
            });
            if(status === false){
                return ;
            }
            this.feedbackForm.resource = this.$refs.feedbackUpload.getFileIds();

            let res = $api.saveProblemFeedback(this.feedbackForm);
            res.then(result=>{
              if (result.code == 200){
                  utils.notice('反馈成功','success')
              }
            })
            this.showFeedback = false;
        },
        /*
        * 重置表单
        */
        resetForm(){
            this.$refs.refFeedback.resetFields();
            this.feedbackForm.resource = [];
            this.feedbackForm.contact = undefined;
        },
        /**
         * 侧边栏快速定位事件
         * @param {String} type 快速定位类型card-名片remark-备注deal-成交
         */
        movePage(type){
            if(!type){
                return false;
            }
            this.$emit("item-detail-move",type);
        }
    },
    mounted() {
    }
};
</script>


<style scoped>
@import './common_footer.less';
</style>
<style >
    #bc-content .tkfile-fa{
        font-size: 1em !important;
    }
</style>
