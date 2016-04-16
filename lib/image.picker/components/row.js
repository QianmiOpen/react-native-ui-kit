import React, {
  StyleSheet,
  View,
  Image
} from 'react-native';

import IconBtn from '../../button/icon.button';
import Kit from '../../kit';

class Row extends React.Component {

  static defaultProps = {
    data: [],
  };

  state = {};

  componentDidMount () {
  }

  render () {
    let {data} = this.props;
    return (
      <View
        style={styles.container}>
        {data.map(this._renderBtn)}
      </View>
    );
  }

  _renderBtn = (item, index) => {
    let {uri} = item;
    return (
      <IconBtn
        key={index}
        direction="v"
        style={styles.btn}
        imageStyle={styles.image}
        image={uri}>
      </IconBtn>
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },

  btn: {
    flex: 1,
    padding: 10,
  },
  image: {
    width: Kit.Width / 2 - 20,
    height: 120,
  },
});

export default Row;