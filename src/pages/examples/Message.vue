
<template>
    <div>
        <h1>tis设计规范的message组件底层属性调用示例</h1>
        <br/>
        <br/>
        <Button @click="success">tis设计规范的message组件底层属性调用示例</Button>
        <Button @click="warning">tis设计规范的message组件底层属性调用示例</Button>
        <Button @click="error">tis设计规范的message组件底层属性调用示例</Button>
    </div>
</template>
<script>
    export default {
        name:'ivu-message',
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
        methods: {
            success () {
                this.$Message.success('水电费第三方水电费第三方士大夫是打发第三方水电水电费第三方水电费第三方士大夫是打发第三方水电费第三方士大夫是打发第三方水电费第三方士大夫是是打发第三方水电费第三方水电费第三方士大夫是打发第三方水电费第三方士大夫是打发第三方水电费第三方士大夫是是打发第三方水电费第三方水电费第三方士大夫是打发第三方水电费第三方士大夫是打发第三方水电费第三方士大夫是是打发第三方费第三方士大夫是打发第三方水电费第三方士大夫是是打发第三方');
            },
            warning () {
                this.$Message.warning('水电费第三方士大夫是打发第三方');
            },
            error () {
                this.$Message.error('水电费第三方士大夫是打发第三方');
            }
        }
    }
</script>

<style lang="less" scoped>

</style>