import React from 'react';
import  {
    View,
    Text,
    TextInput,
    Platform,
    StyleSheet,
    DatePickerIOS,
} from 'react-native';

import Moment from 'moment';
import Kit from '../kit';
import FormItem from './form.item';
import Date from '../date';
import Button from '../button/button';

class DateInput extends React.Component {

    static defaultProps = {
        mode: 'date',
    };

    state = {
        show: false,
        value: this.props.value,
    };

    render() {
        return (
            <FormItem
                {...this.props}>
                <View
                    style={styles.inputContainer}>
                    <Date
                        mode={this.props.mode}
                        date={this.props.value}
                        visible={this.state.show}
                        onSubmit={this._handleOnChange}/>
                    <Button
                        text={this.state.value}
                        textStyle={styles.inputText}
                        style={[styles.input, this.props.inputStyle]}
                        onPress={this._handleOnFocus}/>
                </View>
            </FormItem>
        );
    }

    _handleOnFocus = () => {
        this.setState({show: true});
    };

    _handleOnChange = ({date}) => {
        let v;
        switch (this.props.mode) {
            case 'date':
                v = Moment(date).format('YYYY-MM-DD');
                break;
            case 'time':
                v = Moment(date).format('hh:mm:ss');
                break;
            case 'datetime':
                v = Moment(date).format('YYYY-MM-dd hh:mm:ss');
                break;
        }
        this.setState({show: false, value: v});
    };
}

const styles = StyleSheet.create({
    inputContainer: {},
    input: {
        height: 26,
        width: 200,
        justifyContent: 'center',
    },
    inputText: {
        fontSize: 14,
        color: '#939495',
        textAlign: 'right',
    },
});

export default DateInput;