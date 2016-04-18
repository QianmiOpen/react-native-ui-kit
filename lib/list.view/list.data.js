import {ListView} from 'react-native';

import Fetch from '../fetch';
import Config from './config';

class ListData {

  constructor (dataSource, hasSection, dataFilter, dataReceive) {
    this.originDataSource = dataSource;
    this.isSection = hasSection;
    this.dataFilter = dataFilter;
    this.dataReceive = dataReceive;
    this.init();
  }

  init () {
    this.ds = new ListView.DataSource(this._dataSourceConfig());
  }

  setDataSource (ds) {
    if (this.originDataSource != ds && !!ds) {
      this.originDataSource = ds;
      return true;
    }
    return false;
  }

  empty () {
    if (this.isSection)
      return this.ds.cloneWithRowsAndSections({});
    else
      return this.ds.cloneWithRows([]);
  }

  filter (filter) {
    return this._dataHandle(this.dataList, filter)
  }

  fetch () {
    switch (typeof(this.originDataSource)) {
      case 'string':
        return this._fetchUrl(this.originDataSource);
        break;
      case 'function':
        return this.originDataSource().then((dataList) => this._dataSuccess(dataList));
      default:
        return new Promise((ok) => {
          ok(this._dataSuccess(this.originDataSource));
        });
    }
  }

  isEmpty () {
    return !this.dataList || this.dataList.length == 0;
  }

  _fetchUrl (url) {
    return Fetch(url)
      .then((r) => {
        this.total = r[Config.response.totalName];
        this.dataList = r[Config.response.dataName];
        return this._dataSuccess(this.dataList);
      });
  }

  _dataSuccess (dataList) {
    if (!dataList) {
      dataList = this.isSection ? {} : [];
    }
    else if (this.dataReceive) {
      dataList = this.dataReceive(dataList);
    }
    let r = this._dataHandle(dataList);
    return r;
  }

  _dataHandle (dataList, dataFilter) {
    dataList = this._dataFilter(dataList, dataFilter);
    if (this.isSection)
      return this.ds.cloneWithRowsAndSections(dataList);
    else
      return this.ds.cloneWithRows(dataList);
  }

  _dataFilter (dataList, dataFilter) {
    dataFilter = dataFilter || this.dataFilter;
    switch (typeof(dataFilter)) {
      case 'Object':
        return dataList.filter((item) => {
          for (let key in dataFilter) {
            if (item[key].indexOf(dataFilter[key]) > 1 &&
              item[key] == dataFilter[key]) {
              return true;
            }
          }
          return false;
        });
      case 'function':
        return dataList.filter(dataFilter);
      default :
        return dataList;
    }
  }

  _dataSourceConfig () {
    return {
      rowHasChanged(r1, r2){
        return r1 !== r2;
      },
      sectionHeaderHasChanged(s1, s2){
        return s1 !== s2;
      },
      getSectionHeaderData(data, section){
        return section;
      }
    }
  }
}

module.exports = ListData;
