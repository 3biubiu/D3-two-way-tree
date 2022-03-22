import $http from '@/resource';
import utils from '@/utils';

const $api = {};

/**
 * 附件相机列表
 *
 * @method POST
 *
 * @url : /Plugin/getCameraList
 */
$api.cameraAttachment = async(formData)=>{
    const url = '/Plugin/getCameraList';
    return await $http.post(url,formData);
};

/**
 * 上传文件删除
 *
 * @method POST
 *
 * @url : /Plugin/deletePic
 */
$api.deletePic = async (formData)=>{
    const url = '/Plugin/deletePic';
    return await $http.post(url,formData);
};

/**
 * 附件相机上传
 *
 * @method POST
 *
 * @url : /Plugin/getPicInfuByIds
 */
$api.getPicInfuByIds = async (formData)=>{
    const url = '/Plugin/getPicInfuByIds';
    return await $http.post(url,formData);
};

export default $api;


