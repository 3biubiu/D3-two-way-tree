import $http from '@/resource';
import utils from '@/utils';

const $api = {};
/**
 * 获取联系人列表数据
 * @method GET
 * @url Card/getCardInfo
 * @param  uid 当前操作人uid
 * @param  cardId 联系人id
 * @return {Promise<void>}
 */
$api.getContactBase = async (data) => {
    const url = "http://mms-group1.dev.tanikawa.com/spa.php/Card/getCardInfo?testUid=920928";
    return await $http.get(url,{params: data});
};

/**
 * 获取所有标签列表
 * @returns {Promise<*>}
 */
$api.getAllTags = async () => {
    const url = "ItemBaseInfo/getAllTags?type=3";
    return await $http.get(url);
}

$api.saveTags = async(cardId, tags) => {
    const url = "Card/getEditTagLists";
    return await $http.post(url, {cardId: cardId, tagId: tags.join(','), type: 2});
}

$api.tagLibrarySearch = async (itemId,keywords) => {
    const url = `plugin/tagsSearch?keyword=` + keywords;
    // let postData = {
    //     keyword: keywords
    // }
    return await $http.get(url);
};

/**
 * 关注与取消关注名片
 * @method POST
 * @url Card/getIsFollow
 * @param  uid 当前操作人uid
 * @param  cardId 联系人id
 * @param  isFollow 0未关注 1已关注
 * @return {Promise<void>}
 */
$api.changeFollow = async (data) => {
    const url = "Card/getIsFollow";
    return await $http.post(url,data);
};

/**
 * 获取联系人标签、角色标签、标准标签列表
 * @method GET
 * @url Card/getTagsList
 * @param type 1=联系人标签 2=联系人角色 3=标准标签列表
 * @return {Promise<void>}
 */
$api.getContactTags = async (type) => {
    const url = "Card/getTagsList";
    return await $http.get(url,{params: type});
};

/**
 * 获取已选择的标签/提交标签
 * @method GET
 * @url Card/getEditTagLists
 * @param  uid 当前操作人uid
 * @param  cardId 联系人id
 * @param  tagId 标签id
 * @return {Promise<void>}
 */
$api.getEditTag = async (data) => {
    const url = "Card/getEditTagLists";
    return await $http.post(url,data);
};

/**
 * 获取联系人基础信息
 * @method GET
 * @url Card/getCardUserBaseList
 * @param  uid 当前操作人uid
 * @param  cardId 联系人id
 * @return {Promise<void>}
 */
$api.getBaseList = async (data) => {
    const url = "Card/getCardUserBaseList";
    return await $http.get(url,{params: data});
};

/**
 * 快速编辑联系人基础信息
 * @method POST
 * @url Card/updateCardInfo
 * @param  uid 当前操作人uid
 * @param  cardId 联系人id
 * @param  type 编辑的类型
 * @param  content 编辑的内容
 * @return {Promise<void>}
 */
$api.changeBaseList = async (data) => {
    const url = "Card/updateCardInfo";
    return await $http.post(url,data);
};
/**
 * 快速编辑联系人负责人
 * @method POST
 * @url Card/updateCardInfo
 * @param  uid 当前操作人uid
 * @param  cardId 联系人id
 * @param  type 编辑的类型
 * @param  content 编辑的内容
 * @return {Promise<void>}
 */
$api.quickManager = async (data) => {
    const url = "Card/quickManager";
    return await $http.post(url,data);
};

/**
 * 快速编辑联系人基础信息
 * @method POST
 * @url Card/updateCardInfo
 * @param  data 当前操作人uid
 * @return {Promise<void>}
 */
$api.getUidName = async (data) => {
    const url = "Card/getUidName";
    return await $http.post(url,data);
};

/**
 * 获取相关项目列表
 * @method GET
 * @url Card/geItemLists
 * @param  uid 当前操作人uid
 * @param  cardId 联系人id
 * @param  page 分页页码
 * @param  pageSize 每页显示条数 （默认10条）
 * @param  order 排序方式 正序=asc 倒序=desc
 * @return {Promise<void>}
 */
$api.getProjectList = async (data) => {
    const url = "Card/geItemLists";
    return await $http.get(url,{params: data});
};

/**
 * 获取相关企业列表
 * @method GET
 * @url Card/getEnterpriseList
 * @param  uid 当前操作人uid
 * @param  cardId 联系人id
 * @param  page 分页页码
 * @param  pageSize 每页显示条数 （默认10条）
 * @return {Promise<void>}
 */
$api.getBusinessList = async (data) => {
    const url = "Card/getEnterpriseList";
    return await $http.get(url,{params: data});
};

/**
 * 获取相关单位列表
 * @method GET
 * @url Card/getCompanyLists
 * @param  uid 当前操作人uid
 * @param  cardId 联系人id
 * @param  page 分页页码
 * @param  pageSize 每页显示条数 （默认10条）
 * @return {Promise<void>}
 */
$api.getContentCompany = async (data) => {
    const url = "Card/getCompanyLists";
    return await $http.get(url,{params: data});
};

/**
 * 获取项目和单位联系人角色
 * @method GET
 * @url Card/getCardMotRol
 * @param  cardId 联系人id
 * @param  type 相关业务类型 1项目2载体3单位
 * @param  relateId 相关业务id
 * @return {Promise<void>}
 */
$api.getMotRole = async (data) => {
    const url = "Card/getCardMotRol";
    return await $http.get(url,{params: data});
};

/**
 * 删除关联操作
 * @method POST
 * @url Card/delItemRelationCard
 * @param  cardId 联系人id
 * @param  id 数据id
 * @param  type 相关业务类型 1=项目2=载体3=单位
 * @return {Promise<void>}
 */
$api.delItemRelation = async (data) => {
    const url = "Card/delItemRelationCard";
    return await $http.post(url,data);
};
/**
 * 删除关联企业操作
 * @method POST
 * @url Card/delEnterprise
 * @param  cardId 联系人id
 * @param  id 数据id
 * @return {Promise<void>}
 */
$api.delEnterprise = async (data) => {
    const url = "Card/delEnterprise ";
    return await $http.post(url,data);
};

/**
 * 关联已有项目/单位
 * @method POST
 * @url Card/addRelationOldItem
 * @param  cardId 联系人id
 * @param  id 项目id
 * @param  type 相关业务类型 1=项目2=载体3=单位
 * @return {Promise<void>}
 */
$api.addRelation = async (data) => {
    const url = "Card/addRelationOldItem";
    return await $http.post(url,data);
};

/**
 * 添加企业
 * @method POST
 * @url Card/addEnterprise
 * @param  cardId 联系人id
 * @param  id 项目id
 * @param  comname 企业名称
 * @param  zhiwu 职务
 * @return {Promise<void>}
 */
$api.addEnterprise = async (data) => {
    const url = "Card/addEnterprise";
    return await $http.post(url,data);
};

/**
 * 编辑企业
 * @method POST
 * @url Card/editEnterprise
 * @param  cardId 联系人id
 * @param  id 项目id
 * @param  comname 企业名称
 * @param  zhiwu 职务
 * @return {Promise<void>}
 */
$api.editEnterprise = async (data) => {
    const url = "Card/editEnterprise";
    return await $http.post(url,data);
};

/**
 * 获取业务关系中与我方关系
 * @method GET
 * @url Card/getOurRelationList
 * @param  cardId 联系人id
 * @param  id 项目id
 * @param  type 关系类型 全部为0
 * @return {Promise<void>}
 */
$api.getOurList = async (data) => {
    const url = "Card/getOurRelationList";
    return await $http.get(url,{params: data});
};

/**
 * 删除与我方关系
 * @method POST
 * @url Card/delCardOurRelation
 * @param  cardId 联系人id
 * @param  id 项目id
 * @param  uid 当前操作人uid
 * @return {Promise<void>}
 */
$api.delOurRelation = async (data) => {
    const url = "Card/delCardOurRelation";
    return await $http.post(url,data);
};

/**
 * 获取业务关系中与我方关系
 * @method GET
 * @url Card/getInsideRelationList
 * @param  cardId 联系人id
 * @param  id 项目id
 * @param  type 关系类型 全部为0
 * @return {Promise<void>}
 */
$api.getInterList = async (data) => {
    const url = "Card/getInsideRelationList";
    return await $http.get(url,{params: data});
};

/**
 * 获取公司人员姓名列表
 * @method GET
 * @url Card/getOurUserList
 * @param  keyword 联系人姓名
 * @param  uid 用户id
 * @return {Promise<void>}
 */
$api.getOurUser = async (uid) => {
    const url = "Card/getOurUserList";
    return await $http.get(url,{params: {uid:uid}});
};
/**
 * 删除内部关系
 * @method POST
 * @url Card/delCardInsideRelation
 * @param  cardId 联系人id
 * @param  id 项目id
 * @param  uid 当前操作人uid
 * @return {Promise<void>}
 */
$api.delInterRelation = async (data) => {
    const url = "Card/delCardInsideRelation ";
    return await $http.post(url,data);
};

/**
 * 获取业务关系类型
 * @method GET
 * @url Card/getRelationList
 * @param  type 1=联系人与我方关系标签 2=联系人内部关系标签
 * @return {Promise<void>}
 */
$api.getRelationList = async (type) => {
    const url = "Card/getRelationList";
    return await $http.get(url,{params: {type:type}});
};

/**
 * 获取联系人姓名列表
 * @method GET
 * @url Card/getRelationshipUserList
 * @param  keyword 联系人姓名
 * @param  uid 用户id
 * @return {Promise<void>}
 */
$api.getInterUser = async (data) => {
    const url = "Card/getRelationshipUserList";
    return await $http.get(url,{params: data});
};

/**
 * 添加联系人与我方关系
 * @method POST
 * @url Card/addCardOurRelation
 * @param  cardId 联系人id
 * @param  id 项目id
 * @param  uid 当前操作人uid
 * @return {Promise<void>}
 */
$api.addOurRelation = async (data) => {
    const url = "Card/addCardOurRelation";
    return await $http.post(url,data);
};

/**
 * 编辑联系人与我方关系
 * @method POST
 * @url Card/editCardOurRelation
 * @param  cardId 联系人id
 * @param  id 项目id
 * @param  uid 当前操作人uid
 * @return {Promise<void>}
 */
$api.editOurRelation = async (data) => {
    const url = "Card/editCardOurRelation";
    return await $http.post(url,data);
};

/**
 * 添加联系人内部关系
 * @method POST
 * @url Card/addCardInsideRelation
 * @param  cardId 联系人id
 * @param  id 项目id
 * @param  uid 当前操作人uid
 * @return {Promise<void>}
 */
$api.addInterRelation = async (data) => {
    const url = "Card/addCardInsideRelation";
    return await $http.post(url,data);
};

/**
 * 编辑联系人内部关系
 * @method POST
 * @url Card/updateCardInsideRelation
 * @param  cardId 联系人id
 * @param  id 项目id
 * @param  uid 当前操作人uid
 * @return {Promise<void>}
 */
$api.editInterRelation = async (data) => {
    const url = "Card/updateCardInsideRelation";
    return await $http.post(url,data);
};
/**
 * 提交添加跟进备注
 * @method POST
 * @param {Object} formData 备注数据
 * @author liujuan & 2020-3-17 11:40:01
 * @url /Item/addCloud
 * @return {Object} Promise
 */
$api.submitRemark = async (formData) => {
    const url = `/Card/addCloud`;
    let response = await $http.post(url,formData);
    if (response.code == '200') {
        return response;
    } else {
        utils.notice(response.msg, 'error');
    }
}
/**
 * 提交回复跟进备注
 * @method POST
 * @param {Object} formData 备注数据
 * @author zhouna & 2020-04-02 17:41:58
 * @url / Item / addCloudComment
 * @return {Object} Promise
 */
$api.submitReply = async (formData) => {
    const url = `/Card/addCloudComment`;
    let response = await $http.post(url, formData);
    if (response.code == '200') {
        return response;
    } else {
        utils.notice(response.msg, 'error');
    }
}
/**
 * 获取备注列表数据
 *
 * @author zyz 2020-3-4 13:50:48
 *
 * @method post
 *
 * @param postData
 *
 * @url /Item/getCloudList
 *
 * @returns {Promise<void>}
 */
$api.getRemarkData = async(postData={}) => {
    const url = `Card/getCardCloud?itemId=${postData.itemId}`;
    return await $http.get(url,postData);
};
/**
 * 变更备注置顶状态
 *
 * @author zyz 2020-3-31 16:03:02
 *
 * @method post
 *
 * @param {Boolean} status 修改状态
 * @param {String} cloudId 备注id
 * @param {String} itemId 项目id
 *
 * @url Item/changeCloudTop
 *
 * @returns {Promise<void>}
 */
$api.changeCloudTop = async (status,cloudId,itemId)=>{
    const url = `Card/topCloudOperation`;
    let postData = {
        "itemId" : itemId,
        "cloudId" : cloudId,
        "isTop"  :   status?2:1,
    };
    return await $http.post(url,postData);
};
/**
 * 删除备注
 *
 * @author zyz 2020-3-31 16:38:52
 *
 * @method post
 *
 * @param {String} id 备注id
 * @param {String} itemId 项目id
 *
 * @url Item/deleteCloud
 *
 * @return {Promise<void>}
 */
$api.deleteCloud = async (id,itemId)=>{
    const url = `Card/deleteCloud`;
    let postData = {
        "cloudId" : id,
        "itemId" : itemId,
    };
    return await $http.post(url,postData);
};
/**
 * 修改备注
 *
 * @author zyz 2020-4-1 15:40:49
 *
 * @method post
 *
 * @param {String} itemId 项目id
 * @param  {Object} data 备注内容
 *
 * @url Item/editCloud
 *
 * @return {Promise<void>}
 */
$api.editCloud = async (itemId,data)=>{
    const url = `Card/editCloud`;
    let postData = {
        'itemId'    :   itemId,
        "cloudId"   :   data.id,
        "cloud"     :   data.content,
        "issend"    :   0,
        "atUser"    :   data.atUser,
        "sendqq"    :   data.sendType.indexOf("1") > -1 ? 1 : 0
    };

    return await $http.post(url,postData);
};

/**
 * 开放备注
 *
 * @method post
 * 
 * @param {String} cloudId 备注id
 * @param {String} itemId 项目id
 *
 * @url Item/topCloudOperation
 *
 * @returns {Promise<void>}
 */
 $api.changeCloudPrivate = async (cloudId, itemId)=>{
    const url = `Item/privateCloudOperation`;
    let postData = {
        itemId: itemId,
        cloudId: cloudId,
        isprivate: 0,
        cloudType : 6
    };
    return await $http.post(url, postData);
};

/**
 * 获取联系人履历列表数据
 */
$api.getResumeList=async (data)=>{
    const url='Card/getResumeList';
    return await $http.post(url,data);
}
/**
 * 删除履历
 * @param data
 * @returns {Promise<*>}
 */
$api.delCardResume = async (data)=>{
    const url='Card/delCardResume';
    return await $http.post(url,data);
}
/**
 * 添加编辑联系人履历列表数据
 */
$api.editResume = async (data)=>{
    const url ='Card/editCardResume';
    return await $http.post(url,data);
}

/**
 * 获取联系人履历单条数据
 * @param data
 * @returns {Promise<*>}
 */
$api.getFindResume = async (data)=>{
    const url = 'Card/getFindResume';
    return await $http.post(url,data);
}
export default $api;
