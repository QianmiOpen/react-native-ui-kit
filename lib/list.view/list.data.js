import {ListView} from 'react-native';

import Fetch from '../fetch';
import Config from './config';

class ListData {

    constructor(dataSource, dataSourceParam, hasSection, dataFilter, dataReceive) {
        this.originDataSource = dataSource;
        this.dataSourceParam = dataSourceParam;
        this.isSection = hasSection;
        this.dataFilter = dataFilter;
        this.dataReceive = dataReceive;
        this.init();
    }

    init() {
        this.ds = new ListView.DataSource(this._dataSourceConfig());
        this.pageIndex = Config.request.defaultIndex;
        this.pageSize = Config.request.defaultSize;
    }

    setDataSource(ds) {
        if (this.originDataSource != ds && !!ds) {
            this.originDataSource = ds;
            return true;
        }
        return false;
    }

    empty() {
        if (this.isSection)
            return this.ds.cloneWithRowsAndSections({});
        else
            return this.ds.cloneWithRows([]);
    }

    filter(filter) {
        return this._dataHandle(this.dataList, filter)
    }

    fetch(isFirst, isNext) {
        if (isFirst) {
            this.pageIndex = Config.request.defaultIndex;
        } else if (isNext) {
            this.pageIndex++;
        }
        switch (typeof(this.originDataSource)) {
            case 'string':
                return this._fetchUrl(this.originDataSource, isFirst, isNext);
                break;
            case 'function':
                return this.originDataSource().then((dataList) => this._dataSuccess(dataList, {}, isFirst, isNext));
            default:
                return new Promise((ok) => {
                    ok(this._dataSuccess(this.originDataSource, {}, isFirst, isNext));
                });
        }
    }

    isEmpty() {
        return !this.dataList || this.dataList.length == 0;
    }

    reload() {
        return this.fetch(true, false);
    }

    _fetchUrl(url, isFirst, isNext) {
        this.dataSourceParam = this.dataSourceParam || {};
        this.dataSourceParam[Config.request.pageName] = this.pageIndex;
        this.dataSourceParam[Config.request.pageSize] = this.pageSize;
        return Fetch(url, {method: Config.request.method, body: this.dataSourceParam})
            .then((r) => {
                //let total = r[Config.response.totalName];
                let dataList = r[Config.response.dataName];
                return this._dataSuccess(dataList, r, isFirst, isNext);
            });
    }

    _dataSuccess(dataList, allData, isFirst, isNext) {
        if (!dataList) {
            dataList = this.isSection ? {} : [];
        }
        else if (this.dataReceive) {
            dataList = this.dataReceive(dataList, allData);
        }

        //首次, 重置数据
        if (isFirst) {
            this.dataList = dataList;
        }
        //叠加
        else if (isNext) {
            //没有组区分
            if (this.dataList.concat) {
                this.dataList = (this.dataList || []).concat(dataList);
            }
            //有组区分
            else {
                for (var key in dataList) {
                    this.dataList[key] = this.dataList[key] || []
                    this.dataList[key] = (this.dataList[key] || []).concat(dataList[key]);
                }
            }
        }
        //
        else {
            this.dataList = dataList;
        }

        //
        let r = this._dataHandle(this.dataList);
        return r;
    }

    _dataHandle(dataList, dataFilter) {
        dataList = this._dataFilter(dataList, dataFilter);
        if (this.isSection)
            return this.ds.cloneWithRowsAndSections(dataList);
        else
            return this.ds.cloneWithRows(dataList);
    }

    _dataFilter(dataList, dataFilter) {
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

    _dataSourceConfig() {
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
