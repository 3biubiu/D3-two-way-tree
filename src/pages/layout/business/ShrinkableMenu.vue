<template>
    <div :style="{background: bgColor}" class="ivu-shrinkable-menu">
        <div v-for="modular in menuList">
            <div id="user-left-box" class="clearfix" v-show="!shrink">
                <div class="user-box">
                    <span class="name">{{modular.title}}</span>
                </div>
            </div>
            <sidebar-menu 
                v-show="!shrink"
                :menu-theme="theme" 
                :power="power"
                :sub-num="subNum"
                :menu-list="modular.menuList" 
                @on-change="handleChange"
            ></sidebar-menu>
            <sidebar-menu-shrink 
                v-show="shrink"
                :menu-theme="theme" 
                :power="power"
                :sub-num="subNum"
                :menu-list="modular.menuList" 
                :icon-color="shrinkIconColor"
                @on-change="handleChange"
            ></sidebar-menu-shrink>
        </div>
    </div>
</template>

<script>
import SidebarMenu from './SidebarMenu.vue';
import SidebarMenuShrink from './SidebarMenuShrink.vue';
export default {
    name: 'shrinkable-menu',
    components: {
        SidebarMenu,
        SidebarMenuShrink
    },
    props: {
        power:{
            type:Array,
            default:[]
        },
        //收缩
        shrink: {
            type: Boolean,
            default: false
        },
        subNum:{
            type:Array,
            default:[]
        },
        //菜单
        menuList: {
            type: Array,
            required: true
        },
        //主题
        theme: {
            type: String,
            default: 'dark',
        },
    },
    computed: {
        //背景色
        bgColor () {
            return this.theme === 'dark' ? '#3C4454' : '#fff';
        },
        //图标颜色
        shrinkIconColor () {
            return this.theme === 'dark' ? '#fff' : '#3C4454';
        }
    },
    mounted(){
        
            
    },
    methods: {
        //切换菜单
        handleChange (menuItem) {
            if(menuItem.url){
                window.location.href = menuItem.url;
            }else{
                this.$router.push({
                    name: menuItem.name
                });
            }
        }
    }
};
</script>
<style lang="less" >
    @import "./shrinkable_menu.less";
    .shink-menu{        
        overflow: visiable!important; 
    }
</style>
