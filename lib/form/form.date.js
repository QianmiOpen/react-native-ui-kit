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
import Button from '../button/button';

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
        <View
          style={styles.inputContainer}>
          <Date
            mode={this.props.mode}
            date={this.props.value}
            visible={this.state.show}
            onSubmit={this._handleOnChange}/>
          <Button
            text={this.state.value}
            style={[styles.input, this.props.inputStyle]}
            onPress={this._handleOnFocus}/>
        </View>
      </FormItem>
    );
  }

  _handleOnFocus = () => {
    this.setState ({show: true});
  };

  _handleOnChange = ({date}) => {
    this.setState ({show: false, value: date});
  };
}

const styles = StyleSheet.create ({
  inputContainer: {
  },
  input: {
    height: 26,
    width: 200,
  },
  inputText: {
    fontSize: 14,
    color: '#939495',
    textAlign: 'right',
  },
});

export default DateInput;