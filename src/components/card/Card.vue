
<template>
    <div class="card" :class="{'card-shadow':shadow}" :style="{'padding':`${padding}px`}">
        <slot></slot>
    </div>
</template>

<script>
export default {
  props: {
    /**是否显示阴影，默认为true(建议在灰色背景下使用) */
    shadow: {
      type: Boolean,
      default: true
    },
    /**卡片内部间距，单位 px */
    padding: {
      type: Number|String,
      default: 16
    }
  },
  data() {
    return {
      
    };
  }
};
</script>
<style scoped>
.card{
    background-color: #FFFFFF;
    margin-bottom: 0;
    border-radius: 3px;
}
.card-shadow{
    box-shadow: 0px 4px 4px 0 #eeeeee;
}
</style>


