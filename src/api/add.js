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
 * @method POST
 *
 * @url : /Plugin/deletePic
 */
$api.deletePic = function(formData) {
	const url = '/Plugin/deletePic';
	const promise = new Promise(function(resolve){
        $http.post(url,formData).then(response=>{
            console.log(response);
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

export default $api;


