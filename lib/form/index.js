/**
 * @flow
 */
'use strict';

import React, {
    View
} from 'react-native';

import Kit from '../kit';

/**
 * Usage:
 */
class Form extends React.Component {

    static defaultProps = {
        validateMap: {
        },
        onChange: Kit.noop
    };

    render() {
        return (
            <View
                onChange={this._handleChange}
                style={this.props.style}>
                {this.props.children}
            </View>
        )
    }


    /**
     * handle form的field的改变
     *
     * TODO 可能onChange并不能满足我们的场景，可能还需要处理onChangeText
     */
    _handleChange = (e:Object) => {
        this.props.onChange(e);
    };
}

import TextInput from './text-input';
import DateInput from './date/date-input';
import TextFiled from './text-field';


Form.Input = TextInput;
Form.Date = DateInput;
Form.Text = TextFiled;

export default Form;
