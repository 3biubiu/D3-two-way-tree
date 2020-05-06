<template>
    <div class="main">
        <top-notification ref="topNotification" :msg="msg"></top-notification>
        <heade-menu ></heade-menu>
        <div class="sidebar-menu-con" :style="{width: shrink?'64px':'240px'}">
            <!-- <shrinkable-menu
                :shrink="shrink"
                :power="powerSiderData"
                :theme="menuTheme"
                :sub-num="sideBarNumber"
                :menu-list="menuList">
            </shrinkable-menu> -->
            <slide-bar></slide-bar>
        </div>
        <div class="single-page-con" id="js-main-content" ref="pageBody" :style="{marginLeft: shrink?'64px':'220px'}">
            <div class="single-page">
                <router-view ref="view"/>
            </div>
            <common-footer></common-footer>
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
    import TopNotification from '@/components/common/top_notification/TopNotification.vue';
    import ShrinkableMenu from './business/ShrinkableMenu.vue';
    import menuArray from '@/static_data/menu_array.js';
    import CommonFooter from './business/CommonFooter.vue';
    import HeadeMenu from "./business/head_menu/HeadMenu";
    import SlideBar from "./business/slide_bar/SlideBar";
    import $api from "@/api/index.js";
    import utils from "@/utils";
    import Cookie from 'js-cookie';
    import Config from "@/config";
    import {mapState,mapActions,mapGetters,createNamespacedHelpers} from 'vuex'
    const mmsCommon = createNamespacedHelpers('mmsCommon')
    export default {
        components: {
            ShrinkableMenu,
            CommonFooter,
            TopNotification,
            HeadeMenu,
            SlideBar
        },
        data () {
            return {
                msg:'您当前的浏览器版本过低，为了保证您能正常使用本系统的全部功能，推荐您下载最新版的360浏览器、Chrome浏览器或QQ浏览器',
                routerName:'index',//当前路由名
                menuList: [],//在左侧显示的列表
                menuArray: menuArray,//菜单数组
                shrink: false,//菜单收缩
                menuTheme:'dark',//菜单主题
                powerSiderData:[],  // 侧边栏权限数据
                powerHeaderData:[],  //头部权限数据
                ucmsOn: false,
                isInternalUser: false,//灰度发布用户
                ucmsIframeSrc: '',//续用户中心生命周期
                ucmsIfameStyle: {
                    display: 'none'
                }
            }
        },
        computed: {
            ...mmsCommon.mapGetters(["sideBarNumber","dealLeftFieldTips"]),
        },
        watch: {
            "$route"() {
                this.watchRouterName();
            }
        },
        created () {
            this.getBrowser();
            this.initData();
            // 将 谷川币 的接口地址 存到cookie里
            Cookie.set('coinApi', Config.currencyApi);
            Cookie.set('coinWs', Config.currencyWs);
        },
        mounted () {
            this.watchRouterName();
            this.getIframeSrc();
            this.ucmsIframeEvent();
        },
        methods: {
            /*
                计算菜单和菜单权限：监听路由，改变routerName，menuList
            */
            watchRouterName(){
                this.routerName = this.$route.path.split("/")[2];
                for(let i in this.menuArray){
                    if(this.menuArray[i].routerName == this.routerName){
                        this.menuList = this.menuArray[i].modular;
                        break;
                    }
                }
            },
            /*
                菜单收缩控制
            */
            shrinkMenu(){
                this.shrink = !this.shrink;
            },
            /*
                初始化layout数据：左侧未读条数，头部数据，权限数据。。。
            */
            async initData(){
                this.saveSideBarNumber();
                this.saveDealLeftFieldTips();
                // 首页头部和侧边栏的模块展示权限
                let power = await $api.getPowerData();
                this.powerHeaderData = power.module;
                let HR = power.HR!=undefined || power.HR!=null?power.HR:[];
                let DEAL = power.DEAL!=undefined || power.DEAL!=null?power.DEAL:[];
                let INDUSTRY = power.INDUSTRY!=undefined || power.INDUSTRY!=null?power.INDUSTRY:[];
                let TCS = power.tcs!=undefined || power.tcs!=null?power.tcs:[];
                this.powerSiderData = [...HR,...DEAL,...INDUSTRY,...TCS];
                console.log(this.powerSiderData)
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
            ...mmsCommon.mapActions([ 'saveSideBarNumber','saveDealLeftFieldTips'])
        }
    };
</script>
<style lang="less" scoped>
    @import "./layout.less";
</style>

