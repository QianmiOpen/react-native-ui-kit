/**
 * @flow
 */
'use strict';

import React, {
    TouchableOpacity,
    View,
    Text,
    StyleSheet,
} from 'react-native';

import Kit from '../kit';
import {msg} from 'iflux-native';

class Button extends React.Component {
    static defaultProps = {
        style: null,
        text: null,
        textStyle: null,
        disabled: false,
        onPress: Kit.noop
    };

    render() {
        let {disabled, style, onPress} = this.props,
            viewStyle = disabled ? styles.disableContainer : style;
        if (disabled || !onPress) {
            return this._renderView(viewStyle);
        }
        else {
            return this._renderButton();
        }
    }

    _renderView() {
        return (
            <View
                style={this.props.style}>
                {this._renderContent()}
            </View>
        )
    }

    _renderButton() {
        return (
            <TouchableOpacity
                style={[this.props.style]}
                onPress={this._onPress}>
                {this._renderContent()}
            </TouchableOpacity>
        );
    }

    _renderContent() {
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
            msg.emit('route:goToNext', {sceneName: onPress});
        }
        else if (onPress) {
            onPress();
        }
    };
}

const styles = StyleSheet.create({
    disableContainer: {},
    text: {
        textAlign: 'center',
    }
});

export default Button;
