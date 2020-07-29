<template>
    <div>
        <h1>tis设计规范的button组件底层属性调用示例</h1>
        <br/>
        <div class="tis-btn primary-border">大夫</div>
        <div class="tis-btn primary-bg">大夫</div>
        <div class="tis-btn primary-bg"><i class="iconfont iconedit"></i>大夫</div>
        <div class="tis-btn primary-bg" disabled><i class="iconfont iconedit"></i>大夫1</div>
        <div class="tis-btn primary-border" disabled><i class="iconfont iconedit"></i>大夫2</div>
        <br/>

        <div class="tis-btn success-border">大夫</div>
        <div class="tis-btn success-bg">大夫</div>
        <div class="tis-btn success-bg"><i class="iconfont iconedit"></i>大夫</div>
        <div class="tis-btn success-bg" disabled><i class="iconfont iconedit"></i>大夫</div>
        <br/>

        <div class="tis-btn warn-border">大夫</div>
        <div class="tis-btn warn-bg">大夫</div>
        <div class="tis-btn warn-bg"><i class="iconfont iconedit"></i>大夫</div>
        <div class="tis-btn warn-bg" disabled><i class="iconfont iconedit"></i>大夫</div>
        <br/>
        
        <div class="tis-btn error-border">大夫</div>
        <div class="tis-btn error-bg">大夫</div>
        <div class="tis-btn error-bg"><i class="iconfont iconedit"></i>大夫</div>
        <div class="tis-btn error-bg" disabled><i class="iconfont iconedit"></i>大夫</div>
        <br/>

        <div class="tis-btn default-primary" disabled>大夫</div>
        <div class="tis-btn default-success" disabled>大夫</div>
        <div class="tis-btn default-warn">大夫</div>
        <div class="tis-btn default-error">大夫</div>
    </div>
</template>
<script>
    export default {
        name:'ivu-button',
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

        }
    }
</script>

<style lang="less" scoped>

</style>