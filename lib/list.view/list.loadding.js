import React, {
    StyleSheet,
    View,
    Image,
    Text,
    ProgressBarAndroid,
    ActivityIndicatorIOS,
} from 'react-native';

import Kit from '../kit';

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
        if (Kit.isAndroid()) {
            return (
                <ProgressBarAndroid
                    color="#1e90ff"
                    styleAttr='LargeInverse'
                    style={styles.spinner}/>
            );
        }
        else {
            return (
                <ActivityIndicatorIOS size='small'/>
            )
        }
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