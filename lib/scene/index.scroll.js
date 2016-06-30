import React from 'react';
import {
    StyleSheet,
    View,
    Image,
    Text,
} from 'react-native';

import Kit from '../kit';
import ScrollView from '../scrollview/advance.scroll.view';
import Scene from './index';

/**
 * 提供刷新的scene
 */
class UIScrollScene extends React.Component {

    static defaultProps = {
        topView: null,
        scrollViewStyle: null,
        bottomView: null,
    };

    state = {};

    componentDidMount() {
    }

    render() {
        return (
            <Scene
                {...this.props}>
                {this.props.topView}
                <ScrollView
                    style={[styles.scrollView, this.props.scrollViewStyle]}
                    onRefresh={this.props.onMount}>
                    {this.props.children}
                </ScrollView>
                {this.props.bottomView}
            </Scene>
        )
    }
}

const styles = StyleSheet.create({
    //
    container: {},

    //
    scrollView: {
        flex: 1,
    },
});

export default UIScrollScene;
