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

class FormItem extends React.Component {
  static defaultProps = {};

  state = {};

  render () {
    return (
      <View
        style={[styles.view, this.props.style]}
        onLayout={this.props.onTextLayout}>

        <Text style={[styles.text, this.props.textStyle]}>
          {this.props.label}
        </Text>

        {this.props.children}
      </View>
    )
  }
}

const styles = StyleSheet.create ({
  view: {
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1 / PixelRatio.get (),
    borderBottomColor: '#e1e1e1',
  },
  text: {
    fontSize: 14,
    color: '#333'
  },
});

export default FormItem;
