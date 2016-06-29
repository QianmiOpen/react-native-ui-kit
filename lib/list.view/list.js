import React from 'react';
import {StyleSheet, View, ListView, InteractionManager, RefreshControl, LayoutAnimation} from 'react-native';
import ListData from './data/list.data.js';
import Config from './config';
import Kit from '../kit';
import LoadingMore from './loading.more';

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
            this.reload();
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
        if (isReload || !this.ds.isEnd()) {
            this.setState({loading: !isReload});
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
        this.setState({refreshing: true});
        return this.load(null, true, false);
    },

    loadNext(){
        let {loading} = this.state;
        if (loading) { //还在加载中...不要重复读取
            return;
        }
        return this.load(null, false, true);
    },

    render(){
        let rSection = this.props.renderSection,
            {loading, dataSource} = this.state;

        //加载中, 如果有加载中视图, 显示
        if (loading && Config.loadingView) {
            return Config.loadingView;
        }
        //否则直接显示这个
        else {
            return (
                <ListView
                    pageSize={1}
                    enableEmptySections={true}
                    dataSource={dataSource}
                    style={[styles.container, this.props.style]}
                    renderHeader={this._renderHeader}
                    renderFooter={this._renderFooter}
                    renderSectionHeader={rSection ? this._renderSection : null}
                    renderRow={this._renderRow}
                    onEndReached={this._onEndReached}
                    refreshControl={this._renderRefreshControl()}
                    ref="listview"
                    onEndReachedThreshold={100}
                    scrollEventThrottle={32}
                    keyboardShouldPersistTaps={false}
                    automaticallyAdjustContentInsets={false}
                    removeClippedSubviews={true}
                    keyboardDismissMode="on-drag"
                >
                </ListView>
            );
        }
    },

    _onEndReached(e){
        if (e) {
            this.loadNext();
        }
    },

    _onScroll(){
        let props = this.refs.listview.scrollProperties;
        if (props.offset + props.visibleLength >= props.contentLength) {
            this.loadNext();
        }
    },

    _onRefresh() {
        this.setState({refreshing: true});
        return this.load(null, true, false);
    },

    _renderRefreshControl(){
        return (
            <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this._onRefresh}
                title="正在加载中..."
            />
        )
    },

    _renderHeader(){
        let {renderHeader} = this.props;
        if (renderHeader) {
            return renderHeader();
        }
    },

    _renderFooter(){
        let {loading} = this.state;
        if (loading) {
            return <LoadingMore/>;
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
