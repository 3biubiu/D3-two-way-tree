import $http from '@/resource';
import utils from '@/utils';
import Cache from '@/cache';

const $api = {};
// 左侧菜单 + 头部菜单
/**
    * 左边栏提示的数量
    * @method GET
    * @url : /Plugin/leftFieldTips
*/
$api.getSideBarNumber = async () => {
    const url = '/Plugin/leftFieldTips?testUid=920928'; 
    let res = await $http.get(url);
    if (res.code === 200) {
        return res.data;
    } else {
        utils.notice(res.msg,'error')
    }
};
/**
    * 头部的个人信息及消息提示及3条个人消息
    * @method GET
    * @url : /Plugin/headerInfo
*/
$api.getHeaderData = async () => {
    const url = '/Plugin/headerInfo?testUid=920928'; 
    let res = await $http.get(url);
    if (res.code === 200) {
        return res;
    } else {
        utils.notice(res.msg,'error')
    }
};

/**
    * 首页头部和侧边栏的模块展示权限
    * @method GET
    * @url : /Plugin/getSpaAuth
*/
$api.getPowerData = async () => {
    const url = '/Plugin/getSpaAuth?testUid=920928'; 
    let res = await $http.get(url);
    if (res.code === 200) {
        return res;
    } else {
        utils.notice(res.msg,'error')
    }
};



// 右侧挂件
/**
    * 问题反馈提交
    * @method POST
    * @url : /Plugin/problemFeedback
*/
$api.saveProblemFeedback = async (submitData) => {
    const url = '/Plugin/problemFeedback?testUid=920928'; 
    let res = await $http.post(url,submitData);
    if (res.code === 200) {
        return res;
    } else {
        utils.notice(res.msg,'error')
    }
};

/**
    * 获取iframe地址
    * @method POST
    * @url : /Plugin/problemFeedback
*/
$api.getIframeSrc = async () => {
    const url = '/Plugin/iframeSrc?testUid=920928';
    let res = await $http.get(url);
    if (res.code === 200) {
        return res;
    } else {
        utils.notice(res.msg,'error')
    }
};

/**
    * 拉取用户的基本权限
    * @method GET
    * @param uid 用户id
    * @returns {Promise<*>}
    * @url /basic-auth
*/
$api.getBasicAuthList = async (uid="") => {
    let url = "/User/auth?testUid=920928";
    if(uid){
        url +=`?uid=${uid}`;
    }
    return await $http.get(url);    
};

// 成交
/**
    * 成交左边栏 提示待审数量
    * @method POST
    * @param {Object} formData 
    * @return {Promise<any>}
    * @url : /DealPlugin/dealLeftFieldTips
*/
$api.dealLeftFieldTips = async ()=> {
    const url = '/DealPlugin/dealLeftFieldTips?testUid=920928';
    return await $http.get(url);
};






















export default $api;