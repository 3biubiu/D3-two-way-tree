import Vue from 'vue'
import App from './App'
import router from './router/router.js'
import ViewUI from 'view-design';
import tanikawaTis from 'tanikawa-tis'
import store from "./store/index.js"
import 'font-awesome/css/font-awesome.css'; //font-awesome图标库
import "./theme/index.less"
import 'view-design/dist/styles/iview.css';  
import Viewer from 'v-viewer' //v-viewer大图预览
import {install} from '@icon-park/vue/es/all';
import '@icon-park/vue/styles/index.css';
Vue.config.productionTip = false


Vue.use(tanikawaTis);
Vue.use(ViewUI)
Vue.use(Viewer);
install(Vue);//iconPark 全局引入，图标名称前需加icon

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
