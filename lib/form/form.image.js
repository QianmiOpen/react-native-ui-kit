/**
 * @flow
 */
'use strict'

import React, {
  View,
  Text,
  PixelRatio,
  Platform,
  StyleSheet,
  Image,
} from 'react-native';

import Kit from '../kit';
import FormItem from './form.item';

export default class FormImage extends React.Component {
  static defaultProps = {
    imageStyle: null,
  };

  state = {
  };

  componentWillReceiveProps (nextProps) {
    if (this.props.value != nextProps.value) {
      this.value = nextProps.value;
    }
  }

  render () {
    let {value, imageStyle} = this.props;
    return (
      <FormItem
        {...this.props}>
        {this._renderImage(value, imageStyle)}
      </FormItem>
    )
  }

  _renderImage (image, style) {
    let source;
    if(typeof image == 'string'){
      source = {uri: image}
    } else {
      source = image
    }
    return (
      <Image
        style={[styles.image, style]}
        source={image}/>
    )
  }
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
  }
});
