
<template>
    <div :style="{'height':`${height}`,'background':`${backgroundColor}`}"></div>
</template>

<script>
export default {
   props:{
       height:{
           type:String,
           default:'16px'
       },
       backgroundColor:{
           type:String,
           default:'#f8f8f8'
       }
   } 
}
</script>

<style lang="less" scoped>

</style>

