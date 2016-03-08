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


const androidPropties = {};
if (Platform.OS === 'android') {
  androidPropties['underlineColorAndroid'] = 'transparent';
}
const noop = () => {};


export default class Input extends React.Component {
  static defaultProps = {
    onFocus: noop,
    onBlur: noop,
    editable: true
  };

  constructor(props: Object) {
    super(props);
    this.state = {
      isEditable: false
    }
  }

  render() {

    return (
      <View
        style={styles.view}
        onLayout={this.props.onTextLayout}>

        {/*label*/}
        <Text style={[styles.text, this.props.textStyle]}>
          {this.props.text}
        </Text>

        {/*text-input*/}
        <TextInput
          {...androidPropties}
          ref={(input) => this.input = input}
          onBlur={this.props.onBlur}
          autoCapitalize={'none'}
          autoCorrect={false}
          value={this.props.value}
          style={[styles.input, this.props.inputStyle, Platform.OS==='android' && {
              padding: 0
            }]}
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
      </View>
    )
  }

  /**
   * 处理聚焦时间
   */
  _handleOnFocus = () => {
    this.input.focus();
    this.props.onFocus();
  };
}

const styles = StyleSheet.create({
  view: {
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth:  1 / PixelRatio.get(),
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
  }
});
