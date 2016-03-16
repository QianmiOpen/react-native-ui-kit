import React, {StyleSheet, View, Text, Image} from 'react-native';

import SimpleRow from '../../row/simple.row';
import Button from '../../button';
import Kit from '../../kit';

class NoNetwork extends React.Component {

  static defaultProps = {
    onPress: Kit.noop
  };

  state = {};

  componentDidMount () {
  }

  render () {
    return (
      <View
        style={styles.container}>
        {this._renderSetting ()}

        <View
          style={[styles.body]}>
          <Image
            style={styles.bodyImage}
            source={require('img/no_network.png')}/>
          <Text
            style={[styles.bodyText, styles.bodyTitle]}>
            网络请求失败
          </Text>
          <Text
            style={[styles.bodyText, styles.bodySubTitle]}>
            请检查您的网络
          </Text>
          <Button
            style={[styles.button]}
            onPress={this.props.onPress}>
            <Text>重新加载</Text>
          </Button>
        </View>
      </View>
    );
  }

  _renderSetting () {
    return <SimpleRow
      style={styles.settingRow}
      titleStyle={styles.settingRowTitle}
      title="网络请求失败,请检查您的网络设置"
      onPress={this._handleSetting}/>;
  }

  _handleSetting = () => {
  };
}

const styles = StyleSheet.create ({
  container: {
    flex: 1,
  },

  settingRow: {
    backgroundColor: '#777777'
  },
  settingRowTitle: {
    color: '#fff'
  },

  body: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  bodyImage: {
    width: 96,
    height: 59,
    resizeMode: Image.resizeMode.stretch,
    marginBottom: 20,
  },
  bodyText: {
    color: '#b3b3b3',
    paddingTop: 5,
    paddingBottom: 5,
  },
  bodyTitle: {
    fontSize: 20
  },

  button: {
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#b3b3b3',
    borderRadius: 2,
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 32,
    paddingRight: 32,
  }
});

export default NoNetwork; 