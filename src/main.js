import Vue from 'vue'
import App from './App'
import router from './router/router.js'
import iview from 'iview'
import tanikawaTis from 'tanikawa-tis'
import store from "./store/index.js"
import 'font-awesome/css/font-awesome.css'; //font-awesome图标库
import  "./theme/index.less"
import  "./theme/front_standard.less"
import 'viewerjs/dist/viewer.css'  //v-viewer大图预览
import Viewer from 'v-viewer'

Vue.config.productionTip = false
Vue.use(tanikawaTis);
Vue.use(iview)
Vue.use(Viewer);
console.log(tanikawaTis,iview)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
