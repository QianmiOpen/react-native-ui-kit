import React, {StyleSheet, View, PixelRatio, Text, TouchableOpacity} from 'react-native';
import Kit from '../kit';

class ButtonGroup extends React.Component {

  static defaultProps = {
    style: null,
    defaultStyle: null,
    defaultTextStyle: null,
    selectStyle: null,
    selectTextStyle: null,
    onChange: Kit.noop,
    btnList: [],
  };

  state = {
    selectIndex: 0,
  };

  componentDidMount () {
  }

  render () {
    let {selectIndex} = this.state;
    return (
      <View style={[styles.tab, this.props.style]}>
        <View style={styles.tabBtn}>
          {this.props.btnList.map((btnInfo, btnIndex) => {
            return this._renderButton(btnInfo, btnIndex, selectIndex)
          })}
        </View>
      </View>
    );
  }

  _renderButton (btnInfo, btnIndex, selectIndex) {
    let isSelect = btnIndex == selectIndex,
      {defaultStyle, defaultTextStyle, selectStyle, selectTextStyle} = this.props;
    return (
      <TouchableOpacity
        key={btnIndex}
        onPress={() => this._onPress(btnIndex, btnIndex)}
        style={[styles.tabButton, isSelect ? selectStyle : defaultStyle]}>
        <Text
          numberOfLines={1}
          style={[styles.txt, isSelect ? selectTextStyle : defaultTextStyle]}>
          {btnInfo.text ? btnInfo.text : btnInfo}
        </Text>
      </TouchableOpacity>
    );
  }

  _onPress = (btnInfo, btnIndex) => {
    this.setState({selectIndex: btnIndex});
    if (btnIndex.onPress) {
      btnIndex.onPress();
    }
    if (this.props.onChange) {
      this.props.onChange(btnIndex, btnInfo);
    }
  };
}

const styles = StyleSheet.create({
  tab: {},
  tabBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden'
  },
  tabButton: {
    flex: 1,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  txt: {
    fontSize: 14,
    color: '#326da7'
  },
});

export default ButtonGroup;