import DataProvider from './index';
import QMFetch from '../../fetch';

class HttpDataProvider extends DataProvider {
  url:string;
  method:string;
  paramMap:JSON;

  constructor (props = {}) {
    super (props)
    this.dataList = [];
  }

  async reload () {
    this.pageIndex = 0;
    this.dataList = await this._fetch (this._fetchOption ());
    return this.dataList;
  }

  async next () {
    this.pageIndex = this.pageIndex || 0;
    this.pageIndex++;
    let res = await this._fetch (this._fetchOption ());
    this.dataList = this.dataList.concat (res);
    return this.dataList;
  }

  _fetchOption () {
    this.paramMap.pageNum = this.pageIndex;
    this.paramMap.pageSize = this.pageSize;
    return this.paramMap;
  }

  async _fetch (fetchOption:JSON) {
    let result:Result = await QMFetch (this.url, fetchOption);
    return result.res || [];
  }
}

export default HttpDataProvider;