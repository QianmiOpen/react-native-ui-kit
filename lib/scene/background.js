import React, { Component } from 'react';
import {
    View,
    Image,
    StyleSheet,
} from 'react-native';

import Kit from '../kit';

/**
 */
class Background extends Component {

    static defaultProps = {
        style: null,
        image: null,
    };

    state = {
    };

    constructor(props = {}) {
        super(props);
    }

    render() {
        return (
            <Image source={this.props.image} style={[styles.image, this.props.style]}>
                {this.props.children}
            </Image>
        );
    }
}

const styles = StyleSheet.create({
    image: {
        width: Kit.Width,
        height: Kit.Height,
        resizeMode: 'stretch',
    }
});

export default Background;
