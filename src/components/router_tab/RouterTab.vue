  
<template>
    <div class="tab demo-tabs-style2" id="frame-router-tabs">
        <Tabs 
            :type="type"
            :value="value"
            :animated="animated" 
            :size="size"
            @on-click="onClick" 
            @on-tab-remove="onTabRemove">
            <slot></slot>
            <div slot="extra" style="vertical-align: middle;">
                <slot name="extras"></slot>
            </div>
        </Tabs>
    </div>
</template>

<script>
export default {
    props: {

        /**当前激活面板的name */
        value: {
            type: String,
            default: ""
        },
        /**页签的基本样式，可选值为 line 和 card */
        type: {
            type: String,
            default: "line"
        },
        /**是否使用 CSS3 动画切换 */
        animated: {
            type: Boolean,
            default: false
        },
        /**尺寸，可选值为 default 和 small，仅在 type="line" 时有效 */
        size: {
            type: String,
            default: 'default'
        },
    },
    watch: {
        value(newValue, oldValue) {
            this.value = newValue;
        }
    },
    methods: {
        /**派发tab被点击时事件*/
        onClick(e) {
            this.$emit('on-click', e);
        },
        /**派发tab被关闭时事件*/
        onTabRemove(e) {
            this.$emit('on-click', e);
        }
    }
};
</script>



<style lang="less">
  @import './router_tab.less';
</style>  
