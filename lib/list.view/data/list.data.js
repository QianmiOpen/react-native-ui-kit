import {ListView} from 'react-native';

import Fetch from '../../fetch';
import Config from './../config';

class ListData {

    constructor (dataSource, dataSourceParam, hasSection, dataFilter, dataReceive) {
        this.originDataSource = dataSource;
        this.dataSourceParam = dataSourceParam;
        this.isSection = hasSection;
        this.dataFilter = dataFilter;
        this.dataReceive = dataReceive;
        this.init();
    }

    init () {
        this.ds = new ListView.DataSource(this._dataSourceConfig());
        this.pageIndex = Config.request.defaultIndex;
        this.pageSize = Config.request.defaultSize;
    }

    setDataSource (ds) {
        if (this.originDataSource != ds && !!ds) {
            this.originDataSource = ds;
            return true;
        }
        return false;
    }

    setParams (params) {
        if (params) {
            this.dataSourceParam = params;
        }
        return this;
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

    /**
     * 是否全部读取完毕
     */
    isEnd () {
        if (this.total) {
            let loadCount = this.pageIndex * this.pageSize;
            return loadCount >= this.total;
        }
        return false;
    }

    /**
     * 加载数据
     * @param isFirst  首次加载
     * @param isNext    加载更多
     * @returns {*}
     */
    fetch (isFirst, isNext) {
        if (isFirst) {
            this.pageIndex = Config.request.defaultIndex;
        }
        else if (isNext) {
            this.pageIndex++;
        }
        this.dataSourceParam = this.dataSourceParam || {};
        this.dataSourceParam[Config.request.pageName] = this.pageIndex;
        this.dataSourceParam[Config.request.pageSize] = this.pageSize;

        switch (typeof(this.originDataSource)) {

            //提供Url
            case 'string':
                return Fetch(this.originDataSource, {method: Config.request.method, body: this.dataSourceParam})
                    .then((r) => {
                        r = Config.handler(r);
                        this.total = r.total;
                        return this._dataSuccess(r.dataList, r, isFirst, isNext);
                    });

            //提供方法
            case 'function':
                return this.originDataSource()
                           .then((dataList) => {
                               return this._dataSuccess(dataList, dataList, isFirst, isNext)
                           });

            //静态数据
            default:
                return new Promise((ok) => {
                    ok(this._dataSuccess(this.originDataSource, dataList, isFirst, isNext));
                });
        }
    }

    _dataSuccess (dataList, allData, isFirst, isNext) {
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
