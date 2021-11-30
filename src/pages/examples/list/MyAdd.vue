<template>
    <div class="my-add-content">
        <search ref="searchDeal" class="add-search"
        @select-search="selectSearch"
        :btn-loading="buttonLoading"
        @is-show-Reset="isShowReset"></search>
        <div class="list-box">
            <tis-spin fix v-if="SpinStatus"></tis-spin>
            <div class="spin-box">
                <div v-if="isShowTip">
                    <div class="list-tip" v-if="approve >= 0">
                        当前共拥有名片 <span class="tip-count">{{ ownNumber }}</span> 张，
                        含成交项目 <span class="tip-count">{{ dealNumber }}</span> 张
                    </div>
                    <div class="list-tip" v-else>
                        当前共拥有名片 <span class="tip-count">{{ ownNumber }}</span> 张，
                        请您尽快回收无用名片！
                    </div>
                </div>
                <list
                    ref="tableDeal"
                    class="add-list"
                    @change-page="handlePage"
                    @change-order="handleOrder"
                    @refresh="init"
                    :is-show-default-tips="isShowDefaultTips"
                    :table-data="listData"
                    :table-count="listCount">
                </list>
            </div>
        </div>
    </div>
</template>
<script>
import Search from './business/Search';
import List from './business/List';
import listMixins from "@/mixins/list.js";
    export default {
        name:'',
        components: {
            Search,
            List,
        },
        mixins:[listMixins],
        data () {
            return {
                pageType : 'my_all_list',
                isShowButton: true, // 是否显示批量回收按钮
                isShowTip: false, // 是否显示名片数量提示
                searchSet:true,//用来区分是否在列表页,
                isShowDefaultTips:false
            }
        },
        watch: {
            '$route.name'(newVal){
                this.SpinStatus = true
                this.$refs.searchDeal.handleSearch()
            }
        },
        created(){
            this.init();
            this.initTip();
        },
        methods:{
            /**
             * 根据页面显示名片数量提示
             * 只有全局列表显示
             */
            initTip() {
                if (this.$route.name === 'approve_my_add') {
                    this.isShowTip = true
                } else {
                    this.isShowTip = false
                }
            },
            
        }
    }
</script>

<style lang="less">
@import './my_add.less';
</style>