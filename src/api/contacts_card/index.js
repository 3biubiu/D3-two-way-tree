import $http from '@/resource';
import contacts from "./contacts.js";
import contactsDetail from "./contacts_detail.js";
import utils from "@/utils";
const $api = Object.assign({},
    contacts,
    contactsDetail,
);

/**
 * 获取还可申请人数、已成交的联系人数
 * @returns {Promise<*>}
 */
$api.getStatisticsNumber= async ()=>{
    const url = `http://mms-group1.dev.tanikawa.com/spa.php/Card/getStatisticsNumber?testUid=920928`;
    return await $http.post(url);
}
/**
 * 添加联系人操作记录埋点
 * @param behavior 行为
 * @param other 额外数据
 * @param content 额外数据内容
 * @returns {Promise<*>}
 */
$api.addContactsLog = async (behavior,other='',content='') => {
    const url = "http://mms-group1.dev.tanikawa.com/spa.php/Card/addContactsLog?testUid=920928";
    return await $http.post(url,{behavior:behavior,other:other,content:content});
};
