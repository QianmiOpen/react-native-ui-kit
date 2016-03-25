import React, {
  StyleSheet,
  View,
  Animated,
} from 'react-native';

import Kit from '../kit';


class Popover extends React.Component {

  static defaultProps = {
    component: null,
    visible: false,
  };

  state = {
    topValue: new Animated.Value(0),
  };

  /**
   * 改变新属性
   */
  componentWillReceiveProps (nextProps:Object) {
    if (nextProps.visible != this.props.visible) {
      this._toggleAnimated ();
    }
  }

  componentWillMount () {
    this._toggleAnimated ();
  }

  render () {
    let top = this.state.topValue.interpolate({
      inputRange: [0, Kit.Height],
      outputRange: [Kit.Height, 0]
    });
    return (
      <Animated.View style={[styles.container, {top}]}>
        {this.props.component}
      </Animated.View>
    );
  }

  _toggleAnimated = () => {
    Animated
      .spring (this.state.topValue, {
        toValue: this.props.visible ? HEIGHT : 0,
        friction: 10,
        tension: 30
      })
      .start ();
  };
}

const styles = StyleSheet.create ({
  container: {
    flex: 1,
    width: Kit.Width,
    height: Kit.Height,
    left: 0,
    position: 'absolute',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  }
});

export
default
Popover;