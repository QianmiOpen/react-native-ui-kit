import {
} from 'react-native';

import Fetch from '../../net/fetch';
import Config from './../config';
import RowData from './row';
import SectionData from './section';
import SwipeableData from './swipeable';


export default class ListData {

    constructor(props) {
        this.props = props;
        this.originDataSource = props.dataSource;
        this.init();
    }

    init() {
        if (this.props.renderQuickActions) {
            this.ds = new SwipeableData(this.props);
        }
        else if (this.props.renderSection) {
            this.ds = new SectionData(this.props);
        }
        else {
            this.ds = new RowData(this.props);
        }
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

    setParams(params) {
        if (params) {
            this.dataSourceParam = params;
        }
        return this;
    }

    empty() {
        return this.ds.empty();
    }

    /**
     * 是否全部读取完毕
     */
    isEnd() {
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
    fetch(isFirst, isNext) {
        if (isFirst) {
            this.pageIndex = Config.request.defaultIndex;
        }
        else if (isNext) {
            this.pageIndex++;
        }
        this.dataSourceParam = this.dataSourceParam || {};
        this.dataSourceParam[Config.request.pageName] = this.pageIndex;
        this.dataSourceParam[Config.request.pageSize] = this.pageSize;

        switch (typeof (this.originDataSource)) {

            //提供Url
            case 'string':
                return Fetch(this.originDataSource, { method: Config.request.method, body: this.dataSourceParam })
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
                    ok(this._dataSuccess(this.originDataSource, this.originDataSource, isFirst, isNext));
                });
        }
    }

    _dataSuccess(dataList, allData, isFirst, isNext) {
        if (this.props.dataReceive) {
            dataList = this.props.dataReceive(dataList, allData);
        }
        let r = this.ds.handler(dataList, !isFirst)
        return r;
    }
}
