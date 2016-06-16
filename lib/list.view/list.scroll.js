import React, {
    StyleSheet,
    View,
    ScrollView,
    RefreshControl,
} from 'react-native';

import Kit from '../kit';

class ListScrollView extends React.Component {

    static defaultProps = {
        refreshing: false,
        onRefresh: Kit.noop,
    };

    state = {};

    componentDidMount () {
        console.log(this.props)
    }

    render () {
        return (
            <ScrollView
                ref='scrollView'
                {...this.props}
                style={styles.container}
                onEndReachedThreshold={100}
                scrollEventThrottle={32}
                keyboardShouldPersistTaps={false}
                automaticallyAdjustContentInsets={false}
                showVerticalScrollIndicator={true}
                removeClippedSubviews={true}
                contentContainerStyle={this.props.contentContainerStyle}>
            </ScrollView>
        );
    }

    _renderRefreshControl () {
        return (
            <RefreshControl
                refreshing={this.props.refreshing}
                onRefresh={this.props._onRefresh}
            />
        )
    }

    getScrollView = () => {
        return this.refs.scrollView;
    };

    getScrollResponder = () => {
        return this.getScrollView().getScrollResponder();
    };

    scrollTo = (args) => {
        this._swipeRefreshView.scrollTo(args);
    };

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 40,
    }
});

export default ListScrollView;