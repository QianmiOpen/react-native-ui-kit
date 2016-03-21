/**
 *
 */
class DataProvider {
  pageIndex:number;
  pageSize:number;
  dataList:Array;

  /**
   *
   * @param props
   */
  setProps(props:JSON) {
  }

  /**
   * 下一页
   */
  next():Promise {
  }

  /**
   * 重新加载
   */
  reload():Promise{
  }

  /**
   *
   */
  isEmpty():boolean {}

  /**
   * 数据是否到底
   */
  isEnd ():boolean {
  }
}

export default DataProvider;