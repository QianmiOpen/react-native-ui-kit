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
import Config from '../config';

class FormItem extends React.Component {
  static defaultProps = {
    label: null,
    icon: null,
  };

  state = {};

  render () {
    let {defaultLeftStyle, defaultRightStyle} = Config.form;
    return (
      <View
        style={[styles.view, this.props.style]}
        onLayout={this.props.onTextLayout}>
        <View
          style={[styles.leftContainer, defaultLeftStyle]}>
          {this._renderLeft()}
        </View>
        <View
          style={[styles.rightContainer, defaultRightStyle]}>
          {this.props.children}
        </View>
      </View>
    )
  }

  _renderLeft () {
    let {label, icon} = this.props,
      {defaultLabelStyle} = Config.form;
    if (label) {
      return (
        <Text
          numberOfLines={1}
          style={[styles.text, defaultLabelStyle, this.props.textStyle]}>
          {this.props.label}
        </Text>
      );
    }
    else if (icon) {
      return (
        <Image style={[styles.text, this.props.textStyle]}/>
      );
    }
  }
}

const styles = StyleSheet.create({
  view: {
    padding: 10,
    flexDirection: 'row',
    borderBottomWidth: 1 / PixelRatio.get(),
    borderBottomColor: '#e1e1e1',
    alignItems: 'center',
  },
  text: {
    fontSize: 14,
    color: '#333'
  },

  leftContainer: {
    flex: 2,
  },
  rightContainer: {
    flex: 8,
    flexDirection: 'row',
  },
});

export default FormItem;
