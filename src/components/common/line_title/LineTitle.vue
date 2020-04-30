<template>
    <div class="title">
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
    @import "./line_title.less";
</style>