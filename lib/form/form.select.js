import React, {
  StyleSheet,
  View
} from 'react-native';

import Kit from '../kit';
import FormItem from './form.item';

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
      </FormItem>
    );
  }
}

const styles = StyleSheet.create ({
  container: {
    flex: 1,
  }
});

export default SelectView;