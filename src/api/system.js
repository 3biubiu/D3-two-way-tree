import $http from '@/resource';
import utils from '@/utils';

const $api = {};

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
	let res = await $http.get(url, {params: formData});
    return res;
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

/**
 * 获取iframe地址
 *
 * @method GET
 * @return {Promise<any>}
 * @url : iframe-src
 */
 $api.getIframeSrc = async () => {
    const url = '/system/iframe-src';
    let res = await $http.get(url);
    if (res.code == 200) {
        return res.data;
    } else {
        utils.notice(res.msg, 'error');
    }
};

export default $api;
