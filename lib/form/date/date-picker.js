/**
 * 弹出效果的日期选择控件
 * @flow
 */
'use strict';

import React, {
  View,
  Text,
  Animated,
  DatePickerIOS,
  StyleSheet,
  TouchableOpacity,
  Dimensions
} from 'react-native';

//just do nothing
const noop = () => {};
const {width: WIDTH, height: HEIGHT} = Dimensions.get('window');


export default class DatePicker extends React.Component {
  static defaultProps = {
    // 默认不显示
    visible: false,
    // 确定
    onSubmit: noop,
    // 取消
    onCancel: noop
  };

  constructor(props: Object) {
    super(props);
    this.state = {
      selectedDate: this.props.selectedDate || new Date(),
      //距离顶部的距离
      topValue: new Animated.Value(0)
    };
  }

  /**
   * 改变新属性
   */
  componentWillReceiveProps(nextProps: Object) {
    if (nextProps.visible != this.props.visible) {
      //开始动画
      Animated.spring(this.state.topValue, {
        toValue: nextProps.visible ? HEIGHT : 0,
        friction: 10,
        tension: 30
      }).start();
    }

    if (nextProps.selectedDate) {
      this.setState({
        selectedDate: nextProps.selectedDate
      });
    }
  }


  componentWillMount() {
    //开始动画
    Animated.spring(this.state.topValue, {
      toValue: this.props.visible ? HEIGHT : 0,
      friction: 10,
      tension: 30
    }).start();
  }


  render(): React.Component {
    return (
      <Animated.View style={[styles.container, {
          top: this.state.topValue.interpolate({
            inputRange: [0, HEIGHT],
            outputRange: [HEIGHT, 0]
          })
        }]}>

        <View style={styles.region}>

          {/*头部按钮*/}
          <View style={styles.nav}>
            <TouchableOpacity style={styles.btn} onPress={this._handleCancel}>
              <Text allowFontScaling={false} style={styles.text}>取消</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btn} onPress={this._handleSubmit}>
              <Text allowFontScaling={false} style={styles.text}>确认</Text>
            </TouchableOpacity>
          </View>

          <DatePickerIOS
            date={this.state.selectedDate}
            mode="date"
            onDateChange={this._changeDate}/>
        </View>
      </Animated.View>
    );
  }

  /**
   * 处理取消
   */
  _handleCancel = () => {
    this.props.onCancel()
  };


  /**
   * 处理确定
   */
  _handleSubmit = () => {
    this.props.onSubmit({
      date: this.state.selectedDate
    })
  };


  _changeDate = (date: Date) => {
    this.setState({
      selectedDate: date
    });
  };
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: WIDTH,
    height: HEIGHT,
    left: 0,
    position: 'absolute',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  nav: {
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#3d85cc',
    flexDirection: 'row'
  },
  btn: {
    padding: 15,
  },
  text: {
    color: '#FFF',
    fontSize: 16
  },
  region: {
    flex: 1,
    marginTop: HEIGHT/2,
    backgroundColor: '#FFF'
  },
  regionArea: {
    flexDirection: 'row'
  },
  regionItem: {
    flex: 1
  }
});
