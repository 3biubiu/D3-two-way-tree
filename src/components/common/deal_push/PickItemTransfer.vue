<template>
    <div class="transfer pick-item-transfer">
        <Spin v-if="loading" fix size="large"></Spin>
        <div class="ivu-transfer">
            <div class="ivu-transfer-list">
                <!-- <div class="ivu-transfer-list-header">
                    <label class="ivu-checkbox-wrapper">
                        <Checkbox :indeterminate="leftIndeterminate" :value="leftSelectAll" @click.prevent.native="handleCheckAll('left')">&nbsp;&nbsp;<span class="title-tip">{{title[0]}}</span></Checkbox>
                    </label>
                    <span class="ivu-transfer-list-header-count"><span v-show="leftSelect.length > 0">{{leftSelect.length}}/</span>{{leftList.length}}</span>
                </div> -->
                <div class="ivu-transfer-list-body check-box-main">
                    <CheckboxGroup v-model="leftSelect" @on-change="(data)=>{checkAllGroupChange('left',data)}">
                        <Checkbox class="check-item" v-for="(left,lk) in leftList" :label="left.id" :value="left.id" :key="left.id">
                            [{{cateToText(left.cate)}}{{typeToText(left.type)}}]{{left.title}}
                        </Checkbox>
                    </CheckboxGroup>
                </div>
            </div>
            <div class="ivu-transfer-operation">
                <!-- <button type="button" class="icon-button ivu-btn ivu-btn-primary" :disabled="rightSelect.length<=0" @click="remove">
                    <span>
                        <i class="fa fa-chevron-left"></i>
                    </span>
                </button> -->
                <button type="button" class="icon-button ivu-btn ivu-btn-primary" :disabled="leftSelect.length<=0" @click="add">
                    <span>
                        <i class="fa fa-chevron-right"></i>
                    </span>
                </button>
            </div>
            <div class="ivu-transfer-list">
                <!-- <div class="ivu-transfer-list-header">
                    <label class="ivu-checkbox-wrapper">
                        <span class="ivu-checkbox">
                            <Checkbox :indeterminate="rightIndeterminate" :value="rightSelectAll" @click.prevent.native="handleCheckAll('right')">&nbsp;&nbsp;<span class="title-tip">{{title[1]}}</span></Checkbox>
                        </span>
                    </label>
                    <span class="ivu-transfer-list-header-count"><span v-show="rightSelect.length > 0">{{rightSelect.length}}/</span>{{rightList.length}}</span>
                </div> -->
                <div class="ivu-transfer-list-body check-box-main pick-item-right">
                    <CheckboxGroup v-model="rightSelect" @on-change="(data)=>{checkAllGroupChange('right',data)}">
                        <Checkbox class="check-item" v-for="(right,lk) in rightList" :label="right.id" :value="right.id" :key="right.id">[{{cateToText(right.cate)}}{{typeToText(right.type)}}]{{right.title}} <span @click="jumpTo(right.id)" v-if="itemIds.indexOf(right.id)!=-1">查看</span></Checkbox>
                    </CheckboxGroup>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import $api from'@/api/item/item_detail/index.js';
    import Config from '@/config.js';
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
                pickItemSuccess:false,
                itemIds:[]
            };
        },
        created(){

        },
        methods : {
            cateToText(num){
                let text = '';
                switch(num){
                    case '1':
                        text = '土地';
                        break;
                    case '2':
                        text = '厂房';
                        break;
                    case '3':
                        text = '商业';
                        break;
                    case '4':
                        text = '写字楼';
                        break;
                    case '5':
                        text = '注册';
                        break;
                    case '6':
                        text = '客户';
                        break;
                    case '7':
                        text = '仓库';
                        break;
                    case '8':
                        text = '企服';
                        break;
                    case '10':
                        text = '其他';
                        break;
                    default:
                        text="";
                        break;
                }
                return text;
            },
            typeToText(num){
                let text = '';
                switch(num){
                    case '1':
                        text = '项目';
                        break;
                    case '2':
                        text = '载体';
                        break;
                    case '3':
                        text = '单位';
                        break;
                    case '5':
                    case '7':
                        text = '名片库';
                        break;
                }
                return text;
            },
            //项目提取----查看跳页
            jumpTo(id){
                var newPage=window.open();
                newPage.location= Config.mmsHost + '/Spa/item/item_detail/' + id;
            },
            //项目提取加查看
            async pickItem(){
                let itemIds = [];
                for(let item of this.rightList){
                    itemIds.push(item.id);
                }
                let obj = {
                    itemids: itemIds.join(","),
                    types: 1
                }
                let res = await $api.pickItemRes(obj);
                this.itemIds = itemIds;
                this.pickItemSuccess = true;
            },
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
                                this.leftSelect = this.leftList.map((v)=>{return v.id});
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
                            this.rightSelect = this.rightList.map((v)=>{return v.id});
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
                    if(this.leftSelect.indexOf(this.leftList[i].id) > -1){
                        addArr.push(this.leftList[i]);
                    }
                }
                this.rightList = [...this.rightList,...addArr];
                //去重复(这种方式会因为object浅拷贝导致的内存地址偏移，导致动态元素无法正确判断出重复项导致问题[通过异步操作来改变数组内对象的值慎用])
                // this.rightList = [...new Set(this.rightList)];
                //使用reduce累加器达到单纯通过某一值完成去重操作
                let obj = {};
                this.rightList =  this.rightList.reduce((cur,next) => {
                    obj[next.id] ? "" : obj[next.id] = true && cur.push(next);
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
                    if(this.rightSelect.indexOf(this.rightList[i].id) > -1){
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
    @import "./pick_item_transfer.less";
</style>

<style lang="less">
    .pick-item-transfer{
	    .check-item{
	    	.ivu-checkbox{
	    		position: absolute;
                left: 15px;
                top: 8px;
	    	}
        }
        .pick-item-right{
            padding-left: 0;
            .check-item{
                padding-left: 16px;
            }
            .ivu-checkbox{
                display: none;
            }
        }
    }
</style>
