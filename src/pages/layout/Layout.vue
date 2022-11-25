<template>
    <div class="main">
        <header-menu
            :powerHeaderData="headerPower"
            :commonHeaderUrl="commonHeaderUrl"
            :routerName="routerName"
            :systemName="systemName"
            @get-name="drawName"
            @shrink-menu="shrinkMenu"
            >
        </header-menu>
        <shrinkable-menu
            :systemName="systemName"
            :routerName="routerName"
            :left-tips="leftTips"
            :power="userPower"
            ></shrinkable-menu>
        <div class="single-page-con" id="js-main-content"  ref="pageBody" :style="{marginLeft: shrink?'64px':'220px'}">
            <div class="single-page" >
                <router-view ref="view"/>
                <!-- 待补充 配合菜单设置方法 -->
                <water-mark ref="waterMark"></water-mark>

            </div>
            <common-footer ></common-footer>
            <tis-right-pendant
                ref="rightPendant"
                :open-status="false"
                :compaint-link="compaintLink">
            </tis-right-pendant>
        </div>
        <div v-if="ucmsOn">
            <div v-if="!isInternalUser" class="user-login-logout">
                <iframe v-if="!isInternalUser" :src="ucmsIframeSrc" style="display: none"></iframe>
                <iframe v-if="isInternalUser" :src="ucmsIframeSrc" :style="ucmsIfameStyle"></iframe>
            </div>
        </div>
    </div>
</template>
<script>
    // import ShrinkAbleMenu from './business/ShrinkableMenu.vue';
    import WaterMark from '@/components/watermark/Watermark.vue';
    import $api from "@/api/index.js";
    import utils from "@/utils";
    import Cookie from 'js-cookie';
    import Config from "@/config";
    import {mapState,mapActions,mapGetters,createNamespacedHelpers} from 'vuex'
    const mmsCommon = createNamespacedHelpers('mmsCommon')
    export default {
        components: {
            WaterMark
        },
        data () {
            return {
                commonHeaderUrl: Config.apiUrl + '/system/header-info',
                routerName:'test',//当前路由名
                systemName:'test',//当前路由名
                leftTips:{},// 未读消息数对象
                menuList: [],//在左侧显示的列表
                menuTitle: '',//在左侧显示的列表
                shrink: false,//菜单收缩
                menuTheme:'dark',//菜单主题
                // powerSiderData:[],  // 侧边栏权限数据
                // powerHeaderData:[],  //头部权限数据
                ucmsOn: false,
                isInternalUser: false,//灰度发布用户
                ucmsIframeSrc: '',//续用户中心生命周期
                ucmsIfameStyle: {
                    display: 'none'
                },
                indexClick:-1,//搜索弹窗点击的选项索引
                compaintLink: Config.compaintLink,
                // leftList:{}
            }
        },
        computed: {
            ...mmsCommon.mapGetters(["sideBarNumber","headerPower", "userPower","headerPower", "userPower"]),
        },
        watch: {},
        created () {
            // this.getBrowser();
            // this.initData();
            // 将 谷川币 的接口地址 存到cookie里
            Cookie.set('coinApi', Config.currencyApi);
            Cookie.set('coinWs', Config.currencyWs);
        },
        mounted () {
            this.getIframeSrc();
            this.ucmsIframeEvent();
        },
        methods: {
            /**
             * 画水印图
             */
            drawName(){
                this.$refs.waterMark.againImg(Cookie.get('username'))
            },
            /**
             * 菜单收缩控制
             */
            shrinkMenu(shrink){
                this.shrink = shrink;
                // //保证产业系统瀑布流自适应事件自动响应
                // this.$nextTick(()=>{
                //     window.dispatchEvent(new Event('resize'));
                // });
            },
            /*
                初始化layout数据：左侧未读条数，头部数据，权限数据。。。
            */
            async initData(){
                this.saveSideBarNumber();
            },
            /*
                判断浏览器版本并作出提示
            */
            getBrowser(){
                let version = utils.getBrowserVersion();
                let _self = this;
                if(version === "IE6" ||version === "IE7" || version === "IE8" || version === "IE9" || version === "IE10" || version === "IE11" || version === "IE"){
                    this.$nextTick(()=>{
                        _self.$refs.topNotification.show();
                    });
                }
            },
            //获取用户中心iframe的src
            getIframeSrc: function(){
                $api.getIframeSrc().then(res => {
                    this.ucmsOn = res.ucmsOn;
                    this.isInternalUser = res.isInternalUser;
                    this.ucmsIframeSrc = res.ucmsIframeSrc;
                });
            },
            /**
            * 监听用户中心message事件，触发时显示
            */
            ucmsIframeEvent(){
                let _this = this;
                window.addEventListener('message', function (event) {
                    if (event.data == 'logout') {
                        _this.ucmsIfameStyle = {
                            display: 'block',
                            position: 'absolute',
                            top: '0px',
                            width: '100%',
                            height: '100%',
                            zIndex: '100',
                            border: 'none'
                        };
                    }
                }, false);
            },
            /*
            * 左侧菜单未读消息
            */
            ...mmsCommon.mapActions([ 'saveSideBarNumber']),
            
        }
    };
</script>
<style lang="less" scoped>
    @import "./layout.less";
    .single-page-con.active{
        margin-left:0px !important;
    }
</style>

