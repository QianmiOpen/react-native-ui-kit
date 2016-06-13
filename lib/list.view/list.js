import React, {StyleSheet, View, ListView, InteractionManager, RefreshControl, LayoutAnimation} from 'react-native';
import ListData from './data/list.data.js';
import AdvanceScrollView from '../scrollview/advance.scroll.view';
import Config from './config';
import Kit from '../kit';

const List = React.createClass({

    getDefaultProps(){
        return {
            dataSource: null,
            dataSourceParam: null,
            dataFilter: null,
            onRefresh: null,
            onReceive: null,
        };
    },

    getInitialState(){
        this.ds = new ListData(this.props.dataSource, this.props.dataSourceParam, !!this.props.renderSection, this.props.dataFilter, this.props.onReceive);
        return {
            loading: false,
            dataSource: this.ds.empty(),
            refreshing: false,
        };
    },

    componentWillReceiveProps (nextProps) {
        let needRefresh = this.ds.setDataSource(nextProps.dataSource);
        if (needRefresh) {
            this.load({}, true, false);
        }
    },

    componentDidMount(){
        this.load(null, true, false);
    },

    componentWillUpdate() {
        LayoutAnimation.easeInEaseOut();
    },

    filter(filter){
        this.setState({dataSource: this.ds.filter(filter)})
    },

    load(params, isReload, isNext){
        if (!this.ds.isEnd()) {
            this.setState({refreshing: isReload, loading: true});
            InteractionManager.runAfterInteractions(() => {
                this.ds
                    .setParams(params)
                    .fetch(isReload, isNext)
                    .then((dataSource) => {
                        this.setState({dataSource, refreshing: false, loading: false});
                    });
            });
        }
    },

    reload(){
        return this.load(null, true, false);
    },

    loadNext(){
        return this.load(null, false, true);
    },


    render(){
        let rSection = this.props.renderSection;
        return (
            <ListView
                pageSize={1}
                dataSource={this.state.dataSource}
                style={[styles.container, this.props.style]}
                renderHeader={this._renderHeader}
                renderFooter={this._renderFooter}
                renderSectionHeader={rSection ? this._renderSection : null}
                renderRow={this._renderRow}
                onEndReachedThreshold={100}
                scrollEventThrottle={32}
                keyboardShouldPersistTaps={false}
                showsVerticalScrollIndicator={true}
                automaticallyAdjustContentInsets={false}
                removeClippedSubviews={true}
                onEndReached={this._onEndReached}
                refreshControl={this._renderRefreshControl()}
                ref="listview"
            >
            </ListView>
        );
    },


    _onEndReached(e){
        if (e) {
            this.loadNext();
        }
    },

    _onScroll(){
        let props = this.refs.listview.scrollProperties;
        console.log("============")
        console.log(props)
        console.log(props.offset + props.visibleLength)
        console.log(props.contentLength)
        if (props.offset + props.visibleLength >= props.contentLength) {
            this.loadNext();
        }
    },

    _onRefresh() {
        return this.load(null, true, false);
    },

    _renderRefreshControl(){
        return (
            <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this._onRefresh}
            />
        )
    },

    _renderScrollComponent(props) {
        let {onRefresh, contentContainerStyle} = this.props;
        return (
            <AdvanceScrollView
                {...props}
                contentContainerStyle={contentContainerStyle}
                onRefresh={onRefresh ? this._onRefresh : null}/>
        );
    },

    _renderHeader(){
        let {renderHeader} = this.props;
        if (renderHeader) {
            return renderHeader();
        }
    },

    _renderFooter(){
        let {loading} = this.state,
            loadingView = Config.loadingView;
        if (loading && loadingView) {
            return loadingView;
        } else {
            return null;
        }
    },

    _renderSection(data, section){
        return this.props.renderSection(data, section);
    },

    _renderRow(rowData, section, rowIndex){
        return this.props.renderRow(rowData, parseInt(rowIndex));
    }
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});

module.exports = List;
