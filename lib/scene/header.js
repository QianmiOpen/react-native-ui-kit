'use strict'

import React, {
  Text,
  View,
  Image,
  Platform,
  StyleSheet
} from 'react-native';
import {msg} from 'iflux-native';

import Button from '../button/button';
import Kit from '../kit';
import Config from '../config';

/**
 *
 */
export default class extends React.Component {

  state = {
    isEdit: false
  };

  static defaultProps = {
    style: null,
    header: '',
    hasBack: false,
    headerStyle: null,

    left: null,
    leftStyle: null,
    right: null,
    rightStyle: null,
    center: null,
    centerStyle: null,
  };

  render () {
    let {leftStyle, rightStyle, centerStyle} = this.props,
      {defaultHeaderStyle} = Config.scene;
    return (
      <View style={[styles.container, defaultHeaderStyle, this.props.style]}>
        <View
          style={[styles.left, leftStyle]}>
          {this._renderLeft()}
        </View>
        <View
          style={[styles.center, centerStyle]}>
          {this._renderCenter()}
        </View>
        <View
          style={[styles.right, rightStyle]}>
          {this._renderRight()}
        </View>
      </View>
    );
  }

  _renderCenter () {
    let {header, center, headerStyle} = this.props,
      {defaultHeaderTextStyle} = Config.scene;
    if (center) {
      return center;
    }
    else if (header) {
      return <Text style={[styles.centerText, defaultHeaderTextStyle, headerStyle]}>{header}</Text>;
    }
  }

  _renderLeft () {
    let {hasBack, left} = this.props;
    if (left) {
      return left;
    }
    else if (hasBack) {
      return (
        <Button
          style={styles.leftBack}
          onPress={this._onPressBack}>
          <Image style={styles.image} source={require('./image/left.png')}/>
        </Button>
      );
    }
  }

  _renderRight () {
    let {right} = this.props;
    return right;
  }

  _onPressBack = () => {
    msg.emit('route:backToLast');
  };
}

var styles = StyleSheet.create({
  container: {
    paddingRight: 10,
    paddingTop: Kit.isAndroid() ? 10 : 30,
    paddingLeft: 10,
    height: Kit.isAndroid() ? 40 : 60,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#3d85cc'
  },

  image: {
    marginRight: 7,
    width: 10,
    height: 19
  },

  left: {
    flex: 1,
    alignItems: 'flex-start',
  },
  leftBack: {
    height: 19,
    width: 80,
  },

  center: {
    flex: 3,
  },
  centerText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },

  right: {
    flex: 1,
    alignItems: 'flex-end',
  },
});
