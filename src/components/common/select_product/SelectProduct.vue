<template>
    <Modal v-model="productModel" width="800" @on-cancel="hide">
        <div slot="header" class="modal-header">
            <label>{{title}}</label>
            <span class="tips">{{tips}}</span>
        </div>
        <div class="modal-body">
            <div class="search-box">
                <Input v-model="keyword" class="modal-search-input" type="text" :placeholder="searchPlaceholder" @on-focus="inputPress" @on-change="inputPress"></Input>
                <div v-if="searchShow===true" class="search-list">
                    <ul>
                        <li v-for="(item,index) in searchData" :key="index" @click="chooseOneSearch(item)">{{item.name}}</li>
                    </ul>
                </div>
            </div>
            <div class="list-box">
                <ul class="list-box-item">
                    <li ref="list1" v-for="(item,index) in list1" :key="index">
                        <Checkbox @on-change="(value)=>{commonChange(1,value,index)}" v-model="item.selected"></Checkbox>
                        <span :title="item.name" :class="(searchId && item.id[0]==searchId[0] && item.id[1]==searchId[1] && item.id[2]==searchId[2])?'active':''" @click="clickBox1(item)">{{item.name}}</span>
                    </li>
                </ul>
                <ul class="list-box-item item-mid" v-show="listShow2">
                    <li ref="list2" v-for="(item,index) in list2" :key="index">
                        <Checkbox @on-change="(value)=>{commonChange(2,value,index)}" v-model="item.selected"></Checkbox>
                        <span :title="item.name" :class="(searchId && item.id[0]==searchId[0] && item.id[1]==searchId[1] && item.id[2]==searchId[2])?'active':''" @click="clickBox2(item)">{{item.name}}</span>
                    </li>
                </ul>
                <ul class="list-box-item" v-show="listShow3">
                    <li ref="list3" v-for="(item,index) in list3" :key="index">
                        <Checkbox @on-change="(value)=>{commonChange(3,value,index)}" v-model="item.selected"></Checkbox>
                        <span :title="item.name" :class="(searchId && item.id[0]==searchId[0] && item.id[1]==searchId[1] && item.id[2]==searchId[2])?'active':''">{{item.name}}</span>
                    </li>
                </ul>
            </div>
        </div>
        <div slot="footer">
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
                default : "添加产品",
            },
            tips:{
                type : String,
                default : "(如果需要选择下级产品，请点击文字展开下级，点击前面复选是选中整个产品)",
            },
            searchPlaceholder: {
                type: String,
                default: '产品名称'
            },
            panelData:{
                type : Array,
                default : ()=>{return []},
            },
            productDefault:{
                type : Array,
                default : ()=>{return []},
            }
        },
        data(){
            return {
                btnLoading : false,   //确定按钮loading
                productModel:false,   //浮层显示与否
                keyword:'',      //搜索关键字
                searchId:'',
                searchShow:false,   //搜索记录显示与否
                searchData:[],    //搜索结果字段
                list1:[],
                listShow2:true,
                list2:[],
                listShow3:true,
                list3:[],
                defaultData:[],
                selectedData:[],
                originData:[]
            }
        },
        watch:{
            productModel(newVal,oldVal){
                if(newVal){
                    // 默认显示仅显示一级产品
                    this.originData = [];
                    this.list1=[];
                    this.originData = JSON.parse(JSON.stringify(this.panelData));
                    this.originData.map((itemL)=>{             
                        this.list1.push(itemL);                       
                    }) 
                    // 默认值计算
                    this.defaultData = [...this.productDefault];
                    this.selectedData = [...this.arrayZeroBack(this.defaultData)];
                    let selectedIdS = this.caculateOne();

                    
                    //默认数据defaultData数组去重
                    this.defaultData.map((item,i) => {
                        this.defaultData[i] =JSON.stringify(item);
                    });
                    this.defaultData = [...new Set(this.defaultData)];
                    this.defaultData.map((item, index) => {
                        this.defaultData[index] = JSON.parse(item)
                    });

                    this.list1.map((itemL)=>{                        
                        this.$set(itemL,"selected",false);      
                        selectedIdS.map((itemId)=>{ 
                            if(itemId == itemL.id){
                                this.$set(itemL,"selected",true);
                            }                                          
                        })             
                    })
                }
            },
            // selectedData:{
            //     deep : true,
            //     handler (n,o){
            //         console.log('new',n);
            //     }
            // }
        },
        created(){

        },
        methods : {
            /**
                * 计算一级默认值
            */  
            caculateOne(){
                // 默认值计算
                let selectedIdS = [];   //选中的id
                if(this.defaultData.length>0){
                    let idArr = {};  //每一个一级id的数量有多少  key:id,value:数量
                    this.defaultData.map((itemL)=>{ 
                        if(itemL[0]!='0' && itemL[1]=='0' && (itemL[2]=='0' || !item[2])){
                            selectedIdS.push(itemL[0]);
                        }else{
                            if(!idArr.hasOwnProperty(itemL[0])){
                                idArr[itemL[0]] = 0;
                            }          
                            idArr[itemL[0]] ++;
                        }                                              
                    })
                    // console.log(idArr,"idArr")
                    for(let i in idArr){
                        let numArr = [];   //算每一个一级id下面对应的三级（没有三级则加上二级）分别有多少个
                        this.originData.map((itemL)=>{
                            if(i==itemL.id){ 
                                if(itemL.son.length>0){
                                itemL.son.map((itemM)=>{
                                    if(itemM.son.length>0){
                                        numArr.push(itemM.son.length);
                                    }else{
                                        numArr.push(1);
                                    }    
                                })
                                }else{
                                    numArr.push(1);
                                }                                   
                            }
                        }) 
                        let sum = 0;    //没一个一级id下面总共有多少个
                        for (let sumI of numArr) {
                            sum += sumI;
                        }
                    // console.log(numArr,"numArr")
                    // console.log(sum,"sum")
                        if(sum == idArr[i]){    //如果传过来的个数和本身个数相等则说明这个一级选中
                            // console.log("ppppppp")
                            selectedIdS.push(i);        
                        }   
                    // console.log(selectedIdS,"selectedIdS")
                    }
                }
                return selectedIdS; 
            },
            /**
                * 计算二级默认值
            */  
            caculateTwo(){
                // 默认值计算
                let selectedIdS = [];   //选中的id
                if(this.defaultData.length>0){
                    let idArr = {};  //每一个一级id的数量有多少  key:id,value:数量
                    this.defaultData.map((itemL)=>{ 
                        if(itemL[0]!='0' && itemL[1]!='0' && itemL[2]=='0'){
                            selectedIdS.push(itemL[1]);
                        }else{
                            if(!idArr.hasOwnProperty(itemL[1])){
                                idArr[itemL[1]] = 0;
                            }          
                            idArr[itemL[1]] ++; 
                        }                                             
                    }) 
                    for(let i in idArr){
                        let numArr = [];   //算每一个一级id下面对应的三级（没有三级则加上二级）分别有多少个
                        this.originData.map((itemL)=>{
                            itemL.son.map((itemM)=>{
                                if(i==itemM.id){ 
                                    if(itemM.son.length>0){
                                        numArr.push(itemM.son.length);
                                    }else{
                                        numArr.push(1);
                                    }                                     
                                }
                            }) 
                        }) 
                        let sum = 0;    //没一个一级id下面总共有多少个
                        for (let sumI of numArr) {
                            sum += sumI;
                        }
                        if(sum == idArr[i]){    //如果传过来的个数和本身个数相等则说明这个一级选中
                            selectedIdS.push(i);        
                        }   
                    }                      
                }
                return selectedIdS; 
            },
            /**
                * 计算三级默认值
            */  
            caculateThree(){
                // 默认值计算
                let selectedIdS = [];   //选中的id
                if(this.defaultData.length>0){
                    let idArr = {};  //每一个一级id的数量有多少  key:id,value:数量
                    this.defaultData.map((itemL)=>{ 
                        if(!idArr.hasOwnProperty(itemL[2])){
                            idArr[itemL[2]] = 0;
                        }          
                        idArr[itemL[2]] ++;                      
                    }) 
                    for(let i in idArr){
                        let numArr = [];   //算每一个一级id下面对应的三级（没有三级则加上二级）分别有多少个
                        this.originData.map((itemL)=>{
                            itemL.son.map((itemM)=>{
                                itemM.son.map((itemS)=>{
                                    if(i==itemS.id){
                                        numArr.push(1);
                                    }                                       
                                })    
                            })    
                        }) 
                        let sum = 0;    //没一个一级id下面总共有多少个
                        for (let sumI of numArr) {
                            sum += sumI;
                        }
                        if(sum == idArr[i]){    //如果传过来的个数和本身个数相等则说明这个一级选中
                            selectedIdS.push(i);        
                        }   
                    }                   
                }
                return selectedIdS; 
            },
            /**
             * 通用勾选事件
             * @param {Number} level 层级1,2,3
             * @param {Boolean} value 选中状态
             * @param {Number} index 操作项索引
             * @param {Number} updateParent 是否联动更新父级状态
             */
            commonChange(level,value,index,updateParent=1){
                if(level === 1){
                    this.clickBox1(this.list1[index]);
                    this.changeBox1(value,index,updateParent);
                }else if(level === 2){
                    this.clickBox2(this.list2[index]);
                    this.changeBox2(value,index,updateParent);
                }else if(level === 3){
                    this.changeBox3(value,index,updateParent);
                }
            },
            /**
             * 一级勾选
             * @param {Boolean} value 选中状态
             * @param {Number} index 操作项索引
             * @param {Number} updateParent 是否联动更新父级状态
             * @param {Number} updateSon 是否联动更新子级状态
             */
            changeBox1(value,index,updateParent=1,updateSon=1){
                let item = this.list1[index];
                //一级是否选中
                item.selected = value;
                this.$set(this.list1[index],'selected',value);
                // this.list1[index].selected = value;
                this.updateSelectedData(1,item.id.split(","),(item.selected ? 1 : 2));
                if(updateParent === 1){
                    this.autoFixCheckAll(1,updateSon);
                }
            },
            /**
             * 二级勾选
             * @param {Boolean} value 选中状态
             * @param {Number} index 操作项索引
             * @param {Number} updateParent 是否联动更新父级状态
             * @param {Number} updateSon 是否联动更新子级状态
             */
            changeBox2(value,index,updateParent=1,updateSon=1){
                let item = this.list2[index];
                this.$set(this.list2[index],'selected',value);
                // this.list2[index].selected = value;
                this.updateSelectedData(2,(item.tree+","+item.id).split(","),(item.selected ? 1 : 2));
                if(updateParent === 1){
                    this.autoFixCheckAll(2,updateSon);
                }
            },
            /**
             * 三级勾选
             * @param {Boolean} value 选中状态
             * @param {Number} index 操作项索引
             * @param {Number} updateParent 是否联动更新父级状态
             * @param {Number} updateSon 是否联动更新子级状态
             */
            changeBox3(value,index,updateParent=1,updateSon=1){
                // 三级
                // 点击复选框，选中此三级
                // 反选，取消选中此三级
                let item = this.list3[index];
                this.$set(this.list3[index],'selected',value);
                // this.list3[index].selected = value;
                //处理结果数组              
                this.updateSelectedData(3,(item.tree+","+item.id).split(","),(item.selected ? 1 : 2));
                if(updateParent === 1){
                    this.autoFixCheckAll(3,updateSon);
                }
            },
            /**
                * 一级点击事件
                * @param {Number} item 操作项
            */
            clickBox1(item){
                // 点击名称（未选中），展开二级，不选中二级
                // 若选中则展开的二级全部选中
                this.listShow2 = true;
                this.listShow3 = false; 
                this.originData.map((itemL)=>{
                    if(item.id ==itemL.id){
                        if(itemL.son){
                            this.list2 = [...[],...itemL.son];
                        }else{
                            this.list2 = [];
                        }                        
                    }
                });
                //保证点击时的默认选中状态正确显示
                this.list2.map((itemC)=>{
                    if(item.selected){
                        this.$set(itemC,"selected",true);
                        this.selectedData.push([item.id,itemC.id]);
                    }else{
                        // this.$set(itemC,"selected",false);
                        // // 默认值计算
                        let selectedIdS = this.caculateTwo();
                        selectedIdS.map((itemId)=>{
                            if(itemId == itemC.id){
                                this.$set(itemC,"selected",true);
                            }
                        })
                    }
                })
            },
            /**
                * 二级点击事件
                * @param {Object} item 操作项
            */
            clickBox2(item){
                // 点击名称（未选中），展开三级，不选中三级
                // 若选中则展开的三级全部选中
                this.listShow3 = true;
                this.originData.map((itemL)=>{    
                    if(itemL.son){
                        itemL.son.map((itemM)=>{ 
                            if(item.id ==itemM.id){
                                if(itemM.son){
                                    this.list3 = [...[],...itemM.son];
                                }else{
                                    this.list3 = [];
                                }                        
                            }
                        })
                    }                        
                });
                //保证点击时的默认选中状态正确显示
                this.list3.map((itemC)=>{
                    this.$set(itemC,"pp_id",item.p_id);
                    if(item.selected){
                        this.$set(itemC,"selected",true);
                        this.selectedData.push([item.p_id,item.id,itemC.id]);
                    }else{
                        // this.$set(itemC,"selected",false);
                        // 默认值计算
                        let selectedIdS = this.caculateThree();
                        selectedIdS.map((itemId)=>{
                            if(itemId == itemC.id){
                                this.$set(itemC,"selected",true);
                            }
                        })
                    }
                })
            },
            /**
                * 关闭弹窗
            */
            hide(){
                this.productModel = false;               
                this.listShow3 = false;
                this.listShow2 = false;
            },
            /**
                * 打开弹窗
            */
            show(){
                this.btnLoading = false;
                this.productModel = true;
                this.keyword = "";
            },
            /**
                * 点击搜索项
                * @param {Object} item 操作项
            */
            chooseOneSearch(item){
                this.searchId = item.id;
                this.keyword = item.name;
                this.originData.map((itemL,iL)=>{   
                    if(itemL.id==item.id){
                        this.listShow2 = false;
                        this.listShow3 = false;
                        // this.$nextTick(()=>{
                        //     this.$refs.list1.scrollTop=20*iL;
                        // })                         
                    } 
                    if(itemL.son){
                    itemL.son.map((itemM,iM)=>{ 
                        if(itemM.id==item.id){
                            this.list2 = itemL.son;
                            this.listShow2 = true;
                            this.listShow3 = false;
                            // this.$nextTick(()=>{
                            //     this.$refs.list2.scrollTop=20*iM;
                            // })                            
                        }
                        if(itemL.son){
                        itemM.son.map((itemS,iS)=>{ 
                            if(itemS.id==item.id){
                                this.list2 = itemL.son;
                                this.list3 = itemM.son;
                                this.listShow2 = true;
                                this.listShow3 = true;
                                // this.$refs.list3.scrollTop=20*iS;
                            } 
                        })
                        }  
                    })
                    }                        
                })
                this.searchShow = false;
            },
            /**
                * change 搜索
            */
            inputPress(){
                this.searchData = [];
                if(this.keyword === ""){
                    this.searchShow = false;
                    this.listShow2 = false;
                    this.listShow3 = false;
                    return false;
                }
                this.originData.map((itemL)=>{   
                    if(itemL.name.indexOf(this.keyword)>-1){
                        this.searchData.push(itemL);
                    } 
                    if(itemL.son){
                    itemL.son.map((itemM)=>{ 
                        if(itemM.name.indexOf(this.keyword)>-1){
                            this.searchData.push(itemM);
                            // this.listShow2 = true;
                        } 
                        if(itemL.son){
                        itemM.son.map((itemS)=>{ 
                            if(itemS.name.indexOf(this.keyword)>-1){
                                this.searchData.push(itemS);
                                // this.listShow3 = true;
                            } 
                        })
                        }  
                    })
                    }                        
                })
                if(this.searchData.length>0){
                    this.searchShow = true;
                }
            },
            /**
                * 点击确定操作
            */
            doChoose(){
                this.btnLoading = true;
                setTimeout(()=>{
                    this.productModel = false;
                    //结果数组去重
                    this.selectedData.map((item,i) => {
                        this.selectedData[i] =JSON.stringify(item);
                    });
                    this.selectedData = [...new Set(this.selectedData)];
                    this.selectedData.map((item, index) => {
                        this.selectedData[index] = JSON.parse(item)
                    });
                    let arr = this.arrayThreeCascadeFilter(this.selectedData,this.originData);
                    // console.log(arr,"arr")
                    this.$emit("back-product-data",arr);
                    this.listShow3 = false;
                    this.listShow2 = false;
                },100);

            },
            /**
             * 更新选中项数据
             *
             * @param {Number} level 选择的是第几级数据
             * @param {Array} arr 选中项数据
             * @param {Number} type 1-增2-删
             */
            updateSelectedData(level,arr=[],type=1){
                // console.log(level,arr,type)
                // console.log("level","arr",'type')
                if(!arr || arr.length<=0){
                    return false;
                }
                let delIndexArr = [];
                this.selectedData.map((e,i)=>{
                    if(JSON.stringify(e)===JSON.stringify(arr)){
                        delIndexArr.push(i);
                    }
                });
                if(type === 1 && delIndexArr.length <= 0){
                    this.selectedData.push(arr);
                    return false;
                }
                if(type === 2 && delIndexArr.length > 0){
                    delIndexArr.map((item)=>{
                        this.selectedData.splice(item,1);
                    });
                    if(level===2){
                        this.selectedData.map((item,i)=>{
                            if(item[0]==arr[0] && item[1]==arr[1] && item.length==2){
                                this.selectedData.splice(i,1);
                            }
                        })
                    }
                }
                // console.log(this.selectedData,"this.selectedData")
            },
            /**
             * 自动处理全选状态
             * @param {Number} level 级别
             * @param {Number} updateSon 是否更新子级
             */
            autoFixCheckAll(level,updateSon=1){
                if(!(level === 2 || level ===3 || level === 1)){
                    return false;
                }

                let list = level === 3 ? "list3" : (level === 2 ? "list2" : "list1");

                let chooseCount = 0;
                let fid = this[list][0].p_id;
                for(let i = 0,len =this[list].length  ; i < len ; i++){
                    if(this[list][i].selected === true){
                        chooseCount ++;
                    }
                }
                if(level!==1){
                    //调整父级
                    let fList = level === 3 ? "list2" : "list1";
                    for(let i = 0,len =this[fList].length  ; i < len ; i++){
                        if(this[fList][i].id === fid){
                            let status = this[fList][i].son.length === chooseCount;
                            if(level === 3){
                                this.changeBox2(status,i,1,0);
                            }else{
                                this.changeBox1(status,i,0,0);
                            }
                            break;
                        }
                    }
                }
                if(level !== 3 && updateSon === 1){
                    //调整子级
                    let sList = level === 1 ? "list2" : "list3";
                    if(this[sList] && this[sList].length > 0 ){
                        for(let i = 0,len =this[list].length  ; i < len ; i++){
                            if(this[list][i].id === this[sList][0].p_id){
                                let checkStatus = this[list][i].selected;
                                for(let k = 0,le =this[sList].length  ; k < le ; k++){
                                    if(level === 1){
                                        this.changeBox2(checkStatus,k,1,1);
                                    }else{
                                        this.changeBox3(checkStatus,k,0,1);
                                    }
                                }
                            }
                        }
                    }

                }

            },
            /**
             * 结果集去重操作做
             * @param arr
             * @param sourceArr
             * @returns {*}
             */
            arrayThreeCascadeFilter(arr = [],sourceArr=[]){
                if(!arr || arr.length <= 0 || !Array.isArray(arr) || !sourceArr || sourceArr.length < 0){
                    return arr;
                }
                if(arr.indexOf(['0','0','0']) > -1){
                    return ['0','0','0'];
                }
                //先分组
                let firstArr = [];     //1级
                let secondArr = [];    //2级
                let thirdArr = [];     //3级
                for(let i = 0 ; i < arr.length ; i++){
                    if(arr[i].length === 1){
                        firstArr.push(arr[i].join(","));
                        continue;
                    }
                    if(arr[i].length === 2){
                        secondArr.push(arr[i].join(","));
                        continue;
                    }
                    if(arr[i].length === 3){
                        thirdArr.push(arr[i].join(","));
                        continue;
                    }
                }
                let firstArr2 = firstArr;
                let secondArr2 = [];
                let thirdArr2 = [];
                //先进行子集去重
                for(let i = 0 ; i < thirdArr.length; i++){
                    let arr = thirdArr[i].split(",");
                    let str = arr[0]+","+arr[1];
                    if(secondArr.indexOf(str) < 0){
                        thirdArr2.push(thirdArr[i]);
                    }
                }
                for(let i = 0 ; i < secondArr.length; i++){
                    let arr = secondArr[i].split(",");
                    let str = String(arr[0]);
                    if(firstArr.indexOf(str) < 0){
                        secondArr2.push(secondArr[i]);
                    }
                }

                let res =  [...firstArr2,...secondArr2,...thirdArr2];
                res.map((r,i) => {
                    res[i] = r.split(",");
                    if(res[i].length==1){
                        res[i] = [res[i][0],'0','0'];
                    }
                    if(res[i].length==2){
                        res[i] = [res[i][0],res[i][1],'0'];
                    }
                });
                return res;
            },
            /**
             * 将带0的数组还原成不带0的
             *
             */
            arrayZeroBack(arr=[]){
                if(!arr){
                    return arr;
                }
                let res = [];
                for(let i = 0,len = arr.length; i < len ; i++){
                    if(arr[i][0]==='0' && arr[i][1]==='0' && arr[i][2]==='0'){
                        return [];
                    }
                    let one = [arr[i][0]];
                    if(arr[i][1] !== '0'){
                        one.push(arr[i][1]);
                    }
                    if(arr[i][2] !== '0'){
                        one.push(arr[i][2]);
                    }
                    res.push(one);
                }
                return res;
            }
        }
    }
</script>

<style scoped lang="less">
    @import "./select_product.less";
</style>