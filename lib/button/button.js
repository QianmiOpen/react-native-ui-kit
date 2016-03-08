/**
 * @flow
 */
'use strict';

import React, {
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
  View
} from 'react-native';

//just do nothing
const noop = () => {};


/**
 * 公共的button的容器,主要是屏蔽iOS和Android的区别
 *
 * TouchableOpacity不是在Android上面不可以用,是因为
 * TouchableOpacity是通过Animated.View模拟出来的,在Android
 * 上面会有延时,响应不够快速.
 */
export default class BtnContainer extends React.Component {
  static defaultProps = {
    /*自定义按钮样式*/
    style: {},
    /*按钮press的回调*/
    onPress: noop
  };


  render() {
    if (Platform.OS === 'ios') {
      return (
        <TouchableOpacity
          style={this.props.style}
          onPress={this.props.onPress}>
          {this.props.children}
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableNativeFeedback
          onPress={this.props.onPress}>
          <View style={this.props.style}>
            {this.props.children}
          </View>
        </TouchableNativeFeedback>
      );
    }
  }
}
