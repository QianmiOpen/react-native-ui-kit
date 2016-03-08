'use strict'
// @flow

/**
 * Navigator导航中心
 */
import React, {
  Alert,
  Navigator,
  Platform,
  ToastAndroid,
  StyleSheet,
  AsyncStorage,
  View,
  NetInfo
} from 'react-native';

import Kit from '../kit';

import {msg} from 'iflux-native';

import Loading from '../loading';
import Network from './components/network';

/**
 * 主要处理几个公共的状态
 *  1. 数据加载
 *  2. 网络中断
 */
class Body extends React.Component {

  static defaultProps = {
    store: null,
    style: null,
  };

  state = {
    hasNetwork: true
  };

  componentWillMount () {
    NetInfo.addEventListener ('change', this._onNetChangeHandler);
  }

  componentWillUnmount () {
    NetInfo.removeEventListener ('change', this._onNetChangeHandler);
  }

  render () {
    let store = this.props.store;
    //没有网络
    if (!this.state.hasNetwork) {
      if (__DEV__) {
        console.log ('没网啦');
      }
      return <Network></Network>;
    }
    //业务自有
    else {
      return (
        <View style={[styles.container, this.props.style]}>
          {this.props.children}
          {store && store.get ('loading') ? this._renderLoading () : null}
        </View>
      );
    }
  }

  _renderLoading () {
    if (__DEV__) {
      console.log ('加载进度条哦');
    }
    return <Loading style={styles.model}></Loading>;
  }

  _onNetChangeHandler = (hasNetwork) => {
    this.setState ({hasNetwork});
  };

}

const styles = StyleSheet.create ({
  container: {
    flex: 1
  },

  model: {
    width: Kit.Width,
    height: Kit.Height,
    backgroundColor: 'rgba(0,0,0,0.3)',
    position: 'absolute',
    left: 0,
    top: 0,
  }
});

export default Body;
