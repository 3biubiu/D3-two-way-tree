
<template>
    <div>
        <h1>tis设计规范的radio组件底层属性调用示例</h1>
        <br/>
        <br/>
        <Radio v-model="single">Radio</Radio>
        <br/>
        <br/>
        <Radio v-model="disabledSingle" disabled>Radio</Radio>
        <br/>
        <br/>
        <Radio v-model="disabledSingle1" disabled>Radio</Radio>
        <br/>
        <br/>
        <RadioGroup v-model="disabledGroup">
            <Radio label="金斑蝶" disabled></Radio>
            <Radio label="爪哇犀牛"></Radio>
            <Radio label="印度黑羚"></Radio>
        </RadioGroup>
        <br/>
        <br/>
        <RadioGroup v-model="button1" type="button">
            <Radio label="北京"></Radio>
            <Radio label="上海"></Radio>
            <Radio label="深圳"></Radio>
            <Radio label="杭州"></Radio>
        </RadioGroup>
    </div>
</template>
<script>
    export default {
        name:'ivu-radio',
        components: {
            
        },
        data () {
            return {
                disabledSingle: true,
                disabledSingle1: false,
                single: false,
                button1: '北京',
                disabledGroup: '爪哇犀牛'
            }
        },
        watch: {
            
        },
        mounted() {   
                 
        },
        methods: {
            
        }
    }
</script>

<style lang="less" scoped>

</style>