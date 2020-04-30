<template>
    <div class="transfer">
        <Spin v-if="loading" fix size="large"></Spin>
        <div class="ivu-transfer">
            <div class="ivu-transfer-list">
                <div class="ivu-transfer-list-header">
                    <label class="ivu-checkbox-wrapper">
                        <Checkbox :indeterminate="leftIndeterminate" :value="leftSelectAll" @click.prevent.native="handleCheckAll('left')">&nbsp;&nbsp;<span class="title-tip">{{title[0]}}</span></Checkbox>
                    </label>
                    <!--<span class="ivu-transfer-list-header-title">源列表</span>-->
                    <span class="ivu-transfer-list-header-count"><span v-show="leftSelect.length > 0">{{leftSelect.length}}/</span>{{leftList.length}}</span>
                </div>
                <div class="ivu-transfer-list-body check-box-main">
                    <CheckboxGroup v-model="leftSelect" @on-change="(data)=>{checkAllGroupChange('left',data)}">
                        <Checkbox class="check-item" v-for="(left,lk) in leftList" :label="left.uid" :value="left.uid" :key="left.uid">&nbsp;&nbsp;{{left.username}}</Checkbox>
                    </CheckboxGroup>
                </div>
            </div>
            <div class="ivu-transfer-operation">
                <button type="button" class="icon-button ivu-btn ivu-btn-primary" :disabled="rightSelect.length<=0" @click="remove">
                    <span>
                        <i class="iconfont iconyou-copy"></i>
                    </span>
                </button>
                <button type="button" class="icon-button ivu-btn ivu-btn-primary" :disabled="leftSelect.length<=0" @click="add">
                    <span>
                        <i class="iconfont iconzuo"></i>
                    </span>
                </button>
            </div>
            <div class="ivu-transfer-list">
                <div class="ivu-transfer-list-header">
                    <label class="ivu-checkbox-wrapper">
                        <span class="ivu-checkbox">
                            <Checkbox :indeterminate="rightIndeterminate" :value="rightSelectAll" @click.prevent.native="handleCheckAll('right')">&nbsp;&nbsp;<span class="title-tip">{{title[1]}}</span></Checkbox>
                        </span>
                    </label>
                    <!--<span class="ivu-transfer-list-header-title">目的列表</span>-->
                    <span class="ivu-transfer-list-header-count"><span v-show="rightSelect.length > 0">{{rightSelect.length}}/</span>{{rightList.length}}</span>
                </div>
                <div class="ivu-transfer-list-body check-box-main">
                    <CheckboxGroup v-model="rightSelect" @on-change="(data)=>{checkAllGroupChange('right',data)}">
                        <Checkbox class="check-item" v-for="(right,lk) in rightList" :label="right.uid" :value="right.uid" :key="right.uid">&nbsp;&nbsp;{{right.username}}</Checkbox>
                    </CheckboxGroup>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props : {
            title : {
                type : Array,
                default : ()=>{return ["选择人员","已选人员"]}
            },
            transferList : {
                type : Array,
                default : ()=>{return []}
            },
            loading : {
                type : Boolean,
                default : true,
            },
            defaultRightList:{
                type:Array,
                default:()=>{return []}
            }
        },
        data() {
            return {
                //左备选项
                leftList : [],
                //左所选项
                leftSelect : [],
                //左全选状态
                leftSelectAll : false,
                //左侧全选样式
                leftIndeterminate : false,
                //右备选项
                rightList :[],
                //右所选项
                rightSelect : [],
                //右备选状态
                rightSelectAll : false,
                //右侧全选样式
                rightIndeterminate : false,
            };
        },
        created(){

        },
        methods : {
            //初始化checkbox状态
            resetCheckbox(){
                this.leftSelect = [];
                this.leftSelectAll = false;
                this.leftIndeterminate = false;
                this.rightSelect = [];
                this.rightSelectAll = false;
                this.rightIndeterminate = false;
            },
            //初始化右侧备选项数据
            resetRightList(arr=[]){
                arr = JSON.parse(JSON.stringify(this.defaultRightList));
                this.rightList = [].concat(arr);
            },
            /**
             * 全选时触发
             * @param {string} type 左侧还是右侧
             */
            handleCheckAll (type = '') {
                switch (type){
                    case "left":
                            if (this.leftIndeterminate) {
                                this.leftSelectAll = false;
                            } else {
                                this.leftSelectAll = !this.leftSelectAll;
                            }
                            this.leftIndeterminate = false;

                            if (this.leftSelectAll) {
                                this.leftSelect = this.leftList.map((v)=>{return v.uid});
                            } else {
                                this.leftSelect = [];
                            }
                        break;
                    case "right":
                        if (this.rightIndeterminate) {
                            this.rightSelectAll = false;
                        } else {
                            this.rightSelectAll = !this.rightSelectAll;
                        }
                        this.rightIndeterminate = false;

                        if (this.rightSelectAll) {
                            this.rightSelect = this.rightList.map((v)=>{return v.uid});
                        } else {
                            this.rightSelect = [];
                        }
                        break;
                    default:
                        break;
                }

            },
            /**
             * 单选时触发
             * @param {string} type 左侧还是右侧
             * @param {array} data 选中回调携带数据
             */
            checkAllGroupChange (type="",data) {
                switch (type){
                    case "left":
                        if (data.length === this.leftList.length) {
                            this.leftIndeterminate = false;
                            this.leftSelectAll = true;
                        } else if (data.length > 0) {
                            this.leftIndeterminate = true;
                            this.leftSelectAll = false;
                        } else {
                            this.leftIndeterminate = false;
                            this.leftSelectAll = false;
                        }
                        break;
                    case "right":
                        if (data.length === this.rightList.length) {
                            this.rightIndeterminate = false;
                            this.rightSelectAll = true;
                        } else if (data.length > 0) {
                            this.rightIndeterminate = true;
                            this.rightSelectAll = false;
                        } else {
                            this.rightIndeterminate = false;
                            this.rightSelectAll = false;
                        }
                        break;
                    default:
                        break;
                }
            },
            //向右+
            add(){
                if(this.leftSelect.length <= 0){
                    return false;
                }
                let addArr = [];
                for(let i = 0 ; i < this.leftList.length ; i ++ ){
                    if(this.leftSelect.indexOf(this.leftList[i].uid) > -1){
                        addArr.push(this.leftList[i]);
                    }
                }
                this.rightList = [...this.rightList,...addArr];
                //去重复(这种方式会因为object浅拷贝导致的内存地址偏移，导致动态元素无法正确判断出重复项导致问题[通过异步操作来改变数组内对象的值慎用])
                // this.rightList = [...new Set(this.rightList)];
                //使用reduce累加器达到单纯通过某一值完成去重操作
                let obj = {};
                this.rightList =  this.rightList.reduce((cur,next) => {
                    obj[next.uid] ? "" : obj[next.uid] = true && cur.push(next);
                    return cur;
                },[]);
                //重置checkbox
                this.resetCheckbox();
                //触发回调
                this.changeCallback();
            },
            //向左-
            remove(){
                if(this.rightSelect.length <= 0){
                    return false;
                }
                let loop = this.rightList.length;
                for(let i = 0 ; i < loop ; i++){
                    if(this.rightSelect.indexOf(this.rightList[i].uid) > -1){
                        this.rightList.splice(i,1);
                        //重置循环至正确位置
                        i = i - 1;
                        loop = loop -1;
                    }
                }
                //重置checkbox
                this.resetCheckbox();
                //触发回调
                this.changeCallback();
            },
            //右侧选框每次有变动都触发
            changeCallback(){
                this.$emit("onchange",this.rightList);
            },
        },
        watch : {
            transferList(){
                this.leftList = [].concat(this.transferList);
            }
        }
    };
</script>

<style lang="less" scoped>
    @import "./deal_push.less";
</style>