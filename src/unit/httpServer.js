import axios from 'axios'
import qs from 'qs'
import router from './../router'

axios.defaults.timeout = 10000; //响应时间
// axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';        //配置请求头
axios.defaults.baseURL = process.env.NODE_ENV == "development" ? '/api' : 'http://39.104.28.207:8090'; //配置接口地址

//POST传参序列化(添加请求拦截器)
axios.interceptors.request.use((config) => {
    if(window.sessionStorage.isLogin==undefined){
        router.push({name:'login'});
    }
    // console.log(window.sessionStorage.token)
    config.headers.token = window.sessionStorage.token;
    //在发送请求之前做某件事
    // if(config.method  === 'post'){
    //     config.data = qs.stringify(config.data);
    // }
    return config;
}, (error) => {
    console.log('错误的传参')
    return Promise.reject(error);
});

// //返回状态判断(添加响应拦截器)
// axios.interceptors.response.use((res) =>{
//     alert('成功')
//     console.log(res)
//     //对响应数据做些事
//     if(!res.data.success){
//         return Promise.resolve(res);
//     }
//     return res;
// }, (error) => {
//     console.log(error);
//     console.log('网络异常')
//     return Promise.reject(error);
// });

//返回一个Promise(发送post请求)
export function fetchPost(url, params) {
    return new Promise((resolve, reject) => {
        axios.post(url, params)
            .then(response => {
                resolve(response);
            }, err => {
                reject(err);
            })
            .catch((error) => {
                reject(error)
            })
    })
}

////返回一个Promise(发送get请求)
export function fetchGet(url, param) {
    return new Promise((resolve, reject) => {
        axios.get(url, { params: param })
            .then(response => {
                resolve(response)
            }, err => {
                reject(err)
            })
            .catch((error) => {
                reject(error)
            })
    })
}
export default {
    fetchPost,
    fetchGet,
}