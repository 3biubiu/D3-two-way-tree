import Vue from 'vue'
import Router from 'vue-router'
import Cookies from 'js-cookie'
import {routers} from './index';
import Config from "@/config"
import $http from "@/resource";
import $api from "@/api/index.js";
import utils from "@/utils";

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

/**判断所跳转路由是否有权限 调级
    * @param {meta} meta 调转到路由的meta字段
*/
async function getCodeList(meta){
    let status = true;
    let codeData;
    if(meta.code){
        codeData = await $api.getPowerData();
        status = utils.codeStatus(codeData.module, meta.code);
    }else{
        status = true;
    }
    return status;
}

router.beforeEach(async (to,from,next) => {
    // if(routePass(to)){
    //     next();
    //     return true;
    // }
    // if (to.meta.title) {
    //     document.title = to.meta.title + "-谷川信息系统";
    // }
    // if(!(to.name == from.name)){
    //     // 获取权限
    //     let res = await $api.getMenuAuth(to.query.token);
    //     if(res.code == 401) {
    //         // 未登录
    //         window.location.href = res.data.loginUrl;
    //         return true;
    //     } else { 
    //         store.commit('USERHEADPOWER', res.data);
    //         // 权限判断
    //         await store.dispatch('getUserPower');
    //         let power = [...store.state.userHeaderPower, ...store.state.userPower]
    //         let status = handlePower(power, to.meta);
    //         if(!status) {
    //             next({replace: true, name: 'error-403'})
    //         }
    //     }
    // }
    // next();

    let uid = Cookies.get('uid');
    let token = Cookies.get('token');
    if (to.name == 'item_detail') {
        document.body.classList.add("item-detail-body")
    }else{
        document.body.classList.remove("item-detail-body")
    }
    if (uid && token) {
        if (to.meta.title) {
            document.title = to.meta.title + "-选哪儿官方版";
        }
        if(to.matched[1] && to.matched[1].path == '/Spa/industry'){
            getIndustryCodeList(to.meta).then(status=>{
                if(status){
                    next();
                }else{
                    next({replace: true, name: 'error-403'})
                }
            })
        }else{
            // 首页头部和侧边栏的模块展示权限
            getCodeList(to.meta).then(status=>{
                if(status){
                    next();
                }else{
                    next({replace: true, name: 'error-403'})
                }
            })
        }
    } else {
        if(Config.isTest){
            Cookies.set('uid', Config.testUid);
            Cookies.set('token', Config.testToken);
            next();
        }else{
            $http.get(`${Config.apiUrl}/Login/getToken?testUid=920928`).then((res) => {
                if (res.code == 200) {
                    Cookies.set('uid', res.uid);
                    Cookies.set('token', res.token);
                    next();
                }
            });
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
