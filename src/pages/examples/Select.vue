<template>
    <div style="height:2000px;">
        <h1>tis设计规范的Select组件底层属性调用示例</h1>
        <br/>
        <br/>
        <Select v-model="model1" style="width:200px">
            <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
    </div>
</template>
<script>
    export default {
        name:'ivu-select',
        components: {
            
        },
        data () {
            return {
                cityList: [
                    {
                        value: 'New York',
                        label: 'New York'
                    },
                    {
                        value: 'London',
                        label: 'London'
                    },
                    {
                        value: 'Sydney',
                        label: 'Sydney'
                    },
                    {
                        value: 'Ottawa',
                        label: 'Ottawa'
                    },
                    {
                        value: 'Paris',
                        label: 'Paris'
                    },
                    {
                        value: 'Canberra',
                        label: 'Canberra'
                    }
                ],
                model1: ''
            }
        },
        watch: {
            
        },
        mounted() {     
                 
        },
        methods:{

        }
    }
</script>

<style lang="less" scoped>

</style>