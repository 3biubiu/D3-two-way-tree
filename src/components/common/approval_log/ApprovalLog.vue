
<template>
    <div>
        <div class="logs">
            <div class="one-node" v-for="(item,index) in approvalLogData">
                <div class="left">
                    <div class="prefix" :class="{success:(item[0].status=='ACCEPT' || item[0].status=='RUN'), error:item[0].status=='REFUSED' || item[0].status=='APPROVE_BREAK' || item[0].status=='CANCEL',transfer:item[0].status=='TRANSFER'}"></div>
                </div>
                <div class="right">
                    <div class="topimg transform"></div>
                    <div class="mui-table-view-cell mui-media ifdanwei">
                        <div class="log"  v-for="(i ,idx) in item">
                            <div class="ltime">{{i.approval_time?i.approval_time:i.create_time}}</div>
                            <img v-if="i.userlogo" class="mui-media-object mui-pull-left mui-media-pic mui-avatar" :src="i.userlogo" >
                            <img v-else class="mui-media-object mui-pull-left mui-media-pic mui-avatar" src="../../../assets/mms_common/nologo.jpg" >
                            <div class="comment">
                                <p class="black">{{i.username}}</p>
                                <p :class="{green:(i.status=='ACCEPT' || i.approval_identity=='create' || i.status == 'OTHER_APPROVAL' || i.status == 'RUN'),red:(i.status=='REFUSED' || i.status=='APPROVE_BREAK' || i.status == 'CANCEL'), yellow:i.status=='TRANSFER',gray:i.status =='WAIT'}">{{i.other === null ? '' : i.other.name}}结果：{{i.suggest}}</p>
                            </div>
                        </div>
                        <!--<div class="ltime">{{item[0].approval_time?item[0].approval_time:item[0].create_time}}</div>                 -->
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  props: {
    approvalLogData: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  mounted(){

  }
};
</script>

<style scoped>
@import './approval_log.less';
</style>