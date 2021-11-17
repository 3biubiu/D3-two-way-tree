import $http from '@/resource';
import contacts from "./contacts.js";
import contactsDetail from "./contacts_detail.js";
import contactsAdd from "./contacts_add";
import contactsConfig from "./contacts_config.js";
import utils from "@/utils";
const $api = Object.assign({},
    contacts,
    contactsDetail,
    contactsAdd,
    contactsConfig
);

/**
 * 拉取用户的联系人列表页权限
 *
 * @author zan 2020-10-27 11:00:51
 *
 * @method GET
 *
 * @param uid 用户id
 *
 * @returns {Promise<*>}
 *
 * @url /basic-auth
 */
$api.getContactsAuth = async (uid) => {
    let url = "Card/getContactsAuth?uid="+uid;
    return await $http.get(url);

};
/**
 * 拉取用户的联系人详情页权限
 *
 * @author zan 2020-10-27 11:00:51
 *
 * @method GET
 *
 * @param uid 用户id
 * @param cardId 联系人id cardId
 *
 * @returns {Promise<*>}
 *
 * @url /basic-auth
 */
$api.getContactsInfoAuth = async (info) => {
    let url = "Card/getContactsInfoAuth";
    return await $http.get(url,{params:info});
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
export default $api;
/**
 * 项目推送
 *
 * @author wanghao 2021-2-22
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
// $api.contactPush = async (data,sendmsgArr,itemId)=>{
//     const url = `ItemBaseInfo/contactPush`;
//     let postData = {
//         "users" :  data,
//         "itemId" :  itemId,
//         "sendmsgArr" :  sendmsgArr
//     };
//     return await $http.post(url,postData);
// };
$api.contactPush = async (formData) => {
    const url = `ItemBaseInfo/contactPush`;
    let response = await $http.post(url,formData);
    if (response.code == '200') {
        utils.notice("推送成功","success");
        return response;
    } else {
        utils.notice(response.msg, 'error');
    }
};
/**
 * 搜索合并项目
 *
 * @author qinna 2021.2.24
 *
 * @method post
 *
 * @param {String} itemId 项目id
 * @param {String} keywords 搜索字段
 *
 * @url CardAdd/searchCard
 *
 * @returns {Promise<void>}
 */
$api.searchCard = async (itemId,keywords)=>{
    const url = `CardAdd/searchCard`;
    let postData = {
        "cardId" :   itemId,
        "keywords" :   keywords,
    };
    return await $http.post(url,postData);
};
/**
 * 合并联系人提交
 *
 * @author qinna 2021-2-25
 *
 * @method post
 *
 * @param {String} cardId 名片id
 * @param {String} targetId 合并项目id
 *
 * @url card/
 *
 * @returns {Promise<void>}
 */
$api.mergeItem = async (cardId,targetId)=>{
    const url = `CardAdd/mergeCard`;
    let postData = {
        "cardId" :  cardId,
        "targetId" :  targetId,
    };
    return await $http.post(url,postData);
};

/**
 * 获取还可申请人数、已成交的联系人数
 * @returns {Promise<*>}
 */
$api.getStatisticsNumber= async ()=>{
    const url = `http://mms-group1.dev.tanikawa.com/spa.php/Card/getStatisticsNumber?testUid=920928`;
    return await $http.post(url);
}
/**
 * 判断当前用户是否是在限制天数内查看的名片
 * @param cardId
 * @returns {Promise<*>}
 */
$api.userIsCanView = async (cardId)=>{
    const url = `Card/userIsCanView`;
    return await $http.post(url,{cardId:cardId});
}
/**
 * 获取联系人查看权限人员列表
 *
 * @author zan 2021-8-16
 *
 * @method POST
 *
 * @param cardId 联系人id
 *
 * @returns {Promise<*>}
 *
 * @url /getCardUsers
 */
$api.getCardUsers = async (cardId) => {
    const url = "Card/getCardUsers";
    return await $http.post(url,{cardId:cardId});
};
/**
 * 获取联系人信息统计数据
 *
 * @method POST
 * @param time 时间段
 * @returns {Promise<*>}
 *
 * @url /getCardUsers
 */
$api.getContactsStatistics = async (time='') => {
    const url = "Card/getContactsStatistics";
    return await $http.post(url,{time:time});
};

/**
 * 添加联系人操作记录埋点
 * @param behavior 行为
 * @param other 额外数据
 * @param content 额外数据内容
 * @returns {Promise<*>}
 */
$api.addContactsLog = async (behavior,other='',content='') => {
    const url = "Card/addContactsLog";
    return await $http.post(url,{behavior:behavior,other:other,content:content});
};
