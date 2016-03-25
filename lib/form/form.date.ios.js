/**
 * @flow
 */
import React, {
  View,
  Text,
  TextInput,
  Platform,
  StyleSheet,
  DatePickerIOS,
} from 'react-native';

import Kit from '../kit';
import FormItem from './form.item';
import Date from '../date';

class DateInput extends React.Component {

  static defaultProps = {
    mode: 'date',
  };

  state = {
    show: false,
    value: this.props.value,
  };

  render () {
    return (
      <FormItem
        {...this.props}>
        <TextInput
          value={this.state.value}
          style={[styles.input, this.props.inputStyle]}
          onFocus={this._handleOnFocus}/>

        <Date
          mode={this.props.mode}
          visible={this.state.show}
          onSubmit={this._handleOnChange}/>
      </FormItem>
    );
  }

  _handleOnFocus = () => {
    this.setState ({show: true});
  };

  _handleOnChange = (value) => {
    this.setState ({value});
  };
}

const styles = StyleSheet.create ({
  input: {
    height: 26,
    width: 200,
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 20,
    textAlign: 'right',
  },
});

export default DateInput;