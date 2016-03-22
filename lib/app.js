import React, {StyleSheet, View} from 'react-native';

class UIApp extends React.Component {

  static defaultProps = {};

  state = {};

  componentDidMount () {
  }

  render () {
    return (
      <View
        style={styles.container}>
        {this.props.children}
      </View>
    );
  }
}

const styles = StyleSheet.create ({
  container: {
    flex: 1,
  }
});

export default UIApp;