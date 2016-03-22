import React, {StyleSheet, View, PixelRatio, Text, TouchableHighlight} from 'react-native';
import Kit from '../kit';

class ButtonGroup extends React.Component {

  static defaultProps = {
    style: null,
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
          {this.props.btnList.map ((btnInfo, btnIndex) => {
            return this._renderButton (btnInfo, btnIndex, selectIndex)
          })}
        </View>
      </View>
    );
  }

  _renderButton (btnInfo, btnIndex, selectIndex) {
    let isSelect = btnIndex == selectIndex;
    return (
      <TouchableHighlight
        key={btnIndex}
        underlayColor={'#326da7'}
        onPress={() => this._onPress(btnIndex, btnIndex)}
        style={[styles.tabButton, isSelect && styles.tabButtonCur]}>
        <Text
          numberOfLines={1}
          style={[styles.txt, isSelect && styles.txtCur]}>
          {btnInfo.text ? btnInfo.text : btnInfo}
        </Text>
      </TouchableHighlight>
    );
  }

  _onPress = (btnInfo, btnIndex) => {
    this.setState ({selectIndex: btnIndex});
    if (btnIndex.onPress) {
      btnIndex.onPress ();
    }
    if (this.props.onChange) {
      this.props.onChange (btnIndex, btnInfo);
    }
  };
}

const styles = StyleSheet.create ({
  tab: {},
  tabBtn: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1 / PixelRatio.get (),
    borderColor: '#3d85cc',
    borderRadius: 3,
    overflow: 'hidden'
  },
  tabButton: {
    flex: 1,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabButtonCur: {backgroundColor: '#3d85cc'},
  txtCur: {color: '#fff'},
  txt: {
    fontSize: 14,
    color: '#326da7'
  },
});

export default ButtonGroup;