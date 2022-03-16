<template>
    <card class="my-add-list" :padding="16">
        <tis-table :theadHeight="48" :midTdWidth="widthArr" table-id="id8" :cur-id-idx='curIdIdx' :tableHeight="48" :isZebra="true" class="list-table">
            <tr slot="table-head">
                <th></th>
                <th>合同ID</th>
                <th>合同名称</th>
                <th>甲方</th>
                <th>乙方</th>
                <th class="need-center">主合同</th>
                <th class="need-center">收付款</th>
                <th>合同分类</th>
                <th>签订时间</th>
                <th>执行时间</th>
                <th>审批状态</th>
                <th>操作</th>
            </tr>
            <tr slot="table-body" v-for="(item,index) in listData.list" :key="item.id" @mouseenter="e =>{ getIdIdx(e,'id8',index) }" @mouseleave="e =>{ getIdIdx(e,'id8',null) }">
                <td class="checkbox">
                    <tis-checkbox @on-change="selectSingle(item.id)" :value="selectIds.indexOf(item.id) > -1"></tis-checkbox>
                </td>
                <!-- 合同ID -->
                <td>{{item.id}}</td>
                <!-- 合同名称 -->
                <td><span><a :href="'/all_contract/detail/' + item.id" target="_blank">{{item.title}}</a></span></td>
                <!-- 甲方 -->
                <td><p class="hide-dot" v-for="(value,key) in item.partyA" :key="key">{{value}}</p></td>
                <!-- 乙方 -->
                <td><p class="hide-dot" v-for="(value,key) in item.partyB" :key="key">{{value}}</p></td>
                <!-- 是否为主合同 -->
                <td class="need-center">{{item.isMainName}}</td>
                <!-- 收付款类型 -->
                <td class="need-center">{{item.payTypeName}}</td>
                <!-- 合同分类 -->
                <td><p v-for="(value,key) in item.contractCate" :key="key">{{value}}</p></td>
                <!-- 签订时间 -->
                <td>{{item.signTimeDate}}</td>
                <!-- 执行时间 -->
                <td v-if="item.execStartTimeDate === '-' && item.execEndTimeDate === '-'"><span class="date-s">-</span></td>
                <td v-else><span class="date-s">{{item.execStartTimeDate}}</span> ~ <span class="date-e">{{item.execEndTimeDate}}</span></td>
                <!-- 审批状态 -->
                <td>{{item.approvalStatusName}}</td>
                <td><span><a :href="'/all_contract/detail/' + item.id" target="_blank">查看</a></span></td>
            </tr>
        </tis-table>
        <div class="default-tips" v-if="listData.count == 0 && this.$route.name == 'approve_my_add'">暂无匹配数据</div>
        <div class="list-bottom">
            <div class="bottom-left">
                <tis-checkbox  @on-change="selectAll" v-model="allChecked"><span class="checkbox-text">全选</span></tis-checkbox>
                <tis-button v-if="isShowButton" ref="recycleBtn" type="primary" >批量推送</tis-button>
            </div>
            <Page
                v-if="listData.count>10"
                @on-change="handlePage"
                @on-page-size-change="handlePageSize"
                :total="parseInt(listData.count)"
                :current="parseInt(searchData.page)"
                :page-size="parseInt(searchData.pageSize)"
                show-elevator
                show-total
                show-sizer />
        </div>
    </card>
</template>
<script>
import utils from '@/utils.js';
import $api from "@/api/index.js";
import ApplyCard from "@/components/apply_card/ApplyCard";
import TwiceConfirm from "@/components/twice_confirm/TwiceConfirm.vue";
import ListSort from "@/components/list_sort/ListSort.vue"
import Cookie from "js-cookie";
import Card from '../../../../components/card/Card.vue';
    export default {
        name:'',
        components: {
            ApplyCard,
            TwiceConfirm,
            ListSort,
            Card
        },
        props:{
            //表格数据
            listData: {
                type: Object,
                default: () => {
                    return {}
                }
            },
            // //数据总数
            tableCount: {
                type: Number,
                default: 0,
            },
            // 是否显示批量回收相关
            isShowButton: {
                type: Boolean,
                default: true,
            },
            //暂无数据文案的控制状态
            isShowDefaultTips:{
                type: Boolean,
                default: false,
            },
            searchData:{//搜索项数据
                type:Object,
                default:()=>{return {}}
            }
        },
        data () {
            return {
                widthArr:[5,8,20,20,20,8,8,10,9,18,9,8],//宽度数组
                selectIds:[],//选中的id数组
                allChecked:false,//是否全选
                curIdIdx:null,
            }
        },
        watch: {
            
        },
        created(){
        },
        mounted() {
        },
        methods:{
            /**
             * 处理当前页派发事件
             * @param {Number} page 当前页
             */
            handlePage(page) {
                this.$emit("change-page",{"page":page,"pageSize":this.searchData.pageSize});
            },
            /**
             * 处理分页最大显示条数派发事件
             * @param {Number} pageSize 当前显示条数
             */
            handlePageSize(pageSize) {
                this.$emit("change-page-size",{"page":1,"pageSize":pageSize});
            },
            /**
             * 列表时间排序
             * @param {string} rule 规则
             */
            doSort(rule){
                let newRule = rule ===''?'':rule;
                this.$emit("change-order",newRule);
            },
            /**
             * 给子组件传递当前表格的id和当前hover的tr的索引值
             * @param {Object} e 鼠标事件对象
             * @param {String} tableId 表格id
             * @param {String} TrIdx 当前hover的tr的索引
             */
            getIdIdx(e,tableId,TrIdx){
                this.curIdIdx = {
                    tableId,
                    TrIdx
                };
            },
            /**
             * 单选
             * @param {String} 选中的数据
             */
            selectSingle(id){
                let index = this.selectIds.indexOf(id);
                if (index === -1) {
                    this.selectIds.push(id);
                } else {
                    this.selectIds.splice(index, 1);
                }
                this.allChecked = this.selectIds.length === this.listData.list.length;
            },
            /**
             * 多选
             * @param {Boolean} 是否选中多选按钮
             */
            selectAll(bool){
                if(!bool){
                    this.selectIds = [];
                }else{
                    if(this.listData.list){
                        for(let i in this.listData.list){
                            if (this.selectIds.indexOf(this.listData.list[i].id) == -1) {
                                this.selectIds.push(this.listData.list[i].id);
                            }
                        }
                    }
                }
            },
            /**
             * 初始化checkbox
             */
            initCheckbox(){
                this.allChecked = false;
                this.selectIds = [];
            },
        }
    }
</script>

<style lang="less">
@import './list.less';
</style>