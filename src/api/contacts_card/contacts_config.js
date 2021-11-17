import $http from '@/resource';
import utils from "@/utils";

const $api = {};
/**
 * 根据type获取不同类型管理数据
 *
 * @method POST
 * @param  {{type: string}} data [description]
 */
$api.getSalarySetList = async(data)=>{
    const url = 'Card/getCardConfig'
    let res = await $http.post(url, data);
    if(res.code !== 200){
        utils.notice(res.msg,"error");
        return false;
    } else {
        return res.data;
    }
}
/**
 * 保存修改类型管理
 * @param formData
 * @returns {Promise<unknown>}
 */
$api.saveSetData = function(formData) {
    const url = '/Card/saveCardConfig';
    return new Promise(function (resolve) {
        $http.post(url, formData).then(response => {
            if (response.code === 200) {
                resolve(response);
            } else {
                utils.notice(response.msg, 'error');
            }
        })
    });
};
export default $api;
