import $http from '@/resource';
import utils from '@/utils';
import Cache from '@/cache';
import item from "../../../router/item/item_detail";

const $api = {};

/**
 * 获取tab计数
 *
 * @author panhaowen 2020-3-20
 *
 * @method get
 *
 * @param {String} itemId 项目id
 *
 * @url ItemTab/getTabCount
 *
 * @returns {Promise<void>}
 */
$api.getTabCount = async (itemId)=>{
    const url = `ItemTab/getTabCount?itemId=${itemId}`;
    return await $http.get(url);
};

/**
 * 获取相关附件列表
 *
 * @author panhaowen 2020-3-23
 *
 * @method get
 *
 * @param {String} itemId 项目id
 *
 * @url ItemTab/getItemFiles
 *
 * @returns {Promise<void>}
 */
$api.getItemFiles = async (itemId)=>{
    const url = `ItemTab/getItemFiles?itemId=${itemId}`;
    return await $http.get(url);
};

/**
 * 删除相关附件
 *
 * @author panhaowen 2020-3-23
 *
 * @method post
 *
 * @param {String} fileId   文件id
 * @param {String} itemId 项目id
 *
 * @url ItemTab/fileDel
 *
 * @returns {Promise<void>}
 */
$api.fileDel = async (itemId,fileId)=>{
    const url = `ItemTab/fileDel`;
    let postData = {
        "fileId" :  fileId,
        "itemId" :  itemId,
    };
    return await $http.post(url,postData);
};

$api.deleteConfirmFile = async (excuteId,fileId)=>{
    const url = `ItemTab/deleteConfirmFile`;
    let postData = {
        "fileId" :  fileId,
        "excuteId" :  excuteId,
    };
    return await $http.post(url,postData);
};

$api.deleteCarrierConfirmFile = async (itemId,fileId)=>{
    const url = `ItemTab/deleteCarrierConfirmFile`;
    let postData = {
        "fileId" :  fileId,
        "itemId" :  itemId,
    };
    return await $http.post(url,postData);
};

/**
 * 添加相关附件
 *
 * @author panhaowen 2020-3-24
 *
 * @method post
 *
 * @param {Object} files  文件组
 * @param {String} itemId 项目id
 *
 * @url ItemTab/addFile
 *
 * @returns {Promise<void>}
 */
$api.addFile = async (itemId,files)=>{
    const url = `ItemTab/addFile`;
    let postData = {
        "files" :  files,
        "itemId" :  itemId,
    };
    return await $http.post(url,postData);
};

/**
 * 获取对接单位列表
 *
 * @author panhaowen 2020-3-24
 *
 * @method get
 *
 * @param {String} itemId 项目id
 *
 * @url ItemTab/getRelateCompany
 *
 * @returns {Promise<void>}
 */
$api.getRelateCompany = async (itemId)=>{
    const url = `ItemTab/getRelateCompany?itemId=${itemId}`;
    return await $http.get(url);
};

/**
 * 上传项目确认书
 *
 * @author panhaowen 2020-3-24
 *
 * @method post
 *
 * @param {String} itemId 项目id
 * @param {String} excuteId 关联关系id
 * @param {Object} files  文件组
 *
 * @url ItemTab/addConfirmFile
 *
 * @returns {Promise<void>}
 */
$api.addConfirmFile = async (itemId,excuteId,files)=>{
    const url = `ItemTab/addConfirmFile`;
    let postData = {
        "itemId" :  itemId,
        "excuteId" :  excuteId,
        "files" :  files,
    };
    return await $http.post(url,postData);
};

/**
 * 删除对接单位
 *
 * @author panhaowen 2020-3-24
 *
 * @method post
 *
 * @param {String} itemId 项目id
 * @param {String} excuteId 关联关系id
 *
 * @url ItemTab/relateCompanyDel
 *
 * @returns {Promise<void>}
 */
$api.relateCompanyDel = async (itemId,excuteId)=>{
    const url = `ItemTab/relateCompanyDel`;
    let postData = {
        "itemId" :  itemId,
        "excuteId" :  excuteId,
    };
    return await $http.post(url,postData);
};


/**
 * 添加对接单位
 *
 * @author panhaowen 2020-3-25
 *
 * @method post
 *
 * @param {String} itemId 项目id
 * @param {String} companyIds 单位id拼接的字符串
 *
 * @url ItemTab/addRelateCompany
 *
 * @returns {Promise<void>}
 */
$api.addRelateCompany = async (itemId,companyIds)=>{
    const url = `ItemTab/addRelateCompany`;
    let postData = {
        "itemId" :  itemId,
        "companyIds" :  companyIds,
    };
    return await $http.post(url,postData);
};


/**
 * 获取对接载体列表
 *
 * @author panhaowen 2020-3-25
 *
 * @method get
 *
 * @param {String} itemId 项目id
 *
 * @url ItemTab/getRelateCarrier
 *
 * @returns {Promise<void>}
 */
$api.getRelateCarrier = async (itemId)=>{
    const url = `ItemTab/getRelateCarrier?itemId=${itemId}`;
    return await $http.get(url);
};

/**
 * 刷新系统匹配载体
 *
 * @author panhaowen 2020-3-25
 *
 * @method get
 *
 * @param {String} itemId 项目id
 *
 * @url ItemTab/flashSystemRelate
 *
 * @returns {Promise<void>}
 */
$api.flashSystemRelate = async (itemId,click=0)=>{
    const url = `ItemTab/flashSystemRelate?itemId=${itemId}&click=${click}`;
    return await $http.get(url);
};


/**
 * 上传载体项目确认书
 *
 * @author panhaowen 2020-3-25
 *
 * @method post
 *
 * @param {String} itemId 项目id
 * @param {String} excuteId 关联关系id
 * @param {Object} files  文件组
 *
 * @url ItemTab/addCarrierConfirmFile
 *
 * @returns {Promise<void>}
 */
$api.addCarrierConfirmFile = async (itemId,excuteId,files)=>{
    const url = `ItemTab/addCarrierConfirmFile`;
    let postData = {
        "itemId" :  itemId,
        "excuteId" :  excuteId,
        "files"  :  files,
    };
    return await $http.post(url,postData);
};


/**
 * 上传载体项目确认书
 *
 * @author panhaowen 2020-3-26
 *
 * @method post
 *
 * @param {Object} excuteData  文件组
 *
 * @url ItemTab/editCarrierExcute
 *
 * @returns {Promise<void>}
 */
$api.editCarrierExcute = async (excuteData)=>{
    const url = `ItemTab/editCarrierExcute`;
    let postData = {
        "excuteData" :  excuteData,
    };
    return await $http.post(url,postData);
};

/**
 * 添加对接单位
 *
 * @author panhaowen 2020-3-26
 *
 * @method post
 *
 * @param {String} itemId 项目id
 * @param {Array} carrierIds 单位id拼接的字符串
 *
 * @url ItemTab/addRelateCarrier
 *
 * @returns {Promise<void>}
 */
$api.addRelateCarrier = async (itemId,carrierIds)=>{
    const url = `ItemTab/addRelateCarrier`;
    let postData = {
        "itemId" :  itemId,
        "carrierIds" :  carrierIds,
    };
    return await $http.post(url,postData);
};

/**
 * 获取相关项目列表
 *
 * @author panhaowen 2020-3-27
 *
 * @method get
 *
 * @param {String} itemId 项目id
 * @param {String} page 分页参数
 * @param {String} pageSize 分页参数
 *
 * @url ItemTab/getRelateItem
 *
 * @returns {Promise<void>}
 */
$api.getRelateItem = async (itemId,page,pageSize)=>{
    const url = `ItemTab/getRelateItem?itemId=${itemId}&page=${page}&pageSize=${pageSize}`;
    return await $http.get(url);
};

/**
 * 编辑相关项目
 *
 * @author panhaowen 2020-3-27
 *
 * @method post
 *
 * @param {String} itemId 项目id
 * @param {String} excuteId 关联关系id
 * @param {String} remark 相关备注
 *
 * @url ItemTab/itemRelatedEdit
 *
 * @returns {Promise<void>}
 */
$api.itemRelatedEdit = async (itemId,excuteId,remark)=>{
    const url = `ItemTab/itemRelatedEdit`;
    let postData = {
        "itemId" :  itemId,
        "excuteId" :  excuteId,
        "remark" :  remark,
    };
    return await $http.post(url,postData);
};

/**
 * 删除相关项目
 *
 * @author panhaowen 2020-3-27
 *
 * @method post
 *
 * @param {String} itemId 项目id
 * @param {String} excuteId 关联关系id
 *
 * @url ItemTab/itemRelatedDelete
 *
 * @returns {Promise<void>}
 */
$api.itemRelatedDelete = async (itemId,excuteId)=>{
    const url = `ItemTab/itemRelatedDelete`;
    let postData = {
        "itemId" :  itemId,
        "excuteId" :  excuteId,
    };
    return await $http.post(url,postData);
};


/**
 * 获取相关任务列表
 *
 * @author panhaowen 2020-3-27
 *
 * @method get
 *
 * @param {String} itemId 项目id
 * @param {String} page 分页参数
 * @param {String} pageSize 分页参数
 *
 * @url ItemTab/getRelateMission
 *
 * @returns {Promise<void>}
 */
$api.getRelateMission = async (itemId,page,pageSize)=>{
    const url = `ItemTab/getRelateMission?itemId=${itemId}&page=${page}&pageSize=${pageSize}`;
    return await $http.get(url);
};


/**
 * 删除相关任务
 *
 * @author panhaowen 2020-3-27
 *
 * @method post
 *
 * @param {String} itemId 项目id
 * @param {String} excuteId 关联关系id
 *
 * @url ItemTab/itemMissionDelete
 *
 * @returns {Promise<void>}
 */
$api.itemMissionDelete = async (itemId,excuteId)=>{
    const url = `ItemTab/itemMissionDelete`;
    let postData = {
        "itemId" :  itemId,
        "excuteId" :  excuteId,
    };
    return await $http.post(url,postData);
};


/**
 * 添加相关项目
 *
 * @author panhaowen 2020-3-30
 *
 * @method post
 *
 * @param {String} itemId 项目id
 * @param {Array} itemIds 相关项目id拼接的字符串
 *
 * @url ItemTab/addRelateItem
 *
 * @returns {Promise<void>}
 */
$api.addRelateItem = async (itemId,itemIds)=>{
    const url = `ItemTab/addRelateItem`;
    let postData = {
        "itemId" :  itemId,
        "itemIds" :  itemIds,
    };
    return await $http.post(url,postData);
};

/**
 * 添加相关任务
 *
 * @author panhaowen 2020-3-30
 *
 * @method post
 *
 * @param {String} itemId 项目id
 * @param {Array} missionIds 相关任务id拼接的字符串
 *
 * @url ItemTab/addRelateMission
 *
 * @returns {Promise<void>}
 */
$api.addRelateMission = async (itemId,missionIds)=>{
    const url = `ItemTab/addRelateMission`;
    let postData = {
        "itemId" :  itemId,
        "missionIds" :  missionIds,
    };
    return await $http.post(url,postData);
};


/**
 * 获取服务动态列表
 *
 * @author panhaowen 2020-3-30
 *
 * @method get
 *
 * @param {String} itemId 项目id
 * @param {String} page 分页参数
 * @param {String} pageSize 分页参数
 *
 * @url ItemTab/getServiceList
 *
 * @returns {Promise<void>}
 */
$api.getServiceList = async (itemId,page,pageSize)=>{
    const url = `ItemTab/getServiceList?itemId=${itemId}&page=${page}&pageSize=${pageSize}`;
    return await $http.get(url);
};


/**
 * 获取成交信息列表
 *
 * @author panhaowen 2020-3-31
 *
 * @method get
 *
 * @param {String} itemId 项目id
 *
 * @url ItemTab/getItemMot
 *
 * @returns {Promise<void>}
 */
$api.getItemMot = async (itemId)=>{
    const url = `ItemTab/getItemMot?itemId=${itemId}`;
    return await $http.get(url);
};


/**
 * 添加非我方促成
 *
 * @author panhaowen 2020-3-31
 *
 * @method post
 *
 * @param {Object} postData 表单数据
 *
 * @url ItemTab/addNotIsOurDeal
 *
 * @returns {Promise<void>}
 */
$api.addNotIsOurDeal = async (postData)=>{
    const url = `ItemTab/addNotIsOurDeal`;
    return await $http.post(url,postData);
};


export default $api;
