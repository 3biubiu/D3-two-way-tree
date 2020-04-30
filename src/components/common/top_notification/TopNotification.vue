<template>
    <transition name="fade" mode="out-in" appear>
        <div class="top-notifications warning" v-if="showStatus">
            <span><i class="fa fa-exclamation-triangle"></i> {{msg}}</span>
            <i class="fa fa-close close" @click="hide"></i>
        </div>
    </transition>
</template>

<script>
    export default {
        props :{
            msg : {
                type : String,
                default : " topNotification ",
            },
        },
        data(){
            return {
                //提示是否显示的状态
                showStatus : false,
            }
        },
        methods:{
            //显示
            show(){
                this.showStatus = true;
            },
            //隐藏
            hide(){
                this.showStatus = false;
            }
        }
    };
</script>

<style scoped>
    @import "./top_notification.less";
</style>