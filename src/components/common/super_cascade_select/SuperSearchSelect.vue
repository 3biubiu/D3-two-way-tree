<!--终极正反选二级联动下拉框-->
<template>
    <div style="position: relative; height: 32px;">
        <button v-on:click="greet" type="button" class="form-control col-lg-12 select-btn" :class="{gray:readonly === true}">
            <div class="vue-search-select-div">
                <template v-if="theOne.name">
                    {{ theOne.name }}
                </template>
                <template v-else>
                    <label style="color: #d0d3d8">{{placeHolder}}</label>
                </template>
                <span class="caret pull-right ivu-icon ivu-icon-ios-arrow-down ivu-select-arrow "></span>
                <!--<span class="caret pull-right"></span>-->
            </div>
        </button>
        <ul v-bind:style="{display: showMenu}" class= "dropdown-menu list-com-menu" role="menu">
            <Spin v-if="searchLoading" fix></Spin>
            <div class="col-lg-12">
                <div  class="input-group" style="width: 100%">
                    <input ref="keywordInput" onkeypress="if(event.keyCode == 13){ return false;}" @keyup.enter="getData" v-model="keyword" type="text" class="form-control" placeholder="请输入关键字搜索" autocomplete="off" style="width:100%; background-color: #fff;">
                    <input type="hidden" class="form-control" :value="theOne.id">
                    <span class="input-group-btn">
                    <button v-on:click="getData" class="btn btn-default" type="button">搜索</button>
                </span>
                </div>
                <!-- 添加用于添加一些提示项 -->
                <p v-show="tips.length" class="line-height-30" style="margin-top:10px;">{{tips}}</p>
            </div>
            <li @click="clear"><a>{{placeHolder}}</a></li>
            <template v-for="(item,index) in items">
                <li v-on:click="select(index)">
                    <a :title="item.name"><span v-if="!!showId && !!item.id">[ID:{{item.id}}]</span>{{ item.name }}</a>
                </li>
            </template>
            <!--<li v-for="oneOther in otherList">{{oneOther}}</li>-->
        </ul>
    </div>
</template>

<script>
    import utils from "@/utils.js";
    import $api from '@/api/clinch_a_deal/index.js';
    import Spin from "iview/src/components/spin/spin";
    export default {
        components: {Spin},
        name : "super-search-select",
        props : {
            //是否只读
            readonly : {
                type : Boolean,
                default : false,
            },
            //所选人uid
            id : {
                type : String,
                default : "",
            },
            //选中人名
            name : {
                type : String,
                default : "",
            },
            //类型1-用户
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
            }
        },
        data (){
            return {
                //搜索loading状态
                searchLoading : false,
                //搜索下拉div显示状态
                showMenu : 'none',
                //搜索项keyword
                keyword : "",
                //部门id
                companyId : "",
                //下拉备选项
                items : [],
                //选中项数据
                theOne : {
                    id : "",
                    name : "",
                },
            }
        },
        created(){
            //初始化选中项
            this.theOne = Object.assign({},{
                id : this.id,
                name : this.name,
            });
            this.keyword = this.theOne.name ? this.theOne.name : "";
            this.$nextTick(()=>{
                this.getData();
            })
        },
        mounted (){
            //绑定点击事件
            document.addEventListener('click', (e)=>{
                if(!this.$el.contains(e.target)){
                    this.showMenu = 'none';
                }
            })
        },
        methods : {
            /**
             * 搜索栏点击事件
             */
            greet () {
                // this.keyword = "";
                if(this.readonly === false){
                    this.showMenu = (this.showMenu === 'none') ? 'block' : 'none';
                }
            },
            /**
             * 发起搜索
             */
            async getData (){
                this.searchLoading = true;
                try {
                    let res;
                    if(this.type === "1"){
                        // res = await $api.getUserItems(this.keyword,this.companyId);
                        res = await $api.getUsers({keyword:this.keyword});
                    }
                    this.searchLoading = false;

                    if(res.code !== 200){
                        this.items = [];
                        return false;
                    }
                    let list = [];
                    for(let i = 0 ; i < res.data.length ; i++){
                        list.push({
                            id : res.data[i].uid,
                            name : res.data[i].username,
                            groupId : res.data[i].group_id,
                        });
                    }
                    this.items = [...list];
                    // this.$refs.keywordInput.focus();
                }catch (e){
                    this.searchLoading = false;
                    utils.notice("拉取用户列表超时","error");
                }
            },
            /**
             * 下拉备选项点击事件
             *
             * @param {Number} index 选中项索引
             */
            select(index){
                this.theOne = Object.assign({},this.items[index]);
                this.$emit('selectOne',this.theOne);
                this.showMenu = 'none';
            },
            clear(){
                this.theOne = {
                    id : "",
                    name : "",
                };
                this.$emit('selectOne',this.theOne);
                this.showMenu = 'none';
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
            },
        }

    }
</script>

<style lang="less" scoped>
    @import "./super_cascade_select";
</style>