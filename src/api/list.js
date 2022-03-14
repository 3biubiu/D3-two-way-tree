import $http from '@/resource';
import utils from "@/utils";
const $api = {};

/**
 * 获取还可申请人数、已成交的联系人数
 * @returns {Promise<*>}
 */
$api.getStatisticsNumber= async ()=>{
    const url = `/Card/getStatisticsNumber`;
    return await $http.post(url);
}

/**
 * 申请查看名片
 *
 * @method post
 *
 * @url /UserCard/applyCard
 *
 * @returns {Promise<void>}
 */
 $api.applyCard = async (formData)=>{
    const url = `/UserCard/applyCard`;
    return await $http.post(url,formData);
};


/**
 * 删除名片列表权限
 *
 * @method post
 *
 * @url /userCard/delCardAuth/
 *
 * @returns {Promise<void>}
 */
$api.delCardAuth = async (formData)=>{
    const url = `/UserCard/delCardAuth`;
    return await $http.post(url,formData);
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
    const url = "/Card/getCardLists";
    return await $http.get(url, {params:Object.assign({"type":type},data)});
};
/**
 * 通过MOT项目类型获取Mot类型列表
 * @param motCateId mot项目类型
 * @returns {Promise<*>}
 */
$api.getMotSort = async (motCateId,motId) => {
    const url = `/Card/getMotSortByCate`;
    return await $http.get(url,{params:{mot_id:motId,mot_cate:1,mot_cate_type:motCateId}});
}
/**
 * 获取MOT类型 获取标签列表
 * @returns {Promise<*>}
 */
$api.getMotTags  = async () => {
    const url = `/Card/getMotTagList`;
    return await $http.get(url);
}
/**
 * 获取所有标签列表
 * 获取联系人标签、角色类型   获取联系人关系备选项
 */
$api.getListAllTags = async ()=>{
    const url = '/Card/getAllTagList';
    return await $http.get(url);
}
/**
 * 获取联系人状态
 */
$api.getContactsStatus=async (data)=>{
    const url='/Card/getContactsStatus';
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
    const url = "/Card/calAllSum";
    return await $http.get(url);
};


/**
 * 获取联系人列表数据
 * @method GET
 * @url Card/getCardInfo
 * @param  uid 当前操作人uid
 * @param  cardId 联系人id
 * @return {Promise<void>}
 */
 $api.getContactBase = async (data) => {
    const url = "/Card/getCardInfo";
    return await $http.get(url,{params: data});
};

/**
 * 获取部门及部门下人员
 *
 * @method GET
 *
 * @url :/Plugin/transferModelUser
 */
 $api.plugInGroupUser = async ()=>{
    const url = '/Plugin/transferModelUser';
    return await $http.get(url);
};



export default $api;