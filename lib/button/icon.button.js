/**
 * @flow
 */
'use strict';

import React, {
  StyleSheet,
  View,
  Image,
  Text
} from 'react-native';

import Button from './button';
import Kit from '../kit';

class ImageButton extends React.Component {

  static defaultProps = {
    onPress: Kit.noop,
    image: null,
    text: '',
    textStyle: null,
    direction: 'h', // h or v
  };

  state = {};

  render () {
    let {direction} = this.props,
      s = direction == 'h' ? styles.hView : styles.vView;
    return (
      <Button
        onPress={this.props.onPress}>
        <View style={[styles.view, s]}>
          <Image style={styles.img} source={this.props.image}/>
          <Text style={[styles.text, this.props.textStyle]}>{this.props.text}</Text>
        </View>
      </Button>
    );
  }
}

const styles = StyleSheet.create ({
  view: {
    alignItems: 'center'
  },
  hView: {
    flexDirection: 'row',
  },
  vView: {
    flexDirection: 'column'
  },
  img: {
    width: 20,
    height: 20,
    marginRight: 5
  },
  text: {
    fontSize: 14,
    color: '#939495'
  },
});

export default ImageButton;