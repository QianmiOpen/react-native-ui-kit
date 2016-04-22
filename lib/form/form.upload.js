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
  NativeModules,
} from 'react-native';

import Kit from '../kit';
import FormItem from './form.item';
import Btn from '../button/button';
import {msg} from 'iflux-native';

export default class Upload extends React.Component {

  static defaultProps = {};

  state = {
    image: {},
  };

  render () {
    let {imageStyle} = this.props,
      {image} = this.state;
    return (
      <FormItem
        {...this.props}>
        <Btn
          style={styles.btn}
          onPress={this._onPress}>
          <Image
            style={[styles.image, imageStyle]}
            source={image}/>
        </Btn>
        {this.props.children}
      </FormItem>
    )
  }

  _onPress = () => {
    NativeModules.ImagePickerManager.showImagePicker({
      title: '选择图片上传',
      cancelButtonTitle: '取消',
      takePhotoButtonTitle: '拍新的照片',
      chooseFromLibraryButtonTitle: '已有照片中选择',
    }, this._onSelect)
  };

  _onSelect = (response) => {
    if (response.didCancel) {
      console.log('User cancelled image picker');
    }
    else if (response.error) {
      console.log('ImagePickerManager Error: ', response.error);
    }
    else if (response.customButton) {
      console.log('User tapped custom button: ', response.customButton);
    }
    else {
      let image = {uri: 'data:image/jpeg;base64,' + response.data};
      this.setState({image});
    }
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

  image: {
    resizeMode: Image.resizeMode.stretch,
  },

  btn: {
    flex: 1,
    width: 200,
    alignItems: 'flex-end',
  }
});
