import axios from 'axios';
import vue from '@/main.js';
import Cookies from 'js-cookie';
import {address} from '@/api/api';
import Qs from 'qs';



// 创建axios实例
const service = axios.create({
  baseURL: address.url,
  method: 'post',
  // timeout: 5000 ,
  transformRequest: [function (data) {
    data = Qs.stringify(data);
    return data;
  }],
  headers:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}// 请求超时时间
});


// request拦截器
service.interceptors.request.use(config => {

  if(Cookies.get('token')){
    config.data = {
      token: Cookies.get('token'),
      ...config.data
    }
  }
  if(Cookies.get('id')){
    config.data = {
      id: Cookies.get('id'),
      ...config.data
    }
  }
  if(Cookies.get('sysRoleId')){
    config.data = {
      roleId: Cookies.get('sysRoleId'),
      ...config.data
    }
  }
  return config;
}, error => {
  // Do something with request error

  Promise.reject(error);
})

// respone拦截器
service.interceptors.response.use(
  response =>{

      var data = response.data;

      if(data.CODE != 200){
        let msg = data.MSG;
        // Cookies.remove('token');
        // Cookies.remove('id');
        vue.$Message.error(msg);

        if(msg == '登录状态已过期,请重新登录!'){
          vue.$router.push({path:'/login'});
        }
      }else {
        // let msg = data.MSG;
        // vue.$Message.success(msg);
        return data.DATA;

      }









  },
  error => {
    console.log('err' + error);// for debug
    vue.$Message.error({
      message: error.message,
      duration: 5 * 1000,
      closable: true
    });
    return Promise.reject(error);
  }
)

export default service;
