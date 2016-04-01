import React, {
  StyleSheet,
  View,
  Animated,
  Text,
  Image,
} from 'react-native';

import Config from '../config';
import Kit from '../kit';

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
    let {controlHeight, control} = Config.pullRefresh,
      {pullHeight, mode, onRefresh} = this.props,
      viewHeight = pullHeight > controlHeight ? controlHeight : pullHeight,
      s,
      isEnd = viewHeight == controlHeight;

    //通知外面是否能触发刷新
    if (onRefresh) {
      onRefresh(isEnd);
    }

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
        s = {height: controlHeight};
        this.state.height = new Animated.Value(controlHeight);
        break;
    }

    let Custom = null;
    if (control) {
      Custom = control;
    }

    //
    return (
      <Animated.View
        style={[styles.wrapper, s]}>
        {Custom ? <Custom {...this.props}/> : null}
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    overflow: 'hidden',
    width: Kit.Width,
  },
});

export default RefreshControl;