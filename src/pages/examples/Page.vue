<template>
    <div>
        <h1>tis设计规范的Page组件底层属性调用示例</h1>
        <br/>
        <br/>
        <Page :current="2" :total="50" simple />
        <br/>
        <br/> 
        <Page :total="40" size="small" show-elevator show-sizer show-total />
        <br/>
        <br/> 
        <Page :total="100" show-total show-sizer show-elevator />
    </div>
</template>
<script>
    export default {
        name:'ivu-page',
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