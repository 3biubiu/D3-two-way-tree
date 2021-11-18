<template>
    <div class="search-content">
        <div class="search-left">
            <!-- 第一行 -->
            <tis-row :gutter="8" class="search-row">
                <tis-col :span="4">
					<tis-input
						v-model="searchData.nameId"
						placeholder="联系人ID 姓名">
					</tis-input>
                </tis-col>
                <tis-col :span="4">
					<tis-input
						v-model="searchData.job"
						placeholder="职务">
					</tis-input>
                </tis-col>
                <tis-col :span="8">
					<tis-input
						v-model="searchData.company"
						placeholder="所属企业">
					</tis-input>
                </tis-col>
                <tis-col :span="8">
                    <tis-input  placeholder="联系方式" v-model="searchData.linkContent" clearable>
                        <tis-select class="link-select" v-model="searchData.linkType" @on-change="linkChange" slot="prepend">
                            <tis-option v-for="item in numberList" :value="item.key" :key="item.key">{{item.value}}</tis-option>
                        </tis-select>
                    </tis-input>
                </tis-col>
            </tis-row>
            <!-- 第二行 -->
            <tis-row :gutter="8">
                <tis-col :span="4">
                    <tis-select 
                        v-model="searchData.itemLevel" 
                        placeholder="项目等级"
                        clearable
                        :isModal='true'
                    >
                        <tis-option v-for="(item,index) in 6" :value="index+1" :key="index+1">{{item | levelStar}}</tis-option>
                    </tis-select>
                </tis-col>
                <tis-col :span="4">
                    <tis-select 
                        v-model="searchData.itemQuality" 
                        placeholder="项目质量"
                        clearable
                        :isModal='true'
                    >
                        <tis-option v-for="(item,index) in 5" :value="index+1" :key="index+1">{{item | levelStar}}</tis-option>
                    </tis-select>
                </tis-col>
                <tis-col :span="4">
                    <tis-select-search 
                        :default-data="ourUserData"
                        placeholder="我方关系建立人"
                        :is-init="isInit"
                        :id="searchData.ourId"
                        @clear-select-search="clearOurSearch"
                        @back-select-search="backOurSearch"
                        >
                    </tis-select-search>
                </tis-col>
                <tis-col :span="4">
                    <tis-select 
                        v-model="searchData.ourType" 
                        placeholder="我方关系程度"    
                        :isModal='true'                     
                    >
                        <tis-option v-for="item in ourType" :value="item.id" :key="item.id">{{item.name}}</tis-option>
                    </tis-select>
                </tis-col>
                <tis-col :span="8">
                    <tis-select-search 
                        ref="businessSearch"
                        :default-data="tagsData"
                        placeholder="标签搜索"
                        @clear-select-search="clearTagsSearch"
                        @back-select-search="backTagsSearch"
                        res-fields='data'>
                    </tis-select-search>
                </tis-col>
            </tis-row>
            <!-- 第三行 -->
            <tis-row :gutter="8" class="search-row-top" v-show="searchShow">
                <tis-col :span="8">
                    <tis-select-cascader 
                        :list="roleList" 
                        @select="getRoleSelect"
                        @clear-select ="roleClear"
                        :default-select="[searchData.roleType,searchData.roleId]"
                        :fields="roleFields"
                        :placeholder="placeholder1"
                        :level='2'>
                    </tis-select-cascader>
                </tis-col>
                <tis-col :span="4">
                    <tis-date-picker  
                        type="daterange"
                        confirm
                        format="yyyy-MM-dd" 
                        :editable="false"
                        @on-change="changeCreateTime"
                        :value="searchData.dateSettlingCreate"
                        placeholder="录入时间">
                    </tis-date-picker>
                </tis-col>
                <tis-col :span="4">
                    <tis-date-picker  
                        @on-change="changePushTime"
                        :value="searchData.dateSettlingPush"
                        confirm
                        :editable="false"
                        type="datetimerange"   
                        format="yyyy-MM-dd" 
                        placeholder="更新时间">
                    </tis-date-picker>
                </tis-col>
                <tis-col :span="8">
                    <tis-department-people
                        ref="departPeople"
                        :department-data="departmentData"
                        :department-fields="departmentFields"
                        :department-id="searchData.inputDepart"
                        department-placeholder="选择录入部门"
                        :people-data="peopleData"
                        :people-id="searchData.inputUserId"
                        people-placeholder='选择录入人'
                        @back-department-people="backDepartmentPeople">
                    </tis-department-people>
                </tis-col>
            </tis-row>
            <!-- 第四行 -->
            <tis-row :gutter="8" class="search-row-top" v-show="searchShow">
				<tis-col span="4">
                    <tis-select 
                        clearable
                        v-model="searchData.isRelationItem" 
                        placeholder="是否关联项目"
                        @on-change="changeItem"
                        :isModal='true'                         
                    >
                        <tis-option value="1" key="1">是</tis-option>
                    </tis-select>
				</tis-col>
				<tis-col span="4">
                    <tis-select 
                        clearable
                        v-model="searchData.itemCate" 
                        placeholder="关联项目类型"  
                        :isModal='true'                       
                    >
                        <tis-option v-for="item in itemCateEnum" :value="item.key" :key="item.value">{{item.value}}</tis-option>
                    </tis-select>
				</tis-col>
				<tis-col span="4">
                    <tis-select 
                        v-model="searchData.isRelationCompany" 
                        placeholder="是否关联单位"  
                        :isModal='true'          
                        @on-change="changeCompany"             
                    >
                    <tis-option value="1">是</tis-option>
                    </tis-select>
				</tis-col>
				<tis-col span="4">
                    <tis-select 
                        ref="itemCompanySelect"
                        clearable
                        v-model="searchData.companyCate" 
                        placeholder="关联单位类型"
                        :isModal='true'                         
                    >
                        <tis-option v-for="item in companyCateEnum" :value="item.key" :key="item.key">{{item.value}}</tis-option>
                    </tis-select>
				</tis-col>
                <tis-col span="4">
                    <tis-select-search
                        :default-data="defaultDataInsider"
                        :is-init="isInit"
                        :id="searchData.insideId"
                        placeholder="组织内部关系人"
                        @clear-select-search="clearSelectSearch"
                        @back-select-search="backSelectSearch">
                    </tis-select-search>
				</tis-col>
                <tis-col span="4">
                    <tis-select v-model="searchData.insideType" clearable placeholder="内部关系程度">
                        <tis-option v-for="item in insideType" :value="item.id" :key="item.id">{{item.name}}</tis-option>
                    </tis-select>
                </tis-col>
			</tis-row>
            <!--第五行-->
            <tis-row :gutter="8" class-name="search-row-top" v-show="searchShow">
                <tis-col span="8">
                    <tis-select v-model="searchData.contentStatus" clearable placeholder="联系人状态">
                        <tis-option v-for="item in contentStatus" :value="item.key" :key="item.key">{{item.value}}</tis-option>
                    </tis-select>
                </tis-col>
                <tis-col span="4">
                    <tis-select clearable placeholder="项目MOT" v-model="searchData.motId" @on-change="changeMot" @on-clear="clearMot">
                        <tis-option v-for="item in motEnum" :value="item.id" :key="item.id">{{ item.name }}
                        </tis-option>
                    </tis-select>
                </tis-col>
                <tis-col span="4">
                    <tis-select clearable placeholder="项目MOT类型" v-model="searchData.motType" :disabled="disabled" @on-change="changeMotCate" @on-clear="clearMotCate">
                        <tis-option value="1" key="1">土地</tis-Option>
                        <tis-option value="2" key="2">厂房</tis-option>
                        <tis-option value="7" key="7">仓库</tis-option>
                        <tis-option value="4" key="4">写字楼</tis-option>
                        <tis-option value="5" key="5">注册</tis-option>
                        <tis-option value="3" key="3">商业</tis-option>
                        <tis-option value="8" key="8">企服</tis-option>
                    </tis-select>
                </tis-col>
                <template  v-for="(item,key) in motSort">
                    <tis-col v-show="motTag===true" span="4" :class="{'col-top':key>1}" class="mot-style">
                        <tis-select clearable :placeholder="item.name" v-model="searchData.motSortId[key]">
                            <tis-option v-for="sonIndex in item.son" :value="sonIndex.id" :key="sonIndex.id">
                                {{sonIndex.name}}
                            </tis-option>
                        </tis-select>
                    </tis-col>
                </template>
            </tis-row>
        </div>
        <div class="search-right">
            <div class="right-button">
                <tis-button type="primary" :loading="buttonLoading" @click="handleSearch">搜索</tis-button>
                <tis-button type="default" v-show="resetStatus"  @click="handleReset">重置</tis-button>
                <div class="btn-none" v-show="!resetStatus"></div>
            </div>
            <div class="right-toggle">
                <p v-show="!searchShow" @click="searchShow = true">展开∨</p>
                <p v-show="searchShow" @click="searchShow = false">收起∧</p>
            </div>
        </div>
    </div>
</template>
<script>
    import $api from "@/api/contacts_card/index.js";
    import $pluginApi from '@/api/mms_common/plugin.js';
    import itemCateEnum from "@/static_data/item_cate.js";
    import Cookie from "js-cookie";
    export default {
        name:'',
        components: {
        },
        filters:{
            levelStar(value){
                if (value * 1 <= 0) {
                    return "";
                }
                return ("★").repeat(value);
            }
        },
        props:{
            buttonLoading:{
                type: Boolean,
                default: true,
            }
        },
        data () {
            return {
                searchShow:false,//搜索项展开收起
                //搜索项内容
                searchData: {
                    uid:Cookie.get('uid'),
                    //页码
                    page: 1,
                    //单页条数
                    pageSize: 10,
                    dateSettlingCreate: [],
                    dateSettlingPush: [],
                    //联系人姓名或id
                    nameId:"",
                    //职务
                    job:"",
                    //所属企业/单位
                    business:"",
                    //联系方式类型 1=手机 2=座机 3=微信 4=邮箱
                    linkType: "1",
                    //联系方式nr
                    linkContent: "",
                    //项目等级
                    itemLevel: "",
                    //项目质量
                    itemQuality: "",
                    //我方关系建立人
                    ourId: "",
                    //	我方关系程度
                    ourType: "",
                    //内部关系人
                    insideId: "",
                    //内部关系程度
                    insideType: "",
                    //联系人角色类型
                    roleType: "",
                    //联系人角色
                    roleId: "",
                    //录入时间
                    createTimeStart: "",//录入开始时间
                    createTimeEnd: "",//录入结束时间
                    //更新时间
                    updateTimeStart: "",//更新开始时间
                    updateTimeEnd: "",//更新结束时间
                    //	录入部门
                    inputDepart: '',
                    //录入人
                    inputUserId: null,
                    //是否关联项目
                    isRelationItem: "",
                    //	关联项目类型
                    itemCate: "",
                    //是否关联单位
                    isRelationCompany: "",
                    //关联单位类型
                    companyCate: "",
                    //是否关联载体
                    isRelationCarrier: "",
                    //关联载体类型
                    carrierType: "",
                    //联系人标签类型
                    cardTagType: "",
                    //联系人标签
                    cardTagId: "",
                    //项目MOT类型
                    motType: "",
                    //项目mot
                    motId: "",
                    //所属企业/单位 一级
                    province: "",
                    //所属企业/单位 二级
                    city: "",
                    //所属企业/单位 三级
                    area: "",
                    //排序条件
                    createTimeSortData: null,
                    pushTimeSortData: null,
                    order:null,
                    motSortId:["","",""],
                    contentStatus:"",//联系人状态
                },
                linkSelect:'',//联系人下拉选择
                numberList:[
                    {key:'1' ,value:'手机'},
                    {key:'4' ,value:'邮箱'},
                    {key:'2' ,value:'座机'},
                    {key:'3' ,value:'微信'}
                ],//联系方式下拉单位
                ourUserData:{//我方关系建立人
                    url:'http://mms-group1.dev.tanikawa.com/spa.php/DealPlugin/users?testUid=920928',
                    methods:'get',
                    token:'123456',
                    idShow:true,  
                    show:['uid','username']
                },
                ourType:[],//关系程度下拉列表
                tagsData:{//标签搜索数据
                    url:'http://mms-group1.dev.tanikawa.com/spa.php/Plugin/tagsSearch?testUid=920928',
                    methods:'get',
                    token:'123456',
                    idShow:true,  
                    show:['id','name']
                },
                roleList:[],//联系人角色列表
                roleFields: {id: 'id', name: 'name', children: 'son'},//联系人角色字段
                placeholder1:['联系人角色类型','联系人角色'],
                departmentData:[],//部门数据
                departmentFields:{
                    id:'id',
                    name:'name',
                    groupId:'group_id'
                },
                peopleData:{//部门人员数据
                    url:'http://mms-group1.dev.tanikawa.com/spa.php/DealPlugin/users?testUid=920928',
                    methods:'get',
                    token: '123456',
                    idShow:true,
                    show:['uid','username'],
                    searchOptions:{}
                },
                itemCateEnum: [],//项目类型
                companyCateEnum:[],//单位类型
                defaultDataInsider: {//组织内部关系人数据
                    url: 'http://mms-group1.dev.tanikawa.com/spa.php/Card/getInsideUserList?testUid=920928',
                    methods: 'get',
                    token: '123456',
                    idShow: true,   //id是否展示在下拉列表中
                    show: ['id', 'name']   //除id外其他是需要展示的字段对应的字段名
                },
                isInit:true,
                insideType:[],//内部关系程度下拉
                contentStatus:[],//联系人状态下拉
                motTag: false,//mot选项
                motSort:[],
                motEnum:[],//MOT
                disabled:true,//mot禁用
                resetStatus:false,//重置按钮是否出现
            }
        },
        watch:{
        },
        created(){
            /**
             * 获取部门列表
             */
            $pluginApi.plugInGroupUser().then(res=>{
                this.departmentData = res ? res.list : [];
            })
            //获取联系人状态
            this.getContactsStatus();
            //获取mot数据
            this.getMotList();
        },
        mounted() {     
            this.getAllTags();
            let obj = {
                a : '1',
                b : '2',
                c : '3'
            }
            // Object.keys(obj).forEach(key=>{obj[key]=''})
        },
        methods:{
            /**
             * 修改联系方式清空后面输入框
             *  @param {string} temp 类型 1=手机 2=座机 3=微信 4=邮箱
             */
            linkChange(temp){
                this.searchData.linkType = temp;
                this.searchData.linkContent = '';
            },
            /**
             * 清空我方关系
             */
            clearOurSearch() {
                this.searchData.ourId = '';
            },
            /**
             * 我方关系下拉选中回调
             *@param {obj} data 获取选中的数组值（对象数组）
            */
            backOurSearch(data) {
                if (Object.keys(data).length > 0) {
                    this.searchData.ourId = data.uid;
                }
            },
            /**
             * 获取联系人标签、角色类型 获取联系人关系备选项
             */
            async getAllTags(){
                let res = await $api.getListAllTags();
                if(res.code !== "200"){
                    // utils.notice(res.msg,"error");
                    return false;
                }
                // this.tagList = res.data.tagList;
                this.roleList = res.data.roleList;
                this.ourType = res.data.ourType;
                this.insideType = res.data.insideType;
            },
            /**
             * 选择搜索的标签
             * @param {Object} data 回调携带的数据
             */
            backTagsSearch(data){
                this.searchData.tagId = data.id;
                // this.$refs.businessSearch.keyword = "";
            },
            clearTagsSearch(data){
                this.searchData.tagId = "";
            },
            /**
             * 角色类型及角色的选中值
             * @param {obj} data 获取选中的数组值（对象数组）
             */
            getRoleSelect(data){
                if (Object.keys(data).length > 0) {
                    // this.searchData.roleType = data[0].id?data[0].id:'';
                    // this.searchData.roleId = data[1].id?data[1].id:'';
                    if (data[0]) {
                        this.searchData.roleType = data[0].id; //角色类型 一级
                    } else {
                        this.searchData.roleType = '';
                        this.searchData.roleId = '';
                    }
                    if (data[1]) {
                        this.searchData.roleId = data[1].id; //角色 二级
                    } else {
                        this.searchData.roleId = '';
                    }

                }
            },
            /**
             * 清空联系人角色
             */
            roleClear(data){
                if(data == 1){
                    this.searchData.roleType = '';
                    this.searchData.roleId = '';
                }
                if(data == 2){
                    this.searchData.roleId = '';
                }
            },
            /**
             * 录入时间事件
             * @param {Array} date 时间区间数组
             */
            changeCreateTime(date) {
                this.searchData.createTimeStart = `${date[0]}`;
                this.searchData.createTimeEnd =`${date[1]}`;
            },
            /**
             * 推送时间事件
             * @param {Array} date 时间区间数组
             */
            changePushTime(date) {
                this.searchData.updateTimeStart = `${date[0]}`;
                this.searchData.updateTimeEnd = `${date[1]}`;
            },
            /**
             * 项目类型下拉选项
             * @param {string} val 是否关联项目 1=是 2=否
             */
            changeItem(val) {
                if (val === '1') {
                    this.itemCateEnum = itemCateEnum;
                }else{
                    this.searchData.itemCate='';
                    this.itemCateEnum = [];
                }
            },
            /**
             * 单位类型下拉选项
             * @param {string} val 是否关联单位 1=是 2=否
             */
            changeCompany(val) {
                if (val === '1') {
                    this.companyCateEnum = [
                        {
                            key: "2",
                            value: "产业园区",
                        },
                        {
                            key: "1",
                            value: "各级政府",
                        },
                        {
                            key: "3",
                            value: "商业项目",
                        },
                        {
                            key: "4",
                            value: "写字楼项目",
                        },
                        {
                            key: "6",
                            value: "服务机构",
                        },
                        {
                            key: "7",
                            value: "品牌商家",
                        },
                        {
                            key: "8",
                            value: "工业地产",
                        },
                        {
                            key: "9",
                            value: "渠道（公司机构）",
                        },
                        {
                            key: "10",
                            value: "渠道（个人）",
                        },
                        {
                            key: "11",
                            value: "职能部门",
                        },
                        {
                            key: "5",
                            value: "其他单位",
                        },
                    ];
                }else{
                    this.searchData.companyCate='';
                    this.companyCateEnum = [];
                }
            },
            /**
             * 获取组织内部关系人
             * @param {obj} data 获取选中的数组值（对象数组）
             */
            backSelectSearch(data) {
                if (Object.keys(data).length > 0) {
                    this.searchData.insideId = data.id;
                }
            },
            /**
             * 获取组织内部关系人清空
             */
            clearSelectSearch(){
                this.searchData.insideId='';
            },
            /**
             * 获取联系人状态
             */
            async getContactsStatus(){
                let res = await $api.getContactsStatus();
                // if(res.code != "200"){
                //     utils.notice(res.msg,"error");
                //     return false;
                // }
                this.contentStatus = res.data;
            },
            /**
             * 通过Mot类型获取其他
             * @param {int} motId mot类型id
             */
            changeMot(motId) {
                if (!motId) {
                    return false;
                }
                this.searchData.motId = motId;
                this.disabled = false;
                this.getSortLists(this.searchData.motType,this.searchData.motId);
            },
            /**
             * 通过Mot 和mot类型 获取其他
             * @param {int} motType mot类型id
             */
            changeMotCate(motType) {
                if (!motType) {
                    return false;
                }
                this.searchData.motType = motType;
                this.getSortLists(this.searchData.motType,this.searchData.motId);
            },
            /**
             * 清空MOT 同时标签列表
             *
             */
            clearMot(){
                this.motTag = false;
                this.motSort ='';
                this.disabled = true;
                this.searchData.motType = '';
                this.searchData.motId = '';
                this.searchData.motSortId =["","",""] ;//项目mot
            },
            /**
             * 清空MOT类型 同时标签列表
             *
             */
            clearMotCate(){
                this.motTag = false;
                this.motSort ='';
                if(this.searchData.motId){
                    this.disabled = false;
                }else{
                    this.disabled = true;
                }
                this.searchData.motType = '';
                this.searchData.motSortId =["","",""] ;//项目mot
            },
            /**
             * 获取motSort列表
             * @param {int} motType mot类型id
             * @param {int} motId mot类型id
             */
            async getSortLists(motType,motId){
                this.motTag = false;
                let mot = await $api.getMotSort(motType,motId);
                if (mot.code !== "200") {
                    // utils.notice(mot.msg, "error");
                    this.motTag = false;
                    return false;
                }
                if (mot.data.length === 0) {
                    this.motTag = false;
                    return false;
                } else {
                    this.motTag = true;
                    this.motSort = mot.data.motSort
                    return false;
                }
            },
            /**
             * 获取MOT类型
             *
             */
            async getMotList(){
                let mot = await $api.getMotTags();
                if (mot.code !== "200") {
                    // utils.notice(mot.msg, "error");
                    return false;
                }
                this.motEnum = mot.data;
            },
            /**
             *点击搜索按钮
             */
            handleSearch(){
                let res = this.searchData;
                this.$emit('select-search',res);
            },
            /**
             * 初始化搜索条件
             * @param {object} data 初始化数据对象
             * @param {bool} open 是否默认展开
             * 
             */ 
            setSearchOptions(data) {
                for(let i in this.searchData){
                    this.searchData[i] = data[i];
                }
                //判断默认展开状态
                this.setToggleStatus();
                this.setReset();
                this.initStatus = true;
            },
            /**
             * 搜索项重置
             *
             */
            handleReset() {
                //将搜索项中的每一项置空
                Object.keys(this.searchData).forEach(key=>{this.searchData[key]=''});
                this.searchData.page = 1;
                this.searchData.pageSize = 10;
                this.searchData.uid = Cookie.get('uid');
                this.searchData.dateSettlingCreate = [];
                this.searchData.dateSettlingPush = [];
                this.searchData.linkType = "1";//联系方式类型 1=手机 2=邮箱 3=座机 4=微信
                this.searchData.inputUserId = null;//录入人
                this.searchData.motSortId =["","",""] ;//项目mot
                this.searchData.createTimeSortData = null;
                this.searchData.pushTimeSortData = null;
                this.searchData.order = null;
                this.$refs.departPeople.clearDepartment();
                this.$refs.departPeople.clearPeople();
                this.resetStatus = false;
                this.motTag = false;
                this.toggleStatus = false;   //搜索项展开状态true-展开
                this.disabled = true;
                this.$emit('select-search',this.searchData);
                this.$refs.businessSearch.clearAll();
            },
            /**
             * 判断是否显示重置
             */
            setReset(){
                let type = ['page','pageSize','uid','linkType','order']
                let openType = false;
                for(let i in this.searchData){
                    if(this.searchData[i]!=null && this.searchData[i]!=undefined && this.searchData[i].toString()!=''&& this.searchData[i].toString().replace(/,/g, '') !== "" && type.indexOf(i)<0){
                        openType = true;
                    }
                }
                this.$emit('is-show-Reset',openType);
                this.resetStatus = openType;
            },
            /**
             * 判断默认是否展开状态
             */
            setToggleStatus() {
                let type = ['page','pageSize','order','uid','nameId','job','business','linkType','linkContent','itemLevel','itemQuality','ourId','ourType','insideId','insideType','tagId','tagName']
                let openType = false;
                for(let i in this.searchData){
                    if(this.searchData[i] != null && this.searchData[i] != undefined && this.searchData[i].toString() != '' && this.searchData[i].toString().replace(/,/g, '') !== "" && type.indexOf(i)<0){
                        openType = true;
                    }
                }
                this.searchShow = openType;
            },
            /**
             * 组件返回的部门人员选中值
             * @param data
             */
            backDepartmentPeople(data){
                if (Object.keys(data).length > 0) {
                    this.searchData.inputUserId = data.peopleId;
                    this.searchData.inputDepart = data.departmentId;
                }
            },
        }
    }
</script>

<style lang="less" scoped>
@import './search.less';
</style>
<style lang="less">
    .search-content{
        .itis-btn{
            width: 96px;
            min-width: 64px;
        }
        .itis-btn-default{
            width: 96px;
            margin-left: 4px;
        }
        .link-select{
            width: 80px;
        }
    }
</style>