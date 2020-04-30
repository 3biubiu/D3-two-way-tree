
<template>
    <Modal
        v-model="modalInitData.showModal"
        :title="modalInitData.title">
        <p>{{modalInitData.content}}</p>
        <div slot="footer" style="text-align: left;">
            <Button type="success" @click="btnAFun">{{modalInitData.btnA}}</Button>
            <Button class="ghost" type="default" @click="btnBFun">{{modalInitData.btnB}}</Button>
            <Button class="ghost" type="default" @click="btnCFun">{{modalInitData.btnC}}</Button>
        </div>
    </Modal>
</template>
<script>
export default {
    name: 'tabs',
    props:{
        modalInitData:{
            type:Object,
            default:()=>{
                return {
                    title:'是否离开当前页面',
                    content:'您编辑的内容尚未保存，是否要直接离开前往其他页面？',
                    btnA:'保存并离开',
                    btnB:'直接离开',
                    btnC:'取消',
                    showModal:false
                }
            }
        }
    },
    data(){
        return {

        };
    },
    methods: {
        /*
        *btnA触发事件
        */
        btnAFun(){
            this.$emit("btnAFun");        
        },
        /*
        *btnB触发事件
        */
        btnBFun(){
            this.$emit("btnBFun");        
        },
        /*
        *btnC触发事件
        */
        btnCFun(){
            this.$emit("btnCFun");        
        }
    },
    mounted(){
        
    }
};
</script>
<style lang="less" scoped>
    .ghost{
        color: #495060;
        background-color: transparent;
        border-color: #dddee1;
    }
    .ghost:hover {
        color: #28b294;
        background-color: transparent;
        border-color: #28b294;
    }

</style>