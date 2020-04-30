<!--
    下拉搜索组件
    事件派发：
    selected事件：手动选择下拉某项时，触发，参数为：{id: '', name: ''}
    搜索操作：
    searchData方法：参数为{name: ''}，搜索的接口url需要从父组件传递（dataSourceUrl）
    参数说明：
    isInit：初始化的时候是否自动请求接口，获取用户数据，默认是不需要的，避免多次请求同一个接口
            用户数据可以通过父组件传进来
            自动获取数据开启时，需要保证不会出现多次请求同一个接口的问题
-->
<template>
    <div>
        <Row>
            <div class="select-search-body">
                <Button class="select-search-btn" @click="showMenu" :disabled="isDisabled">
                    <div class="select-search-text">
                        <span class="select-search-select-text" :class="{'search-placeholder':theOne.id==''}">{{theOne.name}}</span>
                        <Icon type="arrow-down-b" class="caret"></Icon>
                    </div>
                </Button>
                <ul class="search-select-ul" ref="searchSelectUl" :class="{'up-position':dropDownPosition}" v-show="isShowMenu">
                    <div v-show="!dropDownPosition">
                        <div class="search-box">
                            <div class="search-input-box">
                                <Input type="text" autocomplete="off" :placeholder="placeholder"
                                    @keyup.enter.native="searchData" v-model="keyword"/>
                                <span class="search-input-btn">
                                <Button type="default" @click="searchData">搜索</Button>
                            </span>
                            </div>
                        </div>
                        <li v-if="defaultSelect.id == ''" @click="select()">
                            <a :title="defaultSelect.name" class="select-business">{{defaultSelect.name}}</a>
                        </li>
                    </div>
                    <template v-for="(item,index) in items">
                        <li @click="select(item.id)" :key="index">
                            <a :title="item.name">
                                <template v-if=" isShowId && item.id !== '' ">[ID:{{ item.id }}]</template>
                                {{item.name}}
                            </a>
                        </li>
                    </template>
                    <div v-show="dropDownPosition">
                        <li v-if="defaultSelect.id == ''" @click="select()"><a :title="defaultSelect.name" class="select-business">{{
                            defaultSelect.name }}</a></li>
                        <div class="search-box">
                            <div class="search-input-box">
                                <Input type="text" autocomplete="off" :placeholder="placeholder"
                                    @keyup.enter.native="searchData" v-model="keyword"/>
                                <span class="search-input-btn">
                                <Button type="default" @click="searchData">搜索</Button>
                            </span>
                            </div>
                        </div>
                    </div>
                </ul>
                <div class="search-click-hide" v-show="isShowMenu" @click="showMenu"></div>
            </div>
        </Row>

    </div>
</template>

<script>
    import $api from "@/api/item/item_detail/index.js";

    export default {
        name: 'select-user',
        props: {
            // 下拉列表是否要显示ID
            isShowId: {
                type: Boolean,
                default: true
            },
            // 下拉列表的数据源获取的地址
            dataSourceUrl: {
                type: String,
                default: ''
            },
            // 默认选择的
            defaultSelect: {
                type: Object,
                default: () => {
                    return {name: '请选择', id: ''}
                }
            },
            // 搜索输入框的默认文案
            placeholder: {
                type: String,
                default: '请输入关键字'
            },
            // 类型（目前只有商业和写字楼排行需要传）
            type: {
                type: String,
                default: ''
            },
            // 下拉列表数据
            listData: {
                type: Array,
                default: () => {
                    return []
                }
            },
            /**
             * 初始化的时候是否自动请求接口，获取用户数据
             */
            isInit: {
                type: Boolean,
                default: false
            },
            // 需要选中的用户ID
            selectId: {
                type: String,
                default: ''
            }
        },
        data() {
            return {
                isShowMenu: false,  // 是否显示下拉列表
                items: [],  // 下拉列表的数据
                callback: (data) => {
                },  // 选择下拉列表的某项，执行的callback方法
                theOne: {id: '', name: ''},  // 选中的某项 {id: '', name: ''}
                keyword: '',    // 关键字输入框的值
                isDisabled:false,
                dropDownPosition:false,  //默认下拉框放在下面位置
                list: []
            }
        },
        watch: {
            defaultSelect(val) {
                this.theOne = val
            },
            listData() {
                this.items = this.listData
                this.setDefaultSelect(this.selectId);
            }
        },
        created() {
            if(this.isInit == false) {
                this.items = this.listData
                this.setDefaultSelect(this.selectId);
            } else {
                this.searchUserData();
            }
            if(this.selectId) {
                this.select(this.selectId)
            }
            this.theOne = this.defaultSelect
        },
        methods: {
            /**
             * 点击button，判断是否显示下拉列表
             */
            showMenu(e) {
                let clientY  = e.clientY;
                let windowH = window.innerHeight;
                let domH = 30*(this.items.length+1)+56;
                if(windowH-clientY>=domH){
                    this.dropDownPosition = false;
                }else{
                    this.dropDownPosition = true;
                }
                if(this.keyword != '') {
                    this.keyword = '';
                    this.items = JSON.parse(JSON.stringify(this.list));
                }
                this.isShowMenu = !this.isShowMenu
            },
            /**
             * 选择下拉列表某项
             * @param selectId
             */
            select: function (selectId) {
                this.theOne = JSON.parse(JSON.stringify(this.defaultSelect))  
                for (var i = 0; i < this.items.length; i++) {
                    if (this.items[i].id == selectId) {
                        this.theOne = this.items[i]
                        break
                    }
                }
                this.setCache();
                this.callback(this.theOne)
                this.$emit('selected', this.theOne)
                this.isShowMenu = false
            },
            /**
             * 搜索
             */
            searchData() {
                let url = this.dataSourceUrl
                if (this.dataSourceUrl === '') {
                    return false
                }
                let formData = {name: ''}
                if (this.keyword !== '') {
                    formData.name = this.keyword
                }
                if(this.type !== ''){
                    formData.type = this.type
                }
                this.searchUserData(formData);
            },
            setSelectDisabled(){
                this.isDisabled = true
            },
            resetSelectDisabled(){
                this.isDisabled = false
            },
            async searchUserData(formData = {}) {
                let response = await $api.getSearchUser(formData);
                this.items = response.data;
                if(Object.keys(formData).length == 0) {
                    this.list = JSON.parse(JSON.stringify(this.items));
                }
                this.setDefaultSelect(this.selectId);
            },
            setSelect(select) {
                this.theOne = JSON.parse(JSON.stringify(select));
            },
            setDefaultSelect: function (selectId) { 
                this.theOne = JSON.parse(JSON.stringify(this.defaultSelect))
                for (var i = 0; i < this.items.length; i++) {
                    if (this.items[i].id == selectId) {
                        this.theOne = this.items[i]
                        break
                    }
                }
                this.getCache(selectId);
            },
            /**
             * 设置用户搜索后的localStorage
             * @author liuhuanyu & 2020-1-14 15:47:59
             */
            setCache() {
                if(this.theOne.id == '') {
                    return false;
                }
                let users = window.localStorage.getItem("select_user");
                if(!users) {
                    users = [];
                } else {
                    users = JSON.parse(users);
                }
                let selectUser = {uid: this.theOne.id, username: this.theOne.name};
                let arr = [];
                arr.push(selectUser);
                users.map((item,index) => {
                    // 判断id是否存过
                    if(item.uid != this.theOne.id) {
                        arr.push(item);
                    }
                    return true;
                })
                window.localStorage.setItem("select_user", JSON.stringify(arr));
            },
            /**
             * 获取用户搜索后的localStorage
             * @author liuhuanyu & 2020-1-14 15:47:59
             */
            getCache(selectId) {
                if(!selectId) {
                    return false;
                }
                let users = window.localStorage.getItem('select_user')
                if(users) {
                    users = JSON.parse(users);
                    users.map(user => {
                        if(user.uid == selectId) {
                            this.theOne = {id: selectId, name: user.username};
                        }
                    })
                }
            }
        },
    }
</script>

<style scoped lang="less">
    @import './select_user.less';
</style>
<style>
    .search-input-box input {
        display: table-cell;
        width: 98%;
    }
</style>
