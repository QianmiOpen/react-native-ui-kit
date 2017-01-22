import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    ListView,
    InteractionManager,
    RefreshControl,
    LayoutAnimation,
    SwipeableListView,
    RecyclerViewBackedScrollView,
} from 'react-native';

import ListData from './data/list.data.js';
import Config from './config';
import Kit from '../kit';
import LoadingMore from './loading.more';

/**
 * 
 */
export default class UIList extends Component {

    static defaultProps = {
        dataSource: null,
        dataSourceParam: null,
        dataFilter: null,
        onRefresh: null,
        onReceive: null,
        onQuickAction: null, //如果有这个属性, 那么就得使用 SwipeableListView
    };

    constructor(props) {
        super(props)
        this.ds = new ListData(this.props.dataSource, this.props.dataSourceParam, !!this.props.renderSection, this.props.dataFilter, this.props.onReceive);
        this.state.dataSource = this.ds.empty();
    }

    state = {
        refreshing: false,
        showLoadingView: false,
        showLoadingMore: false,
    };

    componentWillReceiveProps = (nextProps) => {
        let needRefresh = this.ds.setDataSource(nextProps.dataSource);
        if (needRefresh) {
            this.reload();
        }
    };

    componentDidMount = () => {
        this.load(null, true, false);
    };

    componentWillUpdate = () => {
        LayoutAnimation.easeInEaseOut();
    };

    filter = (filter) => {
        this.setState({ dataSource: this.ds.filter(filter) })
    };

    load = (params, isReload, isNext) => {
        if (isReload || !this.ds.isEnd()) {
            this.setState({ showLoadingView: !isNext, showLoadingMore: isNext });
            InteractionManager.runAfterInteractions(() => {
                this.ds
                    .setParams(params)
                    .fetch(isReload, isNext)
                    .then((dataSource) => {
                        this.setState({ dataSource, refreshing: false, showLoadingView: false, showLoadingMore: false });
                    });
            });
        }
    };

    reload = () => {
        this.setState({ refreshing: true });
        return this.load(null, true, false);
    };

    loadNext = () => {
        let {showLoadingMore} = this.state;
        if (showLoadingMore) {
            return;
        }
        return this.load(null, false, true);
    };

    /**
     * 
     */
    render = () => {
        let rSection = this.props.renderSection,
            {showLoadingView, dataSource} = this.state,
            Comp = this.props.onQuickAction ? RecyclerViewBackedScrollView : ListView;

        //加载中, 如果有加载中视图, 显示
        if (showLoadingView && Config.loadingView) {
            console.log('重新加载数据咯.....')
            return Config.loadingView;
        }
        //否则直接显示这个
        else {
            return (
                <Comp
                    pageSize={1}
                    enableEmptySections={true}
                    dataSource={dataSource}
                    style={[styles.container, this.props.style]}

                    renderScrollComponent={this._renderScrollComponent}
                    renderHeader={this._renderHeader}
                    renderFooter={this._renderFooter}
                    renderSectionHeader={rSection ? this._renderSection : null}
                    renderRow={this._renderRow}
                    renderQuickActions={this.props.onQuickAction}
                    maxSwipeDistance={100}

                    onEndReached={this._onEndReached}
                    refreshControl={this._renderRefreshControl()}
                    ref="listview"
                    onEndReachedThreshold={100}
                    scrollEventThrottle={32}
                    keyboardShouldPersistTaps="never"
                    automaticallyAdjustContentInsets={false}
                    removeClippedSubviews={true}
                    keyboardDismissMode="on-drag"
                    />
            );
        }
    };

    _onEndReached = (e) => {
        if (e) {
            this.loadNext();
        }
    };

    _onScroll = () => {
        let props = this.refs.listview.scrollProperties;
        if (props.offset + props.visibleLength >= props.contentLength) {
            this.loadNext();
        }
    };

    _onRefresh = () => {
        this.setState({ refreshing: true });
        return this.load(null, true, false);
    };

    _renderRefreshControl = () => {
        return (
            <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this._onRefresh}
                title="正在加载中..."
                />
        )
    };

    _renderHeader = () => {
        let {renderHeader} = this.props;
        if (renderHeader) {
            return renderHeader();
        }
    };

    _renderFooter = () => {
        let {showLoadingMore} = this.state;
        if (showLoadingMore) {
            return <LoadingMore />;
        }
    };

    _renderSection = (data, section) => {
        return this.props.renderSection(data, section);
    };

    _renderRow = (rowData, section, rowIndex) => {
        return this.props.renderRow(rowData, parseInt(rowIndex));
    };

    _renderScrollComponent = (props) => {
        return <RecyclerViewBackedScrollView {...props} />
    };
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});
