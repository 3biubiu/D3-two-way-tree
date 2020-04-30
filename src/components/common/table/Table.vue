
<template>
    <div class="table-wrapper">
        <table class="box" cellspacing=0 :border="needBorder">
            <Spin  fix size="large" v-if="loading"></Spin>
            <thead>
                <slot name="thead"></slot>
            </thead>
            <tbody >
                <slot name="tbody"></slot>
            </tbody>
        </table>
    </div>
</template>

<script>
    export default {
        props:{
            loading:false,
            needBorder:{
                type : String,
                default : '0'
            },
        }
    };
</script>

<style lang="less" scoped>
@import './table.less';
</style>
