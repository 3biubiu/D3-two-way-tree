<template>
    <div class="approve-index">
        <!-- <h1>tis设计规范的添加编辑页调用示例</h1> -->
        <router-tab id="frame-router-tabs" class="approve-tabs" :value="tabValue" @on-click="handleTab">
            <TabPane label="申请接待（添加/编辑）" name="approve_add"></TabPane>
            <TabPane :label="allContract" name="approve_my_add"></TabPane>
        </router-tab>
        <div class="router-view">
            <router-view></router-view>
        </div>

    </div>
</template>
<script>
import RouterTab from '@/components/router_tab/RouterTab';
import { createNamespacedHelpers } from 'vuex'
const { mapState, mapGetters, mapMutations, mapActions } = createNamespacedHelpers('demo')
    export default {
        name:'',
        components: {
            RouterTab
            // VueTabs 
        },
        data () {
            return {
                //当前tab选中的路由name
                tabValue : this.$route.name,
                allContract: (h) => {
                    return h('div', [
                        h('span', '全部合同'),
                        h('Badge', {
                            props: {
                                count: Number(this.num),
                                overflowCount: Number(this.num) == 99 ? 100 : 99
                            }
                        })
                    ])
                }
            }
        },
        watch: {
            
        },
        computed:{//获取地区数据
            ...mapGetters(['num'])
        },
        mounted() {     
            this.changeNum();
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
            ...mapActions(['changeNum'])
        }
    }
</script>

<style lang="less">
.approve-index{
}
</style>