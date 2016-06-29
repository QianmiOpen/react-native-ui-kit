import React from 'react';
import {
  StyleSheet,
  View
} from 'react-native';

import Camera from 'react-native-camera';
import Scene from '../scene';
import Btn from '../button/button';
import Kit from '../kit';
import {msg} from 'iflux-native';

class CameraPicker extends React.Component {

  static defaultProps = {
    header: '拍照中',
    callback: Kit.noop,
  };

  state = {};

  componentDidMount () {
  }

  render () {
    let {header} = this.props;
    return (
      <Scene
        header={header}
        hasBack={true}>
        <Camera
          ref="camera"
          style={styles.camera}
          aspect={Camera.constants.Aspect.fill}>
          <Btn
            style={styles.moreBtn}
            textStyle={styles.moreBtnTxt}
            text={'拍+'}/>
        </Camera>
      </Scene>
    );
  }

  _onPress = () => {
    let {callback} = this.props;
    this.refs.camera
        .capture()
        .then((data) => {
          callback(data);
        })
        .catch(err => {
          console.error(err)
        })
        .finally(() => {
          msg.emit('route:backToLast');
        });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  camera: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },

  moreBtn: {
    backgroundColor: '#FF495A',
    padding: 4,
    width: 40,
    height: 40,
    borderRadius: 20,
    marginBottom: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  moreBtnTxt: {
    color: '#fff',
  },
});

export default CameraPicker;