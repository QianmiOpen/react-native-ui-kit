export default {
    style: null,

    //正在加载
    loadingView: null,

    //空白数据
    emptyView: null,

    //响应回来的解析对应名称
    response: {
        totalName: 'total',
        dataName: 'dataList',
    },
    //请求的时候对应名称
    request: {
        defaultIndex: 1,
        defaultSize: 10,
        method: 'POST',
        pageName: 'pageIndex',
        pageSize: 'pageSize',
    }
};