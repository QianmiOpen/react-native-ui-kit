import React, {
    StyleSheet,
    View,
    ScrollView,
} from 'react-native';

class ListScrollView extends React.Component {

    static defaultProps = {};

    state = {};

    componentDidMount () {
    }

    render () {
        return (
            <ScrollView
                ref='scrollView'
                scrollEventThrottle={32}
                scrollRenderAheadDistance={800}
                keyboardDismissMode='on-drag'
                showsVerticalScrollIndicator={true}
                automaticallyAdjustContentInsets={false}
                contentContainerStyle={this.props.contentContainerStyle}
            >
                {this.props.children}
            </ScrollView>
        );
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
    }
});

export default ListScrollView;