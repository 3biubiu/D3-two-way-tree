<template>
    <div class="tags-item">
        <slot name="tags-item"></slot>
    </div>
</template>
<script>
    export default {
        name: 'TagsItem',
        components: {},
        props: {},
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
.tags-item{
    color: #999;
    display: inline-block;
    vertical-align: middle;
    margin-right: 8px;
    margin-bottom: 4px;
    border-radius: 2px;
    padding: 2px 12px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    border:1px solid #D9D9D9;
    
}
.tags-item .i-icon{
    width: 16px;
    height: 16px;
    display: inline-block;
    vertical-align: middle;
}
.tags-item span{
    line-height: 20px;
    font-size: 12px;
    display: inline-block;
    vertical-align: middle;
    padding-right:3px;
}
</style>