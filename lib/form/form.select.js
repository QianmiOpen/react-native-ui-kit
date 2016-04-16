import React, {
  StyleSheet,
  View
} from 'react-native';

import Kit from '../kit';
import FormItem from './form.item';
import Btn from '../button/button';
import {msg} from 'iflux-native';

class SelectView extends React.Component {

  static defaultProps = {
    dataProvider: [],
  };

  state = {
    text: '',
  };

  componentDidMount () {
  }

  render () {
    let {text} = this.state;
    return (
      <FormItem
        {...this.props}>
        <Btn
          style={styles.btn}
          textStyle={styles.btnTxt}
          onPress={this._onShowSelect}
          text={text}/>
      </FormItem>
    );
  }

  _onShowSelect = () => {
    let {dataProvider} = this.props;
    options = dataProvider.map((item, index) => {
      let handler = () => this._onSelect(index);
      if (typeof item == 'string') {
        return {label: item, handler};
      }
      else {
        return Object.assign({handler}, item);
      }
    });
    options.push('取消');
    msg.emit('ui.actionSheet', options);
  };

  _onSelect = (index) => {
    let {dataProvider} = this.props,
      text = dataProvider[index];
    this.setState({text: text});
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  btn: {
    flex: 1,
    height: 26,
    width: 200,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },

  btnTxt: {
    color: '#939495',
  }
});

export default SelectView;