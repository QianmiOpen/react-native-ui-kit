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
    debugger;
    msg
      .on ('ui.popover', this._handlePopover)
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
    debugger;
    console.log('app', 'popover event coming');
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