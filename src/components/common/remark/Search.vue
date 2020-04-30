<template>
    <div class="remark-search">
        <!--一行搜索项-->
        <div class="search-item-one">
            <label class="search-label">跟进单位</label>
            <div class="search-content">
                <label :class="{'active':searchData.companyId === cKey}" v-for="(company,cKey) in searchOptions.company" @click="changeSearch('companyId',cKey)">{{company}}</label>
            </div>
        </div>
        <div class="search-item-one">
            <label class="search-label">更多筛选</label>
            <div class="search-content ">
                <Checkbox :value="searchData.effectiveStatus" @on-change="(val)=>{changeSearch('effectiveStatus',val)}">有效跟进</Checkbox>
                <Checkbox :value="searchData.showComment" @on-change="(val)=>{changeSearch('showComment',val)}">显示由回复生成的备注</Checkbox>
                <Checkbox :value="searchData.showManualMot" @on-change="(val)=>{changeSearch('showManualMot',val)}">显示手动激活MOT的备注</Checkbox>
                <label class="active filter" @click="toggleStatus=!toggleStatus">高级筛选
                    <i v-if="toggleStatus" class="iconfont iconshang"></i>
                    <i v-else class="iconfont iconxia"></i>
                </label>
            </div>
        </div>
        <!--折叠部分-->
        <div v-show="!!toggleStatus">
            <div class="search-item-one">
                <label class="search-label mot-search-time">备注时间</label>
                <div class="search-content ">
                    <label :class="{'active':searchData.cloudTime === '0'}" @click="changeSearch('cloudTime','0')">全部</label>
                    <label :class="{'active':searchData.cloudTime === '7'}" @click="changeSearch('cloudTime','7')">最近7天</label>
                    <label :class="{'active':searchData.cloudTime === '15'}" @click="changeSearch('cloudTime','15')">最近15天</label>
                    <label :class="{'active':searchData.cloudTime === '30'}" @click="changeSearch('cloudTime','30')">最近30天</label>
                    <label :class="{'active':searchData.cloudTime === '60'}" @click="changeSearch('cloudTime','60')">最近60天</label>
                    <DatePicker @on-change="setDateRange" :value="searchData.cloudTimeRange" type="daterange" clearable placeholder="请选择备注时间" class="cloud-time"></DatePicker>
                </div>
            </div>
            <div class="search-item-one">
                <label class="search-label">MOT方案</label>
                <div class="search-content ">
                    <label :class="{'active':searchData.motScheme === mKey}" v-for="(motScheme,mKey) in searchOptions.motScheme" @click="changeSearch('motScheme',mKey)">{{motScheme}}</label>
                </div>
            </div>
            <div class="search-item-one">
                <label class="search-label">MOT类型</label>
                <div class="search-content ">
                    <label :class="{'active':searchData.motType === mtKey}" v-for="(motType,mtKey) in searchOptions.motType" @click="changeSearch('motType',mtKey)">{{motType}}</label>
                </div>
            </div>
            <div class="search-item-one">
                <label class="search-label">备注人员</label>
                <div class="search-content ">
                    <label :class="{'active':searchData.addUser === aKey}" v-for="(addUser,aKey) in searchOptions.addUser" @click="changeSearch('addUser',aKey)">{{addUser}}</label>
                </div>
            </div>
            <div class="search-item-one">
                <label class="search-label">联系对象</label>
                <div class="search-content ">
                    <label :class="{'active':searchData.contactId === cKey}" v-for="(contactUser,cKey) in searchOptions.contactUser" @click="changeSearch('contactId',cKey)">{{contactUser?contactUser:'未填写'}}</label>
                 </div>
            </div>
            <div class="search-item-one">
                <label class="search-label">联系类型</label>
                <div class="search-content ">
                    <label :class="{'active':searchData.contactType === ctKey}" v-for="(contactType,ctKey) in searchOptions.contactType" @click="changeSearch('contactType',ctKey)">
                        {{contactType.name}}
                        <span v-if="(ctKey !== '0' && contactType.count > 0)">（{{contactType.count}}）</span>
                    </label>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "remark-search",
        props : {
            //搜索备选项
            searchOptions : {
                type : Object,
                default : ()=>{return {}}
            }
        },
        data(){
            return{
                //展开收起false-收起，true-展开
                toggleStatus : false,
                //搜索选中项
                searchData : {
                    //跟进单位
                    companyId : "0",
                    //是否只显示有效跟进1-是
                    effectiveStatus : false,
                    //是否显示由恢复生成的备注1-是
                    showComment : false,
                    //是否显示手动激活mot的备注
                    showManualMot : false,
                    //备注时间
                    cloudTime : "0",
                    //备注时间搜索范围
                    cloudTimeRange : [],
                    //mot方案
                    motScheme : "0",
                    //mot类型
                    motType : "0",
                    //备注人员uid0-表示全部
                    addUser : "0",
                    //联系对象0-表示全部
                    contactId : "0",
                    //联系类型0-表示全部
                    contactType : "0",
                },
            }
        },
        created(){
            this.init();
        },
        methods : {
            /**
             * 初始化
             */
            init(){
                this.searchData = {
                    //跟进单位
                    companyId : "0",
                    //是否只显示有效跟进1-是
                    effectiveStatus : false,
                    //是否显示由恢复生成的备注1-是
                    showComment : false,
                    //是否显示手动激活mot的备注
                    showManualMot : false,
                    //备注时间
                    cloudTime : "0",
                    //mot方案
                    motScheme : "0",
                    //mot类型
                    motType : "0",
                    //备注人员uid0-表示全部
                    addUser : "0",
                    //联系对象0-表示全部
                    contactId : "0",
                    //联系类型0-表示全部
                    contactType : "0",
                };
            },
            /**
             * 更新搜索项value
             * @author zyz 2020-4-22 09:22:56
             * @param {String} name 键
             * @param {*} value 值
             */
            changeSearch(name,value){
                if(name === 'cloudTime'){
                    this.searchData.cloudTimeRange = [];
                }
                this.$set(this.searchData,name,value);
                this.doSearch();
            },
            /**
             * 搜索项备注时间input回调事件
             * @author zyz 2020-4-22 09:22:56
             * @param {array} data 回调携带的结果数据
             */
            setDateRange(data){
                this.searchData.cloudTime = (data&&data.join("").length > 0) ? "" : "0";
                this.searchData.cloudTimeRange = [...data];
                this.doSearch();
            },
            /**
             * 发起搜索
             * @author zyz 2020-4-22 09:22:56
             */
            doSearch(){
                this.$emit('on-search',this.searchData);
            }
        }
    }
</script>

<style lang="less" scoped>
@import "search.less";
</style>
