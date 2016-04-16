import React, {
  ActionSheetIOS,
  View,
} from 'react-native';

export default class ActionSheet extends React.Component {
  render () {
    return (
      <View style={{flex: 1}}>
        {this.props.children}
      </View>
    );
  }

  showActionSheetWithOptions (options, onSelect) {
    ActionSheetIOS.showActionSheetWithOptions(options, onSelect);
  }
}