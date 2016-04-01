import React, {
  StyleSheet,
  View,
  Animated,
  Text,
} from 'react-native';

import Config from '../config';

class RefreshControl extends React.Component {

  static defaultProps = {
    pullHeight: 0,
    mode: 'normal', // normal pull refresh
  };

  state = {
    height: new Animated.Value(0),
  };

  componentWillReceiveProps (nextProps) {
    if (nextProps.mode == 'normal') {
      Animated
        .timing(this.state.height, {
          toValue: 0,
        })
        .start();
    }
  }

  render () {
    let h = this.props.pullHeight,
      mode = this.props.mode,
      viewHeight = h > Height ? Height : h,
      imageStyle = {width: viewHeight, height: viewHeight},
      txt = '下拉刷新',
      s,
      isEnd = viewHeight == Height;

    //通知外面是否能触发刷新
    this.props.onRefresh(isEnd);

    //
    switch (mode) {
      case 'normal':
        s = {height: this.state.height};
        break;
      case 'pull':
        s = {height: viewHeight};
        this.state.height = new Animated.Value(viewHeight);
        break;
      case 'refresh':
        s = {height: Height};
        this.state.height = new Animated.Value(Height);
        txt = '即将刷新';
        break;
    }

    //console.log(s);

    //
    return (
      <Animated.View
        style={[styles.wrapper, s]}>
        <Image
          style={[styles.wrapperImg, imageStyle]}
          />
        <View>
          <Text style={styles.wrapperTopTxt}>{txt}</Text>
        </View>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  wrapperImg: {
    resizeMode: Image.resizeMode.stretch,
    marginRight: 10,
  },
  wrapperTopTxt: {
    marginBottom: 4,
  },
});

export default RefreshControl;