<!--面板型选择器（真实低效....我也没办法，等待高人优化一下）-->
<template>
    <Modal class="form-modal" v-model="panelShow" width="800" @on-cancel="hide" :title="title">
            <div class="modal-body" id="_select_panel_">
                <Input v-model="keyword" class="modal-search-input" type="text" :placeholder="searchPlaceholder" @on-change="inputPress" @on-enter="searchBegin"></Input>
                <Button type="primary" @click="searchBegin">搜索</Button>
                <div v-if="searchShow===true" class="search-list" :style="listStyle">
                    <ul>
                        <li v-for="(item,index) in searchData" @click="chooseOneSearch(item)" :key="index">{{item.name}}</li>
                    </ul>
                </div>
                <div class="modal-one-item" v-for="(item,index) in showData" :key="index">
                    <span class="item-parent-border" :id="'_select_panel_item_'+item.id" @click="pcheckAll(index)" :class="'item-parent '   + (searchIds.indexOf(item.id) > -1 ? 'search ' : ' ')">
                        <Checkbox v-model="parArr[index]" id="label">
                            <span @click="pcheckAll(index)">{{item.name}}</span>
                        </Checkbox>
                    </span>
                    <CheckboxGroup v-model="sonArr[index]" @on-change="()=>{sonIsCheckAll(index)}">
                        <Checkbox :id="'_select_panel_item_'+son.id" :label="son.id"  v-for="(son,key) in showData[index].son" :key="key"  :class="'item-child '   + (searchIds.indexOf(son.id) > -1 ? 'search ' : ' ')">
                            {{son.name}}
                        </Checkbox>
                    </CheckboxGroup>
                </div>
            </div>
            <div slot="footer">
                <Button v-if="canSelectAll" @click="selectAll" type="default" class="check-all">全选</Button>
                <Button type="text" @click="hide">取消</Button>
                <Button type="primary" @click="doChoose" :loading="btnLoading">确定</Button>
            </div>
    </Modal>
</template>

<script>
    export default {
        props:{
            title : {
                type : String,
                default : "添加产业",
            },
            searchPlaceholder: {
                type: String,
                default: '产业名称'
            },
            /**
             * 面板选择器需要用到的数据,必须遵照此格式id,name,外层son必需
             * [
             {
                 "id" : "1",
                 "fid" : "0",
                 "name" : "能源电力"，
                 "type" : "1"，
                 "son":[
                     {
                         "id" : "5",
                         "fid" : "1",
                         "name" : "太阳能"，
                         "type" : "2"，
                     },
                     {
                         "id" : "6",
                         "fid" : "1",
                         "name" : "风能"，
                         "type" : "2"，
                     }
                 ]
             },
             ]
             */
            panelData :{
                type : Array,
                default : ()=>{return []},
            },
            //用于每次初始化默认选中的数据，默认格式[["1","2],["3","4"]]
            defaultData : {
                type : Array,
                default : ()=>{return []},
            },
            //是否支持全选
            canSelectAll : {
                type : Boolean,
                default : true,
            },
            listStyle: {
                type: Object,
                default:()=>{
                    return {};
                }
            },
        },
        data(){
            return {
                btnLoading : false,
                //面板是否显示
                panelShow : false,
                //面板展示的项
                showData : [],
                //搜索项关键字
                keyword : "",
                //搜索备选项是否显示
                searchShow : false,
                //搜索展示的备选项
                searchData : [],
                //满足搜索条件项的id
                searchIds : [],
                //是否选中全部标志位
                allSelect : false,
                //选中全部的索引
                allIndex : -1,
                sonArr:[],//子集复选框
                parArr:[],//父级复选框
                //选中的项
                // chooseData : [],
            }
        },
        created(){

        },
        watch:{

        },
        methods : {
            //初始化数据
            initData(){
                this.showData = [].concat(this.panelData);
                for(let i = 0; i < this.showData.length;i++){
                    this.sonArr[i]=[];
                    for(let j in this.defaultData){
                        if(this.showData[i].id == this.defaultData[j][0]){
                            this.sonArr[i].push(this.defaultData[j][1]);
                        }
                    }
                }
                let parX = [];//所有子集传x的数据，表示全部
                for(let j in this.defaultData){
                    if(this.defaultData[j][1] == 'x'){
                        parX.push(this.defaultData[j][0]);
                    }
                }
                for(let i = 0; i < this.showData.length;i++){
                    if(parX.includes(this.showData[i].id)==true){
                        this.parArr[i] = true;
                        this.synCheckbox(i);
                    }
                }
                //是否全选的判断
                this.parIsCheckAll();
                this.keyword = "";
                this.searchData = [];
                this.searchIds = [];
                //延迟1毫秒重置滚动条位置，基本操作
                setTimeout(()=>{
                    document.getElementById("_select_panel_").scrollTop = 0;
                },100);
            },
            //modal显示
            show(){
                let _self = this;
                this.initData();
                this.$nextTick(()=>{
                    _self.panelShow = true;
                    this.btnLoading = false;
                });
            },
            //modal隐藏
            hide(){
                // if(this.allSelect === true){
                //     this.defaultData.splice(this.allIndex,0,["0","0"]);
                // }
                this.panelShow = false;
            },
            hideLoading(){
                this.btnLoading = false;
            },
            //搜索input输入时
            inputPress(){
                this.searchData = [];
                if(this.keyword === ""){
                    this.searchShow = false;
                    return false;
                }
                //我承认这写法很低效，待优化
                for(let i = 0 ; i< this.panelData.length ; i++){
                    if(this.panelData[i].name.indexOf(this.keyword) > -1){
                        //选中
                        this.searchData.push({"id" : this.panelData[i].id,"name":this.panelData[i].name});
                    }
                    if(this.panelData[i].son && this.panelData[i].son.length > 0){
                        for (let k = 0; k< this.panelData[i].son.length; k++){
                            if(this.panelData[i].son[k].name.indexOf(this.keyword) > -1 ){
                                this.searchData.push({"id" : this.panelData[i].son[k].id,"name":this.panelData[i].son[k].name});
                            }
                        }
                    }

                }
                this.searchShow = true;
            },
            /**
             * 选中搜索项
             * @param {object} item 选中的项
             */
            chooseOneSearch(item){
                this.searchData = [];
                this.searchIds = [];
                this.keyword = item.name;
                this.searchIds.push(item.id);
                this.searchShow = false;

                let _self = this;
                this.$nextTick(()=>{
                    _self.setSearchPosition();
                })
            },
            //搜索按钮点击事件
            searchBegin(){
                this.searchData = [];
                this.searchIds = [];
                this.searchShow = false;
                if(this.keyword === ""){
                    return false;
                }
                //我承认这写法很低效，待优化
                for(let i = 0 ; i< this.panelData.length ; i++){
                    if(this.panelData[i].name.indexOf(this.keyword) > -1){
                        //选中
                        this.searchIds.push(this.panelData[i].id);
                    }
                    if(this.panelData[i].son && this.panelData[i].son.length > 0){
                        for (let k = 0; k< this.panelData[i].son.length; k++){
                            if(this.panelData[i].son[k].name.indexOf(this.keyword) > -1 ){
                                this.searchIds.push(this.panelData[i].son[k].id);
                            }
                        }
                    }
                }

                let _self = this;
                this.$nextTick(()=>{
                    _self.setSearchPosition();
                })
            },
            //自动定位到第一个搜索项的位置
            setSearchPosition(){
                //div滚动条高度
                // let divScrollHeight= document.getElementById("_select_panel_").scrollHeight;
                let divScrollHeight= this.$el.querySelector("#_select_panel_").scrollHeight;
                //判断是否存在滚动条
                if(divScrollHeight >400 && this.searchIds[0]) {
                    //存在
                    let eleToParentH = this.$el.querySelector("#_select_panel_item_" + this.searchIds[0]).offsetTop;
                    let moveH = divScrollHeight > eleToParentH ? eleToParentH : divScrollHeight;
                    this.$el.querySelector("#_select_panel_").scrollTop = moveH;
                }
            },
            //全选按钮点击事件
            selectAll(){
                if(this.allSelect === true){
                    //取消全选
                    this.checkAll(false);
                }else{
                    //全选
                    this.checkAll(true);
                }
                this.allSelect = !this.allSelect;
            },
            // 确认按钮点击事件
            // 返回选中数据 格式[["1","x"],["2","26"],["2","27"]]  x代表那个一级选项全选
            doChoose () {
                //整理结果
                this.btnLoading = true;
                let result = [];
                for(let i in this.sonArr){
                    if(this.parArr[i] == true){
                        result.push([this.panelData[i].id,'x']);
                    }else if(this.sonArr[i].length>0){
                        for(let j in this.sonArr[i]){
                            result.push([this.panelData[i].id,this.sonArr[i][j]]);
                        }
                    }
                }
                this.$emit("save-data",result);
            },
            /*
             *父级点击全选
             */
            pcheckAll(index){
                this.parArr[index] = !this.parArr[index];
                this.synCheckbox(index);
            },
            /*
             *判断子集是否全选
             */
            sonIsCheckAll(index){
                this.parArr[index] = (this.showData[index].son.length == this.sonArr[index].length);
            },
            /*
             *判断父级是否全选
             */
            parIsCheckAll(){
                this.allSelect = (this.showData.length == this.parArr.length);
            },
            /*
            *全选
            */
            checkAll(bool){
                for(let i in this.showData){
                    this.$set(this.parArr,i, bool);
                    this.synCheckbox(i);
                }
            },
            /*
            *父子级复选框联动
             */
            synCheckbox(index){
                this.sonArr[index] = [];
                if(this.parArr[index] == true){
                    for(let i = 0;i<this.showData[index].son.length;i++){
                        this.sonArr[index].push(this.showData[index].son[i].id);
                    }
                }
                let set = new Set(this.sonArr);
                this.sonArr = [...set];
            },
        }
    }
</script>

<style scoped>
    @import "./select_panel_new.less";
</style>
