import React, {StyleSheet, View, ListView} from 'react-native';
import ListData from './list.data.js';
import AdvanceScrollView from '../scrollview/advance.scroll.view';

const List = React.createClass({

  getDefaultProps(){
    return {
      dataFilter: null,
      onRefresh: null,
      onReceive: null,
    };
  },

  getInitialState(){
    this.ds = new ListData(this.props.dataSource, !!this.props.renderSection, this.props.dataFilter, this.props.onReceive);
    return {
      dataSource: this.ds.empty()
    };
  },

  componentWillReceiveProps (nextProps) {
    let needRefresh = this.ds.setDataSource(nextProps.dataSource);
    if (needRefresh) {
      this.load();
    }
  },

  componentDidMount(){
    this.load();
  },

  filter(filter){
    this.setState({dataSource: this.ds.filter(filter)})
  },

  load(){
    return this
      .ds
      .fetch()
      .then((dataSource) => {
        this.setState({dataSource});
      });
  },

  render(){
    let rSection = this.props.renderSection;
    return (
      <ListView
        dataSource={this.state.dataSource}
        style={[styles.container, this.props.style]}
        renderScrollComponent={this._renderScrollComponent}
        renderHeader={this._renderHeader}
        renderSectionHeader={rSection ? this._renderSection : null}
        renderRow={this._renderRow}
        automaticallyAdjustContentInsets={false}
      >
      </ListView>
    );
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
    //console.log('list view => ', arguments)
    return this.props.renderRow(rowData, parseInt(rowIndex));
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});

module.exports = List;
