import React, {
  StyleSheet,
  View
} from 'react-native';

import UIKit from '../kit';
import UIBtn from '../button/button';
import Config from './config';

class ButtonGroup extends React.Component {

  static defaultProps = {
    style: null,
    defaultStyle: null,
    selectStyle: null,
    defaultTextStyle: null,
    selectTextStyle: null,

    dataSource: [],
    onSelect: UIKit.noop,
  };

  state = {
    selectIndex: 0,
  };

  componentDidMount () {
  }

  render () {
    let {dataSource, style} = this.props;
    return (
      <View
        style={[styles.container, Config.style, style]}>
        {dataSource.map(this._renderBtn)}
      </View>
    );
  }

  _renderBtn = (item, index) => {
    let text = item.text || item,
      {selectIndex} = this.state,
      isSelect = selectIndex == index,
      {defaultStyle, selectStyle, defaultTextStyle, selectTextStyle} = this.props,
      s = [],
      st = [];
    if (isSelect) {
      s.push(styles.selectBtn, Config.selectStyle, selectStyle);
      st.push(styles.selectBtnTxt, Config.selectStyleTxt, selectTextStyle);
    }
    else {
      s.push(Config.defaultStyle, defaultStyle);
      st.push(Config.defaultTextStyle, defaultTextStyle);
    }

    //
    return (
      <UIBtn
        key={index}
        style={[styles.btn, s]}
        text={text}
        textStyle={[styles.btnTxt, st]}
        onPress={() => this._onPress(item, index)}/>
    );
  };

  _onPress = (item, selectIndex) => {
    this.setState({selectIndex});
    this.props.onSelect(selectIndex, item);
  };
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderColor: '#eee',
    borderTopWidth: 1,
    borderBottomWidth: 1,
  },

  btn: {
    flex: 1,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnTxt: {
    fontSize: 12,
    color: '#999',
  },

  selectBtn: {
    borderBottomWidth: 1,
    borderColor: '#FF495A'
  },
  selectBtnTxt: {
    color: '#FF495A',
  },
});

export default ButtonGroup;
