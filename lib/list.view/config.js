import ListLoading from './list.loadding';

export default {

    /**
     *
     */
    style: null,

    /**
     * 正在加载的视图
     */
    loadingView: ListLoading,

    /**
     * 当数据为空的时候的视图
     */
    emptyView: null,

    /**
     * 响应回来的数据解析, 必须返回, {dataList: [], total: 0} 这种格式
     */
    handler: (r) => {
        return {dataList: r.dataList, total: r.total};
    },

    /**
     * 请求的时候对应名称
     */
    request: {
        defaultIndex: 1, //默认请求页数
        defaultSize: 10, //默认请求条数
        method: 'POST',  //默认请求方法
        pageName: 'pageIndex', //页数, 请求名称
        pageSize: 'pageSize',  //条数, 请求名称
    }
};