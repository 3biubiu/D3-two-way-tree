
import $http from '@/resource';
// import utils from '@/utils';
// import Cache from '@/cache';

const $api = {};

/**
 * 获取项目进度备选项
 * @param {String} type 项目进度大分类id
 * @param {String} cate 项目进度类型
 * @returns {Promise<*>}
 */
$api.getProgress = async (type,cate) => {
    let url = "/Item/getProgressData";
    return await $http.post(url,{type:type,cate:cate});
};
/**
 * 获取单位
 *
 * @author zyz 2020-2-28 22:00:33
 *
 * @method get
 *
 * @param {String} keyword 关键字
 * @param {String} districtFirst 一级地区
 *
 * @url Item/getOftenCompany
 *
 * @returns {Promise<void>}
 */
$api.getCompanyData = async (keyword,districtFirst)=>{
    const url = `Plugin/getCompanyList?keyword=${keyword}&district_1st=${districtFirst}`;
    return await $http.get(url);
};
$api.getOftenCompanyData = async (itemId)=>{
    const url = `Plugin/getOftenCompanyData?itemId=${itemId}`;
    return await $http.get(url);
};



/**
 * 导出文件
 *
 * @param {string} url 请求地址
 * @param {function} callback 回调操作函数
 * @param {string} name 下载文件名[带后缀]
 *
 * @date 2018-9-28 16:16:23
 *
 * @returns {Promise<any>}
 */
$api.downloadFile = (url,callback=()=>{},name="") => {
    const promise = new Promise(resolve => {
        $http.get(url, {responseType: 'blob'}).then(response => {
            callback();
            if (!response || response.size === 0) {
                utils.notice("下载失败,超时或文件不存在，请重试", 'error');
            } else {
                const url = window.URL.createObjectURL(new Blob([response]));
                const link = document.createElement('a');
                link.href = url;
                name = name === "" ? (Date.parse(new Date())+response.ext) : name;
                // link.click();
                link.setAttribute('download', name);
                // document.body.appendChild(link);
                link.click();
            }
        })
    });
    return promise;
};

/**
 * 获取载体
 *
 * @author phw 2020-3-26
 *
 * @method get
 *
 * @param {String} keyword 关键字
 * @param {String} cate 载体分类
 *
 * @url Item/getCarrierList
 *
 * @returns {Promise<void>}
 */
$api.getCarrierList = async (keyword,cate)=>{
    const url = `Plugin/getCarrierList?keyword=${keyword}&cate=${cate}`;
    return await $http.get(url);
};

/**
 * 获取项目
 *
 * @author phw 2020-3-30
 *
 * @method get
 *
 * @param {String} keyword 关键字
 * @param {String} cate 项目分类
 *
 * @url Plugin/getItemList
 *
 * @returns {Promise<void>}
 */
$api.getItemList = async (keyword,cate)=>{
    const url = `Plugin/getItemList?keyword=${keyword}&cate=${cate}`;
    return await $http.get(url);
};

/**
 * 获取任务
 *
 * @author phw 2020-3-30
 *
 * @method get
 *
 * @param {String} keyword 关键字

 *
 * @url Plugin/getMissionList
 *
 * @returns {Promise<void>}
 */
$api.getMissionList = async (keyword)=>{
    const url = `Plugin/getMissionList?keyword=${keyword}`;
    return await $http.get(url);
};

/**
 * 获取详情页页面所需权限
 *
 * @author zyz 2020-4-2 10:26:31
 *
 * @method get
 *
 * @param {String} itemId 项目id
 *
 * @url Item/getItemModuleAuth
 *
 * @return {Promise<void>}
 */
$api.getItemAuthList = async (itemId)=>{
    const url = `Item/getItemModuleAuth?itemId=${itemId}&isPublic=1`;
    return await $http.get(url);
};

/**
 * 获取用户常用语
 *
 * @author zyz 2020年4月8日16:20:42
 *
 * @methods get
 *
 * @url Common/getPhraseData
 *
 * @return {Promise<void>}
 */
$api.getPhrase = async ()=>{
    const url = `Common/getPhraseData`;
    return await $http.get(url);
};

/**
 * 保存用户常用语
 *
 * @author zyz 2020年4月8日16:20:42
 *
 * @method post
 *
 * @param {Object} postData 待传的数据
 *
 * @url Common/savePhrase
 *
 * @return {Promise<void>}
 */
$api.savePhrase =  async (postData)=>{
    const url = `Common/savePhrase`;
    return await $http.post(url,postData);
};

/**
 * 删除常用语
 *
 * @author zyz 2020-4-8 17:01:17
 *
 * @method post
 *
 * @param {String} id 短语id
 *
 * @url Common/deletePhrase
 *
 * @return {Promise<void>}
 */
$api.deletePhrase = async (id)=>{
    const url = "Common/deletePhrase";
    return await $http.post(url,{smsid:id});
};
/**
 * 删除常用语
 *
 * @author zyz 2020-4-8 17:01:17
 *
 * @method post
 *
 * @param {String} id 短语id
 *
 * @url Common/deletePhrase
 *
 * @return {Promise<void>}
 */
$api.showItemView = async (itemId)=>{
    const url = `Item/showItemView?itemId=${itemId}`;
    return await $http.get(url);
};

/**
 * 获取项目订阅部门备选项
 *
 * @author zyz 2020-5-18 15:25:24
 *
 * @method get
 *
 * @param {String} itemId 项目id
 * @param {String} cate 项目类型
 *
 * @url Item/getOrderGroup
 *
 * @return {Promise<void>}
 */
$api.getOrderGroup = async (itemId,cate)=>{
    const url = `Item/getOrderGroup?itemId=${itemId}&cate=${cate}`;
    return await $http.get(url);
};

/**
 * 获取单位列表（带常用单位数据）
 *
 * @author zyz 2020-6-4 15:55:26
 *
 * @method GET
 *
 * @param {String} keyword 搜索关键字
 * @param {String} itemId 项目id
 *
 * @url /Plugin/getOftenGroup
 *
 * @return {Promise<void>}
 */
$api.getOftenGroup = async (keyword,itemId)=>{
    const url = `Plugin/getOftenGroup?keyword=${keyword}&itemId=${itemId}`;
    return await $http.get(url);
};
/**
 * 获取At备选项人员列表
 * @return {Promise<*>}
 */
$api.getAtLists = async () => {
    // return {
    //     "code": "200",
    //     "msg": "获取成功",
    //     "data": {
    //         "defaultUser": [],
    //         "allUser": [{
    //             "name": "ddd",
    //             "realName": "ddd"
    //         }, {
    //             "name": "尼采二期吧",
    //             "realName": "尼采二期吧"
    //         }]
    //     }
    // };
    let url = "/User/getAtLists";
    return await $http.get(url);
};
/**
 * 获取联系人状态
 */
$api.getContactsStatus=async (data)=>{
    const url='Card/getContactsStatus';
    return await $http.post(url,data);
}
/**
 * 获取产业链分类
 */
$api.getAllIndustryChain = async () => {
    let url = "/Plugin/getAllIndustryChain";
    return await $http.get(url);
};
export default $api;
