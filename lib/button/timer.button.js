import React from 'react';
import  {
    StyleSheet,
    PixelRatio,
    Text,
} from 'react-native';

import Button from './button';
import Kit from '../kit';
import { msg } from 'iflux-native';

class TimerButton extends React.Component {

    static defaultProps = {
        style: null,
        onPrePress: Kit.noop,
        time: 60,
        text: '',
        textStyle: null,
        disableText: '',
    };

    state = {
        time: 0,
        isPress: false,
    };

    constructor(props:Object) {
        super(props);
    }

    componentWillUnmount() {
        clearInterval(this.timer); // 清除定时器, 防止内存泄露;
        this.timer = Kit.noop;
    }

    render() {
        let {text, disableText, textStyle} = this.props,
            {isPress, time} = this.state,
            displayText = isPress ? `${disableText}(${time})` : text;
        return (
            <Button
                onPress={this._onPress}
                disabled={isPress}
                style={[styles.verify, this.props.style, isPress && styles.disable]}>
                <Text
                    style={[styles.verifyTxt, textStyle, isPress && styles.disableTxt]}>
                    {displayText}
                </Text>
            </Button>
        );
    }

    _onPress = () => {
        if (!this.state.isPress) {
            let {onPress} = this.props;
            this.setState({isPress: true, time: this.props.time})
            this._timer();
            if (onPress) {
                onPress();
            }
        }
    };

    /**
     * 倒计时
     */
    _timer = () => {
        this.timer = setInterval(()=> {
            if (this.state.time == 0) {
                this._enableBtn();
                return;
            }
            this._disableBtn();
        }, 1000);
    };

    _enableBtn() {
        this.setState({
            isPress: false
        });
        clearInterval(this.timer);
    }

    _disableBtn() {
        this.setState({
            time: --this.state.time
        });
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    verify: {
        marginLeft: 10,
        height: 26,
        width: 90,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1 / PixelRatio.get(),
        borderColor: '#3d85cc',
        backgroundColor: '#fff'
    },
    verifyTxt: {
        fontSize: 14,
        color: '#fff',
    },
    disable: {
        borderColor: '#bbc1c6',
        backgroundColor: '#646464'
    },
    disableTxt: {color: '#fff',}
});

export default TimerButton;