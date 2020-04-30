<!--面板型选择器（真实低效....我也没办法，等待高人优化一下）-->
<template>
    <Modal v-model="panelShow"
           width="800"
           @on-cancel="hide">
        <div slot="header" class="modal-header">
            <label>{{title}}</label>
            <Input v-model="keyword" class="modal-search-input" type="text" :placeholder="searchPlaceholder" @on-change="inputPress" @on-enter="searchBegin"></Input>
            <div v-if="searchShow===true" class="search-list" :style="listStyle">
                <ul>
                    <li v-for="(item,index) in searchData" @click="chooseOneSearch(item)">{{item.name}}</li>
                </ul>
            </div>
            <Button type="primary" @click="searchBegin">搜索</Button>
        </div>
        <div class="modal-body" id="_select_panel_">
            <div class="modal-one-item" v-for="(item,index) in showData">
                <div>
                    <div :id="'_select_panel_item_'+item.id" @click="pressItem(index)"  :class="'item-parent '  + (showData[index].active ? 'active ' : ' ') + (searchIds.indexOf(item.id) > -1 ? 'search ' : ' ')">
                        {{item.name}}
                    </div>
                </div>
                <div>
                    <div :id="'_select_panel_item_'+son.id" v-for="(son,key) in showData[index].son" @click="pressItem(index,key)" :class="'item-child '  + (showData[index].son[key].active ? 'active ' : ' ') + (searchIds.indexOf(son.id) > -1 ? 'search ' : ' ')">
                        {{son.name}}
                    </div>
                </div>
            </div>
        </div>
        <div slot="footer">
            <Button v-if="canSelectAll" @click="selectAll" type="default" style="background-color: #FFF;float: left;">全选</Button>
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
            //选择输出模式：1-全部-全部作为单独选项，2-全部-全部覆盖其他选项，3-输出全部选项，不输出全部-全部
            dataType : {
                type : String,
                default : "1",
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
                //选中的项
                // chooseData : [],
            }
        },
        created(){

        },
        methods : {
            /**
             * 我自己写的in_array,实在是没招了
             * @param {array} arrA 待判断数组
             * @param {array} arrB 基数组
             * @returns {boolean}
             */
            inArray(arrA,arrB){
                for(let i=0;i<arrB.length;i++){
                    if(arrB[i][1] === arrA[1] && arrB[i][0] === arrA[0]){
                        return true;
                    }
                }
                return false;
            },
            //初始化数据
            initData(){
                this.showData = [].concat(this.panelData);
                //是否全选的判断
                this.getSelectAllStatus();

                //初始化数据
                for(let i = 0; i < this.showData.length;i++){
                    //判断是否一级全选
                    if(this.inArray([this.showData[i].id,"0"],this.defaultData) === true || this.allSelect === true){
                        this.showData[i].active = true;
                    }else{
                        this.showData[i].active = false;
                    }
                    //二级选中判断
                    if(this.showData[i].son){
                        for(let k = 0 ; k < this.showData[i].son.length;k++){
                            if(this.allSelect === true||this.inArray([this.showData[i].id,this.showData[i].son[k].id],this.defaultData) === true||this.inArray([this.showData[i].id,"0"],this.defaultData) === true){
                                this.showData[i].son[k].active = true;
                            }else{
                                this.showData[i].son[k].active = false;
                            }

                        }
                    }
                }
                this.keyword = "";
                this.searchData = [];
                this.searchIds = [];
                //延迟1毫秒重置滚动条位置，基本操作
                setTimeout(()=>{
                    document.getElementById("_select_panel_").scrollTop = 0;
                },100);
            },
            //初始化时判断是否选中所有选中所有则返回true
            getSelectAllStatus(){
                this.allSelect = false;
                this.allIndex = -1;  //0-0所在位置索引
                for(let i = 0 ; i< this.defaultData.length ; i++){
                    if(this.defaultData[i][0] === "0" || (this.defaultData[i][0] === "0" && this.defaultData[i][1] === "0")){
                        this.allIndex = i;
                        this.allSelect = true;
                        break;
                    }
                }
                if(this.allIndex !== -1){
                    // this.defaultData.splice(this.allIndex,1);
                    return this.allSelect;
                }

                //若不存在全部-全部的项则逐项判断
                //先计算备选项有多少
                let defaultCount = 0;
                let showCount = 0;
                for(let i = 0 ; i < this.defaultData.length ; i++){
                    if(this.defaultData[i][1] !== "0"){
                        defaultCount ++;
                    }
                }
                for(let i = 0 ; i < this.showData.length ; i++){
                    showCount = showCount + (this.showData[i].son ? this.showData[i].son.length : 0);
                }

                if(defaultCount === showCount){
                    this.allSelect = true;
                }
                return this.allSelect;
            },
            //点击选择事件触发时判断是否选中所有
            getNowSelectAllStatus(){
                let allCount = 0;
                let selectCount = 0;
                for(let i = 0 ; i < this.showData.length ; i++){
                    allCount += this.showData[i].son.length;
                    if(this.showData[i].active === true){
                        selectCount += this.showData[i].son.length;
                    }else{
                        for(let k = 0 ; k < this.showData[i].son.length; k++){
                            if(this.showData[i].son[k].active === true){
                                selectCount++;
                            }
                        }
                    }
                }
                if(allCount === selectCount){
                    this.allSelect = true;
                }else{
                    this.allSelect = false;
                }
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
                let divScrollHeight= document.getElementById("_select_panel_").scrollHeight;
                //判断是否存在滚动条
                if(divScrollHeight >400 && this.searchIds[0]) {
                    //存在
                    let eleToParentH = document.getElementById("_select_panel_item_" + this.searchIds[0]).offsetTop;
                    let moveH = divScrollHeight > eleToParentH ? eleToParentH : divScrollHeight;
                    document.getElementById("_select_panel_").scrollTop = moveH;
                }
            },
            /**
             * 选中|取消选中
             * @param {int} index 父级索引
             * @param {int} key 子级索引
             */
            pressItem(index,key=""){
                let active = true;
                let num = 0;
                //超级判断，好好感受下吧
                if(key===""){
                    //选父级
                    if(!this.showData[index].active || this.showData[index].active === false){
                        active = true;
                    }else{
                        active = false;
                    }
                    this.showData[index].active = active;

                    for(let i = 0;i<this.showData[index].son.length;i++){
                        this.showData[index].son[i].active = active;
                    }

                }else{
                    //选子级
                    if(!this.showData[index].son[key].active || this.showData[index].son[key].active === false){
                        active = true;
                    }else{
                        active = false;
                    }
                    this.showData[index].son[key].active = active;

                    for(let i = 0;i<this.showData[index].son.length;i++){
                        if(!(!this.showData[index].son[i].active || this.showData[index].son[i].active === false)){
                            num ++;
                        }
                        if(num === this.showData[index].son.length){
                            this.showData[index].active = true;
                        }else{
                            this.showData[index].active = false;
                        }
                    }

                }

                this.showData = [].concat(this.showData);
                //更新全部选中状态
                this.getNowSelectAllStatus();
                // this.showData = Object.assign({},this.showData);
            },
            //全选按钮点击事件
            selectAll(){
                if(this.allSelect === true){
                    //取消全选
                    this.setItemActive(false);
                }else{
                    //全选
                    this.setItemActive(true);
                }
            },
            /**
             * 手动设置全选|反选状态
             * @param {bool} type  true:全选false反选
             */
            setItemActive(type=true){
                for(let i = 0 ; i < this.showData.length ; i++){
                    if(type === true){
                        this.showData[i].active = true
                    }else{
                        this.showData[i].active = false
                    }
                    for(let k = 0 ; k < this.showData[i].son.length; k++){
                        if(type === true){
                            this.showData[i].son[k].active = true
                        }else{
                            this.showData[i].son[k].active = false
                        }
                    }
                }
                this.allSelect = type;
                this.showData = [].concat(this.showData);
            },
            //确认按钮点击事件
            doChoose () {
                //整理结果
                this.btnLoading = true;
                let result = [];
                for(let i in this.showData){
                    if(!(!this.showData[i].active || this.showData[i].active === false )){
                        result.push([this.showData[i].id,"0"]);
                    }else{
                        if(this.showData[i].son){
                            for(let k = 0; k<this.showData[i].son.length ; k++){
                                if(!(!this.showData[i].son[k].active || this.showData[i].son[k].active === false )){
                                    result.push([this.showData[i].id,this.showData[i].son[k].id]);
                                }
                            }
                        }
                    }
                }
                //根据配置返回结果
                if(this.dataType === "1"){
                    if(this.allSelect === true){
                        result.unshift(["0","0"]);
                    }
                }else if(this.dataType === "2"){
                    if(this.allSelect === true){
                        result = [["0","0"]];
                    }
                }

                this.$emit("save-data",result);
                this.panelShow = false;
            },
        }
    }
</script>

<style scoped>
    @import "./select_panel.less";
</style>