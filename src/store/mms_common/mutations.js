import * as types from './mutation-types'

const matutaions = {
	[types.USERPOWER](state,powerSiderData,rootState){
		state.userPower = powerSiderData;
	},
	[types.USERHEADPOWER](state,powerHeaderData,rootState){
		state.userHeaderPower = powerHeaderData;
	},
	[types.SAVESIDEBARNUMBER](state,sideBarNumber,rootState){
		state.sideBarNumber = sideBarNumber;
	},  
}

export default matutaions