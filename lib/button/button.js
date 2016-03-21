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


class Button extends React.Component {
    static defaultProps = {
        style: null,
        text: null,
        disabled: false,
        onPress: Kit.noop
    };

    render() {
        let {disabled, style, onPress} = this.props,
            viewStyle = disabled ? styles.disableContainer : style;
        if (disabled || !onPress) {
            return this._renderView(viewStyle);
        } else {
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
                style={this.props.style}
                onPress={this.props.onPress}>
                {this._renderContent()}
            </TouchableOpacity>
        );
    }

    _renderContent() {
        let {text, children} = this.props;
        if (children) {
            return children;
        } else {
            return <Text style={styles.text}>{text}</Text>
        }
    }
}

const styles = StyleSheet.create({
    disableContainer: {},
    text: {}
});

export default Button;
