
import $http from '@/resource';
import utils from '@/utils';
const $api = {};

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

export default $api;