<template>
    <div class="my-add-content">
        <search ref="searchDeal" class="add-search"
        @select-search="selectSearch"
        :button-loading="buttonLoading"
        @is-show-Reset="isShowReset"></search>
        <div class="list-box">
            <my-spin  v-if="SpinStatus"></my-spin>
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
                    :list-data="listData"
                    :list-count="listCount">
                </list>
            </div>
        </div>
    </div>
</template>
<script>
import MySpin from '@/components/common/my_spin/MySpin.vue';
import Search from './business/Search';
import List from './business/List';
import listMixins from "@/mixins/list.js";
    export default {
        name:'',
        components: {
            Search,
            List,
            MySpin
        },
        mixins:[listMixins],
        data () {
            return {
                pageType : 'my_all_list',
                isShowButton: true, // 是否显示批量回收按钮
                isShowTip: false, // 是否显示名片数量提示
                searchSet:true,//用来区分是否在列表页
            }
        },
        computed:{
            approve(){
                return Number(this.limitNumber)-Number(this.listCount)
            }
        },
        watch: {
            '$route.name'(newVal){
                this.SpinStatus = true
                // this.pageType = newVal
                this.$refs.searchDeal.handleSearch()
                // this.initTip()
            }
        },
        created(){
            this.initTip();
            // this.getList(this.searchData);
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

<style lang="less" scoped>
@import './my_add.less';
</style>