import $api from "@/api/index.js";
import types from './mutation-types'
import utils from '@/utils';

const actions = {
    /**
        * 保存左侧未读消息数
    */
   async saveSideBarNumber({state,commit,rootState}){
        let info = await $api.getSideBarNumber();
        commit(types.SAVESIDEBARNUMBER, info);
    },
    async saveDealLeftFieldTips({state,commit,rootState}){
        let info = await $api.dealLeftFieldTips();
        commit(types.DEALLEFTFIELDTIPS, info);
    },
}
export default actions;