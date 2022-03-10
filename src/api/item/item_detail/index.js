
import $http from '@/resource';
import utils from '@/utils';

const $api = {};
/**
 * 申请查看名片
 *
 * @method post
 *
 * @url /UserCard/applyCard
 *
 * @returns {Promise<void>}
 */
 $api.applyCard = async (formData)=>{
    const url = `/UserCard/applyCard?testUid=920928`;
    return await $http.post(url,formData);
};


/**
 * 删除名片列表权限
 *
 * @method post
 *
 * @url /userCard/delCardAuth/
 *
 * @returns {Promise<void>}
 */
$api.delCardAuth = async (formData)=>{
    const url = `/UserCard/delCardAuth?testUid=920928`;
    return await $http.post(url,formData);
};


export default $api;
