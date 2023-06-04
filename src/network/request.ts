import axios from 'axios'
import type { AxiosRequestConfig } from 'axios'

export const request = (config: AxiosRequestConfig) => {
    // 1.创建axios实例
    const instance = axios.create({
        baseURL: 'http://182.43.52.124:7137',
        timeout: 5000
    })

    // 2.axios拦截器

    // 1.请求拦截
    instance.interceptors.request.use(config => {
        return config;
    },err => {
        console.log(err);
    });

    // 2.响应拦截
    instance.interceptors.response.use(res=>{
        return res.data;
    },err=>{
        console.log(err);
    });

    return instance(config);
}