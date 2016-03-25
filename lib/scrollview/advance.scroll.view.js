import React, {StyleSheet, View, ScrollView} from 'react-native';

import Kit from '../kit';

/**
 *
 *
 */
class AdvanceScrollView extends React.Component {

  static defaultProps = {
    onScroll: Kit.noop,
    onPush: Kit.noop,  //往上推触发
    onPull: Kit.noop,   //往下拉触发
  };

  state = {};

  componentDidMount () {
  }

  render () {
    return (
      <ScrollView
        ref={(swipeRefreshView) => this._swipeRefreshView = swipeRefreshView}

        style={styles.container}
        scrollEventThrottle={60}
        keyboardDismissMode='on-drag'
        onTouchStart={this._handleStart.bind(this)}
        onTouchMove={this._handleMove.bind(this)}
        onScrollEndDrag={this._handleEnd.bind(this)}
        scrollEnabled={this.props.scrollEnabled}
        showsVerticalScrollIndicator={true}
        automaticallyAdjustContentInsets={false}>
        {this.props.children}
      </ScrollView>
    );
  }

  getScrollView = () => {
    return this._swipeRefreshView
  };

  _handleStart = (e) => {
    const left = e.nativeEvent.pageX,
      top = e.nativeEvent.pageY;
    this.startPoint = {left, top};
    //console.log ('scroll view => ', this.startPoint);
  };

  _handleMove = (e) => {
    const leftNow = e.nativeEvent.pageX,
      topNow = e.nativeEvent.pageY;
    let {left,top} = this.startPoint;
    this.isPush = top > topNow;
  };

  _handleEnd = (e) => {
    let {onPush, onPull} = this.props;
    if (this.isPush) {
      //console.log ('scroll view => ', '往上推咯咯了');
      onPush ();
    }
    //
    else {
      //console.log ('scroll view => ', '往下啦罗罗罗罗');
      onPull ();
    }
  };
}

const styles = StyleSheet.create ({
  container: {
    flex: 1,
  }
});

export default AdvanceScrollView;