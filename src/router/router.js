import Vue from 'vue'
import Router from 'vue-router'
import Cookies from 'js-cookie'
import {routers} from './index';
import Config from "@/config"
import $http from "@/resource";
import $api from "@/api/index.js";
import utils from "@/utils";
import store from '../store/index'


const RouterConfig = {
    mode:'history',
    routes: routers
};

Vue.use(Router)

const router = new Router(RouterConfig);


const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
};

/**
 * 判断所跳转路由是否有权限
 * @param {*} codeData 权限数据
 * @param {*} meta 调转到路由的meta字段
 * @returns 
 */
 function handlePower(codeData, meta)
 {
     let status = false;
     if (meta.code) {
         if(codeData !== undefined) {
             status = utils.codeStatus(codeData, meta.code);
         } else {
             status = false;
         }
     } else {
         status = true;
     }
     return status;
 }

router.beforeEach(async (to,from,next) => {
    if(routePass(to)){
        next();
        return true;
    }
    if (to.meta.title) {
        document.title = to.meta.title + "-谷川信息系统";
    }
    if(!(to.name == from.name)){
        //注意：这里为了临时进入页面所以注释了，如正式应用到项目需要打开
        // 获取权限
        let res = await $api.getMenuAuth(to.query.token);
        if(res.code == 401) {
            // 未登录
            Cookies.set('rePath', to.path)
            setTimeout(() => {
                window.location.href = res.data.loginUrl;
            }, 200)
            return true;
        } 
        if(res.code == 200){ 
            store.commit('mmsCommon/USERHEADPOWER', res.data);
            // 权限判断
            await store.dispatch('mmsCommon/getUserPower');
            let power = [...store.state.mmsCommon.userHeaderPower, ...store.state.mmsCommon.userPower]
            let status = handlePower(power, to.meta);
            if(!status) {
                next({replace: true, name: 'error-403'})
            }
            if(Cookies.get('rePath')) {
                setTimeout(() => {
                    next({replace: true, path: Cookies.get('rePath')});
                    Cookies.remove('rePath');
                }, 300)
            }
        }
        else{
            next({replace: true, name: 'error-500'})
        }
    }
    next();
})

/**
 * 定义一些可以直接通行的路由
 * @return {bool}
 */
 const routePass = (to)=>{
    const routesName = [
        // 'auth',
        'error-404',
        'error-403',
        'error-500'
    ];
    if(routesName.indexOf(to.name) >= 0){
        return true;
    }else{
        return false;
    }
}

export default router
