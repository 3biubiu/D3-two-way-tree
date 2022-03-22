<template>
    <div class="options" :style="optionStyle">
        {{title}}      
    </div>
</template>
<script>
    export default {
        name: 'options',
        components: {},
        props: {
            title: {
                type: String,
                required: true,
                default: () => {
                    return ''
                }
            },
            textColor: {
                type: String,
            },
            borColor:{
                type: String,
            },
            bgColor: {
                type: String
            }
        },
        data() {
            return {
                optionStyle:{
                    color:this.textColor,
                    border:'1px solid',
                    borderColor:this.borColor,
                    backgroundColor:this.bgColor
                }
            }
        },
        computed: {
            // optionStyle (textColor) {
            //     color:textColor
            // }
        },
        watch: {},
        filters: {},
        created() {},
        mounted() {},
        methods: {}
    }
</script>
<style lang="less">
.options{
    font-size: 14px;
    line-height:20px;
    font-weight:bold;
    padding:2px 8px;
    display: inline-block;
    margin-left:24px;
    border-radius: 4px;
}
</style>