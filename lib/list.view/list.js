import React, {StyleSheet, View, ListView, InteractionManager} from 'react-native';
import ListData from './list.data.js';
import AdvanceScrollView from '../scrollview/advance.scroll.view';
import Config from './config';

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
            dataSource: this.ds.empty()
        };
    },

    componentWillReceiveProps (nextProps) {
        let needRefresh = this.ds.setDataSource(nextProps.dataSource);
        if (needRefresh) {
            InteractionManager.runAfterInteractions(() => {
                this.load({}, true);
            });
        }
    },

    componentDidMount(){
        InteractionManager.runAfterInteractions(() => {
            this.load();
        });
    },

    filter(filter){
        this.setState({dataSource: this.ds.filter(filter)})
    },

    load(params, isReload){
        return this
            .ds[isReload ? 'reload' : 'fetch'](params)
            .then((dataSource) => {
                this.setState({dataSource});
            });
    },

    reload(){
        return this.load({}, true);
    },

    loadNext(e){
        return this
            .ds
            .fetch(false, true)
            .then((dataSource) => {
                this.setState({dataSource});
            });
    },

    render(){
        let rSection = this.props.renderSection;
        return (
            <ListView
                pageSize={1}
                dataSource={this.state.dataSource}
                style={[styles.container, this.props.style]}
                renderScrollComponent={this._renderScrollComponent}
                renderHeader={this._renderHeader}
                renderSectionHeader={rSection ? this._renderSection : null}
                renderRow={this._renderRow}
                keyboardShouldPersistTaps={false}
                showsVerticalScrollIndicator={true}
                automaticallyAdjustContentInsets={false}
                removeClippedSubviews={true}
                ref="listview"
            >
            </ListView>
        );
    },

    _onScroll(){
        let props = this.refs.listview.scrollProperties;
        console.log("============")
        console.log(props)
        console.log(props.offset + props.visibleLength)
        console.log(props.contentLength)
        if (props.offset + props.visibleLength >= props.contentLength){
            this.loadNext();
        }
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

    _onRefresh() {
        //console.log('list => onrefresh')
        return this.load();
    },

    _renderHeader(){
        let {renderEmpty, renderHeader} = this.props,
            isEmpty = this.ds.isEmpty();
        if (isEmpty && renderEmpty) {
            return renderEmpty();
        }
        else if (renderHeader) {
            return renderHeader();
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
