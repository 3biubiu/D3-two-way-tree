<template>
    <div style="box-shadow:rgb(238, 238, 238) 0px 4px 4px 0px">
         <div class="profile-box-header emerald-bg clearfix">
            <label style="font-weight: 500; font-size: 16px;">{{infoData.config?infoData.config.name:'审批流程'}}</label>
        </div>
        <div class="profile-box-content clearfix">
            <div class="new-user-logo" v-for="(item,index) in infoData.users" :key="index">
                <img :src="item.pic?item.pic:nologoUrl" class="userlogo">
                <div class="username">{{item.username}}</div>
            </div>
        </div>
    </div>
</template>

<script>
import nologoUrl from '../../../assets/mms_common/nologo.jpg';

export default {
    name:'level-process',
    props:{
        infoData:{
            type:Object,
            default:()=>{return {}}
        }
    },
    data(){
        return{
            nologoUrl
        }
    },
    mounted(){
        
    }
};
</script>

<style lang="less" scoped>
@import './level_process.less';
</style>
