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
  };

  state = {};

  componentDidMount () {
  }

  render () {
    let {pullHeight} = this.props,
      style = Config.pullRefresh.defaultStyle;
    return (
      <View
        style={[styles.container, style, {height: pullHeight}]}>
        {this._renderContent(pullHeight)}
      </View>
    );
  }

  _renderContent = (h) => {
    if (h > 0) {
      return (
        <Text>你得自己实现这个</Text>
      );
    }
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eee',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default RefreshControl;