<!--
   地区三级联动组件

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
            <Select v-model="select.province" :placeholder="selectPlaceholder">
                <Option value="0">全部</Option>
                <Option v-for="(item, index) in regionList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
            </Col>
            <Col :span="8">
            <Select v-model="select.city" :placeholder="selectPlaceholder">
                <Option v-for="(item, index) in secondRegionList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
            </Col>
            <Col :span="8">
            <Select v-model="select.area" :placeholder="selectPlaceholder">
                <template v-for="(item, index) in thirdRegionList">
                    <Option :value="item.value" :key="item.value">{{ item.label }}</Option>
                </template>
            </Select>
            </Col>
        </Row>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    export default {
        name: "select-picker",
        data() {
            return {
                // 二级地区列表
                secondRegionList: [],
                // 三级地区列表
                thirdRegionList: [],
                // 选中的地区id
                select: {
                    province: '',
                    city: '',
                    area: ''
                },
                // 直辖市地区ID
                countryIds: ['1', '2', '9', '22']
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
                        area: ''
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
            }
        },
        watch: {
            /**
             * 监听选择省
             * @param val
             */
            'select.province'(val) {
                if(val === '0'){
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
                if(val === ''){
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
                this.select = val
            },
        },
        computed: {
            ...mapGetters(['regionList']),
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
            this.select = this.defaultDistrict
        }
    }
</script>

<style scoped>

</style>