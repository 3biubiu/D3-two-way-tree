import types from './mutation-types'

const matutaions = {
  	[types.SAVESIDEBARNUMBER](state,sideBarNumber,rootState){
  	  	state.sideBarNumber = sideBarNumber;
  	},
  	[types.DEALLEFTFIELDTIPS](state,dealLeftFieldTips,rootState){
  	  	state.dealLeftFieldTips = dealLeftFieldTips;
  	},    
}

export default matutaions