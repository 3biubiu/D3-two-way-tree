import $api from "@/api/index.js";
import * as types from './mutation-types'

const actions = {
    /**
     * 改变state里的num
     * @param state
     * @param commit
     * @return {Promise<void>}
     */
    async changeNum({state,commit}){
        //调用mutations里的方法
        commit(types.CHANGENUM,1);
    },
}


export default actions;