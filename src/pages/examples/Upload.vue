<template>
    <div style="height:2000px;">
        <h1>tis设计规范的Upload组件底层属性调用示例</h1>
        <br/>
        <br/>
        <Upload
            multiple
            type="drag"
            action="//jsonplaceholder.typicode.com/posts/">
            <div style="padding: 20px 0">
                <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                <p>Click or drag files here to upload</p>
            </div>
        </Upload>
    </div>
</template>
<script>
    export default {
        name:'ivu-upload',
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