<template>
    <p class="custom-label" :style="labelStyle">
        <img v-if="styles.iconType=='prev'" :src="icons">
        {{labelContent}}
        <img v-if="styles.iconType=='next'" :src="icons">
    </p>
</template>
<script>
export default {
    name:'custom-label',
    props: {
        styles:{
            type:Object,
            default:()=>{
                return {
                    textColor: '#666',   //字体颜色
                    borderType: '1',   //线框类型：solid是实线  dashed是虚线
                    borderColor: '',  //线框颜色,默认空为没有线框
                    backgroundBg: '',   //背景颜色,默认空为没有背景色
                    marginRight: '0', //右间距
                    marginBottom: '0',   //下间距
                    iconType: '', //图标在前(prev)还是在后(next),没有为空
                    borderRadius:'0'
                }
            }
        },
        icon:{ //图标路径
            type:String,
            default:'../../../assets/mms_common/iconfont-tongyi.png'
        },
        labelContent:{ //标签内容
            type:String,
            default:'标签内容'
        },

    },
    data(){
        return{

        }
    },
    computed:{
        // 标签样式
        labelStyle(){
            let obj = {
                color: this.styles.textColor,
                border: this.styles.borderColor?(this.styles.borderType=='solid'?`1px solid ${this.styles.borderColor}`:`1px dashed ${this.styles.borderColor}`):'none',
                background: this.styles.backgroundBg?this.styles.backgroundBg:'none',
                marginRight: this.styles.marginRight + 'px',
                marginBottom: this.styles.marginBottom + 'px',
                borderRadius : this.styles.borderRadius+'px'|| '0'
            };
            return obj;
        },
        icons(){
            return require("../../../assets/mms_common" + this.icon);
        },
        // icon样式
        iconStyle(){
            let obj = {
                marginRight: this.styles.iconType=='prev'?'4px':'0',
                marginLeft: this.styles.iconType=='next'?'4px':'0'
            };
            return obj;
        }
    },
    mounted(){

    },
    methods:{


    }
}
</script>

<style lang="less" scoped>
    @import "./custom_label.less";
</style>
