import * as types from './mutation-types'

const matutaions = {
	/**
	 * 
	 * @param {Object} state state对象
	 * @param {Number} data 要增加的值
	 */
    [types.CHANGENUM](state,data){
		state.num = state.num+data;
	}
}

export default matutaions