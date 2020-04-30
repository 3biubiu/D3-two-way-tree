import $http from '@/resource';
import utils from '@/utils';
import Cache from '@/cache';

const $api = {};

/**
 * 附件相机列表
 *
 * @author wangjiannan & 2018-12-27 8:54:51
 *
 * @method POST
 *
 * @url : /Plugin/getCameraList
 */
$api.cameraAttachment = function(formData) {
	const url = '/Plugin/getCameraList';
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
 * @author wangjiannan & 2018-12-27 8:54:51
 *
 * @method POST
 *
 * @url : /Plugin/deletePic
 */
$api.deletePic = function(formData) {
	const url = '/Plugin/deletePic';
	const promise = new Promise(function(resolve){
        $http.post(url,formData).then(response=>{
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
 * @author wangjiannan & 2018-12-27 8:54:51
 *
 * @method POST
 *
 * @url : /Plugin/getPicInfuByIds
 */
$api.getPicInfuByIds = function(formData) {
	const url = '/Plugin/getPicInfuByIds';
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
 * @author wangjiannan & 2018-12-27 8:54:51
 *
 * @method GET
 *
 * @url :/Plugin/getLevelList
 */
$api.getLevelList = function(formData) {
	const url = '/Plugin/getLevelList';
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
 * @author wangjiannan & 2018-12-28 8:54:51
 *
 * @method GET
 *
 * @url :/Plugin/transferModelUser
 */
$api.plugInGroupUser = function(formData) {
    const url = '/Plugin/transferModelUser';
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
 * @author panhaowen & 2020-4-20
 *
 * @method GET
 *
 * @url :/Plugin/transferModelUserForPush
 */
$api.transferModelUserForPush = function(formData) {
    const url = '/Plugin/transferModelUserForPush';
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
 * @author liujuan & 2019-1-3 10:16:28
 *
 * @method POST
 *
 * @url : /Plugin/deletePic
 */
$api.delUpload = async (data) => {
    const url = '/Plugin/deletePic';
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
 * @author wangjiannan & 2018-12-28 8:54:51
 *
 * @method GET
 *
 * @url :/Plugin/plugInGroupUser
 */
$api.groupUser = function() {
    const url = '/Plugin/plugInGroupUser';
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
    const url = `/DealPlugin/investmentDemands`;
    return await $http.get(url,{params:{type:type}});
};
/**
 * 获取省市区的数据
 *
 * @author qinna 2020-3-13 10:59:34
 *
 * @method GET
 *
 *
 * @url Plugin/getArea
 *
 * @return {Promise<any>}
 */
$api.getArea = async ()=>{
    const url = `/Plugin/getArea`;
    return await $http.get(url);
};
/**
 * 获取世界所有公司名称 对接搜索引擎
 *
 * @author qinna 2020-3-13 10:59:34
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
    const url = `/Plugin/getAllCompany`;
    return await $http.post(url,{'word':word,'pageSize':pageSize});
};
/**
 * 获取产业分类列表 选项框
 *
 * @author qinna 2019.11.16
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
    let url = "Plugin/getAllIndustry";
    if(searchData){
        url += `?status=${searchData.status}`;
    }
    return await $http.get(url);
};
/**
 * 获取经营行业列表 选项框
 *
 * @author qinna 2019.11.16
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
    let url = "Plugin/getAllTrade";
    return await $http.get(url);
};

/**
 * 获取单位成员
 *
 * @author qinna 2020-3-13 10:59:34
 *
 * @method GET
 *
 * @url Plugin/searchUserwithName
 *
 * @return {Promise<any>}
 */
$api.searchUserwithName = async (keyword)=>{
    const url = `/Plugin/searchUserwithName`;
    return await $http.post(url,{'keyword':keyword});
};

/**
 * 获取对接人
 *
 * @author qinna 2020-3-13 10:59:34
 *
 * @method GET
 *
 * @url Plugin/getRelateBrokerCard
 *
 * @return {Promise<any>}
 */
$api.getRelateBrokerCard = async (keyword,excuteId)=>{
    const url = `/Plugin/getRelateBrokerCard`;
    return await $http.post(url,{'keyword':keyword,'excuteId':excuteId});
};


/**
 * 获取最近联系人||常用联系人
 *
 * @author panhaowen 2020-4-17
 *
 * @method GET
 *
 * @url Plugin/getRecentContactUsers
 *
 * @return {Promise<any>}
 */
$api.getRecentContactUsers = async (groupSelect)=>{
    const url = `/Plugin/getRecentContactUsers?groupSelect=${groupSelect}`;
    return await $http.get(url);
};


