import React from 'react';
import {
    View,
    StyleSheet
} from 'react-native';
var {width: SCREEN_WIDTH} = require('Dimensions').get('window');


class StaticComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    shouldComponentUpdate() {
        return this.refs.component == null;
    }

    render() {
        var Component = this.props.component;
        if (this.props.selected) {
            return React.cloneElement(Component, {
                ref: 'component'
            });
        }

        return null;
    }
}

/**
 * Usage
 *
 * var LazyComponent = require('lazy-component');
 *
 * <LazyComponent selected={true} component={XXX}/>
 */
var LazyComponent = React.createClass({
    getDefaultProps(){
        return {
            selected: false,
            component: null
        };
    },


    render(){
        var selected = this.props.selected;
        var Component = this.props.component;

        return (
            <View style={[styles.content, selected && styles.selected]}>
                <StaticComponent selected={selected} component={Component}/>
            </View>
        );
    }
});


var styles = StyleSheet.create({
    content: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        width: SCREEN_WIDTH,
        left: -SCREEN_WIDTH
    },
    selected: {
        left: 0
    }
});


module.exports = LazyComponent;
