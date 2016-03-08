/**
 * Form
 * @flow
 */
import React, {
  View
} from 'react-native';

//just do nothing.
const noop = (e) => {};

/**
 * Usage:
 */
class Form extends React.Component {
  /**
   * 默认属性
   */
  static defaultProps = {
    onChange: noop
  };


  render() {
    return (
      <View onChange={this._handleChange} style={this.props.style}>
        {this.props.children}
      </View>
    )
  }


  /**
   * handle form的field的改变
   *
   * TODO 可能onChange并不能满足我们的场景，可能还需要处理onChangeText
   */
  _handleChange = (e: Object) => {
    this.props.onChange(e);
  };
}

import TextInput from './text-input';
import DateInput from './date-input';
import TextFiled from './text-field';


//输入框
Form.Input = TextInput;
//日期控件
Form.Date = DateInput;
//只读组件
Form.Text = TextFiled;

export default Form;
