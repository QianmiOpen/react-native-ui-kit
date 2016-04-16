import React, {
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

  static childContextTypes = {
    actionSheet: PropTypes.func,
  };

  componentDidMount () {
    msg
      .on('ui.popover', this._handlePopover)
  }

  componentWillUnmount () {
    msg
      .removeEventListener('ui.popover', this._handlePopover)
  }

  getChildContext () {
    return {
      actionSheet: () => this.refs.actionSheet,
    }
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
    console.log('app', 'popover event coming');
    popoverConfig.visible = popoverConfig.visible != undefined ? popoverConfig.visible : true;
    this.setState({popoverConfig});
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});

export default UIApp;