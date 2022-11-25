import axios from 'axios'
import Config from '@/config.js';
import cookies from 'js-cookie';
import utils from './utils';
import { Object } from 'core-js';
import qs from 'qs';

var $http = axios.create({
    baseURL: `${Config.apiUrl}/`,
    timeout: 55000,
    transformRequest: [function (data) {
        return qs.stringify(data)
    }],
});
//请求拦截器之前（在请求之前进行一些配置）
$http.interceptors.request.use(
    config => {
        return config;
    }
)
//响应了拦截器之后（在响应之后对数据进行一些处理）
$http.interceptors.response.use(
    response => {
        switch (response.data.code) {
            case 200:
                return response.data;
            case 403:
                location.href = '/403';
                break;
            case 404:
                location.href = '/404';
                break;
            default :
                return response.data;
        }
    },
    error => {//这是异常
        if (error.response) {
            const code = error.response.status;
            if (code == 401) {
                cookies.set('token', '');
                utils.notice("认证失败，请重新登录", 'error');
            }
            if (code == 500) {
                utils.notice("接口错误，请联系管理员", 'error');
            }
            if (code == 404) {
                utils.notice("404 NOT FOUND", 'error');
            }
            if (code == 422) {
                for (var name in error.response.data) {
                    let msg = (error.response.data[name][0]);
                    utils.notice(`数据验证未通过 -- ${msg}`, 'error');
                    break;
                }
            }
        }
        return Promise.reject(error)
    }
);

export default $http;