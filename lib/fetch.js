/**
 * @flow
 */
import React, {
  Platform
} from 'react-native';
import Config from './config';
import {msg} from 'iflux-native';

const UIFetch = (url, props) => {
  let merge = Object.assign({}, Config.fetch.request, props);

  //
  if (merge.headers && merge.body && merge.headers['Content-Type'].indexOf('urlencoded') > 0) {
    if (typeof merge.body != 'string') {
      let ps = [];
      for (let key in merge.body) {
        ps.push(`${key}=${encodeURIComponent(merge.body[key])}`)
      }
      merge.body = ps.join('&');
    }
  }

  //
  if ((merge.method == 'GET' || !merge.method) && merge.body) {
    url = url + (url.indexOf('?') > 0 ? '' : '?') + merge.body;
    delete merge.body;
  }

  //
  if (Config.fetch.host) {
    url = Config.fetch.host + url;
  }

  return new Promise((resolve, reject) => {
    fetch(url, merge)
      .then(r => r.text())
      .then((res) => {
        let result = Config.fetch.handler(res, url, merge);
        if (Config.fetch.debug) {
          console.log(url, " => ", merge, " => ", result);
        }
        if (result.result) {
          resolve(result.data);
        }
        else {
          reject(result.data || "");
        }
      })
      .catch((err) => {
        if (Config.fetch.debug) {
          console.log(url, " => ", merge, " => ", err);
        }
        //reject(err);
      })
      .done();
  });
};

export default UIFetch;