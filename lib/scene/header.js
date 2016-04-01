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
  };

  render () {
    let {header, headerStyle} = this.props;
    return (
      <View style={[styles.container, this.props.style]}>
        <View
          style={styles.left}>
          {this._renderLeft()}
        </View>
        <View
          style={styles.center}>
          <Text style={[styles.centerText, headerStyle]}>{header}</Text>
        </View>
        <View
          style={styles.right}>
        </View>
      </View>
    );
  }

  _renderLeft () {
    let {hasBack} = this.props;
    if (hasBack) {
      return (
        <Button
          style={styles.leftBack}
          onPress={this._onPressBack}>
          <Image style={styles.image} source={require('./image/left.png')}/>
        </Button>
      );
    }
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
    justifyContent: 'space-between',
    backgroundColor: '#3d85cc'
  },

  image: {
    marginRight: 7,
    width: 10,
    height: 19
  },

  left: {
    flex: 1,
  },
  leftBack: {
    height: 19,
    width: 80,
  },
  center: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerText: {
    color: '#fff',
    fontSize: 16
  },
  right: {
    flex: 1
  },
});
