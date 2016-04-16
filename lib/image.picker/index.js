import React, {
  StyleSheet,
  View,
  CameraRoll,
  NativeModules,
} from 'react-native';

import Kit from '../kit';
import UIScrollView from '../scrollview/advance.scroll.view';
import Btn from '../button/button';
import Scene from '../scene';
import Row from './components/row';

class ImagePicker extends React.Component {

  static defaultProps = {
    pageSize: 10,
    cell: 3,
    onSelect: Kit.noop,
  };

  state = {
    images: [],
    after: undefined,
    hasNext: true,
  };

  render () {
    let {images, hasNext} = this.state;
    return (
      <Scene
        header="请选择图片"
        hasBack={true}
        onMount={this._onPress}>
        <UIScrollView
          style={styles.scrollView}>
          {images.map(this._renderImage)}
        </UIScrollView>
        <Btn
          style={styles.moreBtn}
          disabled={!hasNext}
          textStyle={styles.moreBtnTxt}
          text={hasNext ? '获取更多' : '已全部获取'}/>
      </Scene>
    );
  }

  _renderImage = (data, index) => {
    return <Row data={data} key={index} onSelect={this._onSelect}/>
  };

  _onSelect = (image) => {
    this.props.onSelect(image);
  };

  _onPress = () => {
    let {after, hasNext} = this.state,
      first = this.props.pageSize;
    if (!hasNext) {
      return;
    }

    //
    CameraRoll
      .getPhotos({first, groupTypes: 'All', after})
      .then(data => {
        const assets = data.edges;
        const images = assets.map((asset) => asset.node.image);
        this.setState({
          images: Kit.splitByCount(images, 2, true),
          after: data.page_info.end_cursor,
          hasNext: data.has_next_page
        });
      });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  scrollView: {
    flex: 1,
  },

  moreBtn: {
    backgroundColor: '#FF495A',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    borderRadius: 4,
  },
  moreBtnTxt: {
    color: '#fff',
  },
});

export default ImagePicker;