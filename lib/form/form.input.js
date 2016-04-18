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
    editable: true,
    onChangeText: Kit.noop,
  };

  state = {
    isEditable: false,
  };

  componentWillReceiveProps (nextProps) {
    if (this.props.value != nextProps.value) {
      this.value = nextProps.value;
    }
  }

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
          defaultValue={this.props.value}
          style={[styles.input, this.props.inputStyle]}
          keyboardType={this.props.keyboardType}
          maxLength={this.props.maxLength}
          placeholder={this.props.placeholder}
          placeholderTextColor='#bbc1c6'
          onFocus={this._handleOnFocus}
          onChangeText={this._onChangeText}
          editable={this.props.editable}
        />
        {this.props.children}
      </FormItem>
    )
  }

  /**
   * 处理聚焦时间
   */
  _handleOnFocus = () => {
    this.input.focus();
    this.props.onFocus();
  };

  _onChangeText = (txt) => {
    this.value = txt;
    this.props.onChangeText(txt);
  };
}

const styles = StyleSheet.create({
  input: {
    padding: 0,
    marginRight: 5,
    height: 26,
    width: 150,
    fontSize: 14,
    color: '#939495',
    textAlign: 'right',
    flex: 1,
  }
});
