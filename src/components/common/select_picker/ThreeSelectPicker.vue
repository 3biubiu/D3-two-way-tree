<!--
   地区四级联动组件

    ** 第四级地区需要请求接口拉取数据

   参数：
   gutter：每个select的间距
   selectPlaceholder: 下拉框提示文案
   defaultDistrict： 默认选中的地区

   事件：
   roll：每次变更地区的时候都会触发，参数为：所选择的的省市区ID
-->
<template>
    <div>
        <Row :gutter="gutter">
            <Col :span="8">
            <Select v-model="select.province" :placeholder="selectPlaceholder" @on-change="(e) => {selectChange(e, 'province')}" :filterable="filterable" :clearable="isClear" :disabled="isDisabled" :label-in-value="true" :transfer="true">
                <Option v-for="(item, index) in regionList" :value="item.value" :key="item.value" :label="item.label">{{ item.text }}</Option>
            </Select>
            </Col>
            <Col :span="8">
            <Select v-model="select.city" :placeholder="selectPlaceholder" :filterable="filterable" :clearable="isClear" :disabled="isDisabled" :label-in-value="true" @on-change="(e) => {selectChange(e, 'city')}" :transfer="true">
                <Option v-for="(item, index) in secondRegionList" :value="item.value" :key="item.value">{{ item.text }}</Option>
            </Select>
            </Col>
            <Col :span="8">
            <Select v-model="select.area" :placeholder="selectPlaceholder" :filterable="filterable" :clearable="isClear" :disabled="isDisabled" :label-in-value="true" @on-change="(e) => {selectChange(e, 'area')}" :transfer="true">
                <template v-for="(item, index) in thirdRegionList">
                    <Option :value="item.value" :key="item.value">{{ item.text }}</Option>
                </template>
            </Select>
            </Col>
            <!-- <Col :span="6">
            <Select v-model="select.town" :placeholder="selectPlaceholder" :filterable="filterable" :disabled="isDisabled" :label-in-value="true" @on-change="(e) => {selectChange(e, 'town')}" clearable>
                <Option value="0" v-if="fourRegionList.length > 0">全部</Option>
                <template v-for="(item, index) in fourRegionList">
                    <Option :value="item.id" :key="item.id">{{ item.name }}</Option>
                </template>
            </Select>
            </Col> -->
        </Row>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    // import area from "@/static_data/area.js";


    export default {
        name: "select-picker",
        data() {
            return {
                // 二级地区列表
                secondRegionList: [],
                // 三级地区列表
                thirdRegionList: [],
                // 四级地区列表
                // fourRegionList: [],
                // 选中的地区id
                select: {
                    province: '',
                    city: '',
                    area: '',
                    // town: '',
                    name: []
                },
                // 直辖市地区ID
                countryIds: ['1', '2', '9'],
                isDisabled:false,
                isClear:false,
            }
        },
        props: {
            // 默认选中的地区
            defaultDistrict: {
                type: Object,
                default: () => {
                    return {
                        province: '',
                        city: '',
                        area: '',
                        name: []
                    }
                }
            },
            // 下拉框提示文案
            selectPlaceholder: {
                type: String,
                default: '所在地区'
            },
            // 三个下拉框的间隔距离
            gutter: {
                type: Number,
                default: 0
            },
            // 是否支持输入搜索
            filterable: {
                type: Boolean,
                default: false
            }
        },
        watch: {
            /**
             * 监听选择省
             * @param val
             */
            'select.province'(val) {
                if(val === '0' || val === '') {
                    this.select.city = ''
                    this.select.area = ''
                    this.secondRegionList = []
                    this.thirdRegionList = []
                }
                for (let region of this.regionList) {
                    if(region.value === val) {
                        // 判断是否为直辖市
                        if(this.countryIds.includes(val)) {
                            this.select.city = val
                        }
                        this.secondRegionList = region.children
                        break
                    }
                }
                this.$emit('roll', this.selectDistrict)
            },
            /**
             * 监听选择市
             * @param val
             */
            'select.city'(val) {
                if(val === '0' || val === '') {
                    this.thirdRegionList = []
                    this.select.area = ''
                }
                for (let region of this.secondRegionList) {
                    if(region.value === val) {
                        this.thirdRegionList = region.children
                        break
                    }
                }
                this.$emit('roll', this.selectDistrict)
            },
            /**
             * 监听选择区
             * @param val
             */
            'select.area'(val) {
                this.$emit('roll', this.selectDistrict)
            },
            /**
             * 默认选择的地区
             * @param val
             */
            defaultDistrict (val) {
                this.select = Object.assign(this.select, JSON.parse(JSON.stringify(val)))
            },
        },
        computed: {
            // //省市区数据
            regionList(){
                //从vuex获取数据（进入详情页的时候把数据存vuex里面）
                let data = this.$store.getters['itemDetail/area'];
                return data;
            },
            // 选择的地区数据，数据处理
            selectDistrict() {
                let data = {}
                for (let i in this.select) {
                    if(this.select[i] == undefined) {
                        this.select[i] = ''
                    }
                    this.$set(data, i, this.select[i])
                }
                return data
            }
        },
        created() {
            this.select = Object.assign(this.select, this.defaultDistrict)
        },
        methods: {
            selectChange(e, type){
                if(e === undefined) {
                    return false;
                }
                if(type === 'province') {
                    this.select.name = [];
                }
                // 直辖市需要加入两遍地区名称
                if(this.countryIds.includes(e.value)) {
                    this.select.name.push(e.text)
                }
                if(this.select.name.length==3 && type=="city"){
                    this.select.name[1]= e.text;
                    this.select.name[2]= '全部';
                }else if(this.select.name.length==3 && type=="area"){
                    this.select.name[2]= e.text;
                }else{
                    this.select.name.push(e.text)
                }
            },
            setSelectDisabled(){
                this.isDisabled = true
            },
            resetSelectDisabled(){
                this.isDisabled = false
            },
        },
    }
</script>

<style scoped>

</style>