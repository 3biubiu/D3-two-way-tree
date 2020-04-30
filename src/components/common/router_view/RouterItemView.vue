<template>
  <div class="router-view">
    <router-view ref="view" :key="$route.fullPath" v-show="authCheck" />
  </div>
</template>
<script>
    import $api from "@/api/item/item_detail/item_common.js";
    export default {
    data (){
        return {
            authCheck : false,
        }
    },
    computed:{
        //权限loading加载状态
        authLoading (){
            let res = true;
            res = this.$store.getters['itemDetail/authLoading'];
            return res;
        },
        //权限列表
        authList(){
            let res = this.$store.getters['itemDetail/authListData'];
            return res;
        },
    },
    created() {
        this.$store.commit("itemDetail/SET_AUTH_LOADING",true);
        this.$store.dispatch("itemDetail/getAuthList",this.$route.params.item_id);
    },
    watch : {
        //权限验证
        authLoading(newVal,oldVal){
            if(oldVal===true&&newVal===false){
                //验证
                this.authCheck = this.authList.userItem==="1";
                if(!this.authCheck){
                    //跳转403
                    this.$router.push({
                        name : 'error-403'
                    })
                }
                this.itemView();

            }
        }
    },
    methods : {
          async itemView(){
              let res = await $api.showItemView(this.$route.params.item_id);
              return res;
          }
    }
};
</script>

<style lang="less" scoped>
.router-view{
  width: 100%;
  height:100%;
}
</style>
