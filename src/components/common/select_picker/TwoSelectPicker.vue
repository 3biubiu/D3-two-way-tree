<!--
   相关产业联动组件

    ** 第四级相关产业需要请求接口拉取数据

   参数：
   gutter：每个select的间距
   selectPlaceholder: 下拉框提示文案
   defaultDistrict： 默认选中的相关产业

   事件：
   roll：每次变更相关产业的时候都会触发，参数为：所选择的的省市区ID
-->
<template>
    <div>
        <Row :gutter="gutter">
            <Col :span="12">
            <Select v-model="select.province" :placeholder="selectPlaceholder" @on-change="(e) => {selectChange(e, 'province')}" :filterable="filterable" :clearable="isClear" :disabled="isDisabled" :label-in-value="true">
                <Option value="0">全部</Option>
                <Option v-for="(item, index) in industryList" :value="item.value" :key="item.value" :label="item.label">{{ item.label }}</Option>
            </Select>
            </Col>
            <Col :span="12">
            <Select v-model="select.city" :placeholder="selectPlaceholder" :filterable="filterable" :clearable="isClear" :disabled="isDisabled" :label-in-value="true" @on-change="(e) => {selectChange(e, 'city')}">
                <Option value="0">全部</Option>
                <Option v-for="(item, index) in secondRegionList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
            </Col>
        </Row>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    // import $commonApi from '@/api/common'
    export default {
        name: "select-picker",
        data() {
            return {
                // 二级相关产业列表
                secondRegionList: [],
                // 选中的相关产业id
                select: {
                    province: '',
                    city: '',
                    name: []
                },
                // 直辖市相关产业ID
                countryIds: [],
                isDisabled:false,
                isClear:false
            }
        },
        props: {
            // 默认选中的相关产业
            defaultDistrict: {
                type: Object,
                default: () => {
                    return {
                        province: '',
                        city: '',
                        name: []
                    }
                }
            },
            // 下拉框提示文案
            selectPlaceholder: {
                type: String,
                default: '相关产业'
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
                    this.secondRegionList = []
                }
                for (let region of this.industryList) {
                    if(region.value === val) {
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
                this.$emit('roll', this.selectDistrict)
            },
            /**
             * 默认选择的相关产业
             * @param val
             */
            defaultDistrict (val) {
                this.select = Object.assign(this.select, JSON.parse(JSON.stringify(val)))
            },
        },
        computed: {
            ...mapGetters(['industryList']),
            // 选择的相关产业数据，数据处理
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
                if(this.select.name.length==2){
                    this.select.name[1]= e.label;
                }else{
                    this.select.name.push(e.label)
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