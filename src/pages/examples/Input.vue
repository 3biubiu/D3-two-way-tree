<template>
    <div>
        <h1>tis设计规范的Input组件底层属性调用示例</h1>
        <br/>
        <br/>
        <Input v-model="value" placeholder="请输入..." style="width: 300px" />
        <br/>
        <br/>
        <Input v-model="value" maxlength="100" show-word-limit type="textarea" placeholder="请输入..." style="width: 300px" />
        <br/>
        <br/>
        <Input v-model="value" type="textarea" :rows="4" placeholder="请输入..." style="width: 300px" />
        <br/>
        <br/>
        <Input v-model="value" disabled placeholder="请输入..." style="width: 300px" />
        <Input v-model="value" disabled type="textarea" placeholder="请输入..." style="width: 300px" />
        <br/>
        <br/>
    </div>
</template>
<script>
    export default {
        name:'ivu-input',
        components: {
            
        },
        data () {
            return {
                value:"",
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