import React from 'react';
import  {
    View,
    Text,
    Animated,
    DatePickerIOS,
    StyleSheet,
    TouchableOpacity,
    Dimensions
} from 'react-native';

import {msg} from 'iflux-native';
import Kit from '../kit';

//just do nothing
const noop = () => {
};
const {width: WIDTH, height: HEIGHT} = Dimensions.get('window');

class DatePicker extends React.Component {
    static defaultProps = {
        // 默认不显示
        visible: false,
        // 确定
        onSubmit: noop,
        // 取消
        onCancel: noop
    };

    constructor(props:Object) {
        super(props);
        this.state = {
            selectedDate: this.props.selectedDate || new Date(),
        };
    }

    /**
     * 改变新属性
     */
    componentWillReceiveProps(nextProps:Object) {
        if (nextProps.selectedDate) {
            this.setState({
                selectedDate: nextProps.selectedDate
            });
        }
        this._toggle(nextProps.visible);
    }

    render():React.Component {
        return (
            <View style={styles.empty}></View>
        );
    }

    _toggle = (show) => {
        if (show) {
            msg.emit('ui.popover', {
                visible: true,
                component: this._popoverComponent()
            })
        }
    };

    _popoverComponent = () => {
        return (
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
        );
    };

    /**
     * 处理取消
     */
    _handleCancel = () => {
        msg.emit('ui.popover', {visible: false});
        this.props.onCancel()
    };

    /**
     * 处理确定
     */
    _handleSubmit = () => {
        msg.emit('ui.popover', {visible: false});
        this.props.onSubmit({
            date: this.state.selectedDate
        })
    };

    _changeDate = (date:Date) => {
        this.setState({
            selectedDate: date
        });
    };
}

const styles = StyleSheet.create({
    empty: {
        width: 0,
        height: 0,
    },
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
        marginTop: HEIGHT / 2,
        backgroundColor: '#FFF'
    },
    regionArea: {
        flexDirection: 'row'
    },
    regionItem: {
        flex: 1
    }
});

export default DatePicker;
