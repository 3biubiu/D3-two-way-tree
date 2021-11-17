<template>
    <div class="my-add-list">
        <tis-table :theadHeight="48" :midTdWidth="widthArr" :tableHeight="48" :isZebra="true" class="list-table">
            <tr slot="table-head">
                <th style="width:3%;"><Checkbox></Checkbox></th>
                <th style="width:4%;">编号</th>
                <th style="width:5%;">姓名</th>
                <th style="width:10%;">所属企业</th>
                <th style="width:7%;">职位</th>
                <th style="width:6%;">录入时间</th>
                <th style="width:6%;">更新时间</th>
                <th style="width:9%;">操作</th>
            </tr>
            <tr slot="table-body" v-for="(item,index) in listData" :key="index">
                <td><Checkbox></Checkbox></td>
                <td>{{item.id}}</td>
                <td><span class="name-link" :title="item.name">{{item.name}}</span></td>
                <td>{{item.info}}</td>
                <td>{{item.zhiwu}}</td>
                <td>{{item.addtime}}</td>
                <td>{{item.updatetime}}</td>
                <td>
                    <div>
                        <span class="on-btn table-blue"><i class="fa fa-search"/> 详情&emsp;</span>
                        <span class="on-btn table-blue">{{item.authStatusTitle}}</span>
                        <span class="on-btn text-disabled">{{item.authStatusTitle}}&emsp;</span>
                        <span class="on-btn table-blue"><i class="fa fa-trash-o"/> 回收&emsp;</span>
                    </div>
                </td>
            </tr>
        </tis-table>
        <Page   
            class="page-box"
            :total="listCount"
            :current="Number(searchData.page)"
            :page-size="Number(searchData.pageSize)"
            @on-change="handlePage"
            @on-page-size-change="handlePageSize"
            :page-size-opts="pageSizeOpts"
            show-sizer
            show-total
            show-elevator>
            <slot>当前共{{listCount}}条记录，本页共{{listData.length}}条记录</slot>
        </Page>
    </div>
</template>
<script>
import MySpin from '@/components/common/my_spin/MySpin.vue';
    export default {
        name:'',
        components: {
            MySpin
        },
        props:{
            //表格数据
            listData: {
                type: Array,
                default: () => {
                    return []
                }
            },
            // //数据总数
            listCount: {
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
                //搜索项内容
                searchData: {
                    //页码
                    //页码
                    page: 1,
                    //单页条数
                    pageSize: 10,
                    dateSettlingCreate: [],
                    dateSettlingPush: [],
                    //联系人姓名或id
                    nameId: "",
                    //职务
                    job: "",
                    //所属企业/单位
                    business: "",
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
                    //推送时间
                    updateTimeStart: "",//推送开始时间
                    updateTimeEnd: "",//推送结束时间
                    //	录入部门
                    inputDepart: "",
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
                    order:"",
                    motSortId:["","",""],
                },
            }
        },
        watch: {
            
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
        }
    }
</script>

<style lang="less" scoped>
@import './list.less';
</style>
<style lang="less">
    .my-add-list{
        position: relative;
        .tis-table th{
            padding-left: 16px;
            line-height: 32px;
        }
        .tis-table td{
            height: 48px;
            padding-left: 16px;
            line-height: 18px;
            box-sizing: border-box;
            word-break: break-all;
            word-break: break-word;
        }
        .ivu-page{
            text-align: right;
            margin-top: 16px;
        }
        .page-box{
            .ivu-select-item{
                padding: 0;
            }
        }
    }
</style>