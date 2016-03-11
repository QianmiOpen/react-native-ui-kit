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

import Config from '../config';
import Loading from '../loading';
import Network from './components/network';

/**
 * 主要处理几个公共的状态
 *  1. 数据加载
 *  2. 网络中断
 */
class Body extends React.Component {

  static defaultProps = {
    loading: null, //QMConst.Loading
    style: null,
  };

  state = {
    hasNetwork: true,
    timeoutId: -1,
  };

  constructor (props = {}) {
    super (props);
    this.state.loading = props.loading;
  }

  componentWillReceiveProps (nextProps) {
    let {loading} = this.state;
    if (loading != nextProps.loading) {
      this.setState ({loading});
    }
  }

  componentWillMount () {
    NetInfo.addEventListener ('change', this._onNetChangeHandler);
  }

  componentWillUnmount () {
    NetInfo.removeEventListener ('change', this._onNetChangeHandler);
  }

  render () {
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
          {this._renderLoading ()}
        </View>
      );
    }
  }

  _renderLoading () {
    if (this.state.timeoutId != -1) {
      clearTimeout (this.state.timeoutId);
    }
    switch (this.props.loading) {
      case Config.LOADING.START:
        this.state.timeoutId = setTimeout (() => this.setState ({loading: Config.LOADING.RELOAD}), 5 * 1000); //5秒后关闭Loading
        return <Loading style={styles.model}></Loading>;
      case Config.LOADING.STOP:
        break;
      case Config.LOADING.RELOAD:
        break;
    }
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
