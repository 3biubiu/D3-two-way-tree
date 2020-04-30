import axios from 'axios'
import config from '@/config.js';
import cookies from 'js-cookie';
import utils from './utils';
import { Object } from 'core-js';
import qs from 'qs';


var $http = axios.create({
    baseURL: `${config.apiUrl}/`,
    timeout: 55000,
    transformRequest: [function (data) {
        return qs.stringify(data)
    }],
});
$http.interceptors.request.use(
    config => {
        if (cookies.get('token')) {
            config.headers['Token'] = cookies.get('token');
        }
        return config;
    }
)
$http.interceptors.response.use(
    response => {
        switch (response.data.code) {
            case 200:
                return response.data;
            case 401:
            case 403:
                cookies.set('uid', '');
                cookies.set('token', '');
                location.href = config.loginUrl;
                break;
            case 402:
                cookies.set('uid', '');
                cookies.set('token', '');
                location.reload();
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