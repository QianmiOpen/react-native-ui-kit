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

import {msg} from 'iflux-native';

import Button from './button';
import Kit from '../kit';

class ImageButton extends React.Component {

  static defaultProps = {
    onPress: Kit.noop,
    image: null,
    imageStyle: null,
    text: '',
    textStyle: null,
    direction: 'h', // h or v
  };

  state = {};

  render () {
    let {direction, image} = this.props,
      s = direction == 'h' ? styles.hView : styles.vView;
    if(typeof image == 'string'){
      image = {uri: image};
    }
    return (
      <Button
        style={this.props.style}
        onPress={this._onPress}>
        <View style={[styles.view, s]}>
          <Image style={[styles.img, this.props.imageStyle]} source={image}/>
          <Text style={[styles.text, this.props.textStyle]}>{this.props.text}</Text>
        </View>
        {this.props.children}
      </Button>
    );
  }

  _onPress = () => {
    let {onPress} = this.props;
    if (onPress && typeof onPress == 'string') {
      msg.emit('route:goToNext', {sceneName: onPress});
    }
    else if (onPress) {
      onPress();
    }
  };
}

const styles = StyleSheet.create({
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
    resizeMode: Image.resizeMode.stretch,
  },
  text: {},
});

export default ImageButton;