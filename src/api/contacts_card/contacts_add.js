import $http from '@/resource';
import utils from '@/utils';

const $api = {};

/**
 * 编辑联系人拉取默认数据
 *
 * @author zyz 2021-2-24 18:08:39
 *
 * @method get
 *
 * @param {String} id 联系人id
 *
 * @url CardAdd/getDetail
 *
 * @returns {Promise<void>}
 */
$api.getEditDefaultData = async (id)=>{
    const url = `CardAdd/getDetail?id=${id}`;
    return await $http.get(url);
};

/**
 * 联系方式查重
 *
 * @author zyz 2021-3-3 14:27:12
 *
 * @method post
 *
 * @param {Object} data 参数
 *
 * @url CardAdd/checkRepeat
 *
 * @returns {Promise<void>}
 */
$api.checkCardRepeat = async (data)=>{
    const url = `CardAdd/checkRepeat`;
    return await $http.post(url,data);
};

/**
 * 名片保存
 *
 * @author zyz 2021-3-3 14:36:25
 *
 * @method post
 *
 * @param {Object} data 要提交的数据
 *
 * @url CardAdd/add
 *
 * @returns {Promise<void>}
 */
$api.saveCard = async (data)=>{
    const url = `CardAdd/add`;
    return await $http.post(url,data);
};

export default $api;
