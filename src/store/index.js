
import Vue from 'vue'
import Vuex from 'vuex'

// mms公共的vuex数据
import mms_common_actions from './mms_common/actions'
import mms_common_getters from './mms_common/getters'
import mms_common_state from './mms_common/state'
import mms_common_mutations from './mms_common/mutations'

// 示例
// import demo_actions from './demo/actions'
// import demo_getters from './demo/getters'
// import demo_state from './demo/state'
// import demo_mutations from './demo/mutations'


Vue.use(Vuex)


// mms公共的vuex数据
const MMS_COMMON = {
	namespaced: true,
	state:mms_common_state,
	mutations:mms_common_mutations,
	actions:mms_common_actions,
	getters:mms_common_getters
}


// 示例
// const DEMO = {
// 	namespaced: true,
// 	state:demo_state,
// 	mutations:demo_mutations,
// 	actions:demo_actions,
// 	getters:demo_getters
// }



export default new Vuex.Store({
    modules:{
    	mmsCommon:MMS_COMMON,
    	// demo:DEMO,
    }
})
