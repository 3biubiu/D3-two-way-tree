
<template>
    <div>
        <template v-for="(item, index) in menuList">
            <div style="text-align: center;">
                <Dropdown transfer v-if="item.children && item.children.length > 0 && (!item.powerSatus || powerComputed.indexOf(item.powerSatus)!=-1)" placement="right-start" @on-click="changeMenu">                    
					<Tooltip :content="item.title" placement="right">
						<Button style="width: 64px;margin-left: -5px;padding:10px 0;" type="text">
						    <i v-if="item.iconAwesome" class="fa" :class=[item.iconAwesome] aria-hidden="true"></i>
						    <Icon v-else :color="iconColor" :type="item.iconIview" :size="18"></Icon>
						</Button>
					</Tooltip>
                    <DropdownMenu style="width: 200px;display: none;" v-for="(child, i) in item.children" :key="i" slot="list" v-if="!child.powerSatus || powerComputed.indexOf(child.powerSatus)!=-1">
                        <template>
                            <a class="menu-icon-link">
                                <DropdownItem :name="child.name" :key="i">
                                    <i v-if="child.iconAwesome" class="fa fonta" :class=[child.iconAwesome] aria-hidden="true"></i>
                                    <Icon v-else :type="child.iconIview" :size="18"></Icon>
                                    <span style="padding-left:10px;">{{ child.title }}</span>
                                    <span class="sub" v-if="getCount(item.title)">{{getCount(item.title)}}</span>
                                </DropdownItem>
                            </a>
                        </template>
                    </DropdownMenu>
                </Dropdown>
                <Dropdown transfer v-else-if="item.children.length<=0 && (!item.powerSatus || powerComputed.indexOf(item.powerSatus)!=-1)" placement="right-start" :key="index" @on-click="changeMenu">                 
                    <Tooltip :content="item.title" placement="right">
                        <Button @click="changeMenu(item.name)" style="width: 64px;margin-left: -5px;padding:10px 0;" type="text">
                            <i v-if="item.iconAwesome" class="fa" :class=[item.iconAwesome] aria-hidden="true"></i>
                            <Icon v-else :color="iconColor" :type="item.iconIview" :size="18"></Icon>
                        </Button>
                    </Tooltip>                    
                    <DropdownMenu style="width: 200px;display: none;" slot="list">
                        <DropdownItem :name="item.name" :key="'d' + index">
                            <i v-if="item.iconAwesome" class="fa fonta" :class=[item.iconAwesome] aria-hidden="true"></i>
                            <Icon v-else :type="item.iconIview" :size="18"></Icon>
                            <span style="padding-left:10px;">{{ item.title }}</span>
                            <span class="sub" v-if="getCount(item.title)">{{getCount(item.title)}}</span>
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </div>
        </template>
    </div>
</template>

<script>
import utils from '@/utils';

export default {
    name: 'sidebar-menu-shrink',
    props: {
        //菜单
        menuList: {
            type: Array
        },
        power:{
            type:Array,
            default:[
                "ORGANIZEMANAGER",  //组织管理
                "GROUP", //部门管理
                "JOB", //岗位管理
                "CUSTOM_GROUP", //自定义分组
                "HUMENMANAGER", //人事管理
                "STAFF", //员工档案
                "CONTRACT", //员工合同
                "EDUCATION", //教育经历
                "WORK", //工作经历
                "REPORT", //人事报表
                "CONFIG", //基础配置
                "USER", //用户管理
            ]
        },
        subNum:Array,
        //图标颜色
        iconColor: {
            type: String,
            default: 'white'
        },
        //主题
        menuTheme: {
            type: String,
            default: 'darck'
        }
    },
    computed: {
        powerComputed(){
            return this.power;
        },
    },
    methods: {
        /*
        *
        * @param {string}  选择的菜单名
        */
        changeMenu (active) {
            let menuItem = this.getMenuItem(this.menuList, active);
            this.$emit('on-change', menuItem);
        },
        /**
         * 递归找到选中的菜单
         *
         * @param {array} menuList 部分菜单
         * @param {strin} name 名字
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
                }
            }
            return num;
        },
    }
};
</script>
<style lang="less" scoped>
   @import "./sidebar_menu_shrink.less";
   .menu-icon-link{
        display:block;
   }
   .fa{
        color: #fff;
        opacity: 0.5;
   }
   .ivu-btn-text:hover {
        color: #50A6FF;
        opacity: 1!important;
        background-color: rgba(36,47,63,1);
        border-color: transparent;
        .fa{
            color: #50A6FF;
            opacity: 1!important;
        }
    }
    .fonta{
        color:#333;
    }
</style>
