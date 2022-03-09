<template>
    <div class="approve-index">
        <!-- <h1>tis设计规范的添加编辑页调用示例</h1> -->
        <Card dis-hover>
            <Tabs :value="tabValue" @on-click="handleTab">
                <TabPane label="申请接待（添加/编辑）" name="approve_add"></TabPane>
                <TabPane label="我发起的（列表）" name="approve_my_add"></TabPane>
            </Tabs>
            <div class="router-view">
                <router-view></router-view>
            </div>
        </Card>

    </div>
</template>
<script>
    // import VueTabs from '../examples/Tabs'
    export default {
        name:'',
        components: {
            // VueTabs 
        },
        data () {
            return {
                //当前tab选中的路由name
                tabValue : this.$route.name,
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
    .ivu-tabs-tab{
        margin-right: 0;
        padding: 0 16px;
        font-weight: bold;
        color: #333333;
        transition: none;
    }
    .ivu-tabs-tab-active{
        color: #1f6cdd;
        border-top: none;
        position: relative;
        &::before{
            content: '';
            width: 100%;
            height: 2px;
            background-color: #1f6cdd;
            position: absolute;
            left: 0;
            top: 0;
            z-index: 1;
        }
    }
    .ivu-tabs-tab:hover{
        color: #468eeb;
    }
    .ivu-tabs-bar{
        margin-bottom: 0;
    }
    .ivu-card-bordered{
        border: none;
    }
    .ivu-card-body{
        padding: 0;
    }
    .ivu-tabs-nav-container:focus .ivu-tabs-tab-focused{
        border-color: #ececec !important;
        border-top-color: #1f6cdd !important;
    }
}
</style>