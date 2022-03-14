<template>
    <div class="approve-index">
        <!-- <h1>tis设计规范的添加编辑页调用示例</h1> -->
        <Tabs :value="tabValue" @on-click="handleTab">
            <TabPane label="申请接待（添加/编辑）" name="approve_add"></TabPane>
            <TabPane label="我发起的（列表）" name="approve_my_add"></TabPane>
        </Tabs>
        <div class="router-view">
            <router-view></router-view>
        </div>

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

</style>