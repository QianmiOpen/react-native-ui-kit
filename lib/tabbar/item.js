import React from 'react';
import  {
  TouchableWithoutFeedback,
  View,
  Text,
  Image,
  StyleSheet
} from 'react-native';

import Kit from '../kit';
import Badge from './badge';

class TabBarItem extends React.Component {

  static defaultProps = {
    title: '',
    icon: null,
    selectedIcon: null,
    onPress: Kit.noop,
    selected: false,
  };

  render () {
    let {selected} = this.props,
      s = {color: selected ? '#418cd6' : 'gray'};
    return (
      <TouchableWithoutFeedback
        onPress={this.props.onPress}>
        <View
          style={styles.container}>
          {this._getImage ()}
          <Text
            style={[styles.title, s]}>
            {this.props.title}
          </Text>
        </View>
      </TouchableWithoutFeedback>
    );
  }

  /**
   * 获取图片
   */
  _getImage () {
    if (!this.props.selectedIcon && !this.props.icon) {
      return null;
    }

    /*选中的图片*/
    if (this.props.selected) {
      return (
        <View>
          <Image style={styles.img} source={this.props.selectedIcon}/>
          {this.props.badge ? <Badge count={this.props.badge}/> : null}
        </View>
      );
    }
    else {
      return (
        <View>
          <Image style={styles.img} source={this.props.icon}/>
          {this.props.badge ? <Badge count={this.props.badge}/> : null}
        </View>
      );
    }
  }
}

const styles = StyleSheet.create ({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    color: 'gray',
    fontSize: 10
  },
  img: {
    width: 20,
    height: 20,
    resizeMode: Image.resizeMode.stretch
  }
});

module.exports = TabBarItem;
