import React from 'react';
import  {
    StyleSheet,
    View,
    Image,
    Text,
    WebView,
} from 'react-native';

const script = '<script>window.location.hash = 1;document.title = document.height;</script>';

class UIWebView extends React.Component {

    static defaultProps = {
        autoHeight: false,
        dataSource: null,
    };

    state = {
        showLoading: !!this.props.dataSource,
        height: -1,
    };

    componentDidMount () {
    }

    render () {
        let {height} = this.state,
            s = {};
        if (height != -1) {
            s.height = parseInt(height);
        }
        return (
            <WebView
                style={[styles.container, this.props.style, s]}
                source={this._getSource()}
                startInLoadingState={this.state.showLoading}
                scalesPageToFit={false}
                scrollEnabled={true}
                onNavigationStateChange={this._onNavigationStateChange}>
            </WebView>
        );
    }

    _getSource = () => {
        let {dataSource, autoHeight} = this.props;
        if (!dataSource) {
            return null;
        }
        if (dataSource.startsWith('http')) {
            return {uri: dataSource};
        }
        else {
            if (autoHeight) {
                return {html: dataSource + script};
            }
            else {
                return {html: dataSource};
            }
        }
    };

    _onNavigationStateChange = (navState) => {
        let title = navState.title;
        if (/^[\.\d]+$/.test(title)) {
            this.setState({
                height: navState.title
            });
        }
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});

export default UIWebView;