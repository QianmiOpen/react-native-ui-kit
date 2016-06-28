/**
 * @flow
 */
'use strict';

import React, {
    TouchableOpacity,
    View,
    Text,
    StyleSheet,
    Image,
} from 'react-native';

import Kit from '../kit';
import {msg} from 'iflux-native';
import Config from './config';

class Button extends React.Component {
    static defaultProps = {
        style: null,
        text: null,
        textStyle: null,
        disabled: false,
        backgroundImage: null,
        onPress: Kit.noop
    };

    render () {
        let {disabled, style, onPress, backgroundImage} = this.props,
            viewStyle = disabled ? styles.disableContainer : style,
            body = !onPress ? this._renderView(viewStyle) : this._renderButton();

        if (backgroundImage) {
            return (
                <Image
                    style={[styles.containerImage, this.props.style]}
                    source={backgroundImage}>
                    {body}
                </Image>
            )
        }
        else {
            return body;
        }
    }

    _renderView () {
        return (
            <View
                style={[styles.container, this.props.style]}>
                {this._renderContent()}
            </View>
        )
    }

    _renderButton () {
        return (
            <TouchableOpacity
                style={[styles.container, this.props.style]}
                onPress={this._onPress}>
                {this._renderContent()}
            </TouchableOpacity>
        );
    }

    _renderContent () {
        let {text, children, textStyle} = this.props;
        if (children) {
            return children;
        }
        else {
            return <Text style={[styles.text, textStyle]}>{text}</Text>
        }
    }

    _onPress = () => {
        let {onPress} = this.props;
        if (onPress && typeof onPress == 'string') {
            Kit.routeNext({sceneName: onPress});
        }
        else if (onPress) {
            onPress();
        }
    };
}

const styles = StyleSheet.create({

    //
    container: {
    },

    //
    disableContainer: {},
    text: {
        textAlign: 'center',
        backgroundColor: 'transparent',
    },

    //
    containerImage: {
        flex: 1,
        resizeMode: Image.resizeMode.stretch,
    },
});

export default Button;
