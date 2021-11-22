import $http from '@/resource';
import axios from 'axios';
import Config from '@/config.js';
import Cookies from "js-cookie";

const $api = {};

/**
 * 获取联系人列表数据
 *
 * @author zanjiangjun 2020-9-22 10:29:34
 *
 * @method get
 *
 * @url Card/getCardLists
 *
 * @return {Promise<void>}
 */
$api.getCardLists = async (data) => {
    const url = "http://mms-group1.dev.tanikawa.com/spa.php/Card/getCardLists?testUid=920928";
    return await $http.get(url, {params:Object.assign({"isFollow":0},data)});
};

/**
 * 获取联系人列表数据[新版，解决了字段冗杂的问题]
 *
 * @author zyz 2021-2-5 09:13:01
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
    const url = "http://mms-group1.dev.tanikawa.com/spa.php/Card/getCardLists?testUid=920928";
    return await $http.get(url, {params:Object.assign({"type":type},data)});
};

/**
 * 获取关注联系人列表数据
 *
 * @author zanjiangjun 2020-9-22 10:29:34
 *
 * @method get
 *
 * @url Card/getCardLists
 *
 * @return {Promise<void>}
 */
$api.getFollowCardLists = async (data) => {
    const url = "Card/getCardLists";
    return await $http.get(url, {params:Object.assign({"isFollow":1},data)});
};
/**
 * 获取关系程度列表
 *
 * @author zanjiangjun 2020-9-23 10:59:34
 *
 * @method get
 *
 * @url Card/getRelationList
 *
 * @return {Promise<void>}
 */
$api.getRelationList = async (type = 1) => {
    const url = `Card/getRelationList?type=${type}`;
    return await $http.get(url);
};

/**
 * 获取联系人角色、标签，角色类型、标签类型列表
 *
 * @author zanjiangjun 2020-9-23 10:59:34
 *
 * @method get
 *
 * @url Card/getTagsList
 *
 * @return {Promise<void>}
 */
$api.getRoleTypeAndRoleSpan = async (type) => {
    const url = `Card/getTagsList`;
    return await $http.get(url, {params: {type: type}});
};

/**
 * 通过MOT项目类型获取Mot类型列表
 * @param motCateId mot项目类型
 * @returns {Promise<*>}
 */
$api.getMotSort = async (motCateId,motId) => {
    const url = `http://mms-group1.dev.tanikawa.com/spa.php/Card/getMotSortByCate?testUid=920928`;
    return await $http.get(url,{params:{mot_id:motId,mot_cate:1,mot_cate_type:motCateId}});
}
/**
 * 获取MOT类型 获取标签列表
 * @returns {Promise<*>}
 */
$api.getMotTags  = async () => {
    const url = `http://mms-group1.dev.tanikawa.com/spa.php/Card/getMotTagList?testUid=920928`;
    return await $http.get(url);
}

/**
 * 获取联系人联系方式列表
 * @param cardId 联系人id
 * @param uid 操作用户uid
 * @returns {Promise<*>}
 */
$api.getCardUser  = async (cardId,uid) => {
    const url = `Card/getCardUserBaseList`;
    return await $http.get(url,{params:{cardId:cardId,uid:uid}});
}

/**
 * 获取联系人所有企业数据信息
 * @param cardId 联系人id
 * @param uid 当前操作人id
 * @returns {Promise<*>}
 */
$api.getCardInfo  = async (cardId, uid) => {
    const url = `Card/getCardInfoList`;
    return await $http.get(url,{params:{cardId:cardId,uid:uid}});
}
/**
 * 获取联系人所有单位数据信息
 * @param cardId 联系人id
 * @param uid 当前操作人id
 * @returns {Promise<*>}
 */
$api.getUnitList  = async (cardId,uid) => {
    const url = `Card/getUnitList`;
    return await $http.get(url,{params:{cardId:cardId,uid:uid}});
}
/**
 * 显示全部信息
 * @param ids id数组
 * @param uid 当前操作用户
 * @param itemIds 所有相关项目id
 * @param companyIds 所有相关项目id
 * @param carrierIds 所有相关项目id
 * @returns {Promise<*>}
 */
$api.showAllData  = async (ids,uid,itemIds,companyIds,carrierIds) => {
    const url = `Card/showAllData`;
    return await $http.get(url,{params:{ids:ids,uid:uid,itemIds:itemIds,companyIds:companyIds,carrierIds:carrierIds}});
}

/**
 * 获取列表页我方关系全部信息
 * @param cardId 数据id
 * @param uid 当前操作用户
 * @returns {Promise<*>}
 */
$api.gerListRelation  = async (cardId,uid) => {
    const url = `Card/gerListOurRelation`;
    return await $http.get(url,{params:{cardId:cardId,uid:uid}});
}


/**
 * 获取所有标签列表
 * 获取联系人标签、角色类型   获取联系人关系备选项
 */
$api.getListAllTags = async ()=>{
    const url = 'http://mms-group1.dev.tanikawa.com/spa.php/Card/getAllTagList?testUid=920928';
    return await $http.get(url);
}

/**
 * 录入页搜索查重
 */
$api.getInputCardLists= async (data)=>{
    const url = "Card/getInputCardLists";
    return await $http.get(url,{params:Object.assign(data)});
}

/**
 * 获取民族备选项数据
 * @author zyz 2021-2-25 11:41:46
 * @method get
 * @url Plugin/ethnicList
 * @returns {Promise<void>}
 */
$api.getNationData = async ()=>{
    const url = `Plugin/ethnicList`;
    return await $http.get(url);
};
/**
 * 上传附件
 *
 * @author liluyao 2020-3-19 14:06:46
 *
 * @method post
 *
 * @param {Object}
 *
 * @url /Plugin/plugInUpload
 *
 * @returns {Promise<void>}
 */

$api.uploadFile = async(formData) => {
    const url = `/Plugin/plugInUpload`;
    let http = axios.create({
        baseURL: `${Config.apiUrl}/`,
        timeout: 55000,
    });
    let res = await http.post(url,formData,{
        headers : {
            "Token" :   Cookies.get('token'),
        }
    });
    return res.data;
};
/**
 * 获取联系人状态
 */
$api.getContactsStatus=async (data)=>{
    const url='http://mms-group1.dev.tanikawa.com/spa.php/Card/getContactsStatus?testUid=920928';
    return await $http.post(url,data);
};
/**
 * 获取联系人审批列表
 *
 * @author qinna
 *
 * @method get
 *
 * @param {Object} data 搜索项数据
 * @param {String} type page类型
 *
 * @url Card/getCardReviewList
 *
 * @returns {Promise<void>}
 */
$api.getCardReviewList = async(data) => {
    const url = "Card/getCardReviewList";
    return await $http.get(url, {params:data});
};
/**
 * 审批联系人
 *
 * @author qinna
 *
 * @method get
 *
 * @param {Object} data 搜索项数据
 * @param {String} type page类型
 *
 * @url Card/reviewCard
 *
 * @returns {Promise<void>}
 */
$api.reviewCard = async(data) => {
    const url = "Card/reviewCard";
    return await $http.post(url, {params: data});
};

/**
 * 查询所有联系人数量
 *
 * @author wanghao
 *
 * @method get
 *
 * @url Card/reviewCard
 *get
 * @returns {Promise<void>}
 */
$api.calAllSum = async() => {
    const url = "http://mms-group1.dev.tanikawa.com/spa.php/Card/calAllSum?testUid=920928";
    return await $http.get(url);
};

/**
 * 获取渠道来源模块
 * @param {Object} data 搜索项数据
 * @method get
 * @url Card/getDropDownConfig
 * @returns {Promise<void>}
 */
$api.getSourceConfig = async (data)=>{
    const url = "Card/getDropDownConfig";
    return await $http.get(url, {params: data});
}

/**
 * 单纯获取联系人所有相关业务id集合(返回是数组)
 * @param {Object} data 搜索项数据
 * @method get
 * @url Card/getAllService
 * @returns {Promise<void>}
 */
$api.getAllService = async (data)=>{
    const url = "Card/getAllService";
    return await $http.get(url, {params: data});
}
export default $api;
