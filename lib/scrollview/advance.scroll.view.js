import React, {StyleSheet, View, ScrollView} from 'react-native';

import Kit from '../kit';
import Config from '../config';
import RefreshControl from './refresh.control';

/**
 *
 *
 */
class AdvanceScrollView extends React.Component {

  static defaultProps = {
    triggerDistance: -1, //滑动距离大于多少触发
    onScroll: Kit.noop,
    onPush: Kit.noop,  //往上推触发
    onPull: Kit.noop,   //往下拉触发
    onBottomPush: Kit.noop, //当从底部往上推到onBottomHeight的高度的时候触发
    onBottomPushing: Kit.noop,
    onBottomHeight: -1,
    onTopPull: Kit.noop, //当从顶部往下拉到onTopHeight的高度的时候触发
    onTopPulling: Kit.noop,
    onTopHeight: -1,

    onRefresh: Kit.noop,
  };

  state = {
    pullHeight: 0,
    mode: 'normal',
  };

  componentDidMount () {
  }

  render () {
    let {onRefresh} = this.props,
      {pullHeight, mode} = this.state;

    return (
      <ScrollView
        ref='scrollView'
        style={[styles.container, this.props.style]}
        scrollEventThrottle={60}
        contentContainerStyle={this.props.contentContainerStyle}
        keyboardDismissMode='on-drag'
        onTouchStart={this._handleStart.bind(this)}
        onTouchMove={this._handleMove.bind(this)}
        onScrollEndDrag={this._handleEndDrag.bind(this)}
        onScroll={this._handleScroll.bind(this)}
        scrollEnabled={this.props.scrollEnabled}
        showsVerticalScrollIndicator={true}
        automaticallyAdjustContentInsets={false}>
        {onRefresh ? <RefreshControl mode={mode} pullHeight={pullHeight} onRefresh={this._onRefresh}/> : null}
        {this.props.children}
      </ScrollView>
    );
  }

  getScrollView = () => {
    return this.refs.scrollView;
  };

  getScrollResponder = () => {
    return this.getScrollView().getScrollResponder();
  };

  scrollTo = (args) => {
    this._swipeRefreshView.scrollTo(args);
  };

  /**
   *
   * @param canbe
   * @private
   */
  _onRefresh = (canBeRefresh) => {
    this.canBeRefresh = canBeRefresh;
  };

  /**
   * 滚动触发
   * @param e
   * @private
   */
  _handleScroll = (e:Object) => {
    //android 没这特性
    if (Kit.isAndroid()) {
      return;
    }
    if (!this.isTouch) {
      return;
    }
    let evt = e.nativeEvent,
      {onTopHeight, onTopPulling, onBottomHeight, onBottomPushing, onRefresh} = this.props,
      offset = evt.contentOffset.y,
      absOffset = Math.abs(offset);

    //往下拉
    if (offset < 0 && absOffset >= onTopHeight) {
      this.isTriggerTop = true;
      onTopPulling && onTopPulling(absOffset);
      if (onRefresh) {
        this.setState({pullHeight: absOffset, mode: 'pull'});
      }
    }
    //往上推
    else if (offset > 0 && absOffset >= onBottomHeight) {
      this.isTriggerBottom = true;
      onBottomPushing && onBottomPushing(absOffset);
    }
  };

  /**
   * 手指点击
   * @param e
   * @private
   */
  _handleStart = (e) => {
    const left = e.nativeEvent.pageX,
      top = e.nativeEvent.pageY;
    this.isTouch = true;
    this.startPoint = {left, top};
    //console.log ('scroll view => ', this.startPoint);
  };

  /**
   * 手指移动
   * @param e
   * @private
   */
  _handleMove = (e) => {
    const leftNow = e.nativeEvent.pageX,
      topNow = e.nativeEvent.pageY;
    let {triggerDistance} = this.props,
      {left,top} = this.startPoint,
      distanceNow = Math.abs(top - topNow);
    this.isTrigger = distanceNow > triggerDistance;
    this.isPush = top > topNow;
  };

  /**
   * 手指停止拖动
   * @param e
   * @private
   */
  _handleEndDrag = (e) => {
    this._reset();
    if (!this.isTrigger) {
      return;
    }
    let {onPush, onPull} = this.props;
    if (this.isPush) {
      //console.log ('scroll view => ', '往上推咯咯了');
      onPush();
    }
    //
    else {
      //console.log ('scroll view => ', '往下啦罗罗罗罗');
      onPull();
    }
  };

  /**
   * 手指停止重置
   * @private
   */
  _reset = () => {
    //console.log (this.canBeRefresh, this.isTouch, this.isTriggerBottom, this.isTriggerTop)
    this.isTouch = false;
    let {onTopPull, onBottomPush, onRefresh} = this.props;
    if (this.isTriggerBottom) {
      onBottomPush();
    }
    else if (this.isTriggerTop) {
      onTopPull();
    }

    if (this.canBeRefresh) {
      this.setState({mode: 'refresh'});
      let r = onRefresh();
      if (r && r.then) {
        r.finally(() => {
          this.setState({mode: 'normal'});
        });
      }
    }
    else {
      this.setState({mode: 'normal'});
    }
    this.isTriggerBottom = this.isTriggerTop = false;
  };
  ;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});

export default AdvanceScrollView;