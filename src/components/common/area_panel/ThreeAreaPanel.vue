<template>
    <div class="modal-body" id="_select_panel_">
        <Form ref="formDynamic" :model="formDynamic">
            <FormItem
                    v-for="(item, index) in formDynamic.items"
                    v-if="item.status"
                    :key="index"
                    label="">
                <Row :gutter="8">
                    <Col span="20">
                    <three-select-picker
                            :gutter="8"
                            :default-district="{
                                province: item.value[0],
                                city: item.value[1],
                                area: item.value[2],
                                name: item.name.split('-')
                            }"
                            @roll="(data)=>{selectDistrict(data, index)}"
                    ></three-select-picker>
                    </Col>
                    <Col span="2" v-if="canAdd && formDynamic.items.length > 1">
                        <Button class="add-button"  v-if="index>0" @click="handleRemove(index)"><i class="iconfont iconguanbi"></i>删除</Button>
                    </Col>
                    <Col span="2" v-if="canAdd">
                        <Button class="add-button"  v-if="index==0" @click="handleAdd"><i class="iconfont iconjiahao1"></i>添加</Button>
                    </Col>
                </Row>
            </FormItem>
<!--            <FormItem>-->
<!--                <Row  v-if="canAdd">-->
<!--                    <Col span="12">-->
<!--                        <Button type="dashed" long @click="handleAdd"><i class="fa fa-plus"></i>&nbsp;添加</Button>-->
<!--                    </Col>-->
<!--                </Row>-->
<!--            </FormItem>-->
        </Form>
    </div>

</template>

<script>
    import { mapGetters } from 'vuex'
    import ThreeSelectPicker from "@/components/common/select_picker/ThreeSelectPicker"
    import utils from '@/utils'
    // import $commonApi from '@/api/common';
    export default {
        name: "four-area-panel",
        props:{
            //是否支持多选
            canAdd : {
                type : Boolean,
                default : true,
            },
            //用于每次初始化默认选中的数据，默认格式
            /**
             {
                 name:['北京-北京-朝阳区','北京-北京-朝阳区'],
                 value:[["1","2","3"],["4","5","6"]]
             }
             */
            defaultData : {
                type : Object,
                default : ()=>{return {}},
            },
        },
        components: {
            ThreeSelectPicker
        },
        data(){
            return{
                //是否显示panel的标志位
                //级联框的key
                index: 1,
                //级联返回的数据
                formDynamic: {
                    items: [
                        {
                            value: [],
                            name: '',
                            index: 1,
                            status: 1
                        }
                    ]
                },
                //经过处理的级联返回数据
                selectData:{
                    name:[],
                    value:[]
                },
                keyword: '',
                searchData: [],
                searchLoading: false
            }
        },
        // watch:{
        //     formDynamic: {
        //         handler(val) {
        //         },
        //         deep: true
        //     }
        // },
        methods:{
            /**
             * 初始化
             */
            initData(){
                this.selectData.name = [].concat([]);
                this.selectData.value = [].concat([]);
                this.formDynamic.items = [].concat([]);
                if(this.defaultData.value && this.defaultData.value.length > 0){
                    this.selectData.value = [].concat(this.defaultData.value);
                    this.selectData.name = [].concat(this.defaultData.name);
                    for(let i = 0; i<this.defaultData.value.length;i++){
                        this.formDynamic.items.push({value:[],index:1,status:1});
                        this.formDynamic.items[i].value = [].concat(this.defaultData.value[i]);
                        this.formDynamic.items[i].name = this.defaultData.name[i];
                        this.formDynamic.items[i].index = i+1;
                        this.formDynamic.items[i].status = 1;
                    }
                }else{
                    this.formDynamic.items.push({value:[],index:1,status:1,name: ''});
                }
            },
            /**
             * 点击确定按钮之后的操作
             */
            doChoose(){
                if(this.formDynamic.items.length >0){
                    let returnData = {
                        name:[],
                        value:[]
                    }
                    for (let i = 0; i < this.formDynamic.items.length; i++) {
                        if(this.formDynamic.items[i].value.length > 0){
                            returnData.name.push(this.formDynamic.items[i].name);
                            returnData.value.push(this.formDynamic.items[i].value);
                        }
                    }
                    this.$emit("returnData",returnData);
                    this.panelShow = false;
                }else{
                    utils.notice('请选择所属省份');
                }
            },
            /**
             * iview级联的选择完成后的回调
             * @param {array} value 已选值 value
             * @param {array} selectedData 为已选项的具体数据
             */
            afterSelect(value, selectedData,index){
                this.formDynamic.items[index].value = [].concat(value);
                this.formDynamic.items[index].name = selectedData.map(o => o.text).join('-');
            },
            /**
             * 添加按钮
             */
            handleAdd () {
                this.index++;
                this.formDynamic.items.push({
                    value: [],
                    index: this.index,
                    status: 1,
                    name: ''
                });
            },
            /**
             * 删除按钮
             * @param index
             */
            handleRemove (index) {
                this.formDynamic.items.splice(index,1);
                this.selectData.name.splice(index,1);
                this.selectData.value.splice(index,1);
                this.$emit("watch-data");
            },
            search(keyword) {
                if(keyword.length < 2) {
                    return false;
                }
                this.searchLoading = true;
                // $commonApi.searchDistrict(keyword).then(res => {
                //     if(res.code === '200') {
                //         this.searchData = res.data;
                //     }
                //     this.searchLoading = false;
                // })
            },
            selectDistrict(data, index) {
                let district = [];
                for (let i in data) {
                    if(i !== 'name') {
                        district.push(data[i])
                    }
                }
                if(data.name.length > 0) {
                    this.$set(this.formDynamic.items[index], 'name', data.name.join('-'))
                }
                if(district.length > 0) {
                    this.$set(this.formDynamic.items[index], 'value', district)
                }
                this.$emit("watch-data");
            },
            selectSearch(e) {
                if(e ===  undefined) {
                    return false;
                }
                let lastIndex = this.formDynamic.items.length;
                let ids = e.value.split('_');
                let data = {
                    status: 1,
                    name: e.text,
                    value: ids,
                    index: lastIndex - 1
                }
                this.$set(this.formDynamic.items, lastIndex - 1, data)
            },
            /*
            打开modal框初始化数据，为了把默认值传进来
             */
            openModal(defaultData){
                this.selectData.name = [].concat([]);
                this.selectData.value = [].concat([]);
                this.formDynamic.items = [].concat([]);
                if(defaultData.value && defaultData.value.length > 0){
                    this.selectData.value = [].concat(defaultData.value);
                    this.selectData.name = [].concat(defaultData.name);
                    for(let i = 0; i<defaultData.value.length;i++){
                        this.formDynamic.items.push({value:[],index:1,status:1});
                        this.formDynamic.items[i].value = [].concat(defaultData.value[i]);
                        this.formDynamic.items[i].name = defaultData.name[i];
                        this.formDynamic.items[i].index = i+1;
                        this.formDynamic.items[i].status = 1;
                    }
                }else{
                    this.formDynamic.items.push({value:[],index:1,status:1,name: ''});
                }
            }
        },
        created() {
            this.initData();
        }
    }
</script>

<style scoped lang="less">
    @import "./area_panel.less";
</style>
