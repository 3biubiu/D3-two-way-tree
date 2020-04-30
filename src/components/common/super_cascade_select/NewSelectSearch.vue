<!--项目|单位|载体下拉-->
<template>
    <div class="select-search-wrapper">
        <div class="input-icon-box" v-if="!isSelectSearch">
            <div class="input-edit"><Input @on-change="changeInputName" v-model="keyword" placeholder="手动输入" clearable/></div>
            <i @click="changeSelectInput" class="change-icon iconfont iconshuaxin1"></i>
        </div>
        <button v-else v-on:click="greet" type="button" class="form-control col-lg-12 select-btn" :class="{gray:readonly === true}">
            <div class="vue-search-select-div">
                <template v-if="theOne.name">
                    {{ theOne.name }}
                </template>
                <template v-else>
                    <label style="color: #d0d3d8">{{placeHolder}}</label>
                </template>
                <span class="caret pull-right ivu-icon ivu-icon-ios-arrow-down ivu-select-arrow "></span>
            </div>
        </button>
        <ul v-bind:style="{display: showMenu}" class= "dropdown-menu list-com-menu" role="menu"  v-show="isSelectSearch">
            <div class="col-lg-12 div-hidden">
                <div  class="input-group" style="width: 100%">
                    <input onkeypress="if(event.keyCode == 13){ return false;}" @keyup.enter="getData" v-model="keyword" type="text" class="form-control business-input" placeholder="请输入关键字搜索" autocomplete="off" style="width:100%; background-color: #fff;">
                    <input type="hidden" class="form-control" :value="theOne.id">
                    <span class="input-group-btn">
                    <button v-on:click="getData" class="btn btn-default btn-radius" type="button">搜索</button>
                </span>
                </div>
                <!-- 添加用于添加一些提示项 -->
                <p v-show="tips.length" class="line-height-30" style="margin-top:10px;">{{tips}}</p>
            </div>
            <li class="change-select-input" @click="changeSelectInput">{{searchPalceHolder}}</li>
            <li class="dropdown-menu-li" v-show="items.length<=0" @click="clear"><a>{{placeHolder}}</a></li>
            <div class="down-scroll">
                <Spin v-if="searchLoading" fix></Spin>
                <template v-for="(item,index) in items">
                    <li class="dropdown-menu-li" v-on:click="select(index)">
                        <a :title="item.name">
                            <template v-if="['4','5','6','7','8','9','10','11'].indexOf(type) < 0 " >
                                <span v-if="!!showId && !!item.id"><span v-show="item.id!==-1">【{{item.id}}】</span></span>{{ item.name }}<span v-show="item.cateName">（{{item.cateName}}）</span>
                            </template>
                            <template v-else-if="type === '7'">
                                <span v-if="item.ispartners ==='1'">【客户】</span>{{ item.name }}
                            </template>
                            <template v-else-if="type === '9' || type === '10'|| type === '11'">
                                <span>{{item.name}}</span>
                            </template>
                            <template v-else>
                                <span v-if="!!showId && !!item.id">[ID：{{item.id}}]</span>{{ item.name }}
                            </template>
                        </a>
                    </li>
                </template>
                <li class="dropdown-menu-li" v-show="items.length==100"><a>仅显示100条结果，请精确搜索</a></li>
            </div>
        </ul>
    </div>
</template>

<script>
    import utils from "@/utils.js";
    import $api from '@/api/clinch_a_deal/index.js';
    import $itemDetailApi from "@/api/item/item_detail/index.js";
    import $pluginApi from "@/api/plugin/plugin.js";
    import Spin from "iview/src/components/spin/spin";
    export default {
        components: {Spin},
        props : {
            //是否只读
            readonly : {
                type : Boolean,
                default : false,
            },
            //类型1-项目，2-载体，3-单位，4-合同，5-回款6-审批通过的合同7-获取单位身份备选项
            type : {
                required : true,
                type : String,
                default : "1",
            },
            //提示语
            tips : {
                type : String,
                default : ""
            },
            //下拉是否显示uid
            showId : {
                type : Boolean,
                default : true
            },
            //placeHolder
            placeHolder : {
                type : String,
                default : "用户",
            },
            //触发方式：1-点搜索2-实时
            trigger : {
                type : String,
                default : "1",
            },
            //项目|载体|单位的详细分类
            cate : {
                type : String,
                default : "",
            },
            cateOther:{
                type : String,
                default : "",
            }
        },
        data() {
            return {
                //搜索loading状态
                searchLoading : false,
                //搜索下拉div显示状态
                showMenu : 'none',
                //搜索项keyword
                keyword : "",
                //下拉备选项
                items : [],
                //选中项数据
                theOne : {
                    id : "",
                    name : "",
                },
                //关系id
                excuteId : "",
                isSelectSearch:true,
                searchPalceHolder:'检索完毕，可以手动输入'
            }
        },
        watch : {
            keyword(newVal,oldVal) {
                if(!newVal){
                    this.getData();
                }

                if(this.trigger === "2"){
                    this.getData();
                }
            }
        },
        created(){

        },
        mounted(){
            //绑定点击事件
            document.addEventListener('click', (e)=>{
                if(!this.$el.contains(e.target)){
                    this.showMenu = 'none';
                }
            })
        },
        methods : {
            init(id,name){
                //初始化选中项
                this.theOne = Object.assign({},{
                    id : id,
                    name : name,
                });
                this.keyword = this.theOne.name ? this.theOne.name : "";
                this.$nextTick(()=>{
                    this.getData();
                })
            },
            /**
             * 搜索栏点击事件
             */
            greet () {
                this.keyword = this.theOne.name;
                if(this.readonly === false){
                    this.showMenu = (this.showMenu === 'none') ? 'block' : 'none';
                }
            },
            changeInputName(){
                this.theOne.name = this.keyword;
                this.theOne.id = '';
                this.$emit('selectOne',this.theOne);
            },
            /**
             * 下拉备选项点击事件
             *
             * @param {Number} index 选中项索引
             */
            select(index){
                this.theOne = Object.assign({},this.items[index]);
                this.keyword = this.theOne.name;
                this.$emit('selectOne',this.theOne);
                this.showMenu = 'none';
            },
            /**
                * 切换下拉搜索和input框输入
             */
            changeSelectInput(){
                this.isSelectSearch = !this.isSelectSearch;
                this.theOne.name = this.keyword;
                this.$emit('selectOne',this.theOne);
            },
            /**
             * 清空事件
             */
            clear(){
                this.theOne = {
                    id : "",
                    name : "",
                };
                this.$emit('selectOne',this.theOne);
                this.showMenu = 'none';
            },
            /**
             * 发起搜索
             */
            async getData(){
                this.searchLoading = true;
                this.searchPalceHolder = "正在检索...可以点击手动录入";
                try{
                    let list = [];
                    switch (this.type){
                        case "1":
                            //项目
                            list = await this.getItem();
                            break;
                        case "2":
                            //载体
                            list = await this.getCarrier();
                            break;
                        case "3":
                            //单位
                            list = await this.getGroup();
                            if(this.cateOther){
                                let cate = {
                                    id:-1,
                                    name:'不设置身份',
                                    cateName:'',
                                    cate:''
                                }
                                list.unshift(cate)
                            }
                            break;
                        case "4":
                            //获取所有合同
                            list = await this.getContract({keyword : this.keyword});
                            break;
                        case "5":
                            //回款
                            list = await this.getReceivePayment();
                            list.map((item,index)=>{
                                list[index].money = Number(item.money);
                            });
                            break;
                        case "6":
                            //获取所有审批通过合同
                            list = await this.getContract({keyword : this.keyword,type:1});
                            break;
                        case "7":
                            //获取单位身份
                            list = await this.getCompanyIdentity(this.keyword);
                            break;
                        case "8":
                            //载体身份
                            list = await this.getCarrierIdentity(this.keyword);
                            break;
                        case "9":
                            //世界所有企业名称 对接搜索引擎
                            list = await this.getAllCompany(this.keyword);
                            break;
                        case "10":
                            //搜索单位人员
                            list = await this.searchUserwithName(this.keyword);
                            break;
                        case "11":
                            //搜索对接人
                            list = await this.getRelateBrokerCard(this.keyword,this.excuteId);
                            break;
                        default:
                            this.searchLoading = false;
                            this.items = [];
                            return false;
                    }
                    this.items = [...list];
                    if(this.items.length<=0 && this.keyword){
                        this.searchPalceHolder = "没找到相关企业，点击手动录入";
                    }else if(this.items.length<=0 && !this.keyword){
                        this.searchPalceHolder = "输入关键字搜索，或者手动录入";
                    }else{
                        this.searchPalceHolder ='检索完毕，可以手动输入'
                    }
                }catch(e){
                    this.searchLoading = false;
                    utils.notice("拉取数据超时","error");
                }
            },
            /**
             * 获取项目备选项并整理格式
             * @returns {Promise<void>}
             */
            async getItem(){
                let res = await $api.selectItems({cate:this.cate,keyword:this.keyword});
                this.searchLoading = false;
                if(res.code !== 200){
                    utils.notice("获取项目列表失败","error");
                    return [];
                }
                return res.data;
            },
            /**
             * 获取项目备选项并整理格式
             * @returns {Promise<void>}
             */
            async getCarrier(){
                let res = await $api.settleCarriers({keyword : this.keyword});
                this.searchLoading = false;
                if(res.code !== 200){
                    utils.notice("获取载体列表失败","error");
                    return [];
                }
                for(let i = 0 ; i < res.data.length; i++){
                    res.data[i].id = `${res.data[i].index_id}`;
                }

                return res.data;
            },
            /**
             * 获取项目备选项并整理格式
             * @returns {Promise<void>}
             */
            async getGroup(){
                let res = await $api.settleComs({keyword:this.keyword});
                this.searchLoading = false;
                if(res.code !== 200){
                    utils.notice("获取单位列表失败","error");
                    return [];
                }
                return res.data;
            },
            /**
             * 获取项目备选项并整理格式
             * @returns {Promise<void>}
             */
            async getContract(formData){
                let res = await $api.getContacts(formData);
                this.searchLoading = false;
                if(res.code !== 200){
                    utils.notice("获取合同列表失败","error");
                    return [];
                }
                return res.data;
            },
            /**
             * 获取回款
             * @returns {Promise<void>}
             */
            async getReceivePayment(){
                let res = await $api.getReceivePayment({keyword : this.keyword});
                this.searchLoading = false;
                if(res.code !== 200){
                    utils.notice("获取回款列表失败","error");
                    return [];
                }
                return res.data;
            },
            /**
             * 获取单位身份备选项
             * @param {String} keyword 关键字
             * @returns {Promise<void>}
             */
            async getCompanyIdentity(keyword){
                let res = await $itemDetailApi.getCompanyIdentity(keyword);
                this.searchLoading = false;
                if(res.code != 200){
                    utils.notice("获取单位身份列表失败","error");
                    return [];
                }
                return res.data;
            },
            /**
             * 获取载体身份备选项
             * @param {String} keyword 关键字
             * @returns {Promise<void>}
             */
            async getCarrierIdentity(keyword){
                let res = await $itemDetailApi.getCarrierIdentity(keyword);
                this.searchLoading = false;
                if(res.code != 200){
                    utils.notice("获取载体身份列表失败","error");
                    return [];
                }
                for(let i = 0 ; i < res.data.length; i++){
                    res.data[i].id = `${res.data[i].indexId}`;
                }
                return res.data;
            },
            /**
             * 获取载体身份备选项
             * @param {String} keyword 关键字
             * @returns {Promise<void>}
             */
            async getAllCompany(keyword){
                let res = await $pluginApi.getAllCompany(keyword,100);
                this.searchLoading = false;
                if(res.code != 200){
                    utils.notice("获取公司名称数据失败","error");
                    return [];
                }
                return res.data;
            },
            /**
             * 获取单位成员备选项
             * @param {String} keyword 关键字
             * @returns {Promise<void>}
             */
            async searchUserwithName(keyword){
                let res = await $pluginApi.searchUserwithName(keyword);
                this.searchLoading = false;
                if(res.code != 200){
                    utils.notice("获取单位成员失败","error");
                    return [];
                }
                for (let i=0;i<res.data.length;i++){
                    res.data[i].id=res.data[i].uid
                    res.data[i].name=res.data[i].username
                }
                return res.data;
            },
            /**
             * 获对接人备选项
             * @param {String} keyword 关键字
             * @returns {Promise<void>}
             */
            async getRelateBrokerCard(keyword,excuteId){
                let res = await $pluginApi.getRelateBrokerCard(keyword,excuteId);
                this.searchLoading = false;
                if(res.code != 200){
                    utils.notice("获取对接人失败","error");
                    return [];
                }
                return res.data;
            }
        }
    }
</script>

<style lang="less" scoped>
    @import "./new_select_search.less";
</style>
