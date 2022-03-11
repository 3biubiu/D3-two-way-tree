import $api from "@/api/index.js";
import * as types from './mutation-types'
import utils from '@/utils';

const actions = {
    /**
     * saveSideBarNumber 设置徽标提示
     * @param {Object} state state
     * @param {Object} commit commit
     * @return {Promise<void>}
     */
     async saveSideBarNumber({state,commit}){
        let info = await $api.getSideBarNumber();
        commit(types.SAVESIDEBARNUMBER, info);
    },
    /**
     * getUserPower 获取用户权限
     * @param state
     * @param commit
     * @return {Promise<void>}
     */
    async getUserPower({state,commit}){
        let power = await $api.getMyPower();
        if(power.code == 200) {
            commit(types.USERPOWER, power.data);
        }
    },
}
export default actions;