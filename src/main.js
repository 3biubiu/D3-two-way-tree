import Vue from 'vue'
import App from './App'
import router from './router/router.js'
import ViewUI from 'view-design';
import tanikawaTis from 'tanikawa-tis'
import store from "./store/index.js"
import 'font-awesome/css/font-awesome.css'; //font-awesome图标库
import "./theme/index.less"
import 'view-design/dist/styles/iview.css';  
import 'tanikawa-tis/dist/styles/tis.css';
import Viewer from 'v-viewer' //v-viewer大图预览
import config from './config.js';
import utils from './utils.js';
import axios from 'axios';
Vue.config.productionTip = false


Vue.use(tanikawaTis);
Vue.use(ViewUI)
Vue.use(Viewer);
// 公共头部
// setTimeout(()=>{
  Vue.use(window.component.default, {store, axios, config, utils})
// },500)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
