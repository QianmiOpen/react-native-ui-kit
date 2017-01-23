import {
    SwipeableListView,
} from 'react-native';

const NO_GROUP_SCETION = "s";

import SectionData from './section';

export default class SwipeData {

    constructor(props) {
        this.ds = this._getDataSource();
    }

    /**
     * 空数据
     */
    empty = () => {
        return this.ds.cloneWithRowsAndSections({});
    };

    /**
     * 读取到数据了
     */
    handler = (data, isAdd) => {
        let dataList = this.convert(data);
        let keys = Object.keys(dataList);
        return this.ds.cloneWithRowsAndSections(dataList, keys);
    };

    /**
     * 转换 [] => {sectionId: [item....]}
     */
    convert = (data) => {
        if (!this.sectionKey) { //如果没有
            return { [NO_GROUP_SCETION]: data };
        } else {
            let r = {};
            data.forEach(item => {
                let key = item[this.sectionKey];
                r[key] = r[key] || [];
                r[key].push(item);
            });
            return r;
        }
    };

    /**
     * 
     */
    _getDataSource = () => {
        let r = SwipeableListView.getNewDataSource();
        r.rowHasChanged = (r1, r2) => {
            return r1 !== r2;
        };
        r.sectionHeaderHasChanged = (s1, s2) => {
            return s1 !== s2;
        };
        r.getSectionHeaderData = (data, section) => {
            return section;
        };
        return r;
    };
}