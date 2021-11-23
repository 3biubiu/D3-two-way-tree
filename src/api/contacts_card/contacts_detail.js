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


export default $api;
