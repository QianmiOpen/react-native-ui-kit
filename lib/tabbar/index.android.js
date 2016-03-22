/**
 * @flow
 */
'use strict';

import React, {
  View,
  Text,
  PixelRatio,
  StyleSheet
} from 'react-native';

import Kit from '../kit';
import Lazy from './lazy';

class TabBar extends React.Component {

  static defaultProps = {
    style: null,
    tintColor: null,
    barTintColor: null,
  };

  render () {
    return (
      <View style={styles.container}>
        <View style={styles.container}>
          {this._renderContent ()}
        </View>
        <View style={styles.tabBar}>
          {this.props.children}
        </View>
      </View>
    );
  }

  _renderContent () {
    var _children = [];
    var selectedIndex = 0;

    //遍历TabBar.Item的children
    React.Children.forEach (this.props.children, (child, index) => {
      if (child) {
        if (child.props.selected) {
          selectedIndex = index;
        }
        _children.push (child.props.children);
      }
      else {
        _children.push (null);
      }
    });

    //返回延迟加载的组件,当selected为true时,才去真正的render组件
    return _children.map ((child, i) => {
      var selected = selectedIndex == i;
      if (child) {
        return <Lazy selected={selected} component={child} key={i}/>;
      }
    });
  }
}

const styles = StyleSheet.create ({
  container: {
    flex: 1
  },
  tabBar: {
    height: Kit.Height / 14,
    //height: 200,
    flexDirection: 'row',
    backgroundColor: '#FFF',
    borderTopWidth: 1 / PixelRatio.get (),
    borderColor: '#e1e1e1'
  }
});

//exports
TabBar.Item = require ('./item');

module.exports = TabBar;
