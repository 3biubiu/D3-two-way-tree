<template>
    <div>
        <h1>tis设计规范的Checkbox组件底层属性调用示例</h1>
        <br/>
        <br/>
        <CheckboxGroup v-model="fruit">
            <Checkbox label="香蕉"></Checkbox>
            <Checkbox label="苹果"></Checkbox>
            <Checkbox label="西瓜"></Checkbox>
            <Checkbox label="苹果1" disabled></Checkbox>
            <Checkbox label="西瓜2" disabled></Checkbox>
        </CheckboxGroup>
    </div>
</template>
<script>
    export default {
        name:'ivu-checkbox',
        components: {
            
        },
        data () {
            return {
                fruit: ['苹果','苹果1']
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