<template>
    <div class="line-title">
        <div class="line"></div>
        {{title}}
    </div>
</template>

<script>
    export default {
        props:{
            title:String
        }
    }
</script>

<style lang="less" scoped>
    .line-title{
        font-size: 16px;
        line-height: 24px;
        padding:16px 24px;
        background: #fff;
        .line{
            display: inline-block;
            width: 4px;
            height: 14px;
            margin-right: 4px;
            vertical-align: middle;
            margin-top: -4px;
            background: #1f6cdd;
            border-radius: 4px;
        }
    }
</style>