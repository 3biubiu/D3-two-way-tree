<template>
    <Modal class="form-modal" width="600" v-model="authModal"  scrollable title="项目权限">
        <div class="modal-scroll">
            <div class="panel-row">
                <div class="custom-title">官方权限人员 : {{adminList.length}} 人</div>
                <p class="custom-label" v-for="(item,index) in adminList" :key="index">
                    <span :class="{'custom-label-text':true,'no-read':item.is_view==='0'}" >
                        <Poptip :options="{modifiers: {computeStyle:{gpuAcceleration: false,},preventOverflow :{boundariesElement: 'window'}},eventsEnabled:false}"  trigger="hover" @on-popper-show="getViewLog(item)">
                            {{item.username}}
                            <div class="api" slot="content">
                                <div>
                                    <div class="custom-title">权限来源</div>
                                    <div class="auth-content">{{item.isFrom}}</div>
                                </div>
                                <div class="custom-title" v-if="item.is_view==='0'">暂未查看项目</div>
                                <div v-else>
                                    <div class="custom-title">查看项目时间</div>
                                    <div class="auth-content" v-if="(logLoading&&item.is_view!=='0')">...加载中</div>
                                    <div class="auth-content" v-if="((!logLoading&&viewLog.length<=0)||item.is_view==='0')">暂未查看名片</div>
                                    <div class="auth-content" v-for="tImte in viewLog" v-if="!logLoading&&viewLog.length > 0">{{tImte}}</div>
                                </div>
                                </div>
                        </Poptip>
                    </span>
                    <span class="custom-label-i" v-if="item.canDel==1" :key="index">
                        <Poptip :options="{modifiers: {computeStyle:{gpuAcceleration: false,},preventOverflow :{boundariesElement: 'window'}},eventsEnabled:false}"  confirm
                                title="确认要移除其查看权限吗？"
                                @on-ok="delAuth(index,item.uid)">
                            <a class="del-icon"><i class="iconfont iconCLOSE"></i></a>
                        </Poptip>
                    </span>
                </p>
            </div>
            <div v-if="parkList.length>0">
                <div class="custom-title">园区权限人员 : {{parkList.length}} 人</div>
                <p class="custom-label" v-for="(item,index) in parkList" :key="index">
                    <span :class="{'custom-label-text':true,'no-read':item.is_view==='0'}" >
                        <Poptip :options="{modifiers: {computeStyle:{gpuAcceleration: false,},preventOverflow :{boundariesElement: 'window'}},eventsEnabled:false}"  trigger="hover">
                            {{item.username}}
                            <div class="api" slot="content">
                                <div>
                                    <div class="custom-title">权限来源</div>
                                    <div class="auth-content">{{item.isFrom}}</div>
                                </div>
                                <div class="custom-title" v-if="item.is_view==='0'">暂未查看项目</div>
                                <div v-else>
                                    <div class="custom-title">查看项目时间</div>
                                    <div class="auth-content" v-if="logLoading">...加载中</div>
                                    <div class="auth-content" v-for="tImte in viewLog" v-if="!logLoading&&viewLog.length > 0">{{tImte}}</div>
                                </div>
                                </div>
                        </Poptip>
                    </span>
                    <span class="custom-label-i" v-if="item.canDel==1">
                        <Poptip :options="{modifiers: {computeStyle:{gpuAcceleration: false,},preventOverflow :{boundariesElement: 'window'}},eventsEnabled:false}"  confirm
                                title="确认要移除其查看权限吗？"
                                @on-ok="delAuthPark(index,item.uid)">
                            <a class="del-icon"><i class="iconfont iconCLOSE"></i></a>
                        </Poptip>
                    </span>
                </p>
            </div>
        </div>
    </Modal>
</template>
<script>
import $api from'@/api/item/item_detail/index.js';
export default {
    name:'auth-label',
    props: {
        //官方权限列表
        adminList:{
            type:Array,
            default:()=>{return []}
        },
        //园区权限列表
        parkList:{
            type:Array,
            default:()=>{return []}
        }
    },
    data(){
        return{
            authModal:false,
            //名片查看时间记录
            viewLog : [],
            //获取记录loading
            logLoading : true,
        }
    },
    computed:{

    },
    watch:{


    },
    methods:{
        /**
         * modal显示
         */
        show(){
            this.$nextTick(()=>{
                this.authModal = true;
            });
        },
        /**
         * modal隐藏
         */
        hide(){
            this.authModal = false;
        },
        delAuth(index,uid){
            this.$emit("del-admin",index,uid);
        },
        delAuthPark(index,uid){
            this.$emit("del-park",index,uid);
        },
        /**
         * 拉取名片查看记录
         */
        async getViewLog(item){
            if(item.is_view === '0'){
                return false;
            }
            let uid = item.uid;
            this.logLoading = true;
            let res = await $api.getItemViewLog(this.$route.params.item_id,uid);
            this.logLoading = false;
            if(res.code == '200'){
                this.viewLog = [...res.data];
            }
        }
    }
}
</script>

<style lang="less" scoped>
    @import "./auth_label.less";
</style>
