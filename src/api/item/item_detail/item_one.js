
import $http from '@/resource';
import utils from '@/utils';
// import Cache from '@/cache';
// import item from "../../../router/item/item_detail";

const $api = {};

/**
 * 获取mot数据
 *
 * @author zyz 2020-2-26 10:54:21
 *
 * @method post
 *
 * @param {String} itemId 项目id
 *
 * @url Item/motData
 *
 * @returns {Promise<void>}
 */
$api.getMotData = async (itemId)=>{
    const url = `Item/motData?itemId=${itemId}`;
    return await $http.get(url);
};
/**
 * 获取项目基本信息
 *
 * @author qinna 2020-2-26 10:54:21
 *
 * @method post
 *
 * @param {String} itemId 项目id
 *
 * @url Item/getItemBasicInfo
 *
 * @returns {Promise<void>}
 */
$api.getItemBasicInfo = async (itemId)=>{
    const url = `Item/getItemBasicInfo?itemId=${itemId}`;
    return await $http.get(url);
};
/**
 * 获取项目权限列表
 *
 * @author qinna 2020-2-26 10:54:21
 *
 * @method post
 *
 * @param {String} itemId 项目id
 *
 * @url Item/getItemBasicInfo
 *
 * @returns {Promise<void>}
 */
$api.getItemAuthUserList = async (itemId)=>{
    const url = `Item/getItemAuthUserList?itemId=${itemId}`;
    return await $http.get(url);
};

/**
 * 手动添加mot节点激活人
 *
 * @author zyz 2020-2-26 16:15:49
 *
 * @method post
 *
 * @param {Object} data 激活节点数据
 *
 * @url Item/addMotActive
 *
 * @returns {Promise<void>}
 */
$api.addMotActivate = async (data)=>{
    const url = `Item/addMotActive`;
    return await $http.post(url,data);
};
/**
 * 删除mot节点激活人
 *
 * @author zyz 2020-2-26 16:15:49
 *
 * @method post
 *
 * @param {string} id 删除数据id
 *
 * @url Item/deleteMotActive
 *
 * @returns {Promise<void>}
 */
$api.deleteMotActivate = async (id)=>{
    const url = `Item/deleteMotActive`;
    return await $http.post(url,{id:id});
};

/**
 * 获取单位身份备选项
 *
 * @author zyz 2020-2-26 22:42:19
 *
 * @method get
 *
 * @param {String} keyword 关键字
 *
 * @url Item/getMotRelateCompany
 *
 * @returns {Promise<void>}
 */
$api.getCompanyIdentity = async (keyword=``)=>{
    const url = `Item/getMotRelateCompany?keyword=${keyword}`;
    return await $http.get(url);
};
/**
 * 获取载体身份备选项
 *
 * @author zyz 2020-2-26 22:42:19
 *
 * @method get
 *
 * @param {String} keyword 关键字
 *
 * @url Item/getMotRelateCompany
 *
 * @returns {Promise<void>}
 */
$api.getCarrierIdentity = async (keyword=``)=>{
    const url = `Item/getMotRelateCarrier?keyword=${keyword}`;
    return await $http.get(url);
};
/**
 * 获取项目常用单位
 *
 * @author zyz 2020-2-28 14:08:50
 *
 * @method get
 *
 * @url Item/getOftenCompany
 *
 * @returns {Promise<void>}
 */
$api.getOftenCompany = async ()=>{
    const url = `Item/getOftenCompany`;
    return await $http.get(url);
};
/**
 * 添加mot
 *
 * @author zyz 2020-2-28 19:35:08
 *
 * @method post
 *
 * @param {Object} data 待添加的数据
 *
 * @url Item/addMot
 *
 * @returns {Promise<void>}
 */
$api.addMot = async (data)=>{
    const url = `Item/addMot`;
    return await $http.post(url,data);
};
/**
 * 获取mot方案
 *
 * @author zyz 2020-2-28 19:35:08
 *
 * @method get
 *
 * @url Item/getMotOptions
 *
 * @returns {Promise<void>}
 */
$api.getMotScheme = async ()=>{
    const url = `Item/getMotOptions`;
    return await $http.get(url);
};
/**
 * 保存常用单位
 *
 * @author zyz 2020-2-28 19:35:08
 *
 * @method post
 *
 * @url Item/addOftenUseCompany
 *
 * @returns {Promise<void>}
 */
$api.saveOftenCompany = async(ids)=>{
    const url = `Item/addOftenUseCompany`;
    return await $http.post(url,{companyIds:ids});
};
/**
 * 激活mot节点前进行相关验证
 *
 * @author zyz 2020年3月3日11:16:15
 *
 * @method post
 *
 * @param {String} motId mot的id
 * @param {String} nodeId 节点id
 * @param {String} progress 进度id
 *
 * @url Item/checkActivationConditions
 *
 * @returns {Promise<void>}
 */
$api.checkActivationStatus = async (motId, nodeId="", progress="") => {
    const url = `Item/checkActivationConditions`;
    let postData = {
        "nodeId": nodeId ? nodeId:'',
        "itemMotId": motId,
        "progress": progress ? progress:''
    };
    return await $http.post(url,postData);
};
/**
 * 获取来源信息
 *
 * @author qinna 2020-3-2 10:54:21
 *
 * @method post
 *
 * @url /Plugin/getMessageSourceData
 *
 * @returns {Promise<void>}
 */
$api.getSourceData = async ()=>{
    const url = '/Plugin/getMessageSourceData';
    return await $http.post(url);
};




/**
 * 获取来源信息
 *
 * @author dongran 2020-3-2 10:54:21
 *
 * @method post
 *
 * @url /Plugin/getRelateCannel
 *
 * @returns {Promise<void>}
 */
$api.getRelationChannelArr = async(postData={}) => {
    const url = `/Plugin/getRelateCannel`;
    return await $http.post(url,postData);
};

/**
 * 获取全部渠道信息
 * @return {Promise<*>}
 */
$api.getAllChannelArr = async () => {
    let url = "/Plugin/getAllSourceChannel";
    return await $http.get(url);
};
// $api.getSourceData = async ()=>{
//     const url = '/Plugin/getMessageSourceData';
//     return await $http.post(url);
// };
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
    const url = `Item/getCloudList?itemId=${postData.itemId}`;
    return await $http.get(url,postData);
};
/**
 * 获取名片数据
 *
 * @author liluyao 2020-3-9 14:40:15
 *
 * @method get
 *
 * @param {String} itemId 项目id
 *
 * @url /userCard/getCardList/{itemId}
 *
 * @returns {Promise<void>}
 */

$api.getCardData = async(itemId) => {
    const url = `/UserCard/getCardList?itemId=${itemId}`;
    let res = await $http.get(url);
    return res;
};
/**
 * 需求分类
 *
 * @author qinna 2020-3-11 10:54:21
 *
 * @method post
 *
 * @param {Object}formData
 *
 * @url Item/updateItemCate
 *
 * @returns {Promise<void>}
 */
$api.updateItemCate = async (formData)=>{
    const url = `Item/updateItemCate`;
    return await $http.post(url,formData);
};
/**
 * 快速编辑
 *
 * @author qinna 2020-3-11 10:54:21
 *
 * @method post
 *
 * @param {String} itemId 项目id
 *
 * @url Item/getItemBasicInfo
 *
 * @returns {Promise<void>}
 */
$api.quickEdit = async (formData)=>{
    const url = `Item/quickEdit`;
    return await $http.post(url,formData);
};
/**
 * 获取搜索用户
 * @method GET
 * @param {Object} formData 搜索对象
 * @author liluyao & 2020-3-12 18:33:26
 * @url /search-users
 * @return {Object} Promise
 */
$api.getSearchUser = async (formData = {}) => {
    let params = {};
    if(Object.keys(formData).length > 0) {
        params = formData;
    }
    const url = "/Item/getOftenCompany";
    let response = await $http.get(url, {params: params});
    if (response.code == '200') {
        return response;
    } else {
        utils.notice(response.msg, 'error');
    }
}
/**
 * 项目提取、手机地址----通过手机号获取项目里面有没有相应的数据
 * @method POST
 * @param {Object} formData
 * @author liujuan & 2020-3-31 17:18:21
 * @url userCard/pickUp
 * @return {Object} Promise
 */
$api.pickItem = async (formData) => {
    const url = `UserCard/pickUp`;
    let response = await $http.post(url,formData);
    if (response.code == '200') {
        return response;
    } else {
        utils.notice(response.msg, 'error');
    }
}
/**
 * 项目提取--查看
 * @method POST
 * @param {Object} formData
 * @author liujuan & 2020-3-31 17:18:21
 * @url userCard/pickRight
 * @return {Object} Promise
 */
$api.pickItemRes = async (formData) => {
    const url = `UserCard/pickRight`;
    let response = await $http.post(url,formData);
    if (response.code == '200') {
        return response;
    } else {
        utils.notice(response.msg, 'error');
    }
}
/**
 * 名片推送
 * @method POST
 * @param {Object} formData
 * @author liujuan & 2020-3-31 17:18:21
 * @url /userCard/pushCard
 * @return {Object} Promise
 */
$api.PushCardMen = async (formData) => {
    const url = `/UserCard/pushCard`;
    let response = await $http.post(url,formData);
    if (response.code == '200') {
        utils.notice("推送成功","success");
        return response;
    } else {
        utils.notice(response.msg, 'error');
    }
}
/**
 * 获取at的人备选项
 * @method GET
 * @param {String} item_id 项目id
 * @param {String} type 项目1 联系人6
 * @author liujuan & 2020-3-16 09:59:32
 * @url /Item/getAtList
 * @return {Object} Promise
 */
$api.getAtList = async (item_id,type=1) => {
    const url = `/Item/getAtList?itemId=${item_id}&type=${type}`;
    let response = await $http.get(url);
    if (response.code == '200') {
        return response;
    } else {
        utils.notice(response.msg, 'error');
    }
}
/**
 * 获取单位备选项【通用】
 * @method GET
 * @param {Object} data 搜索对象
 * @author liujuan & 2020-3-16 09:59:32
 * @url /Plugin/getCompanyList
 * @return {Object} Promise
 */
$api.getCompanyList = async (data) => {
    const url = `/Plugin/getCompanyList`;
    let response = await $http.get(url, {params: data});
    if (response.code == '200') {
        return response;
    } else {
        utils.notice(response.msg, 'error');
    }
}
/**
 * 获取带层级部门备选项【通用】
 * @method GET
 * @param {Object} data 搜索对象
 * @author liujuan & 2020-3-18 09:52:49
 * @url /Plugin/getGroupList
 * @return {Object} Promise
 */
$api.getDepartList = async (data) => {
    const url = `/Plugin/getGroupList`;
    let response = await $http.get(url, {params: data});
    if (response.code == '200') {
        return response;
    } else {
        utils.notice(response.msg, 'error');
    }
}
/**
 * 获取用户备选项【通用】
 * @method GET
 * @param {Object} data 搜索对象
 * @author liujuan & 2020-3-16 09:59:32
 * @url /Plugin/getUserList
 * @return {Object} Promise
 */
$api.getUserList = async (data) => {
    const url = `/Plugin/getUserList`;
    let response = await $http.post(url,data);
    if (response.code == '200') {
        return response;
    } else {
        utils.notice(response.msg, 'error');
    }
}
/**
 * 获取项目温度计数据
 * @method GET
 * @param {Object} formData 搜索对象
 * @author liujuan & 2020-3-16 09:59:32
 * @url /Item/getTemperature
 * @return {Object} Promise
 */
$api.getTemperature = async (item_id) => {
    const url = `/Item/getTemperature?itemId=${item_id}`;
    let response = await $http.get(url);
    if (response.code == '200') {
        return response;
    } else {
        utils.notice(response.msg, 'error');
    }
}
/**
 * 提交添加跟进备注
 * @method POST
 * @param {Object} formData 备注数据
 * @author liujuan & 2020-3-17 11:40:01
 * @url /Item/addCloud
 * @return {Object} Promise
 */
$api.submitRemark = async (formData) => {
    const url = `/Item/addCloud`;
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
    const url = `/Item/addCloudComment`;
    let response = await $http.post(url, formData);
    if (response.code == '200') {
        return response;
    } else {
        utils.notice(response.msg, 'error');
    }
}
/**
 * 获取项目详情页---节假日和项目进度
 * @method GET
 * @param {Object} cate 项目类型
 * @author liujuan & 2020-3-16 14:26:43
 * @url /Item/getItemCloudParameter
 * @return {Object} Promise
 */
$api.getItemParameter = async (cate) => {
    const url = `/Item/getItemCloudParameter`;
    let response = await $http.get(url,{params:cate});
    if (response.code == '200') {
        return response;
    } else {
        utils.notice(response.msg, 'error');
    }
}
/**
 * 获取项目详情页---判断今天是不是节假日
 * @method POST
 * @param {String} time
 * @author liujuan & 2020-3-16 14:26:43
 * @url /Item/checkIsExistHoildy
 * @return {Object} Promise
 */
$api.checkIsExistHoildy = async (time) => {
    const url = `/Item/checkIsExistHoildy`;
    let response = await $http.post(url,time);
    return response;
}
/* 发送短息
*
* @author liluyao & 2020-3-12 18:39:25
*
* @method POST
* @param {string} phone 手机号
* @param {string} content 短信内容
*
* @url: /common/sendMsg
*/
$api.sendMessage = async (formData) => {
    const url = `/Common/sendMsg`;
    let res = await $http.post(url, formData);
    if (res.code === 200) {
        return res;
    } else {
        // utils.notice(res.msg, 'error');
    }
};

/**
 * 获取名片权限数据
 *
 * @author liluyao 2020-3-13 21:13:07
 *
 * @method get
 *
 * @param {String} itemId 项目id
 *
 * @url /userCard/getCardAuthList/
 *
 * @returns {Promise<void>}
 */

$api.getCardAuthList = async(itemId) => {
    const url =  `/UserCard/getCardAuthList?itemId=${itemId}`;
    let res =await $http.get(url);
    return res;
};
/**
 * 获取关联通话会话留言列表
 *
 * @author liluyao 2020-3-16 11:52:22
 *
 * @method get
 *
 * @param {String} itemId 项目id
 *
 * @url /relate/getRelateList
 *
 * @returns {Promise<void>}
 */
$api.getRelateList = async (formData)=>{
    const url = `/Relate/getRelateList`;
    return await $http.get(url,{params:formData});
};
/**
 * 删除用户权限
 *
 * @author qinna 2020-3-11 10:54:21
 *
 * @method post
 *
 * @param {Object}formData
 *
 * @url Item/delItemAuth
 *
 * @returns {Promise<void>}
 */
$api.delItemAuth = async (formData)=>{
    const url = `Item/delItemAuth`;
    return await $http.post(url,formData);
};

/**
 * 获取会话数据
 *
 * @author liluyao 2020-3-18 14:13:34
 *
 * @method get
 *
 * @param {String} itemId 项目id
 *
 * @url /relate/messageList/{cus_id}
 *
 * @returns {Promise<void>}
 */
$api.messageList = async(formData) => {
    const url = `/Relate/messageList`;
    let res = await $http.get(url,{params:formData});
    return res;
};

/**
 * 向前|后加载更多的会话数据
 *
 * @author zyz 2020-4-20 15:53:51
 *
 * @method get
 *
 * @param {String} id 会话id
 * @param {String} type 类型top之前的，bottom-之后的
 *
 * @url Relate/messageListMore
 *
 * @return {Promise<void>}
 */
$api.getDialogMoreData = async(id,type)=>{
    const url = `Relate/messageListMore?cusId=${id}&type=${type}`;
    return await $http.get(url);
};

/**
 * 添加名片数据
 *
 * @author liluyao 2020-3-19 10:48:40
 *
 * @method post
 *
 * @param {Object}
 *
 * @url userCard/addCard
 *
 * @returns {Promise<void>}
 */

$api.addCardData = async(formData) => {
    const url = `UserCard/addCard`;
    let res = await $http.post(url,formData);
    return res;
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
    let res = await $http.post(url,formData);
    return res;
};

/**
 * 删除名片
 *
 * @author liluyao & 2020-3-20 11:20:19
 *
 * @method post
 *
 * @param @param {Object}
 *
 * @url /userCard/delCard
 *
 * @returns {Promise<void>}
 */
$api.delCard = async (data)=>{
    const url = `/UserCard/delCard`;
    return await $http.post(url,data);
};

/**
 * 编辑名片
 *
 * @author liluyao & 2020-3-20 11:20:19
 *
 * @method post
 *
 * @param {string} id 删除数据id
 *
 * @url /userCard/editCard
 *
 * @returns {Promise<void>}
 */
$api.editCard = async (formData)=>{
    const url = `/UserCard/editCard`;
    return await $http.post(url,formData);
};

/**
 * 修改名片标记
 *
 * @author liluyao & 2020-3-20 20:49:33
 *
 * @method GET
 *
 * @param {string} id 删除数据id
 *
 * @url /UserCard/editCardSign
 *
 * @returns {Promise<void>}
 */
$api.editCardSign = async (formData)=>{
    const url = `/UserCard/editCardSign`;
    return await $http.post(url,formData);
};


/**
 * 发送短信
 *
 * @author liluyao & 2020-3-20 20:49:33
 *
 * @method post
 *
 * @url /common/sendMsg
 *
 * @returns {Promise<void>}
 */
$api.sendMsg = async (formData)=>{
    const url = `/Common/sendMsg`;
    return await $http.post(url,formData);
};

/**
 * 申请查看名片
 *
 * @author liluyao & 2020-3-23 14:36:56
 *
 * @method post
 *
 * @url /UserCard/applyCard
 *
 * @returns {Promise<void>}
 */
$api.applyCard = async (formData)=>{
    const url = `http://mms-group1.dev.tanikawa.com/spa.php/UserCard/applyCard?testUid=920928`;
    return await $http.post(url,formData);
};


/**
 * 查看名片
 *
 * @author liluyao & 2020-3-24 09:08:42
 *
 * @method post
 *
 * @url /userCard/showCard
 *
 * @returns {Promise<void>}
 */
$api.showCard = async (itemId)=>{
    let obj = {
        itemId:itemId
    }
    const url = `/UserCard/showCard`;
    return await $http.post(url,obj);
};
/**
 * 查看单个名片
 *
 * @author liluyao & 2020-3-24 09:08:42
 *
 * @method post
 *
 * @url /userCard/showCard
 *
 * @returns {Promise<void>}
 */
$api.showOneCard = async (itemId,cardId=0,type)=>{
    let obj = {
        itemId:itemId,
        cardId:cardId,
        type:type
    }
    const url = `/UserCard/showOneCard`;
    return await $http.post(url,obj);
};
/**
 * 抢占名片
 *
 * @author qinna & 2020-9-29 09:08:42
 *
 * @method post
 *
 * @url /userCard/robCard
 *
 * @returns {Promise<void>}
 */
$api.robCard = async (itemId)=>{
    let obj = {
        itemId:itemId
    }
    const url = `/UserCard/robCard`;
    return await $http.post(url,obj);
};

/**
 * 获取回收弹窗回收原因
 *
 * @author zhouna & 2020-3-24 13:56:59
 *
 * @method get
 *
 * @param {String} cate 项目类型
 *
 * @url /Item/itemRecoveryReason
 *
 * @returns {Promise<void>}
 */
$api.getRecoveryList = async(cate) => {
    let formData = {
        itemImsCate:cate
    }
    const url = `/Item/itemRecoveryReason`;
    let res = await $http.get(url,{params:formData});
    return res;
};

/**
 * 快速拨打电话
 *
 * @author liluyao & 2020-3-24 17:01:56
 *
 * @param {obj} obj
 * *
 * @method post
 *
 * @url /common/sendPhone
 *
 * @returns {Promise<void>}
 */
$api.sendPhone = async (obj)=>{
    const url = `/Common/sendPhone`;
    return await $http.post(url,obj);
};

/**
 * 删除名片列表权限
 *
 * @author liluyao & 2020-3-27 10:24:29
 *
 * @method post
 *
 * @url /userCard/delCardAuth/
 *
 * @returns {Promise<void>}
 */
$api.delCardAuth = async (formData)=>{
    const url = `http://mms-group1.dev.tanikawa.com/spa.php/UserCard/delCardAuth?testUid=920928`;
    return await $http.post(url,formData);
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
    const url = `Item/topCloudOperation`;
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
    const url = `Item/deleteCloud`;
    let postData = {
        "cloudId" : id,
        "itemId" : itemId,
    };
    return await $http.post(url,postData);
};
/**
 * 验证at人员状态
 *
 * @author zhouna & 2020-03-30 21:04:15
 *
 * @method post
 *
 * @url / Item / checkUser
 *
 * @param {string} data 用户名称
 *
 * @returns {Promise<void>}
 */
$api.personAuth = async (data) => {
    const url = `/Item/checkUser`;
    let name = {
        data:data
    };
    return await $http.post(url, name);
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
    const url = `Item/editCloud`;
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
        cloudType : 0
    };
    return await $http.post(url, postData);
};

/**
 * 获取名片查看时间记录
 *
 * @method get
 *
 * @param {String} itemId 项目id
 * @param {String} uid 用户uid
 *
 * @url UserCard/getCardViewLog
 *
 * @return {Promise<void>}
 */
$api.getCardViewLog = async (itemId,uid) => {
    const url = `UserCard/getCardViewLog?itemId=${itemId}&uid=${uid}`;
    return await $http.get(url);
};

/**
 * 获取项目查看记录
 *
 * @method get
 *
 * @author zyz 2020-4-22 16:45:58
 *
 * @param {String} itemId 项目id
 * @param {String} uid 用户uid
 *
 * @url Item/getViewLog
 *
 * @return {Promise<void>}
 */
$api.getItemViewLog = async (itemId,uid) => {
    const url = `Item/getViewLog?itemId=${itemId}&uid=${uid}`;
    return await $http.get(url);
};

/**
 * 获取项目负责人
 *
 * @author zyz 2020-4-15 11:30:58
 *
 * @method GET
 *
 * @param {String} itemId 项目id
 *
 * @url Item/getManager
 *
 * @return {Promise<void>}
 */
$api.getItemManager = async (itemId) => {
    const url = `Item/getManager?itemId=${itemId}`;
    return await $http.get(url);
};
/**
 * 获取mot线二级数据
 *
 * @author qinna 2020-4-26 15:53:51
 *
 * @method get
 *
 * @param {String} itemId
 *
 * @url Relate/messageListMore
 *
 * @return {Promise<void>}
 */
$api.getMotLineData = async(itemId)=>{
    const url = `Mot/motLineData?itemId=${itemId}`;
    return await $http.get(url);
};
/**
 * 获取mot分类数据
 *
 * @method post
 *
 * @param {object} data
 *
 * @url Mot/getMotSort
 *
 * @return {Promise<void>}
 */
$api.getMotSortData = async(data)=>{
    const url = `Mot/getMotSort`;
    return await $http.post(url,data);
};
/**
 * 修改mot标签
 *
 * @method post
 *
 * @param {object} data
 *
 * @url Mot/updateMotSortId
 *
 * @return {Promise<void>}
 */
$api.updateMotSortId = async(data)=>{
    const url = `Mot/updateMotSortId`;
    return await $http.post(url,data);
};
/**
 * 获取项目分类备选项数据
 *
 * @method get
 *
 * @url
 *
 * @return {Promise<void>}
 */
$api.getProductCategory = async()=>{
    const url = `Plugin/getProductCategory`;
    return await $http.get(url);
};
export default $api;



$api.editCardTags = async (id, tags)=>{
    const url = `/UserCard/editCardTags`;
    return await $http.post(url, {id : id, tags : tags});
};

$api.editCardRelations = async (id, relations)=>{
    const url = `/UserCard/editCardRelations`;
    return await $http.post(url, {id : id, relations : relations});
};
/**
 *1 手机号 2 微信 3 邮箱 4 座机 5企业名称 6关系 7标签
 */
$api.editCardQuick = async (id, list, type,uid,modalType)=>{
    const url = `/UserCard/editCardQuick`;
    //符合后端接口
    if(type==2){
        type=3;
    }else if(type==4){
        type=2;
    }else if(type==3){
        type=4;
    }
    return await $http.post(url, {id : id, list : list,type:type,uid:uid,modalType:modalType});//后端接口快捷编辑1手机2座机3微信号4邮箱5企业名称6关系7标签
};
/**
 *1 手机号 2 微信 3 邮箱 4 座机 5企业名称 6关系 7标签
 */
$api.getRepeatInfo = async (id,list,type)=>{
    const url = `/Card/getRepeatInfo`;
    //符合后端接口
    if(type==2){
        type=3;
    }else if(type==4){
        type=2;
    }else if(type==3){
        type=4;
    }
    return await $http.post(url, {cardId:id,content:list,type:type});//后端接口快捷编辑1手机2座机3微信号4邮箱
};
/**
 * 名片编辑判重
 *
 * @author qinna & 2020-11-17 09:08:42
 *
 * @method post
 *
 * @url /userCard/checkRepeat
 *
 * @returns {Promise<void>}
 */
$api.checkRepeat = async (data)=>{
    let obj = {
        data:data
    }
    const url = `/UserCard/checkRepeat`;
    return await $http.post(url,obj);
};
