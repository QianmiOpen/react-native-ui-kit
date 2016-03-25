import React, {
  StyleSheet,
  View
} from 'react-native';

import {msg} from 'iflux-native';
import Popover from './popover';

class UIApp extends React.Component {

  static defaultProps = {};

  state = {
    popoverConfig: {visible: false}
  };

  componentDidMount () {
    msg
      .on ('ui.popover', this._handlePopover)
  }

  componentWillUnmount () {
    msg
      .removeEventListener ('ui.popover', this._handlePopover)
  }

  render () {
    return (
      <View
        style={styles.container}>
        {this.props.children}

        <Popover {...this.state.popoverConfig}/>
      </View>
    );
  }

  _handlePopover = (popoverConfig) => {
    console.log ('app', 'popover event coming');
    popoverConfig.visible = popoverConfig.visible != undefined ? popoverConfig.visible : true;
    this.setState ({popoverConfig});
  };
}

const styles = StyleSheet.create ({
  container: {
    flex: 1,
  }
});

export default UIApp;