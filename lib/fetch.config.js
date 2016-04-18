

export default {
  //是否开启响应日志
  debug: false,
  //默认请求头
  request: {
    method: 'GET',
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    }
  },
  //默认域名
  host: '',
  //可以修改请求提
  hook: (headers) => {
    return headers
  },
  //回调解析
  handler: (r) => {
    return {result: r.code == 200, data: r.data};
  }
};