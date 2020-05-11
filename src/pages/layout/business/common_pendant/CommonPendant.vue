<template>
    <div class="common-pendant">
        <ul class="pendant-ul">
            <li class="pendant-li" @mouseover="showPendant"  @mouseleave="hidePendant" >
                <i class="fa fa-chain"></i>
                <img class="first-pendant-arrow" src="@/assets/mms_common/layer_triangle@2x.png" alt="">
                <div class="slide-box">
                    <ul class="sidebar-login-ul" v-show="isShowPendant" >
                        <li>
                            <a href="#">
                                <div class="pendant-line icon-blue"><i class="fa fa-user-plus"></i></div>
                                <span>Moka招聘</span>
                            </a>
                        </li>
                        <li>
                            <a href="#"> 
                                <div class="pendant-line icon-green"><i class="fa fa-envelope"></i></div>
                                <span>企业邮箱</span>
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <div class="pendant-line icon-red"><i class="fa fa-area-chart"></i></div>
                                <span>数据决策系统</span>
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <div class="pendant-line icon-orange"><i class="fa fa-headphones"></i></div>
                                <span>智齿客服</span>
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <div class="pendant-line icon-grape"><i class="fa fa-database"></i></div>
                                <span>财税服务平台</span>
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <div class="pendant-line icon-blue"><i class="fa fa-balance-scale"></i></div>
                                <span>政策兑现平台</span>
                            </a>
                        </li>
                    </ul>
                </div>
            </li>
            <li  class="pendant-li"  @mouseover="showCode"  @mouseout="hideCode" >
                <i class="fa fa-mobile"></i>
                <img class="first-pendant-arrow" src="@/assets/mms_common/layer_triangle@2x.png" alt="">
                <div class="empty"></div>
                <div class="pendant-phone" v-show="isShowCode" >
                    <p class="pendant-phone-title">扫描二维码下载手机软件</p>
                    <div class="pendant-phone-cont">
                        <img src="@/assets/mms_common/guanfang.png" alt="">
                        <div class="pendant-cont-right">
                            <p>选哪儿手机客户端</p>
                            <a href="#" class="android-icon active">Android版</a>
                            <a href="#"  class="iphone-icon">iPhone版</a>
                        </div>
                    </div>
                    <a href="#" class="pendant-station">你的工作站</a>
                </div>
            </li>
            <li  class="pendant-li" @click="complaint" >
                <span class="pendant-li-span" >反馈问题</span>
                <i class="fa fa-comment-o"></i>
            </li>
            <li  class="pendant-li">
               <a :href="compaintLink" target="_blank">
                    <span  class="pendant-li-span sidebar-complain" >投诉</span>
                    <i class="fa fa-envelope-o"></i>
               </a>
            </li>
            <li  class="pendant-li" @click="toTop">
                <span  class="pendant-li-span" >回到顶部</span>
                <i class="fa fa-chevron-up"></i>
            </li>
        </ul>
        <div class="form-wrapper" v-show="showForm" >
            <div class="form-box">
                <p>问题反馈<Icon type="md-close" :size="16" class="pull-right fa fa-times" @click="showForm=false"></Icon></p>
                <Form class="feedback-form" ref="refFeedback" :model="submitData" :rules="validateRules">
                    <Row :gutter="16">
                        <Col span="12">
                            <FormItem label="反馈人">
                                <Input v-model="submitData.username" />
                            </FormItem>
                        </Col>
                        <Col span="12">
                            <FormItem label="联系方式">
                                <Input v-model="submitData.contact" />
                            </FormItem>
                        </Col>
                    </Row>
                    <FormItem>
                        <label slot="label">
                            反馈网址
                            <label-tip :content="'(可填写多个网址，一行一个)'"></label-tip>
                        </label>
                        <Input type="textarea"  v-model="submitData.url" />
                    </FormItem>
                    <FormItem prop="content" label="反馈内容">
                        <textarea v-model="submitData.content" class="form-text" placeholder="请详细描述BUG的触发条件，或者提出建议的背景情况"></textarea>
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
                    <Row class="form-submit">
                        <Button class="form-submit-btn" @click="submitForm" type="primary">提交</Button>
                    </Row>
                </Form>
            </div>
        </div>
    </div>
</template>
<script>
import $ from 'jquery'
import config from "@/config.js";
import $api from "@/api/index.js";
import utils from "@/utils";
import Cookie from 'js-cookie';
import SimpleUpload from "@/components/common/upload/simple_upload/SimpleUpload";
import LabelTip from "@/components/common/label_tip/LabelTip.vue";
export default {
    components:{
        SimpleUpload,
        LabelTip
    },
    data() {
        return {
            isShowPendant:false,
            isShowCode:false,
            compaintLink: config.compaintLink,
            submitData:{   //问题反馈表单数据
                username:Cookie.get("username"),
                contact:"",
                url:"https://mms.xuannaer.com/index/admin_index",
                content:"",
                resource:[]
            },
            showForm: false,
            validateRules: {
                content: [{ required: true, message: '请填写反馈内容'}]
            },
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
            gotop: false
        }
    },
    methods:{
         /**
        * 点击显示列表
        * @author liluyao & 2020-5-6 20:11:09
        */
        showPendant(){
            this.isShowPendant = true;
        },
         /**
        * 点击隐藏列表
        * @author liluyao & 2020-5-6 20:11:21
        */
        hidePendant(){
             this.isShowPendant = false;
        },
         /**
        * 点击显示code
        * @author liluyao & 2020-5-6 20:56:43
        */
        showCode(){
            this.isShowCode = true;
        },
         /**
        * 点击隐藏code
        * @author liluyao & 2020-5-6 20:57:12
        */
        hideCode(){
            this.isShowCode = false;
        },
         /**
        * 反馈问题
        * @author liluyao & 2020-5-6 22:49:31
        */
        complaint(){
            this.showForm = true;
            this.submitData.url = window.location.href;
        },
         /**
        * 提交
        * @author liluyao & 2020-5-8 08:49:19
        */
        submitForm(){

        },
        /**
        * 滚动
        * @author liluyao & 2020-5-6 20:11:34
        * @param {object} e 事件对象
        */
        handleScroll(e) {
            let scrolltop = e.target.scrollTop;
            scrolltop > 0 ? (this.gotop = true) : (this.gotop = false);
        },
        /**
        * 回到顶部
        * @author liluyao & 2020-5-6 20:11:34
        */
        toTop() {
            let top = document.documentElement.scrollTop || document.body.scrollTop;
            // 实现滚动效果 
            const timeTop = setInterval(() => {
                document.body.scrollTop = document.documentElement.scrollTop = top -= 50;
                if (top <= 0) {
                    clearInterval(timeTop);
                }
            }, 10);
        },
    },
    mounted(){
         window.addEventListener("scroll", this.handleScroll, true);
    }
}
</script>
<style lang='less' scoped>
@import './common_pendant.less';
</style>
