<template>
    <div class="approve-index">
        <h1>tis设计规范的添加编辑页调用示例</h1>
        <Card dis-hover>
            <Tabs value="name1" @on-click="handleTab">
                <TabPane label="申请接待" name="approve_add"></TabPane>
                <TabPane label="我发起的" name=""></TabPane>
                <TabPane label="我参与的" name=""></TabPane>
                <TabPane label="待我审批" name=""></TabPane>
                <TabPane label="我已审批" name=""></TabPane>
                <TabPane label="全部审批" name=""></TabPane>
            </Tabs>
            <div class="router-view">
                <router-view></router-view>
            </div>
        </Card>
    </div>
</template>
<script>
    import VueTabs from '../examples/Tabs'
    export default {
        name:'',
        components: {
            VueTabs 
        },
        data () {
            return {
                tabValue:''
            }
        },
        watch: {
            
        },
        mounted() {     
                 
        },
        methods:{
            //Tab切换跳转
            handleTab(e) {
                console.log(e);
                this.tabValue = e
                this.$router.push({
                    name: e,
                });
            },
        }
    }
</script>

<style lang="less">
.approve-index{
    .ivu-tabs-nav .ivu-tabs-tab{
        margin-right: 0;
        padding: 0 16px;
    }
    .ivu-tabs-bar{
        margin-bottom: 0;
    }
    .ivu-card-body{
        padding: 0;
    }
    .router-view{
        padding: 24px 40px;
    }
}
</style>