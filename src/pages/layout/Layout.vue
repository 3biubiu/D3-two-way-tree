<template>
    <div class="main">
        <!-- <top-notification ref="topNotification" :msg="msg"></top-notification> -->
        <header-menu
            routerName="test"
            >
        </header-menu>
        <!-- <div class="sidebar-menu-con" :style="{width: shrink?'64px':'240px'}">
            <slide-bar 
                :menu-list="menuList" 
                :menu-title="menuTitle"  
                @hide-drop-down="hideDrop" 
                :shrink="shrink"
                :power="powerSiderData">
            </slide-bar> -->
            <!-- <shrink-able-Menu 
                :menu-list="menuList"
                :menu-title="menuTitle"
                @hide-drop-down="hideDrop" 
                :shrink="shrink"
                :power="powerSiderData"
            ></shrink-able-Menu> -->
        <!-- </div> -->
        <shrinkable-menu routerName="test"></shrinkable-menu>
        <div class="single-page-con" id="js-main-content"  ref="pageBody" :style="{marginLeft: shrink?'64px':'220px',minHeight:heights+'px'}">
            <div class="single-page" >
                <div class="search-mask" :style="{'height':heights+'px'}" v-if="isShowSelect">
                    <div class="search-top">
                        <div class="search-type">
                            <p :class="{'active':index == type}" v-for="(item,index) in typeArr" :key="index" @click="changeSearchType(index)">{{item.name}}</p>
                        </div>
                        <Input type="text" class="menu-search-input" placeholder="企业 编号 电话 姓名 联系方式 备注 介绍" />
                        <Button type="primary" class="menu-search-button" @click="search">搜索</Button>
                    </div>
                    <div class="search-bot-mask" :style="{'height':maskHeight+'px'}" @click="hideSelect"></div>
                </div>
                <router-view ref="view"/>
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
    import menuArray from '@/static_data/menu_array.js';
    // import CommonFooter from './business/CommonFooter.vue';
    // import HeadMenu from "./business/head_menu/HeadMenu";
    // import SlideBar from "./business/slide_bar/SlideBar";
    import $api from "@/api/index.js";
    import utils from "@/utils";
    import Cookie from 'js-cookie';
    import Config from "@/config";
    import {mapState,mapActions,mapGetters,createNamespacedHelpers} from 'vuex'
    const mmsCommon = createNamespacedHelpers('mmsCommon')
    export default {
        components: {
            // ShrinkAbleMenu,
            // CommonFooter,
            // TopNotification,
            // HeadMenu,
            // SlideBar,
        },
        data () {
            return {
                msg:'您当前的浏览器版本过低，为了保证您能正常使用本系统的全部功能，推荐您下载最新版的360浏览器、Chrome浏览器或QQ浏览器',
                routerName:'examples',//当前路由名
                menuList: [],//在左侧显示的列表
                menuTitle: '',//在左侧显示的列表
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
                },
                heights:0,//搜索的高度
                maskHeight:0,//遮罩层的高度
                isShowSelect:false,
                type:0,
                typeArr:[
                    {
                        name:'全部',
                        type:'1'
                    },
                    {
                        name:'项目',
                        type:'2'
                    },
                    {
                        name:'载体',
                        type:'3'
                    },
                ],
                routerName:'exam',//当前路由名

                indexClick:-1,//搜索弹窗点击的选项索引
                compaintLink: Config.compaintLink,
                // leftList:{}
            }
        },
        computed: {
            ...mmsCommon.mapGetters(["sideBarNumber","dealLeftFieldTips"]),
        },
        watch: {
            $route() {
                this.watchRouterName();
                console.log('路由变化')
                this.routerName = this.$route.path.split("/")[1];
                for(let i in this.menuArray){
                    if(this.menuArray[i].routerName == this.routerName){
                        this.menuList = this.menuArray[i].modular;
                        break;
                    }
                }
            },
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
            this.height();
        },
        methods: {
            /*
                计算菜单和菜单权限：监听路由，改变routerName，menuList
            */
            watchRouterName(){
                // this.routerName = this.$route.path.split("/")[1];
                // this.routerName = this.$route.matched[0].name;
                // console.log(this.routerName)
                for(let i in this.menuArray){
                    if((this.menuArray[i].routerName == this.routerName) && this.menuArray[i].modular){
                        this.menuList = this.menuArray[i].modular[0].menuList;
                        this.menuTitle = this.menuArray[i].modular[0].title;
                        break;
                    }else if((this.menuArray[i].routerName == this.routerName) && !this.menuArray[i].modular){
                        let sidebarMenuCon = document.getElementsByClassName("sidebar-menu-con")[0];
                        let singlepageCon = document.getElementsByClassName("single-page-con")[0];
                        sidebarMenuCon.style.display = "none";
                        singlepageCon.style.marginLeft = 0; //内容铺满整个宽度
                        this.$refs.head.isShowLeft = false; //删除收缩功能的小图标 
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
                // this.saveDealLeftFieldTips();
                // 首页头部和侧边栏的模块展示权限
                let power = await $api.getPowerData();
                this.powerHeaderData = power.module;
                let HR = power.HR!=undefined || power.HR!=null?power.HR:[];
                let DEAL = power.DEAL!=undefined || power.DEAL!=null?power.DEAL:[];
                let INDUSTRY = power.INDUSTRY!=undefined || power.INDUSTRY!=null?power.INDUSTRY:[];
                let TCS = power.tcs!=undefined || power.tcs!=null?power.tcs:[];
                this.powerSiderData = [...HR,...DEAL,...INDUSTRY,...TCS];
                // console.log(this.powerSiderData ,this.powerHeaderData)

                // 根据接口的权限数据去展示左侧栏（如果根据menuArray完整列表没有意义）
                // let leftList = this.menuArray.filter(item => this.powerHeaderData.indexOf(item.powerSatus) > -1)
                // this.menuList = leftList
                // console.log(this.menuList)
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
            open(){
                this.shrink = !this.shrink
            },
             /**
            * 隐藏头部下拉
            */
            hideDrop(){
                this.$refs.head.hideDropDown();  
                this.isShowSelect = false;             
            },
             /**
            * 赋值搜索弹窗的高度
            */
            height(){
                let main=document.getElementsByClassName('main')
                this.heights = main[0].offsetHeight - 50;
                this.maskHeight = this.heights -176
            },
             /**
            * 显示搜索弹窗
            */
            showSelect(){
                this.isShowSelect = !this.isShowSelect;
            },
            /**
            * 关闭搜索弹窗
            */
            hideSelect(){
                this.isShowSelect = false;
            },
            /**
            * 切换搜索类型
            */
            changeSearchType(index){
                this.type = index;
                this.indexClick = index;
            },
            /**
            * 点击搜索
            */
            search(){
                this.isShowSelect = false;
                if(this.indexClick==0){
                    this.$router.push('/examples/page')
                }else if(this.indexClick == 1){
                    this.$router.push('/examples/Table')
                }else if(this.indexClick == 2){
                    this.$router.push('/examples/radio')
                }
            },
            
        }
    };
</script>
<style lang="less" scoped>
    @import "./layout.less";
    .single-page-con.active{
        margin-left:0px !important;
    }
</style>

