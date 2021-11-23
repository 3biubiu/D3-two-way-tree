import Vue from 'vue'
import Router from 'vue-router'
import cookies from 'js-cookie'
import {routers} from './index';
import config from "@/config"
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
/**处理权限状态码
*
*@param {Array} data 权限码数组
*
*/
const handleCode = (codeList,data)=> {
    return utils.codeStatus(codeList, data);
}

/**判断所跳转路由是否有权限 调级
    * @param {meta} meta 调转到路由的meta字段
*/
async function getCodeList(meta){
    let status = true;
    let codeData;
    if(meta.code){
        codeData = await $api.getPowerData();
        status = handleCode(codeData.module, meta.code);

    }else{
        status = true;
    }
    return status;
}

/**判断所跳转路由是否有权限 产业
    * @param {meta} meta 调转到路由的meta字段
    *@return bool true 有权限 false 无权限
 */
async function getIndustryCodeList(meta){
    if(meta.code){
        let codeData = await $api.getBasicAuthList(cookies.get('uid'));
        let codeList = [];
        if(codeData.code == '200' && codeData.data){
            for(let i in codeData.data){
                codeList.push(codeData.data[i].authority);
            }
            if(meta.code != '11'){
                return handleCode(codeList, meta.code) && handleCode(codeList, '11');
            }else{
                return handleCode(codeList, meta.code);
            }
        }else{
            return false;
        }
    }else{
        return true;
    }
}

router.beforeEach((to,from,next) => {
    let uid = cookies.get('uid');
    let token = cookies.get('token');
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
        $http.get(`${config.apiUrl}/Login/getToken`).then((res) => {
            if (res.code == 200) {
                cookies.set('uid', res.uid);
                cookies.set('token', res.token);
                next();
            }
        });
    }
})

export default router
