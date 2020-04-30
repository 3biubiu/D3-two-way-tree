<template>
    <footer id="footer-bar">
        <!-- 底部 -->
        <p id="footer-copyright">
            © 2015 <a href="http://www.tanikawa.com/" target="_blank">Tanikawa.</a> Powered by <a href="http://www.xuannaer.com" target="_blank">xuannaer.com.</a>
        </p>
        <!-- 右侧挂件 -->
        <ul id="footer-sidebar">
            <li id="b_code" class="sidebar-icon" @mouseover="showLink=true" @mouseleave="showLink=false">
                <a style="color:#fff">
                    <i class="fa fa-chain" style="font-size: 20px;"></i>
                    <!-- ten -->
				    <img src="@/assets/mms_common/layer_triangle@2x.png" />
                </a>
                <ul class="sidebar-login-ul" id="sidebar-login-ul" :class="{show:showLink}">
                    <li class="">
                        <a href="https://app.mokahr.com/login" target="_blank">
                            <div class="panel-menu">
                                <div class="panel-menu-icon icon-blue">
                                    <i class="fa fa-user-plus"></i>
                                </div>
                                <div class="panel-menu-title">
                                    <span>Moka招聘</span>
                                </div>
                            </div>
                        </a>
                    </li>
                    <li class="">
                        <a href="http://mail.zhaoshang.net/" target="_blank">
                            <div class="panel-menu">
                                <div class="panel-menu-icon icon-blue">
                                    <i class="fa fa-envelope"></i>
                                </div>
                                <div class="panel-menu-title">
                                    <span>企业邮箱</span>
                                </div>
                            </div>
                        </a>
                    </li>
                    <li class="">
                        <a href="https://mms.xuannaer.com/Index/aMoeBa.html" target="_blank">
                            <div class="panel-menu">
                                <div class="panel-menu-icon icon-blue">
                                    <i class="fa fa-area-chart"></i>
                                </div>
                                <div class="panel-menu-title">
                                    <span>数据决策系统</span>
                                </div>
                            </div>
                        </a>
                    </li>
                    <li class="">
                        <a href="https://mms.xuannaer.com/Index/sobotLogin.html" target="_blank">
                            <div class="panel-menu">
                                <div class="panel-menu-icon icon-purple">
                                    <i class="fa fa-headphones"></i>
                                </div>
                                <div class="panel-menu-title">
                                    <span>智齿客服</span>
                                </div>
                            </div>
                        </a>
                    </li>
                    <li class="">
                        <a href="https://mms.xuannaer.com/Index/fssManshang.html" target="_blank">
                            <div class="panel-menu">
                                <div class="panel-menu-icon icon-purple">
                                    <i class="fa fa-database"></i>
                                </div>
                                <div class="panel-menu-title">
                                    <span>财税服务平台</span>
                                </div>
                            </div>
                        </a>
                    </li>
                    <li class="">
                        <a href="https://mms.xuannaer.com/Index/pcsManshang.html" target="_blank">
                            <div class="panel-menu">
                                <div class="panel-menu-icon icon-purple">
                                    <i class="fa fa-balance-scale"></i>
                                </div>
                                <div class="panel-menu-title">
                                    <span>政策兑现平台</span>
                                </div>
                            </div>
                        </a>
                    </li>
                </ul>
            </li>

            <li v-if="isItemDetail" class="sidebar-icon" @click="movePage('card')">
                <a style="color:#fff">
                    <span>查看名片</span>
                    <i class="fa fa-credit-card" style="font-size: 20px;"></i>
                </a>
            </li>
            <li v-if="isItemDetail" class="sidebar-icon" @click="movePage('remark')">
                <a style="color:#fff">
                    <span>查看备注</span>
                    <i class="fa fa-rebel" style="font-size: 20px;"></i>
                </a>
            </li>

            <li id="b_code" class="sidebar-icon" @mouseover="showAppPhone=true" @mouseleave="showAppPhone=false">
                <a style="color:#fff">
                    <i class="fa fa-mobile" style="font-size: 20px;"></i>
                    <!-- ten -->
				    <img src="@/assets/mms_common/layer_triangle@2x.png" />
                </a>
                <ul class="dropdown-menu notifications-list messages-list" id="ewmbox" :class="{show:showAppPhone}">
                    <li class="item first-item erweimabox">
                            <h3>扫描二维码下载手机软件</h3>
                            <div class="erweimabody">
                                <img src="@/assets/mms_common/guanfang.png" id="ewm_android">
                                <p>选哪儿手机客户端</p>
                                <a href="http://zhushou.360.cn/detail/index/soft_id/3984165?recrefer=SE_D_%E9%80%89%E5%93%AA%E5%84%BF%E5%AE%98%E6%96%B9" target="_blank">
                                    <div class="android">Android版</div>
                                </a>
                                <a href="https://itunes.apple.com/cn/app/linkmore/id1374730033?mt=8" target="_blank">
                                    <div class="iphone">iPhone版</div>
                                </a>
                            </div>
                        </li>
                    <li class="item-footer">
                        <a href="https://mms.xuannaer.com/index/admin_index#">
                            你的工作站
                        </a>
                    </li>
                </ul>
            </li>
            <li id="b_callback" class="sidebar-icon" @click="clickFeedback">
                <a style="color:#fff">
                    <span>反馈问题</span>
                    <i class="fa fa-comment-o" style="font-size: 20px;"></i>
                </a>
            </li>
            <li id="b_complaint" class="sidebar-icon">
                <a :href="compaintLink" target="_blank" style="color:#fff">
                    <!-- <span>投诉</span> -->  <!-- ten -->
                    <span class="sidebar-complain">投诉</span>
                    <i class="fa fa-envelope-o" style="font-size: 20px;"></i>
                </a>
            </li>
            <li id="b_totop" class="sidebar-icon" @click="toTop">
                <a href="#" style="color:#fff">
                    <span>回到顶部</span>
                    <i class="fa fa-chevron-up" style="font-size: 20px;"></i>
                </a>
            </li>
        </ul>
        <!-- 右侧挂件-问题反馈弹窗 -->
        <div class="bc-content" id="bc-content" :class="{show:showFeedback}">
            <div class="bc-container">
                <h1>问题反馈<Icon type="md-close" :size="16" class="pull-right fa fa-times" @click="showFeedback=false"></Icon></h1>
                <Form class="feedback-form" ref="refFeedback" :model="feedbackForm" :rules="validateRules">
                    <Row :gutter="22">
                        <Col span="12">
                            <FormItem label="反馈人">
                                <Input v-model="feedbackForm.username"></Input>
                            </FormItem>
                        </Col>
                        <Col span="12">
                            <FormItem label="联系方式">
                                <Input v-model="feedbackForm.contact"></Input>
                            </FormItem>
                        </Col>
                    </Row>
                    <FormItem>
                        <label slot="label">
                            反馈网址
                            <label-tip :content="'(可填写多个网址，一行一个)'"></label-tip>
                        </label>
                        <Input type="textarea"  v-model="feedbackForm.url"></Input>
                    </FormItem>
                    <FormItem prop="content" label="反馈内容">
                        <Input type="textarea" v-model="feedbackForm.content" class="feedback" placeholder="请详细描述BUG的触发条件，或者提出建议的背景情况"></Input>
                    </FormItem>
                    <FormItem >
                        <label slot="label">
                            图片
                            <label-tip :content="'(请截取电脑屏幕全屏，涵盖网址信息，方便技术人员排查定位)'" :theme="{color: 'red'}"></label-tip>
                        </label>
                    </FormItem>
                    <div class="sinple-upload-wrapper">
                        <simple-upload
                            ref="feedbackUpload"
                            :c-my-dropzone="uploadOption.cMyDropzone"
                            :c-my-img="uploadOption.cMyImg"
                            :c-my-delete="uploadOption.cMyDelete"
                            :limit-type="['JPG','JPEG','PNG','PDF']">
                        </simple-upload>
                    </div>
                    <Row class="feedback-submit">
                        <Button class="feedback-submit-btn" @click="submitFeedback" type="primary">提交</Button>
                    </Row>
                </Form>
            </div>
        </div>
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
