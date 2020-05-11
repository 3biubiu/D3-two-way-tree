<template>
     <div class="menu-head clearfix">
        <div class="menu-head-left">
            <a href="#" class="menu-logo"> 
                <img src="@/assets/mms_common/xnlogo.png" alt="">
            </a>
            <a href="#">
                <i  class="fa fa-home menu-head-home"></i>
            </a>
            <i class="fa fa-bars menu-head-home" @click="open"></i>
        </div>
        <ul class="menu-head-center dropdown clearfix">
            <li class="active"><a href="#">首页</a></li>
            <li><a href="#">土地</a></li>
            <li><a href="#">厂房</a></li>
            <li><a href="#">仓库</a></li>
            <li><a href="#">写字楼</a></li>
            <li><a href="#">注册</a></li>
            <li><a href="#">商业</a></li>
            <li><a href="#">其他</a></li>
            <li><a href="#">企服</a></li>
            <li><a href="#">情报</a></li>
            <li><a href="#">办公</a></li>
            <li><a href="#">任务</a></li>
            <li><a href="#">数据</a></li>
            <li><a href="#">财务</a></li>
            <li><a href="#">人才</a></li>
            <li><a href="#">物资</a></li>
            <li><a href="#">产业</a></li>
        </ul>
        <ul class="menu-head-right dropdown">
            <li >
                <a class="company-href" href="#">单位：选哪儿官方</a>
            </li>
            <li  @mouseover="showSelect" @mouseout="hideSelect">
                <div class="menu-search clearfix">
                    <i class="fa fa-search"></i>
                    <span>搜索</span>
                </div>
                 <div class="menu-head-search" v-show="isShowSelect">
                    <Select  class="menu-search-select">
                        <Option value="全部" >全部</Option>
                        <Option value="项目" >项目</Option>
                        <Option value="载体" >载体</Option>
                    </Select>
                    <Input type="text" class="menu-search-input" placeholder="企业 编号 电话 姓名 联系方式 备注 介绍" />
                    <Button type="primary" class="menu-search-button">搜索</Button>
                </div>
            </li>
            <li @click="showUser" :class="{'active':userShow}">
                <div class="clearfix menu-user list-li" >
                    <!-- 写死的名字记得删掉，解开下面的注释 -->
                    <i class="fa fa-user menu-user-icon"></i>李璐瑶
                    <!-- {{userName}} -->
                    <i class="caret"></i>
                    <span class=" msg-count  menu-user-icon" :class="{'count':userMess >99}">{{userMess >99 ?'99+':userMess}}</span>
                </div>
                <div class="menu-name-wrapper" v-if="isShowUser" >
                    <a href="#">
                        <i class="fa fa-user menu-user"></i>用户中心
                        <span class=" msg-counts" :class="{'count':userMess >99}">{{userMess >99 ?'99+':userMess}}</span>
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
                           <i class="fa fa-clock-o mess-top"></i>
                           2020-02-02 15:55
                       </div>
                    </a>
                    <a href="#" class="old-mess">查看历史消息</a>
                </div>
            </li>
            <li  @click="showSchool" :class="{'active':userSchool}">
                <div class="clearfix list-li menu-school" >
                    <i class="fa fa-folder-open menu-school-icon" ></i>学院
                    <i class="caret"></i>
                </div>
                <div class="menu-name-wrapper menu-name-left" v-if="isShowSchool">
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
       
    </div>
</template>
<script>
import Cookie from 'js-cookie';
export default {
    data() {
        return {
            isShowSelect:false,//搜索是否显示
            isShowUser:false,//用户
            isShowSchool:false,//学院
            isOut:false,//退出
            isShowMessage:false,//消息
            userShow:false,//用户背景色
            userSchool:false,//学院背景色
            userName:Cookie.get("username"),
            userMess:100,//用户消息个数
            schoolMess:88,//学院消息个数
        }
    },
    methods:{
         /**
        * 鼠标经过显示搜索
        */
        showSelect(){
            this.isShowSelect = true;
        },
         /**
        * 鼠标点击隐藏搜索
        */
        hideSelect(){
            this.isShowSelect = false;
        },
         /**
        * 点击显示用户操作
        */
        showUser(){
            this.isShowUser = !this.isShowUser;
            this.isShowSchool = false;
            this.isShowSelect = false;
            this.userShow = true
        },
         /**
        * 点击显示学院操作
        */
        showSchool(){
            this.userSchool =true
            this.isShowUser = false;
            this.isShowSchool = !this.isShowSchool;
            this.isShowSelect = false;
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
        * 左侧菜单收起
        */
        open(){
            this.$emit('open')
        },
         /**
        * 隐藏头部下拉
        */
        hideDropDown(){
            this.isShowUser = false;
            this.isShowSchool = false;
            this.isShowSelect = false;
        },
         /**
        * 退 出
        */
        signOut () {
            this.$Modal.confirm({
                title: '确认退出',
                content: '<p>确定要退出系统吗？</p>',
                onOk: () => {
                }
                
            });
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
        }
    },
    mounted(){
        this.init();
    }
}
</script>
<style lang='less' scoped>
@import "./head_menu.less";
</style>
