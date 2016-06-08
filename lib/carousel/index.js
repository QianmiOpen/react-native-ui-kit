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

    componentDidMount() {
    }

    render() {
        let {style, data, imageStyle} = this.props;
        return (
            <View
                style={[style]}>
                <ViewPager
                    style={[styles.container, imageStyle]}
                    dataSource={dataSource.cloneWithPages(data)}
                    renderPage={this._renderImage}
                    isLoop={true}
                    autoPlay={true}/>
            </View>
        );
    }

    _renderImage = (item) => {
        let imageUrl = item && item.image ? item.image : item;
        return <Image source={{uri : imageUrl}} style={[styles.img]}/>
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    img: {
        flex: 1,
        resizeMode: Image.resizeMode.stretch,
    }
});

export default Carousel;
