
<template>
    <div class="main-header-con">
        <div class="main-header" ref="mainHeader">
            <div class="header-logo" ref="headerLogo">
                <a :href="address.logo"><img src="@/assets/mms_common/xnlogo.png" key="max-logo" /></a>
            </div>
            <div class="home-con" @click="clickHomeIcon" ref="homeCon">
               <i class="fa fa-home"></i>
            </div>
            <div class="navicon-con" @click="toggleClick">
                <a :style="{transform: 'rotateZ(' + (this.shrink ? '-90' : '0') + 'deg)'}" type="text">
                    <i class="fa fa-bars"></i>
                </a>
            </div>
            <div class="header-middle-con" style="width:auto;">
                <ul class="nav pull-left" ref="initNav" style="min-width:156px">
                    <li class="dropdown nav-li-hide" style="display:none;padding-left: 8px;" ref="navLiHide" @mouseover="showDropMenu" @mouseout="hideDropMenu">
                        <div class="dropdown-toggle" data-hover="dropdown" data-toggle="dropdown">
                            更多
                            <b class="caret"></b>
                        </div>
                        <ul class="dropdown-menu more" id="hideMenu" ref="hideMenu">
                            <template v-for="(item,index) in menuArray">
                                <li class="dropdown menu-li" v-show="power && headerPower(item.powerSatus)" :class="{'menu-active':(routerName==item.routerName||menuArray[index].choose)}" @click="changeMenu(index)">{{item.name}}</li>
                            </template>
                        </ul>
                    </li>
                </ul>
            </div>
            <div class="header-avator-con pull-right" ref="headerAvatorCon">
                <ul class="nav">
                    <!-- ten -->
                    <li class="dropdown" id="header-logo-10years">
                        <img src="@/assets/mms_common/header_icon_10year.png" style="width: 50px;"/>
                    </li>

                    <li class="dropdown" style="margin-right:2px">
                        <a :href="address.company"><span>单位：{{headerData.company?headerData.company.company:""}}</span></a>
                    </li>
                    <li class="dropdown">
                        <Poptip :options="{modifiers: {computeStyle:{gpuAcceleration: false,},preventOverflow :{boundariesElement: 'window'}},eventsEnabled:false}"  title="" content="content" placement="bottom" trigger="hover" width="460">
                            <a><i class="fa fa-search"></i>搜索</a>
                            <div slot="content" class="poptip-content" style="padding: 20px">
                                <Select v-model="keywordType" style="width: 80px;" class="select">
                                    <Option value="All">全部</Option>
                                    <Option value="Item">项目</Option>
                                    <Option value="Carrier">载体</Option>
                                    <Option value="Companies">单位</Option>
                                </Select>
                                <Input name="keyword" v-model="keyword" class="inp" :placeholder=placeholder style="width:260px;"></Input>

                                <Button type="success" @click="doSearch()">搜索</Button>
                            </div>
                        </Poptip>

                    </li>
                    <li class="dropdown" @click="showPersonCenter" style="margin-right:-1px">
                        <a style="padding-right:6px" :class="{'menu-active':routerName=='usercenter'}">
                            <i class="fa fa-user" style="margin:0 1.5px;margin-right:2px"></i>
                            {{headerData.info?headerData.info.username:""}}
                            <span class="count msgCount" v-if="headerData.info && headerData.info.status > 0">
                                {{headerData.info?headerData.info.status:''}}
                            </span>
                            <Icon type="md-arrow-dropdown" :size="16" style="margin-left:-4px;"/></a>
                        <ul class="dropdown-menu" v-show="personCenter">
                            <li>
                                <a :href="address.userCenter"><i class="fa fa-user"></i>用户中心<span class="count msgCount" v-if="headerData.info && headerData.info.status > 0">{{headerData.info?headerData.info.status:''}}</span></a>
                            </li>
                            <li>
                                <a :href="address.noAllMessage"><i class="fa fa-envelope-o" style="margin-right:-1px"></i>消息</a>
                            </li>
                            <li v-if="power.indexOf('SETTING') > -1">
                                <a :href="address.setting">
                                    <i class="fa fa-refresh"></i>
                                    <span>系统设置</span>
                                </a>
                            </li>
                        </ul>
                    </li>
                    <li class="dropdown" @mouseover="messagesShow" @mouseout="messagesHide">
                        <a href="#" style="position: relative;"><i class="fa fa-envelope-o" style="margin-right:0;"></i><span>消息</span><span v-if="headerData.info && headerData.info.notice > 0" class="count" style="right:0px">{{ headerData.info.notice}}</span></a>
                        <ul class="dropdown-menu notifications-list messages-list" ref="massgesWrapper">
                            <li class="item first-item" v-for="(item,index) in headerData.list" :key="index">
                                <a :href="item.path" v-if="item.type == 1">
                                    <img src="//img.xuannaer.com/static/MmsIndex/img/icon-03.jpg" alt="">
                                    <div class="content">
                                        <span class="content-headline wuweidu">{{item.title}}</span>
                                        <span class="content-text">{{item.content}}</span>
                                        <span class="time"><Icon  type="ios-time-outline"></Icon>{{item.dateline}}</span>
                                    </div>
                                </a>
                                <a :href="item.path" v-if="item.type == 2">
                                    <img src="//img.xuannaer.com/static/MmsIndex/img/icon-1.jpg" alt="">
                                    <div class="content">
                                        <span class="content-headline wuweidu">{{item.title}}</span>
                                        <span class="content-text">{{item.content}}</span>
                                        <span class="time"><Icon  type="ios-time-outline"></Icon>{{item.dateline}}</span>
                                    </div>
                                </a>
                            </li>
                            <li v-if="headerData.list && headerData.list.length == 0" class="item first-item">
                                <a :href="address.noAllMessage">
                                    <img src="//img.xuannaer.com/static/MmsIndex/img/icon-1.jpg" alt="">
                                    <div class="content">
                                        <span class="content-headline wuweidu">暂无未读消息</span>
                                        <span class="content-text"></span>
                                        <span class="time"></span>
                                    </div>
                                </a>
                            </li>
                            <li class="item-footer">
                                <a :href="address.noAllMessage">查看全部消息</a>
                            </li>
                        </ul>
                    </li>
                    <li class="dropdown" @click="showVideoSchool">
                        <a href="javascript:void(0)" class="btn dropdown-toggle" data-toggle="dropdown" style="margin-right:-2px;">
                            <i class="fa fa-folder-open" style="margin-right:-1px;"></i>学院<Icon type="md-arrow-dropdown" :size="16" style="margin-left:-4px;"/>
                        </a>
                        <ul class="dropdown-menu"v-show="videoSchool">
                            <li>
                                <a href="https://qa.tanikawa.com" target="_blank"><i class="fa fa-question-circle"></i>问答学院</a>
                            </li>
                            <li>
                                <a href="https://edu.tanikawa.com" target="_blank"><i class="fa fa-video-camera"></i>T-learning</a>
                            </li>
                            <li>
                                <a href="https://fm.tanikawa.com/" target="_blank"><i class="gcfm"></i>谷川电台</a>
                            </li>
                        </ul>
                    </li>
                    <li class="dropdown ">
                        <a  @click="modal1 = true" style="padding-right:10px"><i class="fa fa-power-off"></i><span>退出</span></a>
                    </li>
                </ul>
                <Modal v-model="modal1" title="确认退出" @on-ok="logout()">
                    <p>确定要退出系统吗？</p>
                </Modal>
            </div>
        </div>
    </div>
</template>

<script>
import $api from "@/api/index";
import utils from "@/utils";
import Cookie from 'js-cookie';
import menuArray from '@/static_data/menu_array.js';
import address from "@/static_data/address.js";
import config from "@/config.js";

    export default {
        props:["powerHeaderData"],
        data () {
            return {
                routerName:'index',//当前路由名
                menuList: [],//在左侧显示的列表
                menuArray: menuArray,//菜单数组
                address:address,
                shrink: false,//菜单收缩
                keywordType: 'All',//头部下拉搜素
                keyword: '',//头部关键字搜素
                allWidth :document.body.clientWidth,// 整体宽度
                headerLeftWidth:'',//左侧菜单宽度
                headerRightWidth:'',//右侧内容宽度
                picWidth:'',//头部logo宽度
                iconWidth:'', //图标宽度
                blankWidth:'', //窗口宽度
                personCenter:false,  //头部用户名点击展开下拉与否
                videoSchool:false,    //视频学员点击展开下拉与否
                headerData:{},     //头部的个人信息及消息提示及3条个人消息
                placeholder:'企业 标题 编号 电话 邮箱 微信',
                modal1: false,
            }
        },
        computed: {
            power(){
                return this.powerHeaderData;
            },
        },
        watch: {
            "$route"() {
                //计算菜单和菜单权限
                this.routerName = this.$route.path.split("/")[2];
                for(let i in this.menuArray){
                    if(this.menuArray[i].routerName == this.routerName){
                        this.menuList = this.menuArray[i].modular;
                        break;
                    }
                }
                //计算头部
                this.$nextTick(()=>{
                    this.initHeader();
                });
            },
            powerHeaderData:{
                handler(newVal,oldVal) {
                    this.$nextTick(()=>{
                        this.initHeader();
                    });
                },
                deep: true
            }
        },
        created () {
            // 头部和左侧侧边栏数据加载
            this.initData();
        },
        mounted () {
            //菜单数据处理
            this.routerName = this.$route.path.split("/")[2];
            for(let i in this.menuArray){
                if(this.menuArray[i].routerName == this.routerName){
                    this.menuList = this.menuArray[i].modular;
                    break;
                }
            }
            this.allWidth = document.body.clientWidth;

            //菜单样式处理
            window.onresize = () => {
                this.allWidth = document.body.clientWidth;
                this.resizeHeader();
                this.fixWindowHeight()
            };
            this.$nextTick(()=>{
                //自适应页面高度
                this.fixWindowHeight();
                if(window.addEventListener){
                    window.addEventListener('resize',this.fixWindowHeight());
                }else{
                    window.attachEvent('onresize',this.fixWindowHeight())
                }
            });
        },
        methods: {
            /**
             * 退出登录
             */
            logout(){
                window.location.href = "https://ums.xuannaer.com/auth/logout?redirectUrl=https%3A%2F%2Fmms.xuannaer.com";
            },
            doSearch() {
                let action = '';
                switch (this.keywordType) {
                    case 'All' :
                        action = 'all';
                        break;
                    case 'Item' :
                        action = 'item';
                        break;
                    case 'Carrier' :
                        action = 'carrier';
                        break;
                    case 'Companies' :
                        action = 'company';
                        break;
                }
                window.location.href = `${config.mmsHost}/GlobalSearch/${action}.html?kw=${this.keyword}&match=all`;
            },
            /*
                菜单权限展示
            */
            headerPower(powerSatus){
                let bool = true;
                if(powerSatus){
                    if(this.power.indexOf(powerSatus)==-1){
                        bool = false;
                    }
                }
                return bool;
            },
            /*
                初始化首页需要的数据：左侧未读条数，头部数据，权限数据。。。
            */
            async initData(){
                // 头部的个人信息及消息提示及3条个人消息
                this.headerData = await $api.getHeaderData();
                Cookie.set("username",this.headerData.info.username);
                Cookie.set("group",this.headerData.info.group);
                setTimeout(()=>{
                    this.initHeader();
                },300)
            },
            /*
                根据屏幕动态设置最小高度(为了footer永远处于document最底部)
            */
            fixWindowHeight(){
                let height = document.documentElement.clientHeight;
                this.$nextTick(()=>{
                    document.getElementById("content-wrapper").style.minHeight = (height - 53) + 'px';

                })
            },
            /*
                显示信息
            */
            messagesShow(){
                this.$refs.massgesWrapper.style.display = "block";
            },
            /*
                隐藏信息
            */
            messagesHide(){
                this.$refs.massgesWrapper.style.display = "none";
            },
            /*
                当菜单过多 有更多菜单时 显示下拉
            */
            showDropMenu(){
                this.$refs.hideMenu.style.display = "block";
            },
            /*
                当菜单过多 有更多菜单时 隐藏下拉
            */
            hideDropMenu(){
                this.$refs.hideMenu.style.display = "none";
            },
            /*
                展开头部右上角的姓名展开用户中心和消息与否
            */
            showPersonCenter(){
                this.personCenter = !this.personCenter;
            },
            /*
                展开头部右上角的姓名展开用户中心和消息与否
            */
            showVideoSchool(){
                this.videoSchool = !this.videoSchool;
            },
            /*
                * 切换路由
                *
                * @param {int} index 菜单数组里的索引
            */
            changeMenu(index){
                if (!this.menuArray[index].goUrlLocation && this.menuArray[index].modular) {
                    this.menuList = this.menuArray[index].modular;
                    this.$router.push({
                        name: this.menuList[0].menuList[0].name
                    });
                } else {
                    if (this.menuArray[index].url) {
                        location.href = this.menuArray[index].url;
                    }
                }
            },
            /*
                初始化头部
            */
            initHeader(){

                //这个是不得已执行两边，有时间回来重写这；
                this.resizeHeader();
                this.resizeHeader();
            },
            /*
                重新初始化头部菜单
            */
            resizeHeader(){
                this.$refs.hideMenu.html = '';
                this.$refs.navLiHide.html = '';
                this.allWidth = document.body.clientWidth;
                this.headerLeftWidth = this.$refs.initNav.clientWidth;
                this.headerRightWidth = this.$refs.headerAvatorCon.clientWidth;
                this.picWidth = this.$refs.headerLogo.clientWidth;
                this.iconWidth = this.$refs.homeCon.clientWidth;
                this.blankWidth = this.allWidth-this.headerLeftWidth-this.headerRightWidth-this.picWidth-this.iconWidth;
                //1. 把所有元素放到更多里
                let hasShowHeader = [];
                hasShowHeader = this.siblings(this.$refs.navLiHide);
                for (let i = hasShowHeader.length - 1; i >= 0; i--) {
                    this.$refs.hideMenu.insertBefore(hasShowHeader[i], this.$refs.hideMenu.childNodes[0] );
                }
                //2. 然后把该拿出来的数据拿出来
                do{
                    this.headerLeftWidth = this.$refs.initNav.clientWidth;

                    this.blankWidth = this.allWidth - this.headerLeftWidth - this.picWidth - this.iconWidth - this.headerRightWidth;
                    if( this.$refs.hideMenu.children.length > 0 ){
                        this.$refs.initNav.appendChild(this.$refs.hideMenu.firstChild );
                    }else{
                        break;
                    }
                }while(this.blankWidth > 200);
                this.$refs.initNav.appendChild(this.$refs.navLiHide);
                this.headerLeftWidth = this.$refs.initNav.clientWidth;
                this.blankWidth = this.allWidth - this.headerLeftWidth - this.picWidth - this.iconWidth - this.headerRightWidth;

                let hideLiNum = this.$refs.hideMenu.children.length;
                for (var i = hideLiNum - 1; i >= 0; i--) {
                    if (this.$refs.hideMenu.children[i].style.display != 'none') {
                        this.$refs.navLiHide.style.display = 'block';
                        return true;
                    }
                }
                this.$refs.navLiHide.style.display = 'none';
            },
            /*
                获取兄弟元素
            */
            siblings(elem){
                let nodes=[]; //定义一个数组，用来存elem的兄弟元素
                let previ=elem.previousSibling;
                while(previ){ //先取o的哥哥们 判断有没有上一个哥哥元素，如果有则往下执行 previ表示previousSibling
                    if(previ.nodeType===1){
                        nodes.push(previ);
                    }
                    previ=previ.previousSibling; //最后把上一个节点赋给previ
                }
                nodes.reverse(); //把顺序反转一下 这样元素的顺序就是按先后的了
                let nexts=elem.nextSibling; //再取elem的弟弟
                while(nexts){ //判断有没有下一个弟弟结点 nexts是nextSibling的意思
                    if(nexts.nodeType===1){
                        nodes.push(nexts);
                    }
                    nexts=nexts.nextSibling;
                }
                return nodes; //最后按从老大到老小的顺序，把这一组元素返回
            },
            /*
                菜单收缩控制
            */
            toggleClick () {
                this.shrink = !this.shrink;
                this.$emit("shrink-menu");
            },
            /*
                点击home图标
            */
            clickHomeIcon(){
                window.open(config.mmsHost);
            },
        }
    };
</script>


<style lang="less" scoped>
    @import "./header_menu.less";
</style>
