/**
 * @flow
 */
import React, {
  Platform
} from 'react-native';
import Config from './config';
import {msg} from 'iflux-native';

const UIFetch = (url, props) => {
  let request = {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Platform': Platform.OS
    }
  };

  let merge = Object.assign({}, request, props);

  if (Config.fetch.host) {
    url = Config.fetch.host + url;
  }

  return new Promise((resolve, reject) => {
    fetch(url, merge)
      .then((res) => res.json())
      .then((res) => {
        if (Config.fetch.debug) {
          console.log(url, " => ", res);
        }
        let result = Config.fetch.handler(res);
        if (result.result) {
          resolve(result.data);
        }
        else {
          msg.emit('app:tip', res.msg);
          reject(result.data);
        }
      })
      .catch((err) => {
        reject(err);
      })
      .done();
  });
};

export default UIFetch;