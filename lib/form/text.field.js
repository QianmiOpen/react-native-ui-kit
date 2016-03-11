/**
 * @flow
 */
import React, {
  View,
  Text,
  PixelRatio,
  TouchableWithoutFeedback,
  StyleSheet
} from 'react-native';

const noop = () => {};

export default class TextField extends React.Component {
  static defaultProps = {
    onPress: noop
  };

  render() {
    return (
      <View style={[styles.view, this.props.style]}>
        <Text style={[styles.text, this.props.textStyle]}>
          {this.props.label}
        </Text>
        <TouchableWithoutFeedback onPress={this._handlePress}>
          <View style={styles.inputBox}>
            <Text numberOfLines={2} style={[styles.input, this.props.textColor]}>{this.props.text}</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }

  _handlePress = () => {
    this.props.onPress();
  };
}

const styles = StyleSheet.create({
  view: {
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1 / PixelRatio.get(),
    borderBottomColor: '#e1e1e1'
  },
  text: {
    fontSize: 14,
    color: '#333'
  },
  inputBox: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    height: 32,
    width: 200,
    marginRight: 5
  },
  input: {
    textAlign: 'right',
    fontSize: 14,
    color: '#bbc1c6',
  }
});
