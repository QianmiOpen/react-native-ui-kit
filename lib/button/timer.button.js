/**
 * @flow
 */
"use strict";
import React, {
  StyleSheet,
  PixelRatio,
  Text,
} from 'react-native';
import BtnContainer from './button';
import QMFetch from './fetch';
import { msg } from 'iflux-native';

//just do nothing
const noop = () => {};

/**
 * 获取验证码倒计时Button
 *
 * onPrePress 需要返回true才可以续续执行, 否则不执行, 可以onPress里做一些参数检查等;
 *
 * <QMTimerButton
 *    style={}
 *    getUrl={}
 *    onPrePress={}
 *    onSuccess={}
 *    onFail={}
 *    time={}
 *    sendText='获取验证码' reSendText='重新发送'/>
 */
export default class TimerButton extends React.Component {
  static defaultProps = {
    /*自定义按钮样式*/
    style: {},
    /*按钮press的回调*/
    onSuccess: noop,
    onFail: noop,
    onPrePress: noop,
    time: 60,
    sendText: '获取验证码', // 发送按钮文本
    reSendText: '重新发送', // 发送按钮文本
    getUrl: noop,   // 验证码请求URL;
  };

  constructor(props: Object) {
    super(props);
    this.state = {
      checkCode: '', // 验证码
      sendButtonText: this.props.sendText,  // 发送按钮文本
      showSendButton: true, // 是否可以点击发送按钮
      time: this.props.time, // 两次获取验证码间隔时间
    };
  }

  componentWillUnmount() {
    clearInterval (this.timer); // 清除定时器, 防止内存泄露;
    this.timer = noop;
  }

  render() {
    return (
        <BtnContainer onPress={this._onGetCheckCodePress}
            style={[styles.verify, !this.state.showSendButton && styles.disable, this.props.style]}>
          <Text
              style={[styles.verifyTxt, !this.state.showSendButton && styles.disableTxt]}>
              {this.state.sendButtonText}
          </Text>
        </BtnContainer>
    );
  }

  /**
   * 获取验证码
   */
  _onGetCheckCodePress = () => {
    if (this.state.showSendButton) {
      this.setState ({
        showSendButton: false
      });

      if (this.props.onPrePress ()) {
        this._getCheckCode ();
      }
      else {
        this.setState ({
          showSendButton: true
        });
      }
    }
  };

  /**
   * 倒计时
   */
  _timer = () => {
    this.timer = setInterval (()=> {
      if (this.state.time == 0) {

        this._enableBtn ();
        return;
      }

      this._disableBtn ();

    }, 1000);
  };

  _enableBtn() {
    this.setState ({
      showSendButton: true,
      sendButtonText: this.props.reSendText,
      time: this.props.time,
    });

    clearInterval (this.timer);
  }

  _disableBtn() {
    var sendButtonText = this.props.reSendText + '(' + this.state.time + ')';
    this.setState ({
      showSendButton: false,
      sendButtonText: sendButtonText,
      time: --this.state.time
    });
  }

  /**
   * 发送短信验证码
   */
  _getCheckCode = async (): any => {
    const {res, err} = await QMFetch(this.props.getUrl());

    if (err) {
      this._enableBtn();
      this.props.onFail();
    } else {
      var isSend = res.isSend || '';
       if (isSend) {
         this._timer ();
         //msg.emit('app:tip', '发送成功, 请检查手机短信');
         this.props.onSuccess();
       }
       else {
         this._enableBtn();
         //msg.emit('app:tip', '发送失败, 请重试!');
         this.props.onFail();
       }
    }
  };
}

const styles = StyleSheet.create ({
  container: {
    flex: 1
  },
  verify: {
    marginLeft: 10,
    height: 26,
    width: 90,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1 / PixelRatio.get (),
    borderColor: '#3d85cc',
    backgroundColor: '#fff'
  },
  verifyTxt: {
    fontSize: 14,
    color: '#326da7'
  },
  disable: {
    borderColor: '#bbc1c6',
    backgroundColor: '#f5f7fa'
  },
  disableTxt: {color: '#bbc1c6',}
});
