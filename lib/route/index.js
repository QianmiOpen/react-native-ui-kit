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
  StyleSheet
} from 'react-native';

import {msg} from 'iflux-native';
import Kit from '../kit';

//
//
//
import ImagePicker from '../image.picker';
import CameraPicker from '../camera.picker';
const DEFAULT_MAP = {
  ImagePicker,
  CameraPicker,
};

/**
 * AppRouter
 */
class AppRoute extends React.Component {

  static defaultProps = {
    start: '',
    routeMap: {},
    routeFilter: null,
  };

  constructor (props:{}) {
    super();
  }

  /**
   * 事件驱动Navigator，这样不需要通过属性透传到navigator到各个子组件
   */
  componentDidMount () {
    //if (__DEV__) {
    //  console.log (this.props.routerMap);
    //}

    msg
      .on('route:goToNext', this._pushRoute.bind(this))
      .on('route:backToLast', this._popRoute.bind(this))
      .on('route:backToTop', this._popToTop.bind(this))
      .on('route:popToRoute', this._popToRoute.bind(this))
      .on('route:replaceRoute', this._replaceRoute.bind(this))
      .on('route:replaceAtIndex', this._replaceAtIndex.bind(this));

    //监听Android的实体物理键的返回
    if (Kit.isAndroid()) {
      BackAndroid.addEventListener('hardwareBackPress', this._handleBackAndroid);
    }
  }

  /**
   * destroy
   */
  componentWillUnmount () {
    msg
      .removeListener('route:goToNext', this._pushRoute)
      .removeListener('route:backToLast', this._popRoute)
      .removeListener('route:backToTop', this._popToTop)
      .removeListener('route:popToRoute', this._popToRoute)
      .removeListener('route:replaceAtIndex', this._replaceAtIndex)
      .removeListener('route:replaceRoute', this._replaceRoute);

    if (Kit.isAndroid()) {
      BackAndroid.removeEventListener('hardwareBackPress', this._handleBackAndroid);
    }
  }

  render () {
    return (
      <Navigator
        ref={(navigator) => this._navigator = navigator}
        style={{backgroundColor: '#000'}}
        sceneStyle={{backgroundColor: '#FFF'}}
        initialRoute={{sceneName: this.props.start}}
        configureScene={(r) => this._configScene(r)}
        renderScene={(r) => this._renderScene(r)}
      />
    );
  }

  /**
   * 渲染界面
   * @param route
   * @private
   */
  _renderScene (route) {
    //如果是android平台，首先退出键盘
    if (Kit.isAndroid()) {
      if (__DEV__) {
        console.log('android-路由切换退出键盘');
      }
      dismissKeyboard();
    }

    //可以对跳转的路由进行过滤
    let {routeFilter} = this.props;
    if (routeFilter) {
      route = routerFilter(route);
    }
    var {sceneName, sceneConfig, ...params} = route;
    if (__DEV__) {
      console.log('route will render->', sceneName, params);
    }
    this._sceneName = sceneName;
    this.params = params;
    let Scene = this._findScene(sceneName);

    let r = <Scene {...params}/>;
    return r;
  }

  /**
   *
   * @param sceneName
   * @returns {*}
   * @private
   */
  _findScene (sceneName) {
    if (sceneName.indexOf('.') > 0) {
      let sc = sceneName.split('.'),
        s = sc.shift(),
        p = this.props.routeMap[s];
      while (p && (s = sc.shift())) {
        p = p[s];
      }
      return p;
    }
    let r = this.props.routeMap[sceneName];
    if (!r) {
      r = DEFAULT_MAP[sceneName];
    }
    return r;
  }

  /**
   * 获取路由跳转配置
   * @private
   */
  _configScene (route) {
    if (route.sceneConfig) {
      return route.sceneConfig;
    }
    else {
      return Navigator.SceneConfigs.PushFromRight;
    }
  }

  /**
   * 处理android的实体键的返回
   */
  _handleBackAndroid () {

  }

  /**
   * push 路由
   */
  _pushRoute (sceneParam) {
    if (__DEV__) {
      console.log('正在push路由: ', sceneParam);
    }

    this._navigator.push(sceneParam);
  }

  /**
   * pop 路由
   */
  _popRoute () {
    if (__DEV__) {
      console.log('正在pop路由');
    }

    this._navigator.pop();
  }

  /**
   * 返回到第一个视图
   */
  _popToTop () {
    if (__DEV__) {
      console.log('route popToTop');
    }

    this._navigator.popToTop();
  }

  /**
   * 返回到指定视图
   */
  _popToRoute (sceneParam) {
    if (__DEV__) {
      console.log('route popToRoute');
    }

    this._navigator.popToRoute(sceneParam);
  }

  /**
   * 替换当前视图
   */
  _replaceRoute (sceneParam) {
    if (__DEV__) {
      console.log('route replaceRoute');
    }

    //修复: 多次触发替换场景, 比如token丢失, 进入一个界面会发起多个请求, 都会发出到登陆页面的消息, 导致重复替换
    let {sceneName} = sceneParam;
    if (this._sceneName == sceneName) {
      return;
    }

    this._navigator.replace(sceneParam);
  }

  _replaceAtIndex (sceneParam, index) {
    if (__DEV__) {
      console.log('route _replaceAtIndex');
    }

    this._navigator.replaceAtIndex(sceneParam, index);
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default AppRoute;
