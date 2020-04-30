
<template>
    <Menu class="menu-ele" ref="sideMenu" :active-name="activeMenu" :open-names="openMenu" theme="dark" width="auto" @on-select="changeMenu" accordion>
        <div v-for="(menu,index) in menuList">
            <div v-show="!menu.powerSatus || powerComputed.indexOf(menu.powerSatus)!=-1">
                <!-- 二级 -->
                <Submenu class="first-parent" :key="index" v-if="menu.children && menu.children.length > 0 " :name="menu.name">
                    <template slot="title">
                        <span class="sub sub-all" v-if="getCount(menu.title)">{{getCount(menu.title)}}</span>
                        <i v-if="menu.iconAwesome" class="fa first-icon" :class=[menu.iconAwesome] aria-hidden="true"></i>
                        <Icon v-else :type="menu.iconIview" :size="18"></Icon>{{menu.title}}
                    </template>

                    <template v-for="item of menu.children" >
                        <Submenu :key="item.name" :name="item.name" v-if="item.children && item.children.length > 0 && powerComputed.indexOf(item.powerSatus)!=-1">
                            <template slot="title">
                                <a class="menu-color">
                                    <i v-if="item.iconAwesome" class="fa" :class=[item.iconAwesome] aria-hidden="true"></i>
                                    <Icon v-else :type="item.iconIview" :size="18"></Icon>{{item.title}}
                                </a>
                            </template>
                            <MenuItem v-for="child of item.children" :key="child.name" :name="child.name" >
                                <a class="sub-menu-color">
                                    <i v-if="child.iconAwesome" class="fa" :class=[child.iconAwesome] aria-hidden="true"></i>
                                    <Icon v-else :type="child.iconIview" :size="18"></Icon>{{child.title}}
                                    <i v-if="child.lastIconAwesome" class="fa last-icon" :class=[child.lastIconAwesome] aria-hidden="true"></i>
                                    <Icon v-else class="last-icon" :type="child.lastIconIview" :size="18"></Icon>
                                </a>
                            </MenuItem>
                        </Submenu>
                        <MenuItem :key="item.name" :name="item.name" v-else-if="!item.powerSatus || powerComputed.indexOf(item.powerSatus)!=-1">
                            <a class="menu-color">
                                <i v-if="item.iconAwesome" class="fa" :class=[item.iconAwesome] aria-hidden="true"></i>
                                <Icon v-else :type="item.iconIview" :size="18"></Icon>{{item.title}}
                                <span class="sub" v-if="getCount(item.title)" v-on:click.stop="redCountJump(item.name)" >{{getCount(item.title)}}</span>
                                <i v-if="item.lastIconAwesome" class="fa last-icon" :class=[item.lastIconAwesome] aria-hidden="true"></i>
                                <Icon v-else class="last-icon" :type="item.lastIconIview" :size="18"></Icon>
                            </a>
                        </MenuItem>
                    </template>




                </Submenu>
                <!-- 一级 -->
                <a v-else-if="menu.children.length<=0">
                    <MenuItem :name="menu.name">
                        <i v-if="menu.iconAwesome" class="fa" :class=[menu.iconAwesome] aria-hidden="true"></i>
                        <Icon v-else :type="menu.iconIview" :size="18"></Icon>{{menu.title}}
                        <span class="sub" v-if="getCount(menu.title)">{{getCount(menu.title)}}</span>
                        <!-- <span class="sub">1</span> -->
                        <i v-if="menu.lastIconAwesome" class="fa last-icon" :class=[menu.lastIconAwesome] aria-hidden="true"></i>
                        <Icon v-else class="last-icon" :type="menu.lastIconIview" :size="18"></Icon>
                    </MenuItem>
                </a>
            </div>
        </div>
    </Menu>
</template>
<script>
    import config from "@/config.js";
    import utils from '@/utils';
    import {mapState,mapActions,mapGetters,createNamespacedHelpers} from 'vuex'
    const mmsCommon = createNamespacedHelpers('mmsCommon')

    export default {
        name: 'sidebar-menu',
        props: {
            menuList: Array,  //菜单数据
            subNum:Array,   //左侧菜单未读消息数组
            power:{     //权限
                type:Array,
                default:[]
            },

        },
        data() {
            return {
                //当前菜单
                activeMenu: "",
                openMenu: [],
            }
        },
        computed:{
            powerComputed(){
                return this.power;
            },
            ...mmsCommon.mapGetters(['dealLeftFieldTips'])
        },
        created() {

        },
        methods: {
            /*
            * 初始化菜单
            */
            initMenuStatus: function () {
                this.activeMenu = "";   //做了下初始化以防菜单默认选中出问题
                let menu = this.$route.matched;
                let openName = '';
                menu.map((item,index)=>{
                    if(item.meta && item.meta.openName){
                        openName = item.meta.openName;
                    }
                })
                this.menuList.map((item,index)=>{
                    this.cycle(item,openName);
                })
                //初始化菜单
                this.$nextTick(function () {
                    this.$refs.sideMenu.updateOpened();
                    this.$refs.sideMenu.updateActiveName();
                });
            },
            /*
                * 循环递归
                *
                * @param {Array} item 要循环的数组
                *
                * @param {String} openName 要找的字符串
                *
                * @return {Booblean}  跳出循环
            */
            cycle(item,openName){
                if(item.openName && item.openName == openName){
                    this.activeMenu = item.name;
                    this.openMenu.push(item.name);
                    return false;
                }else{
                    item.children.map((child,index)=>{
                        if(child.openName && child.openName == openName ){
                            this.activeMenu = child.name;
                            this.openMenu.push(item.name);
                            return false;
                        }
                    })
                }
            },
            /*
            * 切换菜单
            *
            * @param {string}  选择的菜单名
            */
            changeMenu(active) {
                let menuItem = this.getMenuItem(this.menuList, active);
                this.$emit('on-change', menuItem);
            },
            /**
             * 递归找到选中的菜单
             *
             * @param {array} menuList 部分菜单
             * @param {string} name 名字
             * @return {object}
             */
            getMenuItem(menuList, name){
                let item = {};
                for(let k in menuList){
                    if(menuList[k].children){
                        item = this.getMenuItem(menuList[k].children, name);
                    }
                    if(item.name){
                        return item;
                    }
                    if(menuList[k].name == name){
                        return menuList[k];
                    }
                }
                return item;
            },
            /*
            * 头部菜单待处理数
            *
            * @param {String} 当前菜单
            *
            @return {String} 返回的未读消息数
            */
            getCount(title) {
                let num = null;
                if(this.subNum && this.subNum.length>0){
                    switch (title) {
                        case "转正":
                            this.subNum.map((item,index)=>{
                                if(item.key=="FORMALWORKER"){
                                    num = item.value;
                                }
                            })
                            break;
                        case "入职":
                            this.subNum.map((item,index)=>{
                                if(item.key=="ENTRYWORKER"){
                                    num = item.value;
                                }
                            })
                            break;
                        case '调级':
                            this.subNum.map((item,index)=>{
                                if(item.key=="ADJUSTLEVEL"){
                                    num = item.value;
                                }
                            })
                            break;
                        case '离职':
                            this.subNum.map((item,index)=>{
                                if(item.key=="LEAVEWORKER"){
                                    num = item.value;
                                }
                            })
                            break;
                        case '土地':
                            num = this.dealLeftFieldTips.land
                            break;
                        case '厂房':
                            num = this.dealLeftFieldTips.factory
                            break;
                        case '仓库':
                            num = this.dealLeftFieldTips.depot
                            break;
                        case '注册':
                            num = this.dealLeftFieldTips.register
                            break;
                        case '写字楼':
                            num = this.dealLeftFieldTips.officebuilding
                            break;
                        case '项目MOT':
                            num = this.dealLeftFieldTips.count
                            break;
                        case '单位MOT':
                            num = this.dealLeftFieldTips.companyCount;
                            break;
                    }
                }
                return num;
            },
            /**
             * 手动控制点击红色未读数页面跳转
             * @param {String} routeName 菜单跳转路由name
             */
            redCountJump(routeName){
                let jumpType = 1;   //跳转方式1-项目内跳转2-url跳转
                let jumpUrl = "";   //跳转地址
                switch(routeName){
                    case "person_matters_a":
                        //转正
                        jumpType = 2;
                        jumpUrl = "/HR/turnRightAwaiting";
                        break;
                    case "person_matters_b":
                        //入职
                        jumpType = 2;
                        jumpUrl = "/InductionDeparture/entryApprovalList/type/Approval";
                        break;
                    case "level":
                        //调级
                        jumpType = 1;
                        jumpUrl = "wait_list";
                        break;
                    case "person_matters_d":
                        //离职
                        jumpType = 2;
                        jumpUrl = "/InductionDeparture/endInduction/type/Approval";
                        break;
                    default:
                        jumpType = 1;
                        jumpUrl = routeName;
                        break;
                }
                if(jumpType === 1){
                    this.$router.push({
                        name : jumpUrl
                    });
                }else{
                    window.location.href = config.mmsHost + jumpUrl;
                }
            }
        },
        watch: {
            $route: function () {
                this.initMenuStatus();
            }
        },
        mounted: function () {
            this.initMenuStatus();

        }

    };
</script>
<style lang="less" scoped>
    @import "./sidebar_menu.less";
</style>
