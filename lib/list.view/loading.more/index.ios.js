import React from 'react';
import  {
    StyleSheet,
    View,
    Image,
    Text,
    ActivityIndicatorIOS,
} from 'react-native';

import Kit from '../../kit';

class ListLoadingView extends React.Component {

    static defaultProps = {
        data: {},
    };

    state = {};

    componentDidMount() {
    }

    render() {
        return (
            <View style={styles.container}>
                {this._renderLoading()}
            </View>
        )
    }

    _renderLoading() {
        return (
            <ActivityIndicatorIOS size='small'/>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
    },
    spinner: {
        width: 30,
        height: 30
    },
});

export default ListLoadingView;