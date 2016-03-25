'use strict'

/**
 * PullRefreshListView组件
 * @flow
 * 下拉刷新，无限分页
 */
import React, {
  ActivityIndicatorIOS,
  TouchableOpacity,
  InteractionManager,
  PixelRatio,
  StyleSheet,
  Dimensions,
  ListView,
  View,
  Text,
  Image,
} from 'react-native';

import {fromJS, is} from 'immutable';
import UIFetch from '../fetch';
import UILoading from '../loading/index';
import UIScrollView from '../scrollview';
import UIKit from '../kit';
import UIDataFactory from './data.factory';
import UIListEmptyView from './component/empty';

//每页显示的数量
const PAGE_SIZE = 10;
//just do nothing
const noop = () => {
};
//当前屏幕的宽度
const {width: SCREEN_WIDTH} = Dimensions.get ('window');

/**
 * Usage
 * var {UIPullRefreshListView} = require('qmkit');
 *
 * React.renderClass({
 *  render() {
 *    return (
 *      <PullRefreshListView
 *        url: '/your remote url/',
 *        style={}
 *        renderRow={}
 *      />
 *    );
 *  }
 * });
 */
class UIPullRefreshListView extends React.Component {

  static defaultProps = {
    //ajax的url
    url: '',
    //动画消失时间
    duration: 400,
    //覆盖默认的ListView的样式
    style: null,
    //是否开启post方法
    postMethod: false,
    //post方法传递的参数
    postBody: {},
    //默认当前的pageSize
    pageSize: PAGE_SIZE,
    //是否显示返回顶部
    backToTop: false,
    renderEmpty: null,
    renderFooter: null,
    //数据回来的callback，
    //便于外界拿到数据去setState
    onDataReceive: noop,
  };

  _listView:any;
  _page:number;
  _isLoading:boolean;
  _swipeRefreshStatus:string;
  //_ds:Object;
  _dataProvider:DataProvider;

  constructor (props:Object) {
    super (props);

    this.state = {
      /*是不是loading到结尾*/
      isLoadTail: false,

      /*是不是第一次loading*/
      isInitLoading: true,

      /*数据源*/
      dataSource: []
    };
    this._dataProvider = UIDataFactory.createDataProvider (props);
  }

  /**
   * 设置缓存对象
   *
   * @returns {boolean}
   */
  componentWillMount () {
    //当前页
    //this._page = 0;

    //当前是不是处于请求数据刷新状态
    this._isLoading = false;
    //swipe-refresh的状态
    this._swipeRefreshStatus = '';

    //ListView
    //this._ds = new ListView.DataSource ({
    //  rowHasChanged(r1, r2) {
    //    return r1 != r2;
    //  }
    //});
  }

  /**
   * 属性变化直接刷新
   */
  componentWillReceiveProps (nextProps:Object) {
    var newVal = fromJS ({
      url: nextProps.url,
      postMethod: nextProps.postMethod,
      postBody: nextProps.postBody,
      pageSize: nextProps.pageSize
    });
    var oldVal = fromJS ({
      url: this.props.url,
      postMethod: this.props.postMethod,
      postBody: this.props.postBody,
      pageSize: this.props.pageSize
    });

    //如果是加载数据之前清空列表
    InteractionManager.runAfterInteractions (() => {
      if (!is (newVal, oldVal)) {
        this.setState ({isInitLoading: true});
        this._init ();
      }
    });
  }

  /**
   * 组件将要完成首次加载，获取数据
   */
  componentDidMount () {
    InteractionManager.runAfterInteractions (() => {
      this._init ();
    });
  }

  render () {
    return this._renderListView ();
  }

  _renderEmptyView () {
    return <UIListEmptyView></UIListEmptyView>;
  }

  _renderListView () {
    //如果是初始loading,显示loading的效果
    if (this.state.isInitLoading) {
      return (<UILoading/>);
    }

    // 渲染ListView
    return (
      <View
        style={[styles.container, this.props.style]}>
        <ListView
          ref={(listView) => this._listView = listView}
          pageSize={this.props.pageSize}
          onEndReachedThreshold={100}
          scrollRenderAheadDistance={1000}
          scrollEventThrottle={32}
          keyboardShouldPersistTaps={false}
          showsVerticalScrollIndicator={true}
          automaticallyAdjustContentInsets={false}
          removeClippedSubviews={true}
          contentContainerStyle={[this.state.dataSource.length <= 0 ? styles.container : null, this.props.contentContainerStyle]}
          renderScrollComponent={(props) => (
            <UIScrollView
              duration={this.props.duration}
              {...props}
            />
           )}
          onRefreshStart={(onRefreshEnd) => {
            this._isLoading = true;
            this._handleMomentumScrollEnd(onRefreshEnd);
          }}
          onModeChange={(mode) => this._swipeRefreshStatus = mode}
          onRefreshEnd={(result) => this._isLoading = false}
          onEndReached={this._handlePagination}
          dataSource={this._ds.cloneWithRows(this.state.dataSource)}
          renderHeader={this._renderHeader}
          renderRow={this.props.renderRow}
          renderFooter={this.props.renderFooter || this._renderFooter}
        />
      </View>
    );
  }

  /**
   * 渲染头部
   */
  _renderHeader = () => {
    //判断是不是为空
    var isEmpty = this._dataProvider.isEmpty();
    return (
      <View style={isEmpty ? styles.container : null}>
        {this.props.customHeader && this.props.customHeader ()}
        {isEmpty ? this._renderEmptyView () : null}
      </View>
    );
  };

  /**
   * 渲染ListView的footer
   */
  _renderFooter = () => {
    if (!this._dataProvider.isEmpty()) {
      return (
        <View style={styles.footer}>
          <ActivityIndicatorIOS size='small'/>
          <Text style={[styles.name,styles.text]}>正在加载</Text>
        </View>
      );
    }
  };

  /**
   * 处理分页
   */
  _handlePagination:Function = async (e) => {
    //1. 屏蔽不是ScrollView滚动到底部产生的事件
    //2. 如果当前的状态不是正在获取更新，不去分页获取
    //3. 是不是在pull,push,refresh
    //4. 是不是已经加载到最后一页
    if (!e || this._isLoading || this._swipeRefreshStatus || this.state.isLoadTail) {
      this.setState ({
        isLoadTail: true  // 不需要再显示底部loading;
      });
      return false;
    }

    // 如果第一页的数量小于pagesize不再分页
    if (this._page == 0 && this.state.dataSource.length < this.props.pageSize) {
      this.setState ({
        isLoadTail: true  // 不需要再显示底部loading;
      });
      return false;
    }

    this._isLoading = true;
    this._page++;
    const {res, err} = await this._http ();
    this._isLoading = false;

    //最后一页
    if (res.dataList.length === 0) {
      this._page--;
    }

    this.setState ({
      dataSource: this.state.dataSource.concat (res.dataList),
      isLoadTail: res.dataList.length < this.props.pageSize
    }, () => this.props.onDataReceive (res));
  };

  /**
   * 将Fetch操作抽取出来,支持POST方法
   * @private
   */
  _http ():Promise {
    //如果是post方法获取数据
    if (this.props.postMethod) {
      const postBody = this.props.postBody;
      postBody['pageNum'] = this._page;
      return UIetch (this.props.url, {
        method: 'POST',
        body: JSON.stringify (postBody)
      });
    }
    else {
      //GET方法
      return UIFetch (this._getURL ());
    }
  }

  _handleMomentumScrollEnd:Function = async (onRefreshEnd) => {
    //当前的页
    this._page = 0;

    let dataSource = [];
    let isLoadTail = true;
    //获取数据
    const {res, err} = await this._http ();
    if (!err) {
      dataSource = res.dataList;
      isLoadTail = res.dataList.length < this.props.pageSize;
    }
    onRefreshEnd ();
    InteractionManager.runAfterInteractions (() => {
      this.setState ({
        dataSource: dataSource,
        isLoadTail: isLoadTail
      }, () => this.props.onDataReceive (res));
    });
  };

  /**
   * 初始化获取数据
   */
  async _init ():any {
    this._page = 0;
    let dataSource = [];
    let isLoadTail = true;

    const {res, err} = await this._http ();
    if (!err) {
      dataSource = res.dataList;
      isLoadTail = res.dataList.length < this.props.pageSize;
    }

    this.setState ({
      isInitLoading: false, //取消loading
      dataSource: dataSource,
      isLoadTail: isLoadTail
    }, () => this.props.onDataReceive (res));
  }

  /**
   * 返回顶部
   */
  _backToTop:Function = () => {
    this.getScrollResponder ().scrollResponderScrollTo (0, 0);
  };

  /**
   * 获取scrollResponder
   * @returns {*|ReactComponent}
   */
  getScrollResponder ():Object {
    return this._listView.refs.listviewscroll._swipeRefreshView.getScrollResponder ();
  }

  /**
   * 刷新指定列表
   */
  refreshListView () {
    InteractionManager.runAfterInteractions (() => {
      this._init ();
    });
  }
}

const styles = StyleSheet.create ({
  container: {
    flex: 1
  },
  noDataContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  footer: {
    width: SCREEN_WIDTH,
    height: 30,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1 / PixelRatio.get (),
    borderColor: '#e1e1e1'
  },
  txt: {
    fontSize: 16,
    color: '#666'
  },
  text: {
    fontSize: 14,
    color: '#939495'
  },
  face: {
    width: 93,
    height: 93,
    marginBottom: 15
  },
  foot: {
    alignSelf: 'stretch',
    justifyContent: 'flex-end',
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 10
  },
  button: {
    backgroundColor: '#e63a59',
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    borderRadius: 5
  },
  cont: {
    fontSize: 16,
    color: '#FFF'
  },
  arrow: {
    width: 20,
    height: 20
  },
  emptyIcon: {
    width: 110,
    height: 110,
    marginBottom: 10
  },
  backToTop: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    backgroundColor: 'transparent'
  }
});

export default UIPullRefreshListView;
