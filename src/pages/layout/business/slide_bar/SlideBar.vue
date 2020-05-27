<template>
    <div class="menu-content">
        <div class="menu-content-left"  @click="hideDropDown">
            <p class="menu-group-title" v-if="!isOpen"><span></span>{{menuTitle}}</p>
            <Menu :theme="theme" class="menu-group-list" :class="{'show':isOpen}" width="auto" :open-names="['1']" accordion @on-open-change="hideDropDown" @on-select="select"> 
                <div  v-if="menuList && menuList.length>0 ">
                    <Submenu :name="item.name"  v-for="(item,index) in menuList" :key="index">
                        <template slot="title"  >
                            <i class="ivu-icon ivu-icon-ios-arrow-down ivu-menu-submenu-title-icon aaa" v-if="item.children && item.children.length>0"></i>
                            <i class="fa  icon-fa" v-if="!isOpen" :class="item.iconAwesome"></i>
                            <span v-if="!isOpen" class="first-menu">{{item.title}}</span>
                            <Dropdown v-else-if="item.children && item.children.length >0 && isOpen" placement="right-start" transfer class="no-hover">
                                <Tooltip  placement="left"  >
                                    <a href="javascript:void(0)">
                                        <i class="fa  icon-fa"  :class="item.iconAwesome"></i>
                                    </a>
                                </Tooltip>
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
                                <DropdownMenu slot="list" v-if="item.children && item.children.length">
                                    <DropdownItem v-for="(child,chideInd) in item.children" :key="chideInd">{{child.title}}</DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        </template>
                        <template v-if="!isOpen">
                            <Menu-Item :name="child.name" class="second-menu"  v-for="(child,chideInd) in item.children" :key="chideInd" @click.native="hideDropDown()">
                                <i  class="fa " :class="child.iconAwesome"></i>
                                <span>{{child.title}}</span>
                            </Menu-Item>
                        </template>
                    </Submenu>
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
        }
    },
    watch:{
        shrink(val,old){
            this.isOpen = this.shrink;
        }
    },
    computed:{
        powerComputed(){
            return this.power;
        },
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
        }
    },
    mounted(){
       
    }
}
</script>
<style lang='less' scoped>
@import './slide_bar.less';
</style>
