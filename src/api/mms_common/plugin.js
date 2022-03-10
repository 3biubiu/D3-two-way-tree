import $http from '@/resource';
import utils from '@/utils';
import Cache from '@/cache';

const $api = {};

/**
 * 附件相机列表
 *
 * @method POST
 *
 * @url : /Plugin/getCameraList
 */
$api.cameraAttachment = function(formData) {
	const url = '/Plugin/getCameraList?testUid=920928';
	const promise = new Promise(function(resolve){
        $http.post(url,formData).then(response=>{
            if (response.code === 200) {
                resolve(response.data);
            } else {
                utils.notice(response.msg, 'error');
            }
        })
	});
  	return promise;
};

/**
 * 上传文件删除
 *
 * @method POST
 *
 * @url : /Plugin/deletePic
 */
//  
// $api.deletePic = function(formData) {
// 	const url = '/Plugin/deletePic?testUid=920928';
// 	const promise = new Promise(function(resolve){
//         $http.post(url,formData).then(response=>{
//             console.log(response);
//             if (response.code === 200) {
//                 resolve(response.data);
//             } else {
//                 utils.notice(response.error, 'error');
//             }
//         })
// 	});
//   	return promise;
// };
$api.deletePic = function(formData) {
	const url = '/spa.php/Plugin/deletePic?testUid=920928';
	const promise = new Promise(function(resolve){
        $http.post(url,formData).then(response=>{
            console.log(response);
            if (response.code === 200) {
                resolve(response.data);
            } else {
                utils.notice(response.error, 'error');
            }
        })
	});
  	return promise;
};

/**
 * 附件相机上传
 *
 * @method POST
 *
 * @url : /Plugin/getPicInfuByIds
 */
$api.getPicInfuByIds = function(formData) {
	const url = '/Plugin/getPicInfuByIds?testUid=920928';
	const promise = new Promise(function(resolve){
        $http.post(url,formData).then(response=>{
            if (response.code === 200) {
                resolve(response.list);
            } else {
                utils.notice(response.msg, 'error');
            }
        })
	});
  	return promise;
};

/**
 * 等级下拉
 *
 * @method GET
 *
 * @url :/Plugin/getLevelList
 */
$api.getLevelList = function(formData) {
	const url = '/Plugin/getLevelList?testUid=920928';
	const promise = new Promise(function(resolve){
        $http.get(url,{params:formData}).then(response=>{
            resolve(response);
        })
	});
  	return promise;
};

/**
 * 获取部门及部门下人员
 *
 * @method GET
 *
 * @url :/Plugin/transferModelUser
 */
$api.plugInGroupUser = function(formData) {
    const url = '/Plugin/transferModelUser?testUid=920928';
	const promise = new Promise(function(resolve){
        $http.get(url,{params:formData}).then(response=>{
            resolve(response);
        })
    });
  	return promise;
};

/**
 * 获取推送弹窗部门及部门下人员
 *
 * @method GET
 *
 * @url :/Plugin/transferModelUserForPush
 */
$api.transferModelUserForPush = function(formData) {
    const url = '/Plugin/transferModelUserForPush?testUid=920928';
    const promise = new Promise(function(resolve){
        $http.get(url,{params:formData}).then(response=>{
            resolve(response);
        })
    });
    return promise;
};
export default $api;

/**
 * 上传文件删除
 *
 * @method POST
 *
 * @url : /Plugin/deletePic
 */
$api.delUpload = async (data) => {
    const url = '/Plugin/deletePic?testUid=920928';
    let res = await $http.post(url,data);
    if (res.code === 200) {
        return res;
    } else {
        utils.notice(res.msg,'error')
    }
};

/**
 * 获取部门及部门下人员
 *
 * @method GET
 *
 * @url :/Plugin/plugInGroupUser
 */
$api.groupUser = function() {
    const url = '/Plugin/plugInGroupUser?testUid=920928';
    const promise = new Promise(function(resolve){
        $http.get(url).then(response=>{
            resolve(response);
        })
    });
    return promise;
};

/**
 * 获取招商需求备选项
 *
 * @author zyz 2020-1-9 10:59:34
 *
 * @method GET
 *
 * @param {Number} type 类型1-只获取启用的，2-获取全部的
 *
 * @url DealPlugin/investmentDemands
 *
 * @return {Promise<any>}
 */
$api.getInvestmentDemands = async (type=1)=>{
    const url = `/DealPlugin/investmentDemands?testUid=920928`;
    return await $http.get(url,{params:{type:type}});
};
/**
 * 获取省市区的数据
 *
 * @method GET
 *
 *
 * @url Plugin/getArea
 *
 * @return {Promise<any>}
 */
$api.getArea = async ()=>{
    const url = `/Plugin/getArea?testUid=920928`;
    return await $http.get(url);
};
/**
 * 获取世界所有公司名称 对接搜索引擎
 *
 * @method GET
 *
 * @param {String} word 关键字
 * @param {Number} pageSize 单页条数
 *
 * @url Plugin/getArea
 *
 * @return {Promise<any>}
 */
$api.getAllCompany = async (word,pageSize=10)=>{
    const url = `/Plugin/getAllCompany?testUid=920928`;
    return await $http.post(url,{'word':word,'pageSize':pageSize});
};
/**
 * 获取产业分类列表 选项框
 *
 * @method GET
 *
 * @param searchData 查询条件
 *
 * @returns {Promise<*>}
 *
 * @url Plugin/getList
 */
$api.getAllIndustry = async (searchData=undefined) => {
    let url = "Plugin/getAllIndustry?testUid=920928";
    if(searchData){
        url += `?status=${searchData.status}`;
    }
    return await $http.get(url);
};
/**
 * 获取经营行业列表 选项框
 *
 * @method GET
 *
 * @param searchData 查询条件
 *
 * @returns {Promise<*>}
 *
 * @url Plugin/getList
 */
$api.getAllTrade = async (searchData=undefined) => {
    let url = "Plugin/getAllTrade?testUid=920928";
    return await $http.get(url);
};

/**
 * 获取单位成员
 *
 * @method GET
 *
 * @url Plugin/searchUserwithName
 *
 * @return {Promise<any>}
 */
$api.searchUserwithName = async (keyword)=>{
    const url = `/Plugin/searchUserwithName?testUid=920928`;
    return await $http.post(url,{'keyword':keyword});
};

/**
 * 获取对接人
 *
 * @method GET
 *
 * @url Plugin/getRelateBrokerCard
 *
 * @return {Promise<any>}
 */
$api.getRelateBrokerCard = async (keyword,excuteId)=>{
    const url = `/Plugin/getRelateBrokerCard?testUid=920928`;
    return await $http.post(url,{'keyword':keyword,'excuteId':excuteId});
};


/**
 * 获取最近联系人||常用联系人
 *
 * @method GET
 *
 * @url Plugin/getRecentContactUsers
 *
 * @return {Promise<any>}
 */
$api.getRecentContactUsers = async (groupSelect)=>{
    const url = `/Plugin/getRecentContactUsers?groupSelect=${groupSelect}?testUid=920928`;
    return await $http.get(url);
};


