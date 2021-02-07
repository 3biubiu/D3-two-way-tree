<template>
    <div class="add-user">
        {{username}}: {{usertext}}  
    </div>
</template>
<script>
    export default {
        name: 'add-user',
        components: {},
        props: {
            username:{
                type:String,
                default: () => {
                    return ''
                }
            },
            usertext:{
                type:String,
                default: () => {
                    return ''
                }
            }

        },
        data() {
            return {}
        },
        computed: {},
        watch: {},
        filters: {},
        created() {},
        mounted() {},
        methods: {}
    }
</script>
<style lang="less">
.add-user{
    display: inline-block;
    font-size: 14px;
    color: #999;
    display: inline-block;
    vertical-align: middle;
    margin-right: 16px;
    line-height: 20px;
    margin-top:18px;
}
</style>