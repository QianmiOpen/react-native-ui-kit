import React, {StyleSheet, View, PixelRatio, Image, Text} from 'react-native';
import {msg} from 'iflux-native';
import BtnContainer from '../button';

class SimpleRow extends React.Component {

  static defaultProps = {
    image: null,
    title: null,
    subTitle: null,
    nextScene: null,
    nextSceneParam: {},
    onPress: null
  };

  state = {};

  componentDidMount () {
  }

  render () {
    return (
      <BtnContainer
        style={styles.rowContainer}
        onPress={() => this._onPress()}>
        <View style={styles.row}>
          {this.props.image ? <Image style={styles.rowImg} source={this.props.image}/> : null}
          {this._renderTitle()}
        </View>
        <Image style={styles.arrow} source={require('img/right.png')}/>
      </BtnContainer>
    );
  }

  _renderTitle () {
    if (this.props.subTitle) {
      return (
        <View>
          <Text style={styles.text}>{this.props.title}</Text>
          <Text style={styles.detailTxt}>{this.props.subTitle}</Text>
        </View>
      )
    }
    else {
      return (
        <Text style={styles.text}>{this.props.title}</Text>
      )
    }
  }

  _onPress () {
    if (this.props.onPress) {
      this.props.onPress ();
    }
    else if (this.props.nextScene) {
      msg.emit ('route:goToNext', {sceneName: this.props.nextScene, ...this.props.nextSceneParam});
    }
  }
}

const styles = StyleSheet.create ({
  rowContainer: {
    borderBottomWidth: 1 / PixelRatio.get (),
    borderBottomColor: '#e1e1e1',
    flexDirection: 'row',
    height: 50,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff'
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowImg: {
    width: 20,
    height: 20,
    marginRight: 8,
  },
  arrow: {
    height: 15,
    width: 8,
  },
  text: {
    fontSize: 16,
    color: '#333'
  },
  detailTxt: {
    marginTop: 3,
    marginBottom: 3,
    fontSize: 12,
    color: '#bbc1c6'
  }
});

export default SimpleRow;