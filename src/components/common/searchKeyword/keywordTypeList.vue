<template>
    <div class="col-lg-12" id="search-keyword-container">
        <input type="text" id="show-keyword" class="  keyword-text ivu-input ivu-input-default"
               :placeholder="tip"
               @keyup.ctrl.86="clear"
               @keyup="showSearchKeyword($event, showKeyword)"
               v-model="showKeyword"
               @blur="blurKeyword"
               @keyup.enter="handleSearch"
               @focus="focusKeyword" autocomplete="off">
        <!-- 关键字搜索类型选择 -->
        <div class="keyword-search-div">
            <ul class="keyword-search col-lg-12" v-show="searchShow" v-cloak>
                <li v-for="item in searchKeywordList" @click="handleSearch" @mousedown="selectKeywordType(item)">{{item.text}}</li>
            </ul>
        </div>
        <input type="hidden" name="keyword" v-model="keyword">
        <input type="hidden" name="keyword_type" v-model="keywordType">
    </div>
</template>

<script>
    export default {
        props: {
            // 搜索类型列表
            keyword_type_list: {
                type: Array,
                default: []
            },
            // 默认显示的关键字类型
            default_keyword_type: {
                type: String,
                default: ''
            },
            // 默认显示的关键字
            default_keyword: {
                type: String,
                default: ''
            },
            //placeholder
            tip: {
                type : String,
                default : "编号 MOT名称 项目ID 项目名称 合同名称 企业名称 新注册公司",
            }
        },
        data(){
            return {
                keyword: '',
                keywordType: '',
                showKeyword: '',
                searchShow: false,
                searchKeywordList: [],
            }
        },
        methods: {
            init(){
                this.keyword = "";
                this.keywordType = "";
                this.showKeyword = "";
                this.searchShow = false;
                this.searchKeywordList = "";
            },
            /**
             * @event
             *
             * 处理搜索点击事件
             *
             */
            handleSearch(){
                this.$emit('select-search',this.searchData)
            },
            // 清除空格
            clear(event){
                this.showKeyword=event.target.value.replace(/\s*/g,"");
            },
            // 搜索关键字显示类型列表
            showSearchKeyword: function(e, val){
                // val = val.replace(/\s*/g,"");
                this.getIsAllSearch(val);
                if(val.indexOf('：') != -1){
                    let keywordArr = val.split('：');
                    val = keywordArr[1];
                }
                this.searchKeywordList = [];
                if(val != '' && val != null){
                    this.keyword = val;
                    for(let i in this.keyword_type_list){
                        let item = {
                            type: this.keyword_type_list[i].type,
                            name: this.keyword_type_list[i].name,
                            text: this.keyword_type_list[i].name + '：' + val,
                            val: val,
                        }
                        this.searchKeywordList.push(item);
                    }
                    this.searchShow = true;
                }else{
                    this.keyword = '';
                    this.searchShow = false;
                }
                let params = {keyword: this.keyword, keywordType: this.keywordType};
                this.$emit('search', params);
            },
            // 选择关键字搜索类型
            selectKeywordType: function(item){
                this.showKeyword = item.text;
                this.keyword = item.val;
                this.keywordType = item.type;
                this.searchShow = false;
                // 回调
                let params = {keyword: this.keyword, keywordType: this.keywordType};
                this.$emit('search', params);
                this.handleSearch();
            },
            // 关键字文本框失去焦点
            blurKeyword: function(){
                this.searchShow = false;
            },
            // 关键字文本框有焦点
            focusKeyword: function(){
                let val = this.keyword;
                if(val == '' || val == null){
                    this.searchShow = false;
                    return false;
                }
                if(val.indexOf('：') != -1){
                    let keywordArr = val.split('：');
                    val = keywordArr[1];
                }
                this.searchKeywordList = [];
                if(val != '' && val != null){
                    for(let i in this.keyword_type_list){
                        let item = {
                            type: this.keyword_type_list[i].type,
                            name: this.keyword_type_list[i].name,
                            text: this.keyword_type_list[i].name + '：' + val,
                            val: val,
                        }
                        this.searchKeywordList.push(item);
                    }
                    this.searchShow = true;
            }
            },
            getIsAllSearch: function(keyword){
                let isAll = true;
                for(let i in this.keyword_type_list){
                    // 删除搜索类型，则搜索全部
                    if(keyword.indexOf(this.keyword_type_list[i].name) != -1){
                        isAll = false;
                        break;
                    }
                }
                if(isAll == true){
                    this.keywordType = '';
                }
            }
        },
        computed: {
            keywordTypeArr: function(){
                let arr = [];
                for(let i in this.keyword_type_list){
                    arr.push(this.keyword_type_list[i].name);
                }
                return arr;
            }
        },
        ready: function(){
            // 初始化关键字搜索类型
            if(this.default_keyword_type){
                let keywordType = '';
                for(let i in this.keyword_type_list){
                    if(this.keyword_type_list[i].type == this.default_keyword_type){
                        keywordType = this.keyword_type_list[i].name;
                    }
                }
                this.showKeyword = keywordType + '：' + this.default_keyword;
                this.keyword = JSON.parse(JSON.stringify(this.default_keyword));
                this.keywordType = JSON.parse(JSON.stringify(this.default_keyword_type));
            }else{
                this.showKeyword = JSON.parse(JSON.stringify(this.default_keyword));
                this.keyword = JSON.parse(JSON.stringify(this.default_keyword));
            }
        }

    };
</script>
<style scoped>
    @import "./keywordTypeList.less";
</style>
