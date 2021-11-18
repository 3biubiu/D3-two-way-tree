
import $http from '@/resource';

const $api = {};

/**
 * 保存并创建
 * @param formData 提交数据
 * @return {Promise<*>}
 */
$api.saveAndCreate = async (formData) => {
    let url = "/ItemAdd/addItem";
    if(formData.info.id != '') {
        url = `/ItemAdd/editItem`;
    }
    return await $http.post(url, formData);

};

/**
 * 检测是否有权限和审批按钮
 * @param itemId 项目id
 * @return {Promise<*>}
 */
$api.checkAuthAndApprove = async (itemId) => {
    let url = "/ItemAdd/itemBase";
    return await $http.post(url,{itemId:itemId});
};

/**
 * 获取项目信息
 * @param itemId 项目id
 * @return {Promise<*>}
 */
$api.getItemInfo = async (itemId) => {
    let url = "/ItemAdd/itemInfo";
    return await $http.get(url, {params: {itemId: itemId}});
};
/**
 * 获取名片信息
 * @param itemId 项目id
 * @return {Promise<*>}
 */
$api.getCardInfo = async (itemId) => {
    let url = "/ItemAdd/cardLists";
    return await $http.get(url, {params: {itemId: itemId}});
};
/**
 * 获取企业信息
 * @param itemId 项目id
 * @return {Promise<*>}
 */
$api.getCompanyInfo = async (itemId) => {
    let url = "/ItemAdd/companyInfo";
    return await $http.get(url,{params:{itemId:itemId}});
};
/**
 * 获取来源信息
 * @param itemId 项目id
 * @return {Promise<*>}
 */
$api.getInformationInfo = async (itemId) => {
    let url = "/itemAdd/sourceLists";
    return await $http.post(url,{itemId:itemId});
};
/**
 * 获取其他信息
 * @param itemId 项目id
 * @return {Promise<*>}
 */
$api.getOtherInfo = async (itemId) => {
    let url = "/itemAdd/other";
    return await $http.get(url, {params: {itemId:itemId}});
};
/**
 * 获取附件信息
 * @param itemId 项目id
 * @param itemCate 项目分类  1：土地，2：厂房，3：商业，4：写字楼，5：注册，6：客户，7：仓库，10：其他
 * @param  type 1 项目 2 载体 3 单位
 * @return {Promise<*>}
 */
$api.getResourceInfo = async (itemId,itemCate,type) => {
    let url = "/itemAdd/resources";
    return await $http.get(url,{params:{itemId:itemId,cate:itemCate,type:type}});
};

/**
 * 项目标题验重
 * @param title 项目标题
 * @return {Promise<*>}
 */
$api.checkTitleRepeat = async (title, itemId) => {
    let url = "/ItemAdd/checkTitleRepeat";
    return await $http.post(url,{param: title, itemId: itemId});
};

/**
 * 获取企业行业
 */
$api.getCompanyIndustryData = async (itemCate) => {
    let url = "/Plugin/companyIndustryLists";
    return await $http.post(url, {cate: itemCate});
};

/**
 * 获取产业分类
 */
$api.getIndustryData = async (searchData=undefined) => {
    let url = "Plugin/getAllIndustry";
    if(searchData){
        url += `?status=${searchData.status}`;
    }
    return await $http.get(url);
};
/**
 * 获取行业分类
 */
$api.getProfessionData = async (searchData=undefined) => {
    let url = "Plugin/getAllProfession";
    if(searchData){
        url += `?status=${searchData.status}`;
    }
    return await $http.get(url);
};
/**
 * 获取行业分类4级结构
 */
$api.getAllProfessionOptions = async () => {
    let url = "Plugin/getAllProfessionOptions";
    return await $http.get(url);
};
/**
 * 获取行业分类4级结构
 */
$api.getAllProfessionChildren = async () => {
    let url = "Plugin/getAllProfessionChildren";
    return await $http.get(url);
};
/**
 * 获取战略性新兴行业分类4级结构
 */
$api.getAllStrategicProfession = async () => {
    let url = "Plugin/getAllStrategicProfession";
    return await $http.get(url);
};
/**
 * 获取经营行业
 */
$api.getAllTrade = async () => {
    let url = "/Plugin/getAllTrade";
    return await $http.get(url);
};

/**
 * 获取产业分类
 */
$api.getProductCateData = async () => {
    let url = "/Plugin/getProductCategory";
    return await $http.get(url);
};

/**
 * 获取产业链分类
 */
 $api.getAllIndustryChain = async () => {
    let url = "/Plugin/getAllIndustryChain";
    return await $http.get(url);
};
/**
 * 获取产业链菜单
 */
 $api.getIndustryMenuData = async () => {
    let url = "/Plugin/getIndustryMenuData";
    return await $http.get(url);
};
/**
 * 检索产业分类
 */
$api.searchProductCate = async (proname) => {
    let url = "/Plugin/searchProduct";
    return await $http.get(url, {params: {
        proname: proname
    }});
}

/**
 * 计算项目质量
 * 项目标题验重
 * @param {String} title 项目标题
 * @return {Promise<*>}
 */
$api.countItemQuality = async (data) => {
    let url = "/ItemAdd/countItemQuality";
    return await $http.post(url, data);
}

/**
 * 获取信息来源数据源
 * @return {Promise<*>}
 */
$api.getMessageSourceData = async () => {
    let url = "/Plugin/getMessageSourceData";
    return await $http.get(url);
};

/**
 * 根据链接搜索来源
 * @return {Promise<*>}
 */
$api.searchMessageSource = async (searchUrl) => {
    let url = "/Plugin/searchMessageSource";
    return await $http.post(url, {url: searchUrl});
};

/**
 * 获取
 * @return {Promise<*>}
 */
$api.getRelationChannelArr = async(formData={}) => {
    const url = `/Plugin/getRelateCannel`;
    return await $http.post(url,formData);
};

/**
 * 获取全部渠道信息
 * @return {Promise<*>}
 */
$api.getAllChannelArr = async () => {
    let url = "/Plugin/getAllSourceChannel";
    return await $http.get(url);
};


/**
 * 获取来源信息
 * @return {Promise<*>}
 */
$api.getSavedSource = async (itemId) => {
    let url = "/itemAdd/getSavedSource";
    return await $http.get(url, {params: {itemId: itemId}});
};

/**
 * 验证项目是否重复
 * @param {Object} formData 请求数据
 */
$api.checkItem = async (formData) => {
    let url = `/ItemAdd/checkRepeat`;
    return await $http.post(url, formData);
}

/**
 * 获取企服需求
 */
$api.getCompanyService = async () => {
    let url = `/Plugin/comServer`;
    return await $http.get(url);
}

/**
 * 根据意向单位获取模块负责人
 * @param {Object} formData
 */
$api.getForItemAdmin = async (formData) => {
    let url = `/ItemAdd/getForItemAdmin`;
    return await $http.post(url, formData);
}

/**
 * 根据产业获取产业赋税
 * @param {array} industryArr 产业id
 * @return {int}
 */
$api.getAveTax = async (industryArr) => {
    let url = "/ItemAdd/getAveTax";
    return await $http.post(url, {
        industryArr: industryArr
    });
}

/**
 * 根据联系人详情跳转后获取单张名片信息
 * @param cardId 名片id
 * @param uid 当前操作用户uid
 * @return {Promise<*>}
 */
$api.getOneCardInfo = async (cardId,uid) => {
    let url = "/ItemAdd/getOneCardInfo";
    return await $http.get(url, {params: {cardId: cardId, uid:uid}});
}

export default $api;
