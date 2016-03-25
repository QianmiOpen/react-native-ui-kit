/**
 * @flow
 */
'use strict';

import React, {
  ScrollView,
  Animated,
  View,
  Text,
  Dimensions,
  addons,
  UIManager,
  StyleSheet
} from 'react-native';
import TimeMixin from 'react-timer-mixin';
import reactMixin from 'react-mixin';
import QMLoading from './../loading';
import {Indicator, LOADING_HEIGHT} from './indicator';
//do nothing.
const noop = () => {
};
const {height: SCREEN_HEIGHT} = Dimensions.get('window');


/**
 * 下拉刷新的公共组件
 */
export default class PullToRefresh extends React.Component {
  static defaultProps = {
    needInitLoading: false,
    //默认动画消失时间,600ms
    duration: 600,
    onModeChange: noop
  };

  _swipeRefreshView:any;
  _isTouch:boolean;

  constructor(props:Object) {
    super(props);
    this._swipeRefreshView = null;
    this._isTouch = false;


    this.state = {
      //当前提示框的状态
      mode: 'refresh',
      //当前的提示的高度
      height: 0,
      //是不是可以滚动
      scrollEnabled: true,
      contentContainerStyle: null
    };
  }

  componentDidMount() {
    this._updateContentContainerStyle();
  }

  componentDidUpdate() {
    this._updateContentContainerStyle();
  }

  /**
   * render
   */
  render() {
    if (this.props.needInitLoading) {
      return (<QMLoading />);
    }


    return (
      <ScrollView
        ref={(swipeRefreshView) => this._swipeRefreshView = swipeRefreshView}

        style={styles.container}
        scrollEventThrottle={60}
        keyboardDismissMode='on-drag'
        onTouchStart={(e) => this._isTouch = true}
        onTouchEnd={(e) => this._isTouch = false}
        onScroll={this._handleScroll}
        scrollEnabled={this.state.scrollEnabled}
        showsVerticalScrollIndicator={true}
        automaticallyAdjustContentInsets={false}
        contentContainerStyle={this.state.contentContainerStyle}
        onResponderRelease={this._handleResponseRelease}
        onMomentumScrollEnd={this._handleScrollEnd}>

        {/*指示器*/}
        <Indicator
          mode={this.state.mode}
          duration={this.props.duration}
          height={this.state.height}
        />

        {/*子元素*/}
        {this.props.children}
      </ScrollView>
    )
  }


  /**
   * 更新ScrollView的内部样式
   * @param height
   * @private
   */
  _updateContentContainerStyle = () => {
    if (this._swipeRefreshView) {
      this.requestAnimationFrame(() => {
        UIManager.measure(this._swipeRefreshView.getInnerViewNode(), (x, y, width, height, pageX, pageY) => {
          if (height <= SCREEN_HEIGHT) {
            //avoid re-render
            if (!this.state.contentContainerStyle) {
              this.setState({
                contentContainerStyle: {
                  flex: 1
                }
              });
            }
          } else {
            //avoid re-render
            if (this.state.contentContainerStyle) {
              this.setState({
                contentContainerStyle: null
              });
            }
          }
        });
      });
    }
  };


  /**
   * 处理ScrollView的滚动
   * @param e
   * @private
   */
  _handleScroll = (e:Object) => {
    //通知父组件
    this.props.onScroll && this.props.onScroll(e);

    //得到当前的下拉距离
    //下拉距离+初始偏移量
    const offsetY = e.nativeEvent.contentOffset.y + e.nativeEvent.contentInset.top;
    if (offsetY <= 0 && this._isTouch) {
      if (Math.abs(offsetY) >= LOADING_HEIGHT) {
        //如果不是push状态,更新
        if (this.state.mode != 'push') {
          this.setState({
            mode: 'push',
            height: LOADING_HEIGHT
          }, () => this.props.onModeChange('push'));
        }
      } else {
        //下拉的pull状态,更新mode和height
        if (this.state.height != LOADING_HEIGHT) {
          this.setState({
            mode: 'pull',
            height: Math.abs(offsetY)
          }, () => this.props.onModeChange('pull'));
        }
        //上拉的pull状态,只更新mode
        else if (this.state.mode != 'pull') {
          this.setState({
            mode: 'pull'
          }, () => this.props.onModeChange('pull'))
        }
      }
    }
  };


  /**
   * 当滚动结束时候
   * @param e
   * @private
   */
  _handleScrollEnd = (e:Object) => {
    //回到原点
    if (this.state.height === LOADING_HEIGHT) {
      this.setState({
        mode: 'refresh'
      }, () => {
        this.props.onModeChange('refresh');
        console.log('---herer------', this.props.onRefresh);
        // 通知外界正在刷新
        this.props.onRefresh && this.props.onRefresh(this.onRefreshEnd)
      });
    }
  };


  /**
   * 手势释放
   * @param e
   * @private
   */
  _handleResponseRelease = (e:Object) => {
    //不是刷新状态,直接消失
    if (this.state.mode === 'pull') {
      this.setState({
        height: 0
      }, () => this.props.onModeChange(''));
    }
  };


  /**
   * 处理结束事件
   */
  onRefreshEnd:Function = () => {
    if (this.state.height) {
      this.setState({
        height: 0
      }, () => {
        //结束之后通知父组件已经结束,可以做些后续的工作
        this.props.onRefreshEnd && this.props.onRefreshEnd();
        this.props.onModeChange('');
      });
    }
  };


  changeScrollEnable:Function = (enabled) => {
    this.setState({
      scrollEnabled: enabled
    });
  };


  getScrollResponder:Function = () => {
    return this._swipeRefreshView.getScrollResponder();
  };
}


reactMixin(PullToRefresh.prototype, TimeMixin);

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
