import React from 'react';
import  {
    StyleSheet,
    View,
    Image,
    Text,
    WebView,
} from 'react-native';

class UIWebView extends React.Component {

    static defaultProps = {
        dataSource: null,
    };

    state = {
        showLoading: !!this.props.dataSource
    };

    componentDidMount () {
    }

    render () {
        return (
            <WebView
                style={styles.container}
                source={this._getSource()}
                startInLoadingState={this.state.showLoading}
                scalesPageToFit={true}>
            </WebView>
        );
    }

    _getSource = () => {
        let {dataSource} = this.props;
        if (!dataSource) {
            return null;
        }
        if (dataSource.startsWith('http')) {
            return {uri: dataSource};
        }
        else {
            return {html: dataSource};
        }
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});

export default UIWebView;