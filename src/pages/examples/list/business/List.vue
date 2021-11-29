<template>
    <div class="my-add-list">
        <tis-table :theadHeight="48" :midTdWidth="widthArr" :tableHeight="48" :isZebra="true" class="list-table">
            <tr slot="table-head">
                <th style="width:3%;"><Checkbox @on-change="selectAll" v-model="allChecked"></Checkbox></th>
                <th style="width:4%;">编号</th>
                <th style="width:5%;">姓名</th>
                <th style="width:10%;">所属企业</th>
                <th style="width:7%;">职位</th>
                <th style="width:6%;">
                    <label class="time-pointer" v-if="searchData.order ==='create_time_asc'" @click="doSort('create_time_desc')">
                        录入时间
                        <i class="fa fa-sort-asc"></i>
                    </label>
                    <label class="time-pointer" v-else-if="searchData.order ==='create_time_desc'" @click="doSort('')">
                        录入时间
                        <i class="fa fa-sort-desc"></i>
                    </label>
                    <label class="time-pointer"  v-else @click="doSort('create_time_asc')">
                        录入时间
                        <i class="fa fa-sort"></i>
                    </label>
                </th>
                <th style="width:6%;">
                    <label class="time-pointer"  v-if="searchData.order ==='update_time_asc'" @click="doSort('update_time_desc')">
                        更新时间
                        <i class="fa fa-sort-asc"></i>
                    </label>
                    <label class="time-pointer"  v-else-if="searchData.order ==='update_time_desc'" @click="doSort('update_time_asc')">
                        更新时间
                        <i class="fa fa-sort-desc"></i>
                    </label>
                    <label v-else @click="doSort('update_time_asc')"  class="icon-box time-pointer">
                        更新时间
                        <i class="fa fa-sort"></i>
                    </label>
                </th>
                <th style="width:9%;">操作</th>
            </tr>
            <tr slot="table-body" v-for="(item,index) in tableData" :key="index">
                <td><Checkbox @on-change="selectOne(item.id)" :value="selectIds.indexOf(item.id) > -1"></Checkbox></td>
                <td>{{item.id}}</td>
                <td><span class="name-link" :title="item.name" @click="detailInfo(item.id,item.operation)">{{item.name}}</span></td>
                <td>{{item.info}}</td>
                <td>{{item.zhiwu}}</td>
                <td>{{item.addtime}}</td>
                <td>{{item.updatetime}}</td>
                <td>
                    <div class="btn-box">
                        <span class="on-btn" @click="detailInfo(item.id,item.operation)"><i class="fa fa-search"/> 详情&emsp;</span>
                        <span class="on-btn" @click="applyCard(item.id,item.name,item.manager,item.managerName)" v-if="item.authStatusTitle && item.authStatus=='201'">{{item.authStatusTitle}}&emsp;</span>
                        <span class="on-btn" v-if="item.authStatusTitle && item.authStatus=='202'">{{item.authStatusTitle}}&emsp;</span>
                        <span class="on-btn" @click="changeRecycleShow(item.id)"><i class="fa fa-trash-o"/> 回收&emsp;</span>
                    </div>
                </td>
            </tr>
        </tis-table>
        <!-- <div class="default-tips hide-footer" v-if="!isShowDefaultTips && this.$route.name === 'approve_my_add'">请在输入框中输入您要搜索的关键词，点击搜索即可从{{countAllNum}}条联系人数据中查找您需要的信息！</div> -->
        <div class="default-tips" v-if="isShowDefaultTips && tableCount === 0 && this.$route.name === 'approve_my_add'">暂无匹配数据</div>
        <div class="default-tips" v-if="tableCount === 0 && this.$route.name === 'all_list'">暂无匹配数据</div>
        <div class="list-bottom">

            <div class="bottom-left">
                <tis-checkbox  @on-change="selectAll" v-model="allChecked"><span class="checkbox-text">全选</span></tis-checkbox>
                <tis-button v-if="isShowButton" ref="recycleBtn" :loading="recycleLoading" type="default" @click="changeRecycleShowBatch">批量回收</tis-button>
            </div>
            <Page   
                class="page-box"
                :total="tableCount"
                :current="Number(searchData.page)"
                :page-size="Number(searchData.pageSize)"
                @on-change="handlePage"
                @on-page-size-change="handlePageSize"
                :page-size-opts="pageSizeOpts"
                show-sizer
                show-total
                show-elevator>
                <slot>当前共{{tableCount}}条记录，本页共{{tableData.length}}条记录</slot>
            </Page>
        </div>
        <tis-modal v-model="recycleShow" :footerHide="true" :mask-closable="false">
            <div class="ivu-modal-confirm">
                <div class="ivu-modal-confirm-head">
                    <div class="ivu-modal-confirm-head-icon ivu-modal-confirm-head-icon-confirm">
                        <i class="ivu-icon ivu-icon-ios-help-circle"></i>
                    </div>
                    <div class="ivu-modal-confirm-head-title">您确定要这么做吗?</div>
                </div>
                <div class="ivu-modal-confirm-body">
                    <div><p>{{ recycleTip }}</p></div>
                </div>
                <div class="ivu-modal-confirm-footer">
                    <tis-button @click="hideRecycle()" type="default" size='large' class="ivu-btn ivu-btn-text ivu-btn-large">
                        <span>取消</span>
                    </tis-button>
                    <tis-button @click="recycle()" type="primary" size='large'>
                        <span>确定</span>
                    </tis-button>
                </div>
            </div>
        </tis-modal>
        <apply-card ref="applyCardModal" :more-card-modal="moreCardModal" @update-is-auth="updateIsAuth" :apply-info="baseInfo"></apply-card>
    </div>
</template>
<script>
import utils from '@/utils.js';
import $api from "@/api/contacts_card/index.js";
import $itemOneApi from "@/api/item/item_detail/index.js";
import ApplyCard from "@/components/apply_card/ApplyCard"
import Cookie from "js-cookie";
import listMixins from "@/mixins/list.js";
    export default {
        name:'',
        components: {
            ApplyCard
        },
        mixins:[listMixins],
        props:{
            //表格数据
            tableData: {
                type: Array,
                default: () => {
                    return []
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
            }
        },
        data () {
            return {
                widthArr:[3,4,5,10,7,6,6,9],//宽度数组
                pageSizeOpts:[10,20,30,40,50,100,200,300,400,500],
                selectIds:[],//选中的id数组
                allChecked:false,//是否全选
                isShowRecovery:false,//控制是否回收，为了实现功能，暂时先不用
                recycleLoading: false, // 批量回收按钮loading
                recycleShow: false, // 回收modal显示状态
                recycleTip: '', // 回收弹窗提示语
                recycle_id: 0, // 单个回收id
                recycle_type: 'all', // 回收类型 single: 单个回收 all: 批量回收
                recycle_btn_loading: false, // 回收确认按钮loading
                moreCardModal:false,   //名片抽屉打开/关闭
                baseInfo:{},
                isAuth:null,
                //默认提示信息显示状态
                isShowDefaultTips:false,
                //联系人总数
                countAllNum:null,
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
                this.searchData.page = page;
                this.$emit("change-page",{"page":this.searchData.page,"pageSize":this.searchData.pageSize});
            },
            /**
             * 手动设置页码数
             * @param {int} page 页码
             * @param {int} pageSize 单页条数
             */
            setPageOptions(page,pageSize) {
                this.searchData.page = page ? parseInt(page) : 0;
                this.searchData.pageSize = pageSize ? parseInt(pageSize) : 10;
            },
            /**
             * 处理分页最大显示条数派发事件
             * @param {Number} pageSize 当前显示条数
             */
            handlePageSize(pageSize) {
                this.searchData.page = 1;
                this.searchData.pageSize = pageSize;
                this.$emit("change-page",{"page":this.searchData.page,"pageSize":this.searchData.pageSize});
            },
            /**
             * 列表时间排序
             * @param {string} rule 规则
             */
            doSort(rule){
                this.searchData.order = rule ===''?'':rule;
                this.$emit("change-order",rule);
            },
            /**
             * 单选
             */
            selectOne(id){
                let index = this.selectIds.indexOf(id);
                if (index === -1) {
                    this.selectIds.push(id);
                } else {
                    this.selectIds.splice(index, 1);
                }
                this.allChecked = this.selectIds.length === this.tableData.length;
            },
            /**
             * 多选
             */
            selectAll(){
                if(this.allChecked==false){
                    this.selectIds = [];
                }else{
                    if(this.tableData){
                        for(let i in this.tableData){
                            if (this.selectIds.indexOf(this.tableData[i].id) === -1) {
                                this.selectIds.push(this.tableData[i].id);
                            }
                        }
                    }
                }
            },
            /**
             * 批量回收tip
             */
            changeRecycleShowBatch() {
                if (this.selectIds.length === 0) {
                    utils.notice('请选择要回收的联系人')
                    return false
                }
                this.recycle_type = 'all'
                this.recycleShow = true
                this.recycleTip = '回收后无法再直接查看联系人信息，您确认要回收所选的联系人吗？'
                this.$refs.recycleBtn.$el.blur()
            },
            /**
             * 单独回收
             */
            changeRecycleShow(id) {
                this.recycle_id = id
                this.recycle_type = 'single'
                this.recycleShow = true
                this.recycleTip = '回收后无法再直接查看联系人信息，您确认要回收该联系人吗？'
                this.$refs.recycleBtn.$el.blur()
            },
            /**
             * 隐藏弹窗
             */
            hideRecycle() {
                this.recycleShow = false
            },
            /**
             * 回收确认
             */
            recycle() {
                if (this.recycle_type == 'single') {
                    this.cardRecovery(this.recycle_id)
                } else {
                    this.recycleAll()
                }
                this.recycleShow = false
            },
            /**
             * 批量回收
             */
            async recycleAll() {
                this.recycleLoading = true;
                let obj = {
                    cardId:this.selectIds,
                    uid:Cookie.get('uid')
                };
                let res = await $itemOneApi.delCardAuth(obj);
                if(res.code == 200){
                    utils.notice("操作成功",'success');
                    this.$emit("refresh");
                }else {
                    utils.notice(res.msg,'error');
                }
                this.recycleLoading = false;
            },
            /**
             * 名片回收
             * @params cardId 名片id
             */
            async cardRecovery(cardId){
                let obj = {
                    cardId:cardId,
                    uid:Cookie.get('uid')
                };
                let res = await $itemOneApi.delCardAuth(obj);
                if(res.code == 200){
                    utils.notice("操作成功",'success');
                    this.$emit("refresh");
                }else {
                    utils.notice(res.msg,'error');
                }
            },
            /**
             * 获取联系人基本信息
             */
            async getBaseInfo(itemId){
                this.baseInfo = {}
                let res = await $api.getContactBase({
                    cardId:itemId,
                    uid:Cookies.get('uid')
                });
                if(res.code != '200'){
                    if(res.code !=='403'){
                        utils.notice(res.msg,'error')
                    }
                    return false;
                }
                this.baseInfo = res.data;
            },
            /**
             * 更新状态
             */
            updateIsAuth(data){
                this.$nextTick(() => (this.isAuth = data));
                this.$emit('init-param-search')
            },
            /**
             * 处理查看详情
             * @param {Number} id 名片id
             * @param {string} operation 是否查看 0=有查看记录权限并且未过期 1=查看已过期  2=无权限
             */
            detailInfo(id,operation = '1'){
                let url = this.$router.resolve({
                    name: "detail",
                    params:{item_id:id}
                });
                window.open(url.href);
                window.opener = null;
            },
            /**
             * 初始化计算所有联系人总数
             */
            async calAllSum(){
                if (this.$route.name==="approve_my_add"){
                    let res = await $api.calAllSum();
                    if (res.code == 200){
                        if (res.data<10000){
                            this.countAllNum = res.data
                        }else{
                            this.countAllNum = String(res.data/10000).split(".")[0] + "万"
                        }
                    }
                }
            },
        }
    }
</script>

<style lang="less">
@import './list.less';
</style>