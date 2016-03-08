'use strict'
// @flow

/**
 * Navigator导航中心
 */
import React, {
  View,
  StyleSheet,
} from 'react-native';

import {msg} from 'iflux-native';

import Header from './header';
import Body from './body';

/**
 */
class Scene extends React.Component {

  static defaultProps = {

    style: null,
    bodyStyle: null,

    //
    store: null,

    //头部
    header: '',
    hasBack: false,
    renderHeader: '',
    onLeftMenuPress: null
  };

  render () {
    return (
      <View style={[this.props.style, styles.container]}>
        {this._renderHeader ()}
        <Body store={this.props.store} style={this.props.bodyStyle}>
          {this.props.children}
        </Body>
      </View>
    )
  }

  _renderHeader () {
    let props = this.props;
    //
    if (props.renderHeader) {
      return props.renderHeader ();
    }
    //
    else if (props.header) {
      let brandName = props.hasBack ? null : props.header,
        title = props.hasBack ? props.header : null;
      return <Header brandName={brandName} leftTitle={title} onLeftMenuPress={this._onLeftMenuPress}></Header>;
    }
    //
    else {
      return null;
    }
  }

  _onLeftMenuPress = () => {
    if (this.props.onLeftMenuPress) {
      this.props.onLeftMenuPress ();
    }
    else if (this.props.hasBack) {
      msg.emit ('route:backToLast');
    }
  };
}

const styles = StyleSheet.create ({
  container: {
    flex: 1
  }
});

export default Scene;
