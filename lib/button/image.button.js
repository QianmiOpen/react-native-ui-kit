import React from 'react';
import {
    StyleSheet,
    View,
    Image,
    Text
} from 'react-native';

import {msg} from 'iflux-native';

import Button from './button';
import Kit from '../kit';

class ImageButton extends React.Component {

    static defaultProps = {
        onPress: Kit.noop,
        image: null,
        imageStyle: null,
    };

    state = {};

    render() {
        let {image} = this.props;
        if (typeof image == 'string') {
            image = {uri: image};
        }
        return (
            <Button
                style={this.props.style}
                onPress={this._onPress}>
                <Image
                     style={[styles.img, this.props.imageStyle]} 
                     source={image}/>
            </Button>
        );
    }

    _onPress = () => {
        let {onPress} = this.props;
        if (onPress && typeof onPress == 'string') {
            msg.emit('route:goToNext', {sceneName: onPress});
        }
        else if (onPress) {
            onPress();
        }
    };
}

const styles = StyleSheet.create({
    img: {
        resizeMode: Image.resizeMode.cover,
    },
});

export default ImageButton;