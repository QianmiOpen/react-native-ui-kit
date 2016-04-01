'use strict'
// @flow

/**
 * Navigator导航中心
 */
import React, {
  View,
  StyleSheet,
  InteractionManager,
  Image,
} from 'react-native';

import {msg} from 'iflux-native';

import Header from './header';
import Body from './body';
import Kit from '../kit';
import Config from '../config';

/**
 */
class Scene extends React.Component {

  static defaultProps = {

    style: null,
    headerStyle: null,
    bodyStyle: null,
    backgroundImage: null,

    //
    onMount: null,

    //@see QMConst.Loading
    loading: null,

    //头部
    header: '',
    hasBack: false,
    renderHeader: '',
    onBackHandler: null
  };

  componentWillMount () {
    if (this.props.onMount) {
      InteractionManager.runAfterInteractions (this.props.onMount);
    }
  }

  render () {
    return (
      <View style={[this.props.style, styles.container]}>
        {this._renderWrapper ()}
      </View>
    )
  }

  _renderWrapper () {
    if (this.props.backgroundImage) {
      return (
        <Image source={this.props.backgroundImage} style={styles.wrapperImage}>
          {this._renderHeader ()}
          {this._renderBody ()}
        </Image>
      );
    }
    else {
      return (
        <View style={styles.wrapper}>
          {this._renderHeader ()}
          {this._renderBody ()}
        </View>
      );
    }
  }

  _renderBody () {
    return (
      <Body
        loading={this.props.loading}
        style={this.props.bodyStyle}
        onNetworkBack={this.props.onMount}>
        {this.props.children}
      </Body>
    );
  }

  _renderHeader () {
    let props = this.props;
    let style = props.headerStyle || Config.scene.defaultHeaderStyle;
    let txtStyle = props.headerTextStyle || Config.scene.defaultHeaderTextStyle;
    //
    if (props.renderHeader) {
      return props.renderHeader ();
    }
    //
    else if (props.header) {
      return <Header style={style}  header={props.header} headerStyle={txtStyle} hasBack={props.hasBack}></Header>;
    }
    //
    else {
      return null;
    }
  }

  _onLeftMenuPress = () => {
    if (this.props.onBackHandler) {
      this.props.onBackHandler ();
    }
    else if (this.props.hasBack) {
      msg.emit ('route:backToLast');
    }
  };
}

const styles = StyleSheet.create ({
  container: {
    flex: 1
  },
  wrapper: {
    flex: 1
  },
  wrapperImage: {
    width: Kit.Width,
    height: Kit.Height
  }
});

Scene.Body = Body;
export default Scene;
