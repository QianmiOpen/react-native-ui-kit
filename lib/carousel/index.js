import React from 'react';
import {StyleSheet, View, Image, PixelRatio} from 'react-native';
import ViewPager from 'react-native-viewpager';

class Carousel extends React.Component {

    static defaultProps = {
        style: null,
        imageStyle: null,
        data: [],
        dataSource: new ViewPager.DataSource({
            pageHasChanged: (p1, p2) => p1 !== p2
        })
    };

    state = {};

    componentDidMount() {
    }

    render() {
        let {style, data, dataSource} = this.props;
        return (
            <ViewPager
                style={[styles.container, style]}
                dataSource={dataSource.cloneWithPages(data)}
                renderPage={this._renderImage}
                isLoop={data.length > 1}
                autoPlay={data.length > 1}/>
        );
    }

    _renderImage = (item, rowIndex) => {
        let imageUrl = item && item.image ? item.image : item;
        return <Image key={imageUrl} source={{uri : imageUrl}} style={[styles.img, this.props.imageStyle]}/>
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
