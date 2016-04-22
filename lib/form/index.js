/**
 * @flow
 */
'use strict';

import React, {
  View
} from 'react-native';

import Kit from '../kit';

/**
 * Usage:
 */
class Form extends React.Component {

  static defaultProps = {
    validateMap: {},
    onChange: Kit.noop
  };

  render () {
    return (
      <View
        onChange={this._handleChange}
        style={this.props.style}>
        {this.props.children}
      </View>
    )
  }

  /**
   * handle form的field的改变
   *
   * TODO 可能onChange并不能满足我们的场景，可能还需要处理onChangeText
   */
  _handleChange = (e:Object) => {
    this.props.onChange (e);
  };
}

import TextInput from './form.input';
import FormItem from './form.item';
import DateInput from './form.date';
import TextFiled from './form.text';
import Password from './form.password';
import Select from './form.select';
import FImage from './form.image';
import Upload from './form.upload';
import Btn from './form.btn';

Form.Btn = Btn;
Form.Input = TextInput;
Form.Item = FormItem;
Form.Date = DateInput;
Form.Text = TextFiled;
Form.Password = Password;
Form.Select = Select;
Form.Image = FImage;
Form.Upload = Upload;

export default Form;
