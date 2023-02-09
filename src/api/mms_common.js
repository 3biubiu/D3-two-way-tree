import $http from '@/resource';
import utils from '@/utils';

const $api = {};
//左侧菜单 + 头部菜单
/**
 * 左边栏提示的数量
 *
 * @method GET
 * @return {Promise<any>}
 * @url : /system/left-tips
 */
 $api.getSideBarNumber = async () => {
    const url = '/system/left-tips';
    let res = await $http.get(url);
    if (res.code == 200) {
        return res.data;
    } else {
        utils.notice(res.msg, 'error');
    }
};
/**
 * 头部的个人信息及消息提示及3条个人消息
 *
 * @method GET
 * @return {Promise<any>}
 * @url : /system/header-info
 */
 $api.getHeaderData = async () => {
    const url = '/system/header-info';
    let res = await $http.get(url);
    if (res.code == 200) {
        return res.data;
    } else {
        utils.notice(res.msg, 'error');
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

/**
 * 首页头部的模块展示权限
 *
 * @method GET
 * @param {String} token token
 * @return {Promise<any>}
 * @url : /system/menu-auths
 */
 $api.getMenuAuth = async (token) => {
    const url = '/system/menu-auths';
    let formData = {};
	if(token) {
		formData = {ucmsToken: token}
	}
	// let res = await $http.get(url, {params: formData});
    
    return {
        "code": 200,
        "message": "成功",
        "data": [
          "TUDI",
          "CHANGFANG",
          "DEPOT",
          "OFFICE",
          "REG",
          "BRAND",
          "OTHER",
          "SERVICE",
          "INTELLIGENCE",
          "OA",
          "AMS",
          "HR",
          "MISSION",
          "PERFORMANCE",
          "COMPANIES",
          "ERP",
          "OFFICE_CONTRACT",
          "CONTACTS",
          "CUSTOMER_CENTER",
          "SPA_INDUSTRY",
          "INDUSTRY"
        ]
      };
};


// 右侧挂件
/**
    * 问题反馈提交
    * @method POST
    * @url : /Plugin/problemFeedback
*/
$api.saveProblemFeedback = async (submitData) => {
    const url = '/Plugin/problemFeedback'; 
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
    const url = '/Plugin/iframeSrc';
    let res = await $http.get(url);
    if (res.code === 200) {
        return res;
    } else {
        utils.notice(res.msg,'error')
    }
};

/**
 * 获取当前用户的权限
 * @method GET
 * @return {Promise<any>}
 * @url : /system/my-power
 */
 $api.getMyPower = async() => {
    const url = '/system/my-power';
    let res = await $http.get(url);
    return res;
}

// 成交
/**
    * 成交左边栏 提示待审数量
    * @method POST
    * @param {Object} formData 
    * @return {Promise<any>}
    * @url : /DealPlugin/dealLeftFieldTips
*/
$api.dealLeftFieldTips = async ()=> {
    const url = '/DealPlugin/dealLeftFieldTips';
    return await $http.get(url);
};






















export default $api;