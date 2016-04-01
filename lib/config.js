import PullRefreshControl from './scrollview/refresh.control';

const Config = {
  /**
   * 默认导航条样式
   */
  scene: {
    defaultHeaderStyle: null,
  },

  /**
   *
   */
  fetch: {
    //是否开启响应日志
    debug: false,
    //默认请求头
    request: {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    },
    //默认域名
    host: '',
    //回调解析
    handler: (r) => {
      return {result: r.code == 200, data: r.data};
    }
  },

  /**
   *
   */
  list: {
    //响应回来的解析对应名称
    response: {
      totalName: 'total',
      dataName: 'dataList',
    },
    //请求的时候对应名称
    request: {
      defaultSize: 10,
      pageName: 'pageIndex',
      pageSize: 'pageSize',
    }
  },

  /**
   * 下拉刷新
   */
  pullRefresh: {
    //see scollview/refresh.control.js  pullHeight onRefresh
    control: PullRefreshControl,
    defaultStyle: null,
  },
}

export default Config;
