import $http from '@/resource';
import utils from '@/utils';
import Cache from '@/cache';
// import item from "../../../router/item/item_detail";

const $api = {};

/**
 * 获取左上基本信息
 *
 * @author panhaowen 2020-3-16
 *
 * @method get
 *
 * @param {String} itemId 项目id
 *
 * @url ItemBaseInfo/getBaseInfo
 *
 * @returns {Promise<void>}
 */
$api.getHeaderData = async (itemId)=>{
    const url = `ItemBaseInfo/getBaseInfo?itemId=${itemId}`;
    return await $http.get(url);
};


/**
 * 快速编辑项目标题
 *
 * @author panhaowen 2020-3-17
 *
 * @method post
 *
 * @param {String} itemId 项目id
 * @param {String} title 项目标题
 *
 * @url ItemBaseInfo/editTitle
 *
 * @returns {Promise<void>}
 */
$api.editTitlePost = async (itemId,title)=>{
    const url = `ItemBaseInfo/editTitle`;
    let postData = {
        "itemId" :   itemId,
        "title" :   title,
    };
    return await $http.post(url,postData);
};


/**
 * 修改项目关注状态
 *
 * @author panhaowen 2020-4-3
 *
 * @method post
 *
 * @param {String} itemId 项目id
 * @param {Number} isFocus 项目关注状态
 *
 * @url ItemBaseInfo/itemFocus
 *
 * @returns {Promise<void>}
 */
$api.itemFocus = async (itemId,isFocus)=>{
    const url = `ItemBaseInfo/itemFocus`;
    let postData = {
        "itemId"  :   itemId,
        "isFocus" :   isFocus,
    };
    return await $http.post(url,postData);
};

/**
 * 判断项目是否可以提交成交审批跳转
 *
 * @author panhaowen 2020-4-3
 *
 * @method post
 *
 * @param {String} itemId 项目id
 * @param {String} cate 项目类型
 *
 * @url ItemBaseInfo/isCanDeal
 *
 * @returns {Promise<void>}
 */
$api.isCanDeal = async (itemId,cate)=>{
    const url = `ItemBaseInfo/isCanDeal`;
    let postData = {
        "itemId"  :   itemId,
        "cate" :   cate,
    };
    return await $http.post(url,postData);
};


/**
 * 获取项目标签备选项
 *
 * @author panhaowen 2020-3-16
 *
 * @method get
 *
 * @param {String} itemId 项目id
 * @param {String} keywords 搜索字段
 *
 * @url ItemBaseInfo/getAllTags
 *
 * @returns {Promise<void>}
 */
$api.getAllTags = async (itemId,keywords)=>{
    const url = `ItemBaseInfo/getAllTags?itemId=${itemId}&keywords=${keywords}`;
    return await $http.get(url);
};

/**
 * 搜索标签
 *
 * @author yuechenxing 20210520
 *
 * @method get
 *
 * @param {String} itemId 项目id
 * @param {String} keywords 搜索字段
 *
 * @url ItemBaseInfo/tagLibrarySearch
 *
 * @returns {Promise<void>}
 */
$api.tagLibrarySearch = async (itemId,keywords) => {
    const url = `plugin/tagsSearch?keyword=` + keywords;
    // let postData = {
    //     keyword: keywords
    // }
    return await $http.get(url);
};

/**
 * 获取项目标签备选项
 *
 * @author panhaowen 2020-3-16
 *
 * @method get
 *
 * @param {String} itemId 项目id
 * @param {String} keywords 搜索字段
 *
 * @url ItemBaseInfo/getAllTags
 *
 * @returns {Promise<void>}
 */
 $api.itemTags = async (itemId, type)=>{
    const url = `ItemBaseInfo/tags?itemId=${itemId}&type=${type}`;
    return await $http.get(url);
};

/**
 * 获取项目标签
 *
 * @author panhaowen 2020-3-17
 *
 * @method get
 *
 * @param {String} itemId 项目id
 *
 * @url ItemBaseInfo/getItemTags
 *
 * @returns {Promise<void>}
 */
$api.getItemTags = async (itemId)=>{
    const url = `ItemBaseInfo/getItemTags?itemId=${itemId}`;
    return await $http.get(url);
};


/**
 * 保存项目标签
 *
 * @author panhaowen 2020-3-17
 *
 * @method post
 *
 * @param {String} itemId 项目id
 * @param {Array} tagsId 标签id
 *
 * @url ItemBaseInfo/saveTags
 *
 * @returns {Promise<void>}
 */
$api.saveTags = async (itemId,tagsId)=>{
    const url = `ItemBaseInfo/saveTags`;
    let postData = {
        "itemId" :   itemId,
        "tagsId" :   tagsId,
    };
    return await $http.post(url,postData);
};

/**
 * 搜索合并项目
 *
 * @author panhaowen 2020-3-18
 *
 * @method post
 *
 * @param {String} itemId 项目id
 * @param {String} keywords 搜索字段
 *
 * @url ItemBaseInfo/searchItem
 *
 * @returns {Promise<void>}
 */
$api.searchItem = async (itemId,keywords)=>{
    const url = `ItemBaseInfo/searchItem`;
    let postData = {
        "itemId" :   itemId,
        "keywords" :   keywords,
    };
    return await $http.post(url,postData);
};

/**
 * 合并项目提交
 *
 * @author panhaowen 2020-3-18
 *
 * @method post
 *
 * @param {String} itemId 项目id
 * @param {String} targetId 合并项目id
 *
 * @url ItemBaseInfo/mergeItem
 *
 * @returns {Promise<void>}
 */
$api.mergeItem = async (itemId,targetId)=>{
    const url = `ItemBaseInfo/mergeItem`;
    let postData = {
        "itemId" :  itemId,
        "targetId" :  targetId,
    };
    return await $http.post(url,postData);
};

/**
 * 提取项目
 *
 * @author liudongfang 2021-1-13
 *
 * @method post
 *
 * @param {String} itemid 项目id
 *
 * @url UserCard/pickItemMerge
 *
 * @returns {Promise<void>}
 */
$api.pickItemMerge = async (itemId)=>{
    const url = `UserCard/pickItemMerge`;
    let postData = {
        "itemid" :  itemId,
    };
    return await $http.post(url,postData);
};

/**
 * 获取回看列表
 *
 * @author panhaowen 2020-3-18
 *
 * @method get
 *
 * @param {String} itemId 项目id
 *
 * @url ItemBaseInfo/getLookBackList
 *
 * @returns {Promise<void>}
 */
$api.getLookBackList = async (itemId)=>{
    const url = `ItemBaseInfo/getLookBackList?itemId=${itemId}`;
    return await $http.get(url);
};


/**
 * 添加项目回看
 *
 * @author panhaowen 2020-3-18
 *
 * @method post
 *
 * @param {String} itemId 项目id
 * @param {Array} nextData 回看数据
 * @param {Array} isUnlink 是否消除待处理
 *
 * @url ItemBaseInfo/addLookBack
 *
 * @returns {Promise<void>}
 */
$api.addLookBack = async (itemId,nextData,isUnlink)=>{
    const url = `ItemBaseInfo/addLookBack`;
    let postData = {
        "itemId" :  itemId,
        "nextData" : nextData,
        "isUnlink" : isUnlink,
    };
    return await $http.post(url,postData);
};


/**
 * 删除项目回看
 *
 * @author panhaowen 2020-3-19
 *
 * @method post
 *
 * @param {String} id 回看记录id
 *
 * @url ItemBaseInfo/delLookBack
 *
 * @returns {Promise<void>}
 */
$api.delLookBack = async (id)=>{
    const url = `ItemBaseInfo/delLookBack`;
    let postData = {
        "lookBackId" :  id,
    };
    return await $http.post(url,postData);
};


/**
 * 项目推送
 *
 * @author panhaowen 2020-3-19
 *
 * @method post
 *
 * @param {Array} data 推送人员数组
 * @param {String} itemId 项目id
 * @param {Array} sendmsgArr 推送相关参数
 *
 *
 * @url ItemBaseInfo/itemPush
 *
 * @returns {Promise<void>}
 */
$api.itemPush = async (data,sendmsgArr,itemId)=>{
    const url = `ItemBaseInfo/itemPush`;
    let postData = {
        "users" :  data,
        "itemId" :  itemId,
        "sendmsgArr" :  sendmsgArr
    };
    return await $http.post(url,postData);
};



/**
 * 项目移动
 *
 * @author panhaowen 2020-3-19
 *
 * @method post
 *
 * @param {String} cate   项目移动类型
 * @param {String} itemId 项目id
 *
 *
 * @url ItemBaseInfo/moveItem
 *
 * @returns {Promise<void>}
 */
$api.moveItem = async (itemId,cate,districtArr,newCate)=>{
    const url = `ItemBaseInfo/moveItem`;
    let postData = {
        "cate" :  cate,
        "itemId" :  itemId,
        "districtArr":districtArr,
        "newCate":newCate,
    };
    return await $http.post(url,postData);
};

/**
 * 项目温度修改
 *
 * @author panhaowen 2020-3-20
 *
 * @method post
 *
 * @param {String} threshold_low   阈值下限
 * @param {String} threshold_high  阈值上限
 * @param {String} itemId 项目id
 *
 *
 * @url ItemBaseInfo/upThreshold
 *
 * @returns {Promise<void>}
 */
$api.upThreshold = async (itemId,threshold_low,threshold_high)=>{
    const url = `ItemBaseInfo/upThreshold`;
    let postData = {
        "threshold_low" :  threshold_low,
        "threshold_high" :  threshold_high,
        "itemId" :  itemId,
    };
    return await $http.post(url,postData);
};

/**
 * 项目独占发起
 *
 * @author panhaowen 2020-3-20
 *
 * @method post
 *
 * @param {String} reason  独占原因
 * @param {String} itemId  独占项目id
 *
 *
 * @url ItemBaseInfo/itemOwn
 *
 * @returns {Promise<void>}
 */
$api.itemOwn = async (itemId,reason,type)=>{
    const url = `ItemBaseInfo/itemOwn`;
    let postData = {
        "reason" :  reason,
        "itemId" :  itemId,
        "type" :  type,
    };
    return await $http.post(url,postData);
};

export default $api;
