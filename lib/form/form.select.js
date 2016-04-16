import React, {
  StyleSheet,
  View
} from 'react-native';


import Kit from '../kit';
import FormItem from './form.item';
import Btn from '../button/button';

class SelectView extends React.Component {

  static defaultProps = {
    dataProvider: null,
  };

  state = {};

  componentDidMount () {
  }

  render () {
    return (
      <FormItem
        {...this.props}>
        <Btn
          onPress={this._onShowSelect}/>
      </FormItem>
    );
  }

  _onShowSelect = () => {
  };
}

const styles = StyleSheet.create ({
  container: {
    flex: 1,
  }
});

export default SelectView;