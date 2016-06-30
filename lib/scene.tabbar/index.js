import React from 'react';
import {
    StyleSheet,
    View,
    Image,
    Text,
} from 'react-native';

import TabBar from '../tabbar';
import Kit from '../kit';

class UITabBarScene extends React.Component {

    static defaultProps = {
        tabItems: [],
        routeMap: {},
        select: 0,
        onPress: Kit.noop,
    };

    state = {
        select: this.props.select
    };

    render () {
        let {tabItems} = this.props;
        return (
            <TabBar
                tintColor="#DB3741">
                {tabItems.map(this._renderTabItem)}
            </TabBar>
        );
    }

    _renderTabItem = (item, index) => {
        var C = this.props.routeMap[item.sceneName];
        return (
            <TabBar.Item
                key={index}
                title={item.title}
                icon={item.icon}
                selectedIcon={item.selectIcon}
                selected={this.state.select == index}
                onPress={() => this._onPress(item, index)}>
                <C/>
            </TabBar.Item>
        );
    };

    _onPress = (item, index) => {
        this.setState({select: index});
    };

}

const styles = StyleSheet.create({
    container: {},
});

export default UITabBarScene;
