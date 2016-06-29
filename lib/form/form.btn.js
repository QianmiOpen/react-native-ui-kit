import React from 'react';
import  {
    View,
    Text,
    PixelRatio,
    TextInput,
    Platform,
    StyleSheet,
    Image,
    NativeModules,
} from 'react-native';

import Kit from '../kit';
import FormItem from './form.item';
import Btn from '../button/button';
import Config from './config';
import {msg} from 'iflux-native';

export default class FormBtn extends React.Component {

    static defaultProps = {
        onPress: Kit.noop,
        value: '',
    };

    state = {
        image: {},
    };

    render() {
        return (
            <FormItem
                {...this.props}>
                <Btn
                    style={[styles.btn, Config.formBtnStyle]}
                    onPress={this._onPress}
                    text={this.props.value}>
                </Btn>
                {this.props.children}
            </FormItem>
        )
    }

    _onPress = () => {
        let {onPress} = this.props;
        if (typeof onPress == 'string') {
            msg.emit('route:goToNext', {sceneName: onPress});
        }
        else if (onPress) {
            onPress();
        }
    };

    _onSelect = (response) => {
        if (response.didCancel) {
            console.log('User cancelled image picker');
        }
        else if (response.error) {
            console.log('ImagePickerManager Error: ', response.error);
        }
        else if (response.customButton) {
            console.log('User tapped custom button: ', response.customButton);
        }
        else {
            let image = {uri: 'data:image/jpeg;base64,' + response.data};
            this.setState({image});
        }
    };
}

const styles = StyleSheet.create({
    view: {
        padding: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 1 / PixelRatio.get(),
        borderBottomColor: '#e1e1e1'
    },

    image: {
        resizeMode: Image.resizeMode.stretch,
    },

    btn: {
        flex: 1,
        width: 200,
        alignItems: 'flex-end',
    }
});
