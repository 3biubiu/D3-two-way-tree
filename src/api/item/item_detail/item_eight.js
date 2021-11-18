
import $http from '@/resource';

const $api = {};

/**
 * 获取所属集团信息
 *
 * @author wanghao 2021-5-17
 *
 * @method get
 *
 * @param {Number} itemId 项目id
 *
 * @param uid
 * @url Item/getFollowBloc
 *
 * @returns {Promise<void>}
 */
$api.getFollowBloc = async (itemId,uid)=>{
    const url = `Item/getFollowBloc?itemId=${itemId}&uid=${uid}`;
    return await $http.get(url);
};

/**
 * 修改项目关注状态
 *
 * @author qinna
 *
 * @method post
 *
 * @param {String} blocId
 * @param {String} isFocus 项目关注状态
 *
 * @url ItemBaseInfo/itemFocus
 *
 * @returns {Promise<void>}
 */
$api.blocFocus = async (blocId,isFocus)=>{
    const url = `blocDetail/blocFocus`;
    let postData = {
        "blocId"  :   blocId,
        "isFocus" :   isFocus,
    };
    return await $http.post(url,postData);
};



export default $api;
