<template>
    <div style="height:2000px;">
        <h1>tis设计规范的Badge组件底层属性调用示例</h1>
        <br/>
        <br/>
        <Badge status="success" text="Success" />
        <br />
        <br />
        <Badge status="error" text="Error" />
        <br />
        <br />
        <Badge status="default" text="Default" />
        <br />
        <br />
        <Badge status="processing" text="Processing" />
        <br />
        <br />
        <Badge status="warning" text="Warning" />
        <br/>
        <br/>
        <Badge :count="100"></Badge>
        <Badge :count="20" class-name="demo-badge-alone"></Badge>
        <br />
        <Badge text="new">
            <a href="#" class="demo-badge"></a>
        </Badge>
        <br />
    </div>
</template>
<script>
    export default {
        name:'ivu-badge',
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