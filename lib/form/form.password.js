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
  Animated,
  TouchableOpacity,
  Image,
} from 'react-native';

import Kit from '../kit';

import FormItem from './form.item';

class PasswordInput extends React.Component {
  static defaultProps = {
    onFocus: Kit.noop,
    onBlur: Kit.noop,
    editable: true,
    toggleAble: true,
  };

  state = {
    isEditable: false,
    isFocus: false,
    marginLeft: new Animated.Value (0),
    isHide: true,
  };

  render () {
    return (
      <FormItem
        {...this.props}>
        <View
          style={[styles.container]}>
          <TextInput
            underlineColorAndroid="transparent"
            ref={(input) => this.input = input}
            onBlur={this._handleOnBlur}
            password={this.state.isHide}
            autoCapitalize={'none'}
            autoCorrect={false}
            value={this.props.value}
            style={[styles.input, this.props.inputStyle, Kit.isAndroid() && styles.inputAndroid]}
            textAlign={Platform.OS === 'ios' ? 'right' : 'end'}
            keyboardType={this.props.keyboardType}
            maxLength={this.props.maxLength}
            placeholder={this.props.placeholder}
            placeholderTextColor='#bbc1c6'
            onFocus={this._handleOnFocus}
            onChangeText={this.props.onChangeText}
            autoFocus={this.props.autoFocus}
            editable={this.props.editable}
          />
          {this.props.toggleAble ? this._renderToggle () : null}
        </View>
      </FormItem>
    )
  }

  _renderToggle () {
    return (
      <TouchableOpacity
        style={styles.switch}
        onPress={this._handlePwdShow}>
        <Image
          style={styles.eye}
          source={this.state.isHide ? require('./image/eye_close_grey.png') : require('./image/eye_open_blue.png')}/>
      </TouchableOpacity>
    );
  }

  /**
   * 处理聚焦时间
   */
  _handleOnFocus = () => {
    this.input.focus ();
    this.props.onFocus ();
    Animated.timing (this.state.marginLeft, {toValue: 20}).start ();
  };

  /**
   *
   * @private
   */
  _handleOnBlur = () => {
    this.props.onBlur ();
    Animated.timing (this.state.marginLeft, {toValue: 0}).start ();
  };

  _handlePwdShow = () => {
    let isHide = !this.state.isHide;
    this.setState ({isHide});
  };
}

const styles = StyleSheet.create ({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  input: {
    width: 200,
    height: 26,
    fontSize: 14,
    color: '#939495',
    paddingTop: 0,
    paddingBottom: 0,
    paddingRight: 0,
    backgroundColor: '#fff'
  },
  inputAndroid: {
    padding: 0
  },
  switch: {
    paddingLeft: 10,
    paddingTop: 5,
    height: 26,
  },
  eye: {
    width: 25,
    height: 17
  },
});

export default PasswordInput;
