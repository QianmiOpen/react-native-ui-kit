/**
 * @flow
 */
"use strict";
import React, {
  PullToRefreshViewAndroid,
  InteractionManager,
  PixelRatio,
  ProgressBarAndroid,
  StyleSheet,
  ListView,
  Dimensions,
  View,
  Text,
  Image,
} from 'react-native';
const SCREEN_WIDTH = Dimensions.get('window').width;
import QMFetch from '../fetch';
//每页显示的数量
const PAGE_SIZE = 10;
const noop = () => {};

/**
 * AndroidRefreshListView
 */
class SwipeRefreshListView extends React.Component {
  static propTypes = {
    //url必填
    url: React.PropTypes.string.isRequired
  };


  /**
   * 默认属性
   */
  static defaultProps = {
    return {
      //ajax的url
      url: '',
      //覆盖默认的ListView的样式
      style: null,
      //默认当前的pageSize
      pageSize: PAGE_SIZE,
      //数据回来的callback，
      //便于外界拿到数据去setState
      onDataReceive: noop,
      // 供外部自定义头部的方法
      customHeader: null
    }
  };

  constructor(props: Object) {
    //当前页
    this._page = 0;
    //缓存listview的dataSource
    this._cache = [];

    this.state = {
      /*是不是正在loading*/
      isLoading: true,

      /*是不是loading到结尾*/
      isLoadingTail: false,

      /*listview的数据源*/
      dataSource: new ListView.DataSource({
        rowHasChanged(r1, r2) {
          return r1 != r2;
        }
      })
    };
  }

  /**
   * url变化的话刷新一下
   */
  componentWillReceiveProps(nextProps) {
    if (this.props.url != nextProps.url) {
      this._init();
    }
  }


  /**
   * 组件将要完成首次加载，获取数据
   */
  componentDidMount() {
    this._init();
  }


  render() {
    // 如果ajax数据没有返回且没有renderHeader,显示loading效果
    if (this.state.isLoading) {
      return this._renderLoading();
    }

    return (
      <PullToRefreshViewAndroid
        style={{flex: 1}}
        ref={(swipeRefresh) => this._swipeRefresh = swipeRefresh}
        onRefresh={this._handleOnRefresh}>
        {this._renderListView()}
      </PullToRefreshViewAndroid>
    );
  },


  /**
   * 显示loading效果
   */
  _renderLoading() {
    return (
      <View style={styles.loading}>
        <ProgressBarAndroid styleAttr='LargeInverse' style={styles.spinner}/>
      </View>
    );
  },


  /**
   * 没有数据
   */
  _renderEmptyView() {
    return (
        <View style={styles.noDataContainer}>
          <Image style={styles.face} source={require('img/empty.png')} />
          <Text style={styles.txt}>暂无数据</Text>
        </View>
    );
  },


  /**
   * 渲染列表
   */
  _renderListView() {
    return (
      <ListView
        ref='listView'
        initialListSize={20}
        onEndReachedThreshold={200}
        scrollRenderAheadDistance={1000}
        scrollEventThrottle={32}
        renderHeader={this._renderHeader}
        onEndReached={this._handlePagination}
        dataSource={this._getDataSource()}
        renderRow={this.props.renderRow}
        renderFooter={this._renderFooter}
        keyboardShouldPersistTaps={false}
        removeClippedSubviews={true}
        showsVerticalScrollIndicator={true}
        automaticallyAdjustContentInsets={false}
        contentContainerStyle={[this.props.contentContainerStyle, this._cache.length <= 0 ? styles.container : null]}/>
    );
  },


  /**
   * 渲染头部
   */
  _renderHeader() {
    //判断是不是为空
    var isEmpty = this.state.isLoadingTail && this._cache.length == 0;

    return (
      <View style={this._cache.length <= 0 ? styles.container : null}>
        {this.props.customHeader && this.props.customHeader()}
        {
          (this.state.isLoading && this.props.customHeader) ?
          this._renderLoading() :
          null
        }
        {/*显示空*/}
        {isEmpty ? this._renderEmptyView() : null}
      </View>
    );
  },


  /**
   * 渲染ListView的footer
   */
  _renderFooter() {
    // 如果没有获取任何数据不显示footer
    if (this.state.isLoadingTail || this.state.isLoading) {
      return null;
    } else {
      return (
        <View style={styles.footer}>
          <ProgressBarAndroid styleAttr='SmallInverse'/>
          <Text style={[styles.name,styles.text]}>正在加载</Text>
        </View>
      );
    }
  },


  /**
   * 获取数据源
   */
  _getDataSource() {
    return this.state.dataSource.cloneWithRows(this._cache);
  },


  /**
   * 刷新
   */
  _handleOnRefresh() {
    if (__DEV__) {
      console.log('SwipreRefreshListView onRefresh....');
    }
    InteractionManager.runAfterInteractions(() => {
      //初始化pageNum = 0
      this._page = 0;

      //获取数据
      this._http()
        .then(onSuccess.bind(this), onFail.bind(this));


      //获取数据成功
      function onSuccess(res) {
        this._cache = res.dataList;
        this.setState({
          isFirstLoad: false,
          isLoadingTail: res.dataList.length < this.props.pageSize
        });
        this.props.onDataReceive(res);
      }

      //获取数据失败
      function onFail() {

        this._cache = [];
        this.setState({
          isFirstLoad: false,
          isLoadingTail: true
        });
      }
    });
  },


  /**
   * 初始化获取数据
   */
  _init = () => {
    InteractionManager.runAfterInteractions(async () => {
      //显示loading状态
      this.setState({
        isLoading: true
      });

      //初始化pageNum = 0
      this._page = 0;
      const { res, err} = await this._http();

      if (err) {
        this._cache = [];
        this.setState({
          isLoading: false,
          isLoadingTail: true
        });
      } else {
        this._cache = res.dataList;
        this.setState({
          isLoading: false,
          isLoadingTail: res.dataList.length < this.props.pageSize
        });
        this.props.onDataReceive(res);
      }
    });
  };

  /**
   * 处理分页
   */
  _handlePagination = async (e) => {
    //如果当前的状态正在获取更新，不去分页获取
    if (!e || this.state.isRefresh) {
      return false;
    }

    //如果第一页的数量小与pagesize不再分页
    if (this._page == 0 && this._cache.length < this.props.pageSize) {
      this.setState({
        isLoadingTail: true  // 不需要再显示底部loading;
      });
      return false;
    }

    this._page++;

    //获取数据
    const { res, err} = await this._http();
    this._cache = this._cache.concat(res.dataList);
    //最后一页
    if (res.dataList.length === 0) {
      this._page--;
    }
    this.setState({
      isLoading: false,
      isLoadingTail: res.dataList.length < this.props.pageSize
    });

    this.props.onDataReceive(res);
  }；


  /**
   * 将Fetch操作抽取出来,支持POST方法
   * @private
   */
  _http(): Promise{
    //如果是post方法获取数据
    if (this.props.postMethod) {
      const postBody = this.props.postBody;
      postBody['pageNum'] = this._page;

      return QMFetch(this.props.url, {
        method: 'POST',
        body: JSON.stringify(postBody)
      });
    } else {
      //GET方法
      return QMFetch(this._getURL());
    }
  },

  /**
   * 获取url
   */
  _getURL() {
    var url = this.props.url;
    if (url.indexOf('?') != -1) {
      url += '&pageNum=' + this._page;
    } else {
      url += '?pageNum=' + this._page;
    }

    if (__DEV__) {
      console.log(url);
    }

    return url;
  },


  /**
   * 为外面扩一个数据处理的方法
   */
  changeData(callBack) {
    callBack(this._cache);
    this.forceUpdate();
  },


  /**
   * 暴露给外面的刷新的ListView的方法
   */
  refreshListView() {
    this._init();
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  spinner: {
    width: 30,
    height: 30
  },
  noDataContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  loading: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  footer: {
    width: SCREEN_WIDTH,
    height: 30,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1 / PixelRatio.get(),
    borderColor: '#e1e1e1'
  },
  txt: {
    fontSize: 14,
    color: '#cfd5dd'
  },
  text: {
    fontSize: 14,
    color: '#939495'
  },
  face: {
    width: 112,
    height: 112,
  },
  button: {
    backgroundColor: '#43c6a6',
    alignSelf: 'stretch',
    alignItems: 'center',
    paddingTop: 13,
    paddingBottom: 13,
    paddingLeft: 10,
    paddingRight: 10
  },
  cont: {
    fontSize: 16,
    color: '#FFF'
  }
});


module.exports = SwipeRefreshListView;
