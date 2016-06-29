import React from 'react';
import  {
    StyleSheet,
    View
} from 'react-native';

import Kit from '../kit';
import FormItem from './form.item';
import Btn from '../button/button';
import {msg} from 'iflux-native';
import Config from './config';

class SelectView extends React.Component {

    static defaultProps = {
        value: null,
        btnStyle: null,
        btnTextStyle: null,
        dataProvider: [],
    };

    state = {
        text: '',
    };

    componentDidMount () {
        this.selectByValue(this.props.value);
    }

    componentWillReceiveProps (np) {
        if (np.value) {
            this.selectByValue(np.value);
        }
    }

    render () {
        let {btnStyle, btnTextStyle} = this.props,
            {text} = this.state;
        return (
            <FormItem
                {...this.props}>
                <Btn
                    style={[styles.btn, btnStyle]}
                    textStyle={[styles.btnTxt, Config.inputStyle, btnTextStyle]}
                    onPress={this._onShowSelect}
                    text={text}/>
            </FormItem>
        );
    }

    toValue = () => {
        return this.state.selectItem;
    };

    /**
     * 选择index
     * @param index
     */
    selectByIndex = (index) => {
        let {dataProvider} = this.props,
            text = dataProvider[index];
        if (typeof  text == 'string') {
            this.setState({text: text, selectItem: text});
        }
        else {
            this.setState({text: text.label, selectItem: text});
        }
    };

    /**
     * 选择val
     * @param val
     */
    selectByValue = (val) => {
        if (!val) {
            this.setState({text: ''});
            return
        }
        let {dataProvider} = this.props,
            text, selectItem;
        for (item of dataProvider) {
            if (item.value == val) {
                selectItem = item;
                text = item.label;
                break;
            }
            else if (item == val) {
                selectItem = text = item;
                break;
            }
        }
        this.setState({text, selectItem});
    };

    _onShowSelect = () => {
        let {dataProvider} = this.props;
        options = dataProvider.map((item, index) => {
            let handler = () => this.selectByIndex(index);
            if (typeof item == 'string') {
                return {label: item, handler};
            }
            else {
                return Object.assign({handler}, item);
            }
        });
        options.push('取消');
        msg.emit('ui.actionSheet', options);
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    btn: {
        flex: 1,
        height: 26,
        width: 200,
        justifyContent: 'center',
    },

    btnTxt: {
        textAlign: 'right',
        color: '#939495',
    }
});

export default SelectView;