<template>
    <div class="search-content">
        <div class="search-left">
            <tis-row :gutter="8" class="margin-bottom-8">
                <!-- 合同名称 -->
                <tis-col :span="8">
                    <tis-input class="title-input" clearable v-model="searchData.title" placeholder="合同名称/合同ID" ></tis-input>
                </tis-col>
                <!-- 是否为主合同 -->
                <tis-col :span="4">
                    <tis-select v-model="searchData.isMain" clearable placeholder="是否为主合同">
                        <tis-option v-for="(item, index) in mainList" :value="item.value" :key="index">{{ item.label }}</tis-option>
                    </tis-select>
                </tis-col>
                <!-- 收付款合同分类 -->
                <tis-col :span="12">
                    <tis-select-cascader
                        :is-select-next="false"
                        :not-found-text="notFoundText"
                        :list="contractCateList"
                        ref="selectCascader"
                        :fields="fields"
                        @select="selectData"
                        :default-select="searchData.defaultSelect"
                        :placeholder="placeholder"
                        :gutter="8"
                        :level="3">
                    </tis-select-cascader>
                </tis-col>
            </tis-row>
            <!-- 第二行搜索项 -->
            <tis-row :gutter="8" :class="searchShow ? 'margin-bottom-8': ''">
                <!-- 甲方 -->
                <tis-col :span="4">
                    <tis-input class="title-input" clearable v-model="searchData.partyA" placeholder="甲方" ></tis-input>
                </tis-col>
                <!-- 乙方 -->
                <tis-col :span="4">
                    <tis-input class="title-input" clearable v-model="searchData.partyB" placeholder="乙方" ></tis-input>
                </tis-col>
                <!-- 录入人 -->
                <tis-col :span="4">
                    <tis-select v-model="searchData.addUser" filterable clearable placeholder="录入人">
                        <tis-option v-for="(item, index) in addUserList" :value="item.uid" :key="index">{{ item.username }}</tis-option>
                    </tis-select>
                </tis-col>
                <!-- 录入人部门 -->
                <tis-col :span="4">
                    <tis-select v-model="searchData.addUserGroupId" filterable clearable placeholder="录入人部门">
                        <tis-option v-for="(item, index) in addUserGroupIdList" :value="item.id" :key="index">{{ item.name }}</tis-option>
                    </tis-select>
                </tis-col>
                <!-- 合同负责人 -->
                <tis-col :span="4">
                    <tis-select v-model="searchData.manager" filterable clearable placeholder="合同负责人">
                        <tis-option v-for="(item, index) in managerList" :value="item.uid" :key="index">{{ item.username }}</tis-option>
                    </tis-select>
                </tis-col>
                <!-- 归档公司 -->
                <tis-col :span="4">
                    <tis-select class="company-search" v-model="searchData.companySealId" filter-by-label filterable clearable placeholder="归档公司">
                        <tis-option v-for="(item, index) in companySealList" :label="item.name" :value="item.id" :key="index">{{ item.name }}</tis-option>
                    </tis-select>
                </tis-col>
            </tis-row>
            <!-- 第三行搜索项 -->
            <tis-row :gutter="8" class="margin-bottom-8" v-if="searchShow">
                <!-- 执行时间 -->
                <tis-col :span="8">
                    <tis-date-picker
                        :editable="false"
                        type="daterange"
                        :value="searchData.execTime"
                        placeholder="执行时间"
                        @on-change="changExecTime">
                    </tis-date-picker>
                </tis-col>
                <!-- 签订时间 -->
                <tis-col :span="8">
                    <tis-date-picker
                        :editable="false"
                        type="daterange"
                        :value="searchData.signTime"
                        placeholder="签订时间"
                        @on-change="changSignTime">
                    </tis-date-picker>
                </tis-col>
                <!-- 是否为补录合同 -->
                <tis-col :span="4">
                    <tis-select v-model="searchData.isReadd" placeholder="是否为补录合同">
                        <tis-option v-for="(item, index) in readdList" :value="item.value" :key="index">{{ item.label }}</tis-option>
                    </tis-select>
                </tis-col>
                <!-- 是否收藏 -->
                <tis-col :span="4">
                    <tis-select v-model="searchData.isCollect" clearable placeholder="是否收藏">
                        <tis-option v-for="(item, index) in collectList" :value="item.value" :key="index">{{ item.label }}</tis-option>
                    </tis-select>
                </tis-col>
            </tis-row>
            <!-- 第四行搜索项 -->
            <tis-row :gutter="8" v-if="searchShow">
                <!-- 合同金额 -->
                <tis-col :span="8">
                    <tis-splicing-input
                            type="section"
                            has-name="合同金额"
                            @change-input="changInput"
                            :default-text1="searchData.minMoney"
                            :default-text2="searchData.maxMoney"
                            input1-placeholder="最小值"
                            input2-placeholder="最大值">
                    </tis-splicing-input>
                </tis-col>
                <!-- 盖章类型 -->
                <tis-col :span="4">
                    <tis-select v-model="searchData.signType" clearable placeholder="盖章类型">
                        <tis-option v-for="(item, index) in signTypeList" :value="item.value" :key="index">{{ item.label }}</tis-option>
                    </tis-select>
                </tis-col>
                <!-- 是否已查看 -->
                <tis-col :span="4">
                    <tis-select v-model="searchData.isRead" clearable placeholder="是否已查看">
                        <tis-option v-for="(item, index) in readList" :value="item.value" :key="index">{{ item.label }}</tis-option>
                    </tis-select>
                </tis-col>
                <!-- 合同状态 -->
                <tis-col :span="4">
                    <tis-select v-model="searchData.approvalStatus" clearable placeholder="合同状态">
                        <tis-option v-for="(item, index) in approvalStatusList" :value="item.value" :key="index">{{ item.label }}</tis-option>
                    </tis-select>
                </tis-col>
                <!-- 是否为回收合同 -->
                <tis-col :span="4">
                    <tis-select v-model="searchData.isRecovery" clearable placeholder="是否为回收合同">
                        <tis-option v-for="(item, index) in isRecoveryList" :value="item.value" :key="index">{{ item.label }}</tis-option>
                    </tis-select>
                </tis-col>
            </tis-row>
        </div>
        <div class="search-right">
            <div class="right-button">
                <tis-button type="primary" :loading="btnLoading" @click="handleSearch">搜索</tis-button>
                <tis-button type="default" v-show="resetStatus"  @click="resetSearch">重置</tis-button>
                <div class="btn-none" v-show="!resetStatus"></div>
            </div>
            <div class="right-toggle">
                <p v-show="!searchShow" @click="searchShow = true">展开<span>+</span></p>
                <p v-show="searchShow" @click="searchShow = false">收起<span>-</span></p>
            </div>
        </div>
    </div>
</template>
<script>
    import utils from '@/utils.js';
    import $api from "@/api/index.js";
    import Cookie from "js-cookie";
    import config from '@/config.js';
    import {whetherArray} from "@/static_data/whether.js"
    export default {
        name:'',
        components: {
        },
        props:{
            btnLoading:{//搜索按钮的loading状态
                type: Boolean,
                default: true,
            },
            searchData:{//搜索项数据
                type:Object,
                default:()=>{return {}}
            }
        },
        data () {
            return {
                isRecoveryList: whetherArray,  // 是否为回收项目
                readList: whetherArray,   // 是否已查看
                readdList: whetherArray,  // 是否为补录合同下拉数据
                collectList: whetherArray,  // 是否收藏下拉数据
                signTypeList: [
                    { value: '1', label: '电子章' },
                    { value: '2', label: '实体章' }
                ],   // 盖章类型下拉数据
                approvalStatusList: [
                    { value: 'WAIT', label: '等待审批' },
                    { value: 'RUN', label: '审批中' },
                    { value: 'REFUSED', label: '已拒绝' },
                    { value: 'ACCEPT', label: '已通过' },
                    { value: 'CANCEL', label: '已撤销' },
                    { value: 'INVALID', label: '已作废' },
                ], //合同状态下拉数据
                addUserList: [],    // 录入人下拉数据
                addUserGroupIdList: [], //录入人部门下拉数据
                managerList: [],    // 负责人
                contractCateList: [],   // 收付款合同分类
                placeholder: ['收付款类型','合同一级分类','合同二级分类'],
                defaultSelect: [],  //收付款合同分类默认值
                fields: { id: 'id',name: 'name',children: 'children'},  // 收付款合同分类字段名称
                mainList: [
                    { value: '1', label: '是' },
                    { value: '2', label: '否' }
                ],  // 是否为主合同
                relatedLoading: false, // 载体数据加载
                companySealList: [],    // 归档公司
                notFoundText: ['无匹配数据','请先选择收付款类型','请先选择合同一级分类'],   // 三级联动无数据时的提示
                isReset: false,
                carrierData: {
                    url: config.apiUrl + '/system/search-carrier-name',
                    // url: '',
                    methods: 'get',
                    idShow: false,  
                    show:['id','name'],   
                    searchOptions:{}  
                },  // 相关载体
                contractData: {
                    url: config.apiUrl + '/contract/list',
                    // url: '',
                    methods: 'get',
                    idShow: false,  
                    show:['id','name'],   
                    searchOptions:{}  
                },  // 相关合同
                itemData: {
                    url: config.apiUrl + '/system/search-item-name',
                    // url: '',
                    methods: 'get',
                    idShow: false,  
                    show:['id','name'],   
                    searchOptions:{}  
                },  // 相关项目
                searchShow:false,//搜索项展开收起
                resetStatus:false,//重置按钮是否出现
            }
        },
        watch:{},
        created(){
            // 收付款合同分类
            // this.getContractCate();
            // 归档公司
            // this.getAdminCompanyrData();
            // 获取全部用户包含离职
            // this.getAllUserInfo();
            // 获取部门数据
            // this.getGroupData();
        },
        mounted() {     
        },
        methods:{
            /**
             * 点击搜索
             */
            handleSearch(){
                this.resetJuged();
                this.setToggleStatus();
                this.$emit('select-search')
            },
            /**
             * 重置
             */
            resetSearch(){
                //将搜索项置空
                this.searchData = utils.ObjectEmpty(this.searchData);
                this.searchData.page = 1;
                this.searchData.pageSize = 10;
                //判断搜索项是否展开
                this.setToggleStatus();
                this.$emit('reset-search');
            },
            /**
             * 判断是否出现重置
             */
            resetJuged(){
                let type = ['page','pageSize']
                let openType = false;
                for(let i in this.searchData){
                    if(this.searchData[i] && this.searchData[i][0] && type.indexOf(i)<0){
                        openType = true;
                    }
                }
                this.resetStatus = openType;
            },
            /**
             * 判断搜索项是否展开
             */
            setToggleStatus(){
                let type = ['execTime','signTime','isRead','isReadd','isCollect','isRecovery','signType','carrierId','contractId','itemId','minMoney','maxMoney','approvalStatus','approvalNode'];
                let openType = false;
                for(let i in this.searchData){
                    if(this.searchData[i] && this.searchData[i][0] && type.indexOf(i)>-1){
                        openType = true;
                    }
                }
                this.searchShow = openType;
            },
            /**
             * 合同金额
             * @param index
             * @param {Number} textMin 第一个输入框的值
             * @param {Number} textMax 第二个输入框的值
             */
            changInput(index,textMin,textMax){
                this.$set(this.searchData,'minMoney',textMin);
                this.$set(this.searchData,'maxMoney',textMax);
            },
            /**
             * 执行时间
             * @param {Array} time 选中返回的时间
             */
            changExecTime(time){
                this.$set(this.searchData,'execTime',time);
            },
            /**
             * 签订时间
             * @param {Array} time 选中返回的时间
             */
            changSignTime(time){
                this.$set(this.searchData,'signTime',time);
            },
            /**
             * 三级联动值改变后的操作
             * @param {Array} data 选中的数据
             */
            selectData(data){
                this.defaultSelect = [];
                let param = {
                    payType: 0,
                    contractCateOne: 0,
                    contractCateTwo: 0
                }
                // 存在则将数据放入搜索项
                if (data[0]) {
                    param.payType = data[0].id;
                }
                if (data[1]) {
                    param.contractCateOne = data[1].id;
                }
                if (data[2]) {
                    param.contractCateTwo = data[2].id;
                }
                for(var i in data){
                    this.defaultSelect.push(data[i].id)
                }
                for(var i=0; i< (3 - data.length); i++){
                    this.defaultSelect.push(0);
                }
                // 将默认选中的值塞进去
                this.$set(this.searchData,'defaultSelect',this.defaultSelect)
                this.searchData = Object.assign(this.searchData,param);
            },
            /**
             * 获取部门下拉数据
             */
            async getGroupData(){
                let res = await $api.getGroupData();
                if (res.code == 200) {
                    this.addUserGroupIdList = res.data
                }else{
                    this.$TisMessage.error(res.message)
                }
            },
            /**
             * 获取全部用户包含离职人员
             */
            async getAllUserInfo(){
                let res = await $api.getAllUserInfo();
                console.log(res);
                if (res.code == 200) {
                    this.managerList = res.data
                    this.addUserList = res.data
                }else{
                    this.$TisMessage.error(res.message)
                }
            },
            /**
             * 获取三级联动的收付款和合同分类数据
             */
            async getContractCate(){
                let res = await $api.getContractCate();
                if (res.code == 200) {
                    this.contractCateList = res.data;
                }else{
                    this.$TisMessage.error(res.message);
                }
            },
            /**
             * 归档公司
             */
            async getAdminCompanyrData(){
                let res = await $api.getAdminCompanyrData();
                if (res.code == 200) {
                    this.companySealList = res.data
                }else{
                    this.$TisMessage.error(res.message)
                }
            },
        }
    }
</script>

<style lang="less">
@import './search.less';
</style>