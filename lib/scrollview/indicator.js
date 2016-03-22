/**
 * @flow
 */
'use strict';

import React, {
  View,
  addons,
  Image,
  Text,
  Dimensions,
  ActivityIndicatorIOS,
  Animated,
  PixelRatio,
  StyleSheet,
} from 'react-native';

const LOADING_HEIGHT = 40;
const SCREEN_WIDTH = Dimensions.get('window').width;


class Indicator extends React.Component {
  static defaultProps = {
    mode: 'refresh',
    height: 0
  };

  constructor(props: Object) {
    super(props);
    this.state = {
      height: new Animated.Value(0)
    };
  }


  componentWillReceiveProps(nextProps: Object) {
    if (nextProps.height != this.props.height) {
      Animated.timing(this.state.height, {
        toValue: nextProps.height,
        duration: nextProps.height == 0 ? this.props.duration : 20
      }).start();
    }
  }


  render(): Object{
    // 当前的刷新状态
    // pull 正在下拉，
    // push 正在上提
    const mode = this.props.mode;

    return (
      <Animated.View style={{
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center',
        height: this.state.height
      }} >
        {!mode||mode == 'refresh' ? this._renderRefresh() : this._renderPullOrPushTip()}
      </Animated.View>
    );
  }


  _renderRefresh() {
    return (
      <View style={styles.refresh}>
        <ActivityIndicatorIOS size='small'/>
        <Text style={styles.text}>正在加载...</Text>
      </View>
    );
  }


  _renderPullOrPushTip(){
    const mode = this.props.mode;

    return (
      <View style={styles.refresh}>
        {
          mode === 'push'
            ? <Image style={styles.arrow} source={require('./image/arrow_up.png')}/>
            : <Image style={styles.arrow} source={require('./image/arrow_down.png')}/>
        }
        <Text style={styles.text}>{mode === 'push' ? '松手更新' : '下拉刷新'}</Text>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  refresh: {
    flex: 1,
    overflow: 'hidden',
    width: SCREEN_WIDTH,
    borderBottomWidth: 1 / PixelRatio.get(),
    borderColor: '#ebebeb',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    fontSize: 14,
    color: '#939495'
  },
  arrow: {
    width: 20,
    height: 20
  }
});

export {
  Indicator,
  LOADING_HEIGHT
}
