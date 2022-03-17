<template>
    <div class="my-add-content">
        <search ref="searchDeal" class="add-search"
        :search-data="searchData"
        @select-search="selectSearch"
        :btn-loading="loading"
        @reset-search="selectSearch"></search>
        <div class="list-box">
            <tis-spin fix v-if="loading"></tis-spin>
            <div class="spin-box">
                <list 
                ref="tableList"
                class="margin-top-16"
                :list-data="listData"
                :search-data="searchData"
                @change-page="handlePage"
                @change-page-size="handlePageSize"
                >
                </list>
            </div>
        </div>
    </div>
</template>
<script>
import $api from "@/api/index.js";
import Search from './business/Search';
import List from './business/List';
import { createNamespacedHelpers } from 'vuex'
const { mapState, mapGetters, mapMutations, mapActions } = createNamespacedHelpers('demo')
    export default {
        name:'',
        components: {
            Search,
            List,
        },
        data () {
            return {
                pageType : 'my_all_list',
                isShowButton: true, // 是否显示批量回收按钮
                searchSet:true,//用来区分是否在列表页,
                isShowDefaultTips:false,
                searchData: {
                    isRecovery: '',
                    approvalStatus: '', //合同状态
                    isCollect: '',  // 是否收藏
                    signType: '',   // 盖章类型
                    isReadd: '',    // 是否为补录合同
                    isRead: '',     // 是否已查看
                    addUser: '',    // 录入人
                    addUserGroupId: '', // 录入人部门
                    partyA: '', // 甲方
                    partyB: '', // 乙方
                    isMain: '',  // 是否为主合同
                    carrierId: '',   //载体
                    contractId: '',  // 合同
                    itemId: '',  // 项目
                    execTime: '',    // 执行时间
                    signTime: '',   // 签订时间
                    companySealId: '', // 归档公司
                    minMoney: '',    // 最小金额
                    maxMoney: '',    // 最大金额
                    page: 1,
                    pageSize: 10
                },
                listData: {},   // table数据
                loading: false,
            }
        },
        computed:{//获取地区数据
            ...mapGetters(['num'])
        },
        created(){
            this.init();
            this.getAllContractList();
        },
        mounted(){
            this.changeNum();
        },
        methods:{
            /**
             * 初始化列表
             */
            init(){
                let query = this.$route.query;
                this.searchData = Object.keys(query).length === 0 ?this.searchData:Object.assign(this.searchData,query);
                //更新子组件的searchData
                this.$nextTick(()=>{
                    this.$refs.searchDeal.searchData = this.searchData;
                    //判断是否出现重置按钮
                    this.$refs.searchDeal.resetJuged();
                    //判断是否展开
                    this.$refs.searchDeal.setToggleStatus();
                    //每次搜索清空复选框选中状态
                    this.$refs.tableList.initCheckbox();
                })
                //根据搜索项请求列表数据
                this.getAllContractList(this.searchData);
            },
            /**搜索 */
            selectSearch(){
                this.searchData.page = 1;
                this.jumpRoute();
            },
            /**
             * 将搜索项拼到路由上
             */
            jumpRoute(){
                let searchObj = {};
                for(let i in this.searchData){
                    if(this.searchData[i] && (this.searchData[i][0] || typeof(this.searchData[i]) == 'number')){
                        this.$set(searchObj,i,this.searchData[i]);
                    }
                }
                this.$router.push({
                    query : searchObj,
                });
                this.getAllContractList(searchObj);
                this.$nextTick(()=>{
                    //判断是否出现重置按钮
                    this.$refs.searchDeal.resetJuged();
                })
            },
            /**
             * 分页器触发事件
             * @param {Object} pageData 分页器回调参数
             */
            handlePage(pageData){
                this.searchData.page = pageData.page;
                this.jumpRoute();
            },
            /**
             * 改变每页展示条数
             * @param {String} pageSize 分页器的每页条数
             */
            handlePageSize(pageSize){
                this.searchData.page = 1;
                this.searchData.pageSize = pageSize;
                this.jumpRoute();
            },
            /**
             * 获取全部合同列表数据
             * @param {Object} searchData 搜索项
             */
            async getAllContractList(searchData){
                this.loading = true;
                let res = await $api.getAllContractList(searchData);
                this.loading = false;
                if (res.code == 200) {
                    this.listData = res.data;
                }else{
                    this.$TisMessage.error(res.message);
                }
            },
            ...mapActions(['changeNum'])
        }
    }
</script>

<style lang="less">
@import './my_add.less';
</style>