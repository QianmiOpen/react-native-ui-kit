import React from 'react';
import {
  StyleSheet,
  View,
  PropTypes,
} from 'react-native';

import {msg} from 'iflux-native';
import Popover from './popover';
import ActionSheet from './actionsheet';

class UIApp extends React.Component {

  static defaultProps = {};

  state = {
    popoverConfig: {visible: false}
  };

  static childContextTypes = {};

  componentDidMount () {
    msg
      .on('ui.popover', this._handlePopover)
      .on('ui.actionSheet', this._handlerActionSheet)
  }

  componentWillUnmount () {
    msg
      .removeListener('ui.popover', this._handlePopover)
      .removeListener('ui.actionSheet', this._handlerActionSheet)
  }

  getChildContext () {
  }

  render () {
    return (
      <View
        style={styles.container}>
        <ActionSheet ref="actionSheet">
          {this.props.children}
        </ActionSheet>

        <Popover {...this.state.popoverConfig}/>
      </View>
    );
  }

  _handlePopover = (popoverConfig) => {
    popoverConfig.visible = popoverConfig.visible != undefined ? popoverConfig.visible : true;
    this.setState({popoverConfig});
  };

  _handlerActionSheet = (buttonOptions) => {
    let options = buttonOptions.map((i) => i.label || i),
      cancelButtonIndex = buttonOptions.length - 1;
    this.refs.actionSheet.showActionSheetWithOptions({options, cancelButtonIndex}, selectIndex => {
      let handler = buttonOptions[selectIndex].handler;
      if (handler) {
        handler();
      }
    });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});

export default UIApp;