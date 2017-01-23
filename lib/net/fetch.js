import React from 'react';
import {
    Platform
} from 'react-native';
import Config from './fetch.config';
import {msg} from 'iflux-native';

/**
 * 主要根据请求类型把请求参数给重新分析掉
 * @param requestBody
 */
const handleRequestParams = (requestBody) => {
    if (requestBody.headers && requestBody.body && requestBody.headers['Content-Type'].indexOf('urlencoded') > 0) {
        if (typeof requestBody.body != 'string') {
            let ps = [];
            for (let key in requestBody.body) {
                ps.push(`${key}=${encodeURIComponent(requestBody.body[key])}`)
            }
            requestBody.body = ps.join('&');
        }
    }
};

/**
 * 如果是get请求, 并且有Body, 得去掉, 然后把参数组装到url后面
 * @param url
 * @param requestBody
 * @returns {*}
 */
const handleRequestUrl = (url, requestBody) => {
    if ((requestBody.method == 'GET' || !requestBody.method) && requestBody.body) {
        url = url + (url.indexOf('?') > 0 ? '' : '?') + requestBody.body;
        delete requestBody.body;
    }
    return url
};

/**
 *
 * @param url
 * @param props
 * @returns {Promise}
 * @constructor
 */
const UIFetch = (url, props) => {

    //
    let merge = Object.assign({}, Config.request, props),
        {hook, handler, host} = Config;

    //
    if (hook) {
        let isNotIntercept = hook(merge, url); //如果要终端这次请求
        if (isNotIntercept == false) {
            return new Promise((o, e) => {}).done();
        }
    }

    //
    handleRequestParams(merge);
    url = handleRequestUrl(url, merge);
    if (host && url.indexOf("http") == -1) {
        url = host + url;
    }

    //
    return new Promise((resolve) => {
        fetch(url, merge)
            .then(r => r.text())
            .then((res) => {
                let result = props && props.handler ? props.handler(res, url, merge) : handler(res, url, merge);

                //
                if (__DEV__) {
                    console.log(url, " => ", merge, " => ", result , " => ", (res.length / 1024).toFixed(2), 'KB');
                }

                //
                if (result) {
                    resolve(result);
                }
            })
            .catch((err) => {
                if (__DEV__) {
                    console.log(url, " => ", merge, " => ", err);
                }
            })
            .done();
    });
};

export default UIFetch;