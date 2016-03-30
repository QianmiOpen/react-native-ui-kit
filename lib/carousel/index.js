import React, {StyleSheet, View, Image, PixelRatio} from 'react-native';
import ViewPager from 'react-native-viewpager';

const dataSource = new ViewPager.DataSource({
  pageHasChanged: (p1, p2) => p1 !== p2
});

class Carousel extends React.Component {

  static defaultProps = {
    style: null,
    imageStyle: null,
    data: []
  };

  state = {};

  componentDidMount () {
  }

  render () {
    let {style, data} = this.props;
    return (
      <ViewPager
        style={[styles.container, style]}
        dataSource={dataSource.cloneWithPages(data)}
        renderPage={this._renderImage}
        isLoop={true}
        autoPlay={true}/>
    );
  }

  _renderImage = (image, index) => {
    let {imageStyle} = this.props;
    return <Image key={index} source={{uri : image}} style={[styles.view, styles.img, imageStyle]}/>
  };
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderBottomWidth: 1 / PixelRatio.get(),
  },
  img: {
    resizeMode: Image.resizeMode.stretch,
  }
});

export default Carousel;
