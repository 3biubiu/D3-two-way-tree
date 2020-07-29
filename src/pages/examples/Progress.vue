<template>
    <div style="height:2000px;">
        <h1>tis设计规范的Progress组件底层属性调用示例</h1>
        <br/>
        <br/>
        <Progress :percent="45" status="active" />
        <br />
        <Progress :percent="65" status="wrong" />
        <br />
        <Progress :percent="100" />
        <br />
    </div>
</template>
<script>
    export default {
        name:'ivu-progress',
        components: {
            
        },
        data () {
            return {
               
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