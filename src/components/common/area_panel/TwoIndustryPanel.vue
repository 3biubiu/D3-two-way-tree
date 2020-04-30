<template>
    <Modal v-model="panelShow"
           width="600"
           @on-cancel="hide">
        <div slot="header" class="modal-header">
            <label>选择相关产业</label>
        </div>
        <div class="modal-body" id="_select_panel_">
            <!-- <Row :gutter="8">
                <Col :span="12">
                    <Select v-model="keyword" filterable clearable remote :remote-method="search" @on-change="selectSearch" :label-in-value="true" :loading="searchLoading" placeholder="请输入关键字">
                        <Option v-for="(item, index) in searchData" :value="item.value" :key="item.value">{{ item.name }}</Option>
                    </Select>
                </Col>
            </Row>
            <br> -->
            <Form ref="formDynamic" :model="formDynamic" :label-width="80">
                <FormItem
                        v-for="(item, index) in formDynamic.items"
                        v-if="item.status"
                        :key="index"
                        label="相关产业">
                    <Row :gutter="8">
                        <Col span="20">
                        <two-select-picker
                            :gutter="8"
                            :default-district="{
                                province: item.value[0],
                                city: item.value[1],
                                name: item.name.split('-')
                            }"
                            @roll="(data)=>{selectDistrict(data, index)}">
                        </two-select-picker>
                        </Col>
                        <Col span="2" v-if="canAdd && formDynamic.items.length > 1">
                            <Button @click="handleRemove(index)"><i class="fa fa-close"></i></Button>
                        </Col>
                    </Row>
                    
                </FormItem>
                <FormItem>
                    <Row  v-if="canAdd">
                        <Col span="12">
                            <Button type="dashed" long @click="handleAdd"><i class="fa fa-plus"></i>&nbsp;添加</Button>
                        </Col>
                    </Row>
                </FormItem>
            </Form>
        </div>
        <div slot="footer">
            <Button type="text" @click="hide">取消</Button>
            <Button type="primary" @click="doChoose">确定</Button>
        </div>
    </Modal>
</template>

<script>
    import { mapGetters } from 'vuex'
    import TwoSelectPicker from "@/components/common/select_picker/TwoSelectPicker"
    import utils from '@/utils'
    import $commonApi from '@/api/common';
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
                 name:['北京-北京','北京-北京'],
                 value:[["1","2"],["4","5"]]
             }
             */            
            defaultData : {
                type : Object,
                default : ()=>{return {}},
            },
        },
        components: {
            TwoSelectPicker
        },
        data(){
            return{
                //是否显示panel的标志位
                panelShow:false,
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
             * modal显示
             */
            show(){
                let _self = this;
                _self.initData();
                _self.$nextTick(()=>{
                    _self.panelShow = true;
                });
            },
            /**
             * modal隐藏
             */
            hide(){
                this.initData();
                this.panelShow = false;
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
                    this.$emit("saveData",returnData);
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
                this.formDynamic.items[index].name = selectedData.map(o => o.label).join('-');
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
            },
            search(keyword) {
                if(keyword.length < 2) {
                    return false;
                }
                this.searchLoading = true;
                $commonApi.searchDistrict(keyword).then(res => {
                    if(res.code === '200') {
                        this.searchData = res.data;
                    }
                    this.searchLoading = false;
                })
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
            },
            selectSearch(e) {
                if(e ===  undefined) {
                    return false;
                }
                let lastIndex = this.formDynamic.items.length;
                let ids = e.value.split('_');
                let data = {
                    status: 1,
                    name: e.label,
                    value: ids,
                    index: lastIndex - 1
                }
                this.$set(this.formDynamic.items, lastIndex - 1, data)
            }
        },
        computed:{//获取地区数据
            ...mapGetters(['regionList'])
        },
        created() {
        
        }
    }
</script>

<style scoped lang="less">
    @import "./area_panel.less";
</style>
<style lang="less">
    .ivu-cascader-menu .ivu-cascader-menu-item-active{
        color: #28b294;
    }
    .ivu-btn-text:hover{
        color: #28b294;
    }
    .ivu-btn-dashed:hover{
        color: #28b294;
        border-color: #28b294;
    }
</style>
