import React from 'react';
import  {
    StyleSheet,
    View,
    Animated,
    Text,
} from 'react-native';

import Kit from '../kit';

class Popover extends React.Component {

    static defaultProps = {
        component: null,
        visible: false,
    };

    state = {
        visible: this.props.visible,
        topValue: new Animated.Value(0),
    };

    /**
     * 改变新属性
     */
    componentWillReceiveProps (nextProps:Object) {
        this._toggleAnimated(nextProps.visible);
    }

    componentWillMount () {
        this._toggleAnimated(this.props.visible);
    }

    render () {
        let top = this.state.topValue.interpolate({
            inputRange: [0, 1],
            outputRange: [Kit.Height, 0]
        });
        return (
            <Animated.View style={[styles.container, {top: top}]}>
                {this.props.component}
            </Animated.View>
        );
    }

    _toggleAnimated = (show) => {
        Animated
            .spring(this.state.topValue, {
                toValue: show ? 1 : 0,
                friction: 10,
                tension: 30
            })
            .start();
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: Kit.Width,
        height: Kit.Height,
        left: 0,
        position: 'absolute',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    }
});

export default Popover;