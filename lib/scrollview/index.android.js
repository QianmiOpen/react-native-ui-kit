/**
 * Created by hufeng on 3/22/16.
 * android pull-to-refresh
 */
"use strict";

import React, {
  ScrollView,
  View,
  UIManager,
  RefreshControl,
  StyleSheet,
  Dimensions,
} from 'react-native';
import TimerMixin from 'react-timer-mixin';
import reactMixin from 'react-mixin';

const noop = () => {};
const {height: SCREEN_HEIGHT} = Dimensions.get('window');

export default class PullToRefresh extends React.Component {

  static defaultProps = {
    onRefresh: noop
  };

  constructor(props) {
    super(props);

    this.state = {
      isRefreshing: false,
      contentContainerStyle: null
    };
  }


  componentDidMount() {
    this._updateContentContainerStyle();
  }

  componentDidUpdate() {
    this._updateContentContainerStyle();
  }


  render() {
    return (
      <ScrollView
        ref={(scrollView) => this._swipeRefreshView = scrollView}
        contentContainerStyle={this.state.contentContainerStyle}
        style={styles.container} refreshControl={
        <RefreshControl
          colors={['#3d85cc', '#0000ff']}
          refreshing={this.state.isRefreshing}
          onRefresh={this._handleOnRefresh}
         />
      }>
        {this.props.children}
      </ScrollView>
    );
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
          //avoid re-redner
          if (height <= SCREEN_HEIGHT) {
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


  _handleOnRefresh = () => {
    this.setState({
      isRefreshing: true
    });

    this.props.onRefresh(this.onEnd);
  };


  onEnd = () => {
    this.setState({
      isRefreshing: false
    });
  };
};


reactMixin(PullToRefresh.prototype, TimerMixin);


const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

