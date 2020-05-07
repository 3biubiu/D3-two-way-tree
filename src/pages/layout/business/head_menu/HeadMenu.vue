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
                <img class="menu-ten-logo" src="@/assets/mms_common/header_icon_10year.png" alt="">
                <a class="company-href" href="#">单位：选哪儿官方</a>
            </li>
            <li >
                <div class="menu-search clearfix" @mouseover="showSelect" @click="hideSelect">
                    <i class="fa fa-search"></i>
                    <span>搜索</span>
                </div>
                 <div class="menu-head-search" v-show="isShowSelect">
                    <select  class="menu-search-select">
                        <option value="全部" >全部</option>
                        <option value="项目" >项目</option>
                        <option value="载体" >载体</option>
                    </select>
                    <input type="text" class="menu-search-input" placeholder="企业 编号 电话 姓名 联系方式 备注 介绍" />
                    <Button type="primary" class="menu-search-button">搜索</Button>
                </div>
            </li>
            <li >
                <div class="clearfix menu-user list-li" @click="showUser" >
                        <i class="fa fa-user menu-user-icon"></i>李璐瑶
                        <i class="caret"></i>
                        <span class="count msg-count  menu-user-icon">3</span>
                </div>
                <div class="menu-name-wrapper" v-if="isShowUser" >
                    <a href="#">
                        <i class="fa fa-user menu-user"></i>用户中心
                        <span class="count msg-counts">36</span>
                    </a>
                    <a href="#">
                        <i class="fa fa-envelope-o menu-user menu-mess"></i>消息
                    </a>
                </div>
            </li>
            <li @mouseover="showMessage" @mouseout="hideMessage">
                <div class="clearfix">
                    <i class="fa fa-envelope-o"></i>消息
                    <span class="count msg-count">3</span>
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
            <li  @click="showSchool">
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
        <Modal
            v-model="isOut"
            width="600"
            :transfer="false"
            :styles="{top: '50px'}"
            title="确认退出">
            <p>确定要退出系统吗？</p>
            <div slot="footer" class="sign-btn">
                <Button class="save-btn" type="primary" @click="okOut">确定</Button>
                <Button class="cancel-btn" @click="cancelOut">取消</Button>
            </div>
        </Modal>
    </div>
</template>
<script>
export default {
    data() {
        return {
            isShowSelect:false,//搜索是否显示
            isShowUser:false,
            isShowSchool:false,
            isOut:false,
            isShowMessage:false
        }
    },
    methods:{
         /**
        * 鼠标经过显示搜索
        * @author liluyao & 2020-5-6 09:25:10
        */
        showSelect(){
            this.isShowSelect = true;
        },
         /**
        * 鼠标点击隐藏搜索
        * @author liluyao & 2020-5-6 09:25:10
        */
        hideSelect(){
            this.isShowSelect = false;
        },
         /**
        * 点击显示用户操作
        * @author liluyao & 2020-5-6 09:25:07
        */
        showUser(){
            this.isShowUser = !this.isShowUser;
            this.isShowSchool = false;
            this.isShowSelect = false;
        },
         /**
        * 点击显示学院操作
        * @author liluyao & 2020-5-6 09:25:07
        */
        showSchool(){
            this.isShowUser = false;
            this.isShowSchool = !this.isShowSchool;
            this.isShowSelect = false;
        },
         /**
        * 点击退出操作
        * @author liluyao & 2020-5-6 10:26:49
        */
        signOut(){
            this.isShowSchool = false;
            this.isShowUser = false;
            this.isShowSelect = false;
            this.isOut = !this.isOut;
        },
         /**
        * 点击确定退出操作
        * @author liluyao & 2020-5-6 10:26:52
        */
        okOut(){
            this.isOut = false;
        },
         /**
        * 点击取消退出操作
        * @author liluyao & 2020-5-6 10:26:52
        */
        cancelOut(){
            this.isOut = false;
        },
        /**
        * 显示消息弹窗
        * @author liluyao & 2020-5-6 11:45:56
        */
        showMessage(){
            this.isShowMessage = true;
        },
        /**
        * 隐藏消息弹窗
        * @author liluyao & 2020年5月6日11:46:47
        */
        hideMessage(){
            this.isShowMessage = false;
        },
         /**
        * 左侧菜单收起
        * @author liluyao &2020-5-7 08:57:49
        */
        open(){
            this.$emit('open')
        },
        hideDropDown(){
            this.isShowUser = false;
            this.isShowSchool = false;
            this.isShowSelect = false;
        }
    },
    mounted(){
        let that = this;
        let modal = document.getElementsByClassName('menu-search')[0]
        let modalHeadSearch = document.getElementsByClassName('menu-head-search')[0]
        let modalSelect = document.getElementsByClassName('menu-search-select')[0]
        let modalInput = document.getElementsByClassName('menu-search-input')[0]
        let modalButton = document.getElementsByClassName('menu-search-button')[0]
        let user = document.getElementsByClassName('menu-user')[0]
        let userIcon = document.getElementsByClassName('menu-user-icon')[0]
        let school = document.getElementsByClassName('menu-school')[0]
        let schoolIcon = document.getElementsByClassName('menu-school-icon')[0]
        document.addEventListener('click', function(e) {
            if (e.target !== modal && e.target !== modalSelect && e.target !== modalInput && e.target !== modalButton && e.target !== modalHeadSearch) {
                that.isShowSelect = false
            }
            if(e.target !== user && e.target !== userIcon){
                that.isShowUser = false
            }
            if(e.target !== school && e.target !== schoolIcon ){
                that.isShowSchool = false
            }
        })
    }
}
</script>
<style lang='less' scoped>
@import "./head_menu.less";
</style>
