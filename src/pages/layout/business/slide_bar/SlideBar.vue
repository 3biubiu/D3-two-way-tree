<template>
    <div class="menu-content">
        <div class="menu-content-left"  @click="hideDropDown">
            <p class="menu-group-title" v-if="!isOpen"><span></span>人才中心</p>
            <Menu :theme="theme" class="menu-group-list" :class="{'show':isOpen}" width="auto" :open-names="['1']" accordion @on-open-change="hideDropDown">
                <Submenu name="1" >
                    <template slot="title"  >
                        <i class="fa fa-user icon-fa" v-if="!isOpen"></i>
                        <Tooltip  content="个人中心" placement="right" v-else  >
                            <i class="fa fa-user icon-fa close-fa"></i>
                        </Tooltip>
                        <span v-if="!isOpen" class="first-menu">个人中心</span>
                    </template>
                    <Menu-Item name="1-1" class="second-menu" v-if="!isOpen" @click.native="hideDropDown()" >
                        <a href="#"  >
                            <i  class="fa fa-id-card"></i>
                            <span>个人信息</span>
                        </a>
                    </Menu-Item>
                    <Menu-Item name="1-2" class="second-menu" v-if="!isOpen" @click.native="hideDropDown()">
                        <a href="#">
                            <i  class="fa fa-th-list"></i>
                            <span>员工名录</span>
                        </a>
                    </Menu-Item>
                    <Menu-Item name="1-3" class="second-menu" v-if="!isOpen" @click.native="hideDropDown()">
                        <a href="#">
                            <i  class="fa fa-flag"></i>
                            <span>党员墙</span>
                        </a>
                    </Menu-Item>
                    <Menu-Item name="1-4" class="second-menu" v-if="!isOpen">
                        <a href="#">
                            <i  class="fa  fa-flag"></i>
                            <span>董事会</span>
                        </a>
                    </Menu-Item>
                    <Menu-Item name="1-5" class="second-menu" v-if="!isOpen">
                        <a href="#">
                            <i  class="fa fa-flag"></i>
                            <span>总经办</span>
                        </a>
                    </Menu-Item>
                    <Menu-Item name="1-6" class="second-menu" v-if="!isOpen">
                        <a href="#">
                            <i  class="fa  fa-flag"></i>
                            <span>问题会</span>
                        </a>
                    </Menu-Item>
                    <Menu-Item name="1-7" class="second-menu" v-if="!isOpen">
                        <a href="#">
                            <i  class="fa fa-flag"></i>
                            <span>四大门派</span>
                        </a>
                    </Menu-Item>
                    <Menu-Item name="1-8" class="second-menu" v-if="!isOpen">
                        <a href="#">
                            <i  class="fa fa-flag"></i>
                            <span>精英堂</span>
                        </a>
                    </Menu-Item>
                    <Menu-Item name="1-9" class="second-menu" v-if="!isOpen">
                        <a href="#">
                            <i  class="fa fa-flag"></i>
                            <span>月度之星</span>
                        </a>
                    </Menu-Item>
                    <Menu-Item name="1-10" class="second-menu" v-if="!isOpen">
                        <a href="#">
                            <i  class="fa fa-flag"></i>
                            <span>认证讲师</span>
                        </a>
                    </Menu-Item>
                </Submenu>
                <Submenu name="2">
                    <template slot="title">
                        <i class="fa fa-user icon-fa" v-if="!isOpen"></i>
                        <Tooltip  content="人事审批" placement="right" v-else @click.native="hideDropDown()">
                             <i class="fa fa-user icon-fa close-fa"></i>
                        </Tooltip>
                        <span v-if="!isOpen" class="first-menu">人事审批</span>
                    </template>
                    <Menu-Item name="2-1" class="second-menu" v-if="!isOpen">
                        <a href="#">
                            <i  class="fa fa-id-card"></i>
                            <span>转正</span>
                        </a>
                    </Menu-Item>
                    <Menu-Item name="2-2" class="second-menu" v-if="!isOpen">
                        <a href="#">
                            <i  class="fa fa-id-card"></i>
                            <span>入职</span>
                        </a>
                    </Menu-Item>
                    <Menu-Item name="2-3" class="second-menu" v-if="!isOpen">
                        <a href="#">
                            <i  class="fa fa-id-card"></i>
                            <span>调级</span>
                        </a>
                    </Menu-Item>
                    <Menu-Item name="2-4" class="second-menu" v-if="!isOpen">
                        <a href="#">
                            <i  class="fa fa-id-card"></i>
                            <span>离职</span>
                        </a>
                    </Menu-Item>
                </Submenu>
                
            </Menu>
        </div>
    </div>
</template>
<script>
export default {
    props:{
        //侧边栏展开与否
        shrink:{
            type:Boolean,
            default:false
        },
    },
    data() {
        return {
            theme: 'primary',//主题
            isOpen:false,//侧边栏展开与否
        }
    },
    watch:{
        shrink(val,old){
            this.isOpen = this.shrink;
        }
    },
    methods:{
         /**
        * 关闭头部展开
        */
        hideDropDown(){
            this.$emit('hide-drop-down')
        }
    },
    mounted(){
       
    }
}
</script>
<style lang='less' scoped>
@import './slide_bar.less';
</style>
