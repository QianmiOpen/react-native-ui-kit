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
  StyleSheet
} from 'react-native';

import Kit from '../kit';
import FormItem from './form.item';

export default class Input extends React.Component {
  static defaultProps = {
    onFocus: Kit.noop,
    onBlur: Kit.noop,
    editable: true
  };

  state = {
    isEditable: false,
  };

  render () {
    return (
      <FormItem
        {...this.props}>
        <TextInput
          underlineColorAndroid="transparent"
          ref={(input) => this.input = input}
          onBlur={this.props.onBlur}
          autoCapitalize={'none'}
          autoCorrect={false}
          value={this.props.value}
          style={[styles.input, this.props.inputStyle]}
          keyboardType={this.props.keyboardType}
          maxLength={this.props.maxLength}
          placeholder={this.props.placeholder}
          placeholderTextColor='#bbc1c6'
          onFocus={this._handleOnFocus}
          onChangeText={this.props.onChange}
          editable={this.props.editable}
        />
      </FormItem>
    )
  }

  /**
   * 处理聚焦时间
   */
  _handleOnFocus = () => {
    this.input.focus ();
    this.props.onFocus ();
  };
}

const styles = StyleSheet.create ({
  view: {
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1 / PixelRatio.get (),
    borderBottomColor: '#e1e1e1'
  },
  text: {
    fontSize: 14,
    color: '#333'
  },
  input: {
    padding: 0,
    marginRight: 5,
    height: 26,
    width: 200,
    fontSize: 14,
    color: '#939495',
    backgroundColor: '#fff',
    textAlign: 'right',
  }
});
