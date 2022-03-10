import $http from '@/resource';
import axios from 'axios';
import Config from '@/config.js';
import Cookies from "js-cookie";

const $api = {};

/**
 * 获取联系人列表数据
 *
 * @method get
 *
 * @url Card/getCardLists
 *
 * @return {Promise<void>}
 */
$api.getCardLists = async (data) => {
    const url = "/Card/getCardLists?testUid=920928";
    return await $http.get(url, {params:Object.assign({"isFollow":0},data)});
};

/**
 * 获取联系人列表数据[新版，解决了字段冗杂的问题]
 *
 * @method get
 *
 * @param {Object} data 搜索项数据
 * @param {String} type page类型
 *
 * @url Card/getCardLists
 *
 * @returns {Promise<void>}
 */
$api.getCardListData = async(data,type='') => {
    const url = "/Card/getCardLists?testUid=920928";
    return await $http.get(url, {params:Object.assign({"type":type},data)});
};
/**
 * 通过MOT项目类型获取Mot类型列表
 * @param motCateId mot项目类型
 * @returns {Promise<*>}
 */
$api.getMotSort = async (motCateId,motId) => {
    const url = `/Card/getMotSortByCate?testUid=920928`;
    return await $http.get(url,{params:{mot_id:motId,mot_cate:1,mot_cate_type:motCateId}});
}
/**
 * 获取MOT类型 获取标签列表
 * @returns {Promise<*>}
 */
$api.getMotTags  = async () => {
    const url = `/Card/getMotTagList?testUid=920928`;
    return await $http.get(url);
}
/**
 * 获取所有标签列表
 * 获取联系人标签、角色类型   获取联系人关系备选项
 */
$api.getListAllTags = async ()=>{
    const url = '/Card/getAllTagList?testUid=920928';
    return await $http.get(url);
}
/**
 * 获取联系人状态
 */
$api.getContactsStatus=async (data)=>{
    const url='/Card/getContactsStatus?testUid=920928';
    return await $http.post(url,data);
};
/**
 * 查询所有联系人数量
 *
 * @method get
 *
 * @url Card/reviewCard
 *get
 * @returns {Promise<void>}
 */
$api.calAllSum = async() => {
    const url = "/Card/calAllSum?testUid=920928";
    return await $http.get(url);
};
export default $api;
