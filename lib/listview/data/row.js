import {
    ListView
} from 'react-native';

export default class RowData {

    constructor(props) {
        this.ds = new ListView.DataSource(this._getConfig());
        this.dataList = [];
    }

    /**
     * 空数据
     */
    empty = () => {
        return this.ds.cloneWithRows([]);
    };

    /**
     * 读取到数据了
     */
    handler = (data, isAdd) => {
        if (isAdd) {
            this.dataList.concat(data);
        } else {
            this.dataList = data;
        }
        return this.ds.cloneWithRows(this.dataList);
    };

    /**
     * 
     */
    _getConfig = () => {
        return {
            rowHasChanged(r1, r2) {
                return r1 !== r2;
            },
        }
    };
}