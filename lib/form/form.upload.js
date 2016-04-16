/**
 * @flow
 */
'use strict'

import React, {
  View,
  Text,
  PixelRatio,
  TextInput,
  Platform,
  StyleSheet,
  Image,
} from 'react-native';

import Kit from '../kit';
import FormItem from './form.item';
import Btn from '../button/button';
import {msg} from 'iflux-native';

export default class Upload extends React.Component {
  static defaultProps = {
    way: ''
  };

  state = {};

  render () {
    return (
      <FormItem
        {...this.props}>
        <Btn
          style={styles.btn}
          onPress={this._onPress}>
          <Image/>
        </Btn>
        {this.props.children}
      </FormItem>
    )
  }

  _onPress = () => {
    let {way} = this.props;
    switch (way) {
      case 'picker':
        this._goToImagePicker();
        break;
      case 'camera':
        this._goToCameraPicker();
        break;
      default:
        msg.emit('ui.actionSheet', [
          {label: '从相册获取', handler: this._goToImagePicker},
          {label: '从相机获取', handler: this._goToCameraPicker},
          '放弃'
        ]);
    }
  };

  _goToImagePicker = () => {
    msg.emit('route:goToNext', {sceneName: 'ImagePicker', callback: this._onSelectImage});
  };

  _goToCameraPicker = () => {
    msg.emit('route:goToNext', {sceneName: 'CameraPicker', callback: this._onSelectImage});
  };

  _onSelectImage = (image) => {
    console.log(image);
  };
}

const styles = StyleSheet.create({
  view: {
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1 / PixelRatio.get(),
    borderBottomColor: '#e1e1e1'
  },

  btn: {
    flex: 1,
    height: 26,
    width: 200,
    backgroundColor: '#fff',
  }
});
