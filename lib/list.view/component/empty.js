import React, {StyleSheet, View, Image, Text} from 'react-native';

class EmptyView extends React.Component {

  static defaultProps = {};

  state = {};

  componentDidMount () {
  }

  render () {
    return (
      <View style={[styles.container, this.props.style]}>
        <View style={styles.noDataContainer}>
          <Image style={styles.face} source={require('./image/empty.png')}/>
          <Text style={styles.txt}>暂无数据</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create ({
  container: {
    flex: 1,
  },
  noDataContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  face: {
    width: 93,
    height: 93,
    marginBottom: 15
  },
  txt: {
    fontSize: 16,
    color: '#666'
  },
});

export default EmptyView;