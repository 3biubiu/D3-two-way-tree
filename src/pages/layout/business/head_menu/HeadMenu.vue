<template>
<div class="head-menu-wrapper">
    <div class="menu-head clearfix" >
        <div class="menu-head-left">
            <a :href="address.logo" class="menu-logo" ref="headerLogo" @click="goOut"> 
                <img src="@/assets/mms_common/xnlogo.png" alt="">
            </a>
            <a href="#" class="menu-home-icon" @click="goIndex" ref="homeCon">
                <i  class="fa fa-home menu-head-home"></i>
            </a>
            <i class="fa fa-bars menu-head-home" @click="open"></i>
        </div>
        <ul class="nav pull-left menu-head-center dropdown clearfix" ref="initNav" @click="hideSearch">
            <li class="dropdown more-li" style="display:none;" ref="navLiHide" @mouseover="showDropMenu" @mouseout="hideDropMenu">
                <div class="dropdown-toggle" data-hover="dropdown" data-toggle="dropdown">
                    <a href="#">更多<i  class="menu-icon-down"></i></a>
                </div>
                <ul class="dropdown-menu more" id="hideMenu" ref="hideMenu">
                    <template v-for="(item,index) in menuArray">
                        <!-- <li class="drop-li " v-show="power && headerPower(item.powerSatus)" :class="{'active':item.routerName == activeName}" @click ="showIndex(index)"><a href="#" >{{item.name}}</a></li> -->
                        <li class="drop-li" v-show="power" :class="{'active':item.routerName == activeName}" @click ="showIndex(index)" :key="item.url"><a href="#" >{{item.name}}</a></li>
                    </template>
                </ul>
            </li>
        </ul>
         <!-- <div class="empty-box" @click="emptyClick"></div> -->
        <ul class="menu-head-right dropdown" ref="rightHead">
            <!-- <li @click="goSelect">
                <a class="company-href" href="#">单位：选哪儿官方</a>
            </li> -->
            <li @click="showSelect">
                <div class="menu-search clearfix">
                    <i class="fa fa-search"></i>搜索
                </div>
            </li>
            <li @mouseover="showUser" @mouseout="hideUser" :class="{'active':userShow}">
                <div class="clearfix menu-user list-li" >
                    <!-- 写死的名字记得删掉，解开下面的注释 -->
                    <i class="fa fa-user menu-user-icon"></i>李璐瑶
                    <!-- {{userName}} -->
                    <i class="caret"></i>
                    <span class=" msg-count  menu-user-icon" :class="{'count':userMess >99}">{{userMess >99 ?'99+':userMess}}</span>
                </div>
                <div class="menu-name-wrapper" v-show="isShowUser" >
                    <a href="#">
                        <i class="fa fa-user menu-user"></i>用户中心
                        <span class="msg-counts" :class="{'count':userMess >99}">{{userMess >99 ?'99+':userMess}}</span>
                    </a>
                    <a href="#">
                        <i class="fa fa-envelope-o menu-user menu-mess"></i>消息
                    </a>
                </div>
            </li>
            <li @mouseover="showMessage" @mouseout="hideMessage">
                <div class="clearfix">
                    <i class="fa fa-envelope-o"></i>消息
                    <span class=" msg-count" :class="{'count':schoolMess >99}">{{schoolMess >99 ?'99+':schoolMess}}</span>
                </div>
                <div class="menu-mess-wrapper" v-show="isShowMessage">
                    <a href="#" class="mess-list">
                       <img class="mess-type" src="@/assets/mms_common/head_message.jpg" alt=""> 
                       <div class="mess-cont">
                            <p>暂无未读消息</p>
                            <p>鼓风机时发生纠纷很舒服滑动事件</p>
                       </div>
                       <div class="mess-time">
                           <i class="fa fa-clock-o mess-top"></i>2020-02-02 15:55
                       </div>
                    </a>
                    <a href="#" class="old-mess">查看历史消息</a>
                </div>
            </li>
            <li  @mouseover="showSchool" @mouseout="hideSchool" :class="{'active':userSchool}">
                <div class="clearfix list-li menu-school" >
                    <i class="fa fa-folder-open menu-school-icon" ></i>学院
                    <i class="caret"></i>
                </div>
                <div class="menu-name-wrapper menu-name-left" v-show="isShowSchool">
                    <a href="#">
                        <i class="fa fa-question-circle  menu-user menu-mess"></i>问答学院
                    </a>
                    <a href="#">
                        <i class="fa fa-video-camera  menu-user menu-mess"></i>T-learning
                    </a>
                    <a href="#">
                        <i class="gcfm  menu-user menu-mess menu-fm"></i>谷川电台
                    </a>
                </div>
            </li>
            <li>
                <div class="clearfix" @click="signOut">
                    <i class="fa fa-power-off"></i>退出
                </div>
            </li>
        </ul>
        <Modal v-model="showModal" width="400" :closable="false">
            <p slot="header" >
                <Icon size="20" color="#ff9900" type="ios-information-circle"></Icon>
                <span>确认退出</span>
            </p>
            <div>
                <p>确定要退出系统吗？</p>
            </div>
            <div slot="footer">
                <Button @click="cancelLogin">取消</Button>
                <Button type="primary" @click="okLogin">确定</Button>
            </div>
        </Modal> 
    </div>
</div>
</template>
<script>
import Cookie from 'js-cookie';
import menuArray from '@/static_data/menu_array.js';
import address from "@/static_data/address.js";
import config from "@/config.js";
export default {
    props:{
        power:{
            type:Array,
            default:[]
        }
    },
    data() {
        return {
            isShowUser:false,//用户
            isShowSchool:false,//学院
            isOut:false,//退出
            isShowMessage:false,//消息
            userShow:false,//用户背景色
            userSchool:false,//学院背景色
            userName:Cookie.get("username"),
            userMess:100,//用户消息个数
            schoolMess:88,//学院消息个数
            showModal:false,
            autoWidth:0,
            menuArray:menuArray,
            menuHead:[],
            activeName : 'index',
            moreArr:[],//更多的数据
            address:address,
            allWidth :document.body.clientWidth,// 整体宽度
            headerLeftWidth:'',//左侧菜单宽度
            headerRightWidth:'',//右侧内容宽度
            picWidth:'',//头部logo宽度
            iconWidth:'', //图标宽度
            blankWidth:'', //窗口宽度
            isShowSelect:false//是否显示搜索框
        }
    },
    watch: {
        "$route"() {
            //计算菜单和菜单权限
            this.activeName = this.$route.path.split("/")[1];
            //计算头部
            this.$nextTick(()=>{
                this.initHeader();
            });
        }
    },
    methods:{
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
        * 切换路由
        * @param {int} index 菜单数组里的索引
        */
        showIndex(index){
            if (!this.menuArray[index].goUrlLocation && this.menuArray[index].modular) {
                let menuList = this.menuArray[index].modular;
                this.$router.push({
                    name: menuList[0].menuList[0].name
                });
            } else {
                if (this.menuArray[index].url) {
                    location.href = this.menuArray[index].url;
                }
            }
        },
         /**
        * 点击显示搜索
        */
        showSelect(){
            this.$emit('show-select')
        },
         /**
        * 显示用户操作
        */
        showUser(){
            this.isShowUser = true;
            this.isShowSchool = false;
            this.userShow = true;
            this.$parent.isShowSelect = false
        },
         /**
        * 显示学院操作
        */
        showSchool(){
            this.userSchool =true
            this.isShowUser = false;
            this.isShowSchool = true;
            this.$parent.isShowSelect = false
        },
        /**
         * 隐藏学院
         */
        hideSchool(){
            this.isShowSchool = false;
        },
        /**
        * 显示消息弹窗
        */
        showMessage(){
            this.isShowMessage = true;
        },
        /**
        * 隐藏消息弹窗
        */
        hideMessage(){
            this.isShowMessage = false;
        },
        /**
         * 隐藏用户弹窗
         */
        hideUser(){
            this.isShowUser = false;
        },
        /**
        * 左侧菜单收起
        */
        open(){
            this.$emit('open')
            this.$parent.isShowSelect= false;
        },
         /**
        * 隐藏头部下拉
        */
        hideDropDown(){
            this.isShowUser = false;
            this.isShowSchool = false;
        },
         /**
        * 退 出
        */
        signOut () {
            this.showModal = true;
            this.$parent.isShowSelect = false

        },
         /**
        * 点击取消
        */
        cancelLogin(){
            this.showModal = false;
        },
         /**
        * 点击确定
        */
        okLogin(){
            this.showModal = false;
        },
        /*
        * 菜单权限展示
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
         /**
        * 初始化
        */
        init(){
            let that = this;
            let user = document.getElementsByClassName('menu-user')[0]
            let userIcon = document.getElementsByClassName('menu-user-icon')[0]
            let school = document.getElementsByClassName('menu-school')[0]
            let schoolIcon = document.getElementsByClassName('menu-school-icon')[0]
            document.addEventListener('click', function(e) {
                if(e.target !== user && e.target !== userIcon){
                    that.isShowUser = false;
                    that.userShow = false;
                }
                if(e.target !== school && e.target !== schoolIcon ){
                    that.isShowSchool = false;
                    that.userSchool = false;
                }
            })
        },
        /**
         * 删减头部菜单个数
         */
        initHead(){
            
            // 计算出来的长度
            let length = parseInt(this.autoWidth/55);
            // 菜单的长度
            let menuLength = this.menuHead.length+1
            for(let key in this.menuHead){
                if(length < menuLength){
                    let num = menuLength - length;
                    this.menuHead.splice(length)
                }
            }     
        },
        /**
         * 回到首页
         */
        goIndex(){
            this.$parent.isShowSelect= false;
            window.open(config.mmsHost);
        },
        /**
         * 跳转单位管理
         */
        goSelect(){
            this.$parent.isShowSelect= false;

        },
          /**
         * 跳转选哪
         */
        goOut(){
            this.$parent.isShowSelect= false;
        },
        /**
         * 点击空白关闭搜索
         */
        emptyClick(){
            this.$parent.isShowSelect= false;
        },
        /**
         * 点击菜单关闭搜索
         */
        hideSearch(){
            this.$parent.isShowSelect = false;
        },
         /*
            初始化头部
        */
        initHeader(){
            this.resizeHeader();
        },
        /*
            重新初始化头部菜单
        */
        resizeHeader(){
            this.$refs.hideMenu.html = '';//更多下面的ul
            this.$refs.navLiHide.html = '';//菜单li
            this.allWidth = document.body.clientWidth;
            this.headerLeftWidth = this.$refs.initNav.clientWidth;//菜单ul的宽
            this.headerRightWidth = this.$refs.rightHead.clientWidth;//右边的宽
            this.picWidth = this.$refs.headerLogo.clientWidth;//logo的宽
            this.iconWidth = this.$refs.homeCon.clientWidth;//图标的宽
            this.blankWidth = this.allWidth-this.headerLeftWidth-this.headerRightWidth-this.picWidth-this.iconWidth;//空白区域的宽
            //1. 把所有元素放到更多里
            let hasShowHeader = [];
            hasShowHeader = this.siblings(this.$refs.navLiHide);//获取菜单li的兄弟元素，并存到数组
            // 循环这个数组，把数组的第i项值插入到更多下面ul的第一项
            for (let i = hasShowHeader.length - 1; i >= 0; i--) {
                this.$refs.hideMenu.insertBefore(hasShowHeader[i], this.$refs.hideMenu.childNodes[0] );
            }
            //2. 然后把该拿出来的数据拿出来
            do{
                this.headerLeftWidth = this.$refs.initNav.clientWidth;//菜单ul
                
                this.blankWidth = this.allWidth - this.headerLeftWidth - this.picWidth - this.iconWidth - this.headerRightWidth;
                // 当更多下面的ul的子元素长度大于0的时候
                if( this.$refs.hideMenu.children.length > 0 ){
                    // 把更多下面的ul里面的第一项的值追加到菜单的ul后面
                    this.$refs.initNav.appendChild(this.$refs.hideMenu.firstChild );
                }else{
                    break;
                }
            }while(this.blankWidth > 200);
            // 把菜单li追加到菜单ul
            this.$refs.initNav.appendChild(this.$refs.navLiHide);
            this.headerLeftWidth = this.$refs.initNav.clientWidth;
            this.blankWidth = this.allWidth - this.headerLeftWidth - this.picWidth - this.iconWidth - this.headerRightWidth;

            let hideLiNum = this.$refs.hideMenu.children.length;//计算更多下面ul子元素的个数
            for (var i = hideLiNum - 1; i >= 0; i--) {
                if (this.$refs.hideMenu.children[i].style.display != 'none') {
                    // 当更多下面的li样式不为none的时候，菜单更多所在的li变为block
                    this.$refs.navLiHide.style.display = 'block';
                    return true;
                }
            }
            // 菜单更多所在的li变为none
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
        }
    },
    mounted(){
        this.activeName = this.$route.path.split("/")[1];
        this.init();
        this.menuHead = JSON.parse(JSON.stringify(this.menuArray))
        this.initHead();
        this.initHeader();
        this.allWidth = document.body.clientWidth;
        window.onresize = () => {
            this.allWidth = document.body.clientWidth;
            this.initHeader();
            this.$parent.height()
        };
        this.$nextTick(()=>{
            this.initHeader();
        });
    }
}
</script>
<style lang='less'>
@import "./head_menu.less";

</style>
