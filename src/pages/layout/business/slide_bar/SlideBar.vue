<template>
    <div class="menu-content">
        <div class="menu-content-left"  @click="hideDropDown">
            <p class="menu-group-title" v-if="!isOpen"><span></span>{{menuTitle}}</p>
            <Menu ref="sideMenu" :theme="theme" class="menu-group-list" :active-name="activeMenu" :open-names="openMenu" :class="{'show':isOpen}" width="auto"  accordion @on-open-change="hideDropDown" @on-select="select"> 
                <div v-if="menuList && menuList.length>0 ">
                    <!-- 一级菜单 -->
                    <div v-for="(item,index) in menuList" :key="index">
                        <Submenu :name="item.name"  v-if="item.children && item.children.length > 0">
                            <template slot="title">
                                <!-- <i class="ivu-icon ivu-icon-ios-arrow-down show-icon" v-show="!isOpen" v-if="item.children && item.children.length>0"></i> -->
                                <i class="fa  icon-fa" v-if="!isOpen" :class="item.iconAwesome"></i>
                                <span v-if="!isOpen" class="first-menu">{{item.title}}</span>                            
                                <!-- 收起后的icon和气泡 -->
                                <Dropdown v-else-if="item.children && item.children.length >0 && isOpen" placement="right-start" transfer >
                                    <Tooltip :content="item.title" placement="right">
                                        <a href="javascript:void(0)">
                                            <i class="fa  icon-fa"  :class="item.iconAwesome"></i>
                                            <span class="label label-danger label-circle pull-right">94</span>
                                        </a>
                                    </Tooltip>
                                    <!-- 气泡列表 -->
                                    <DropdownMenu slot="list">
                                        <DropdownItem v-for="(child,chideInd) in item.children" :key="chideInd">{{child.title}}</DropdownItem>
                                    </DropdownMenu>
                                </Dropdown>
                                <Dropdown v-else placement="right" transfer>
                                    <Tooltip  :content="item.title" placement="right" >
                                        <a href="javascript:void(0)">
                                            <i class="fa  icon-fa"  :class="item.iconAwesome"></i>
                                        </a>
                                    </Tooltip>
                                </Dropdown>
                                <a href="javascript:void(0)"><span v-if="!item.children" class="label label-danger label-circle pull-right">94</span></a>
                            </template>
                            <!-- 展开状态下的二级菜单 -->
                            <template v-if="!isOpen">
                                <div v-for="(child,chideInd) in item.children" :key="chideInd">
                                    <Submenu v-if="child.children" :name="child.name" class="second-menu">
                                        <template slot="title">
                                            <i class="ivu-icon" v-show="!isOpen"></i>
                                            <i class="fa  icon-fa" v-if="!isOpen" :class="item.iconAwesome"></i>
                                            <span v-if="!isOpen" class="first-menu">{{child.title}}</span>
                                        </template>
                                        <!-- 三级菜单 -->
                                        <div v-for="(third,thirdId) in child.children" :key="thirdId">
                                            <Submenu v-if="third.children" :name="third.name" >
                                                <template slot="title">
                                                    <i class="ivu-icon" v-show="!isOpen"></i>
                                                    <i class="fa  icon-fa" v-if="!isOpen" :class="item.iconAwesome"></i>                                                
                                                    <span v-if="!isOpen" class="first-menu">{{third.title}}</span>
                                                </template>
                                                <div v-for="(four,fourId) in third.children" :key="fourId">
                                                    <Submenu v-if="four.children" :name="four.name">
                                                        <template slot="title">
                                                            <i class="ivu-icon" v-show="!isOpen"></i>
                                                            <i class="fa  icon-fa" v-if="!isOpen" :class="item.iconAwesome"></i>                                                        
                                                            <span v-if="!isOpen" class="first-menu">{{four.title}}</span>
                                                        </template>
                                                        <div v-for="(five,fiveId) in four.children" :key="fiveId">
                                                            <Menu-Item :name="five.name">
                                                                <i  class="fa " :class="five.iconAwesome"></i>
                                                                <span>{{five.title}}</span>
                                                            </Menu-Item>
                                                        </div>
                                                    </Submenu>
                                                    <Menu-Item v-else :name="four.name">
                                                        <i  class="fa " :class="four.iconAwesome"></i>
                                                        <span>{{four.title}}</span>
                                                    </Menu-Item>
                                                </div>
                                            </Submenu>
                                            <Menu-Item v-else :name="third.name" >
                                                <i  class="fa " :class="third.iconAwesome"></i>
                                                <span>{{third.title}}</span>
                                            </Menu-Item>
                                        </div>
                                    </Submenu>
                                    <Menu-Item v-else :name="child.name"  class="second-menu" @click.native="hideDropDown()">
                                        <i  class="fa " :class="child.iconAwesome"></i>
                                        <span>{{child.title}}</span>
                                    </Menu-Item>
                                </div>
                            </template>
                        </Submenu>
                        <Menu-Item v-else :name="item.name">
                            <i  class="fa " :class="item.iconAwesome"></i>
                            <span v-if="!isOpen">{{item.title}}</span>
                        </Menu-Item>
                    </div>

                </div>
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
         //侧边栏菜单
        menuList:{
            type:Array,
            default:false
        },
         //侧边栏菜单
        menuTitle:{
            type:String,
            default:''
        },
        power:{
            type:Array,
            default:[]
        }
    },
    data() {
        return {
            theme: 'primary',//主题
            isOpen:false,//侧边栏展开与否
            activeMenu:'',//当前菜单
            actives:'tis-components',
            openMenu:[]
        }
    },
    watch:{
        shrink(val,old){
            this.isOpen = this.shrink;
            console.log(this.isOpen);
        },
        $route(to,from){
            this.initMenuStatus();
        },
        menuList(){
            this.initMenuStatus();
        }
    },
    computed:{
        powerComputed(){
            return this.power;
        },
    },
    mounted(){
        // this.activeName = this.$route.path.split("/")[1];
        // console.log(this.activeName)
        if(!this.menuList){
            this.initMenuStatus();
        }
        this.initMenuStatus();
        console.log(this.$route.matched);
    },
    methods:{
         /**
        * 关闭头部展开
        */
        hideDropDown(){
            this.$emit('hide-drop-down')
        },
        /**
        * 路由跳转
        */
        select(name){
            console.log(name)
        },
        initMenuStatus(){
            let menu = this.$route.matched[1];
            console.log(this.menuList.length);
            for (let i = 0; i < this.menuList.length; i++) {
                // console.log(menu.name)
                if (this.menuList[i].name == menu.name) {
                    let submenu = this.$route.matched[2];
                    let submenuList = this.menuList[i].children;
                    if (submenuList && submenuList.length > 0) {
                        for (let j = 0; j < submenuList.length; j++) {
                            if(submenuList[j].children && submenuList[j].children.length>0){
                                for(let k = 0; k < submenuList[j].children.length;k++){
                                    if(this.$route.matched[3] && submenuList[j].children[k].name == this.$route.matched[2].name){
                                        this.activeMenu = this.$route.matched[3].name;
                                    }
                                }
                            }else{
                                // console.log(submenuList[j].name)
                                // console.log(submenu.name)
                                if (submenuList[j].name == submenu.name) {
                                    this.activeMenu = submenu.name;
                                    // console.log(this.activeMenu)
                                }
                            }
                        }
                        this.openMenu = [menu.name,submenu.name];
                        // console.log(this.openMenu)
                    } else {
                        this.activeMenu = menu.name;
                    }
                }
            }
            this.$nextTick(()=>{
                // 手动更新展开的子目录，注意要在 $nextTick 里调用
                this.$refs.sideMenu.updateOpened();
                // 手动更新当前选择项，注意要在 $nextTick 里调用
                this.$refs.sideMenu.updateActiveName();
            });
            // 有时高亮不生效，延时再处理一下吧
            setTimeout(() => {
                this.$refs.sideMenu.updateOpened();
                this.$refs.sideMenu.updateActiveName();
            }, 1000)
        },
    }
}
</script>
<style lang='less'>
@import './slide_bar.less';
</style>
