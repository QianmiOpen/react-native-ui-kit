'use strict'

import React, {
  Text,
  View,
  Image,
  Platform,
  StyleSheet
} from 'react-native';

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
    title: '',
    hasBack: false,
  };

  render () {
    let {title} = this.props;
    return (
      <View style={[styles.container, this.props.style]}>
        <View
          style={styles.left}>
        </View>
        <View
          style={styles.center}>
          <Text>{title}</Text>
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
          style={styles.leftBack}>
          <Image style={styles.image} source={require('./image/left.png')}/>
        </Button>
      );
    }
  }
}

var styles = StyleSheet.create ({
  container: {
    paddingRight: 10,
    paddingTop: Kit.isAndroid () ? 10 : 30,
    paddingLeft: 10,
    height: Kit.isAndroid () ? 40 : 60,
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
    position: 'absolute',
    left: 10,
    height: 19,
    width: 80,
    marginBottom: 10,
  },
  center: {
    flex: 3
  },
  right: {
    flex: 1
  },
});
