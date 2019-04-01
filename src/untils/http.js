'use strict'

import axios from 'axios'
import qs from 'qs'
import { promisify } from 'util';
import {} from 'vux'


axios.defaults.baseURL = '/letu_store';
axios.defaults.timeout  = 15000;

axios.interceptors.request.use(config => {    // 这里的config包含每次请求的内容
    // // 判断localStorage中是否存在api_token
    // if (localStorage.getItem('api_token')) {
    //     //  存在将api_token写入 request header
    //     config.headers.apiToken = `${localStorage.getItem('api_token')}`;
    // }
    config.headers = {
        'X-Requested-With': 'XMLHttpRequest',
        // 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' 
        'Content-Type': 'application/json; charset=UTF-8'
    };
    return config;
}, err => {
    return Promise.reject(err);
});

axios.interceptors.response.use(response => {
    return response
}, error => {
    return Promise.resolve(error.response)
});

function checkStatus (response) {   
    // 如果http状态码正常，则直接返回数据
    if (response && (response.status === 200 || response.status === 304 || response.status === 400 )) {
        return response
    }
    // 如果没有权限
    if (response.status === 403) {
        window.comTools.hideLoading(window.vm);
        window.location.hash="/register";
        Promise.break;
        return {}; 
    }  
    // 异常状态下，把错误信息返回去
    return {
        status: -404,
        msg: '网络异常'
    }
}

function checkCode (res,vue) {
   
    // 如果code异常(这里已经包括网络错误，服务器错误，后端抛出的错误)，
    // 可以弹出一个错误提示，告诉用户
    if (res.status === -404) {
        window.vm.$vux.toast.text(res.msg);
        Promise.break;
        return {}; 
    }

    if (res.data && (!res.data.success)) {
        window.vm.$vux.toast.text(res.data.message);
        Promise.break;
        return {}; 
    }

    if (res.data && res.data.data) 
        return res.data.data
    return res.data
}
// 请求方式的配置
export default {
    post (url, data) {  //  post
        return axios({
            method: 'post',
            url,
            data: data,
        }).then(
            (response) => {
                return checkStatus(response)
            }
        ).then(
            (res) => {
                return checkCode(res,this)
            }
        )
    },
    get (url, params) {  // get
        return axios({
            method: 'get',
            url,
            params, // get 请求时带的参数
        }).then(
            (response) => {
                return checkStatus(response)
            }
        ).then(
            (res) => {
                return checkCode(res)
            }
        )
    }
}
