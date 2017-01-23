export default {

    /**
     * 默认请求头
     */
    request: {
        method: 'GET',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        }
    },

    /**
     * 默认域名
     */
    host: '',

    /**
     * 可以在请求之前, 修改请求参数, 如果返回false, 那么将会终端这次请求
     * @param headers
     * @returns {*}
     */
    hook: (headers) => {
        return headers
    },

    /**
     * 回调解析, 只要不返回null, 都认为是成功, 返回null, 就认为是错误
     * @param r
     * @returns {*}
     */
    handler: (r) => {
        return r;
    },

    /**
     * 超时处理 和 超时时间 (秒)
     * @param r
     */
    timeout: -1,
    timeoutHandler: (r) => {
    },

};