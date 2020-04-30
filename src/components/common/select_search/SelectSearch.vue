<!--
    下拉搜索组件（类似于mms下拉搜索）
    事件派发：
    selected事件：手动选择下拉某项时，触发，参数为：{id: '', name: ''}
    搜索操作：
    searchData方法：参数为{name: ''}，搜索的接口url需要从父组件传递（dataSourceUrl）
-->
<template>
    <div>
        <Row>
            <div class="select-search-body">
                <Button class="select-search-btn" @click="showMenu" :disabled="isDisabled">
                    <div class="select-search-text" :class="{'open-select':isShowMenu}">
                        <span class="select-search-select-text" :class="{'search-placeholder':theOne.id==''}">{{theOne.name}}</span>
                        <i class="ivu-icon ivu-icon-ios-arrow-down ivu-cascader-arrow"></i>
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
                        <li v-if="defaultSelect.id == ''" @click="select()"><a :title="defaultSelect.name" class="select-business">{{
                            defaultSelect.name }}</a></li>
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
    import $http from '@/resource'

    export default {
        name: 'select-search',
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
            // 默认选择的id
            defaultId: {
                type: Number,
                default:0
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
            }
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
                new Promise((resolve) => {
                    $http.get(url, {params: formData}).then(response => {
                        if (response.code === '200') {
                            resolve(response)
                        }
                    })
                }).then(response => {
                    this.items = response.data
                })
            },
            setDefaultData() {
                let searchUsers = JSON.parse(window.localStorage.getItem('searchUsers'));
                for (var i = 0; i < searchUsers.length; i++) {
                    if (searchUsers[i].id == this.defaultId) {
                        this.theOne = searchUsers[i]
                        break
                    }
                }
            },
            setSelectDisabled(){
                this.isDisabled = true
            },
            resetSelectDisabled(){
                this.isDisabled = false
            }
        },
        watch: {
            defaultSelect(val) {
                this.theOne = val
            },
            defaultId(){
                this.setDefaultData();
            },
            listData() {
                this.items = this.listData
            }
        },
        mounted() {
            this.setDefaultData();
        },
        created() {
            this.theOne = this.defaultSelect;
            this.items = this.listData
        }
    }
</script>

<style scoped lang="less">
    @import './select_search.less';
</style>
<style lang="less">
    .search-input-box input {
        display: table-cell;
        width: 98%;
    }
    .select-search-body{
        .ivu-cascader-arrow{
            right:0;
        }
    }
    .open-select{
        .ivu-cascader-arrow{
            transform: translateY(-50%) rotate(180deg);
        }
    }
</style>
