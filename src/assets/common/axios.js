/*
 * @Date: 2020-05-07 14:58:09
 * @LastEditors: gzk
 * @LastEditTime: 2020-05-12 09:37:02
 */
import axios from 'axios';

import qs from 'qs';

const ajaxConfig = {
  timeout: 30000,
  withCredentials: true,
  urlPrefix:'',
  // urlPrefix: '/web/beta/v1.0', // 请求本地的/web/beta/v1.0，通过代理访问服务器的/web/beta/v1.0
  // 此处错误
  // urlPrefix: 'http://192.168.1.118:3000/web/beta/v1.0', // 这样写就成跨域了，
};
const ajaxBase = (param) => {
  const axiosParam = Object.assign({
    // dataType: 'json',
    // urlencoded: true,
    //  headers: { 'content-type': 'application/x-www-form-urlencoded' },
    headers: { 'content-type': 'application/json' },
    timeout: ajaxConfig.timeout,
  }, param, {
    url: ajaxConfig.urlPrefix + param.url,
  });
  if (axiosParam.headers && (axiosParam.headers['content-type'] === 'application/x-www-form-urlencoded')) {
    axiosParam.data = qs.stringify(axiosParam.data);
  }
  return axios(axiosParam).then((params) => {
    if ((params.status === 200)) {
      const data = params.data;
      if (data.data === null) {
        return {
          status: false,
          data: [],
        };
      }
      return {
        status: (params.data.errCode === 0),
        data: params.data,
      };
    }
    return {
      status: false,
      data: {
        'status': 404,
        'message': '网络错误',
      },
    };
  });
};

const ajaxAmd = {
  ajax: ajaxBase,
  get: (param) =>{
    return ajaxBase(Object.assign({
      method: 'get',
    }, param));
  },
  post: (param) => {
    return ajaxBase(Object.assign({
      method: 'post',
    }, param));
  },
  put: (param) => {
    return ajaxBase(Object.assign({
      method: 'put',
    }, param));
  },
  delete: (param) => {
    return ajaxBase(Object.assign({
      method: 'delete',
    }, param));
  },
};
export default ajaxAmd;
