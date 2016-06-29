import React from 'react';
import {
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
import {msg} from 'iflux-native';
import UIFetch from '../fetch';

export default class Upload extends React.Component {

    static defaultProps = {
        imageContainerStyle: null,
        imageStyle: null,
        value: null,
        qiniuDomain: null,
        qiniuTokenUrl: null,
    };

    state = {
        image: null,
    };

    componentDidMount () {
        this.state.image = this.props.value;
    }

    componentWillReceiveProps (np) {
        if (np.value) {
            this.state.image = np.value;
        }
    }

    render () {
        let {imageStyle, imageContainerStyle, value} = this.props,
            {image} = this.state;
        return (
            <FormItem
                {...this.props}>
                <Btn
                    style={[styles.btn, imageContainerStyle]}
                    onPress={this._onPress}>
                    <Image
                        style={[styles.image, imageStyle]}
                        source={this._toImageSource(image || value)}/>
                </Btn>
                {this.props.children}
            </FormItem>
        )
    }

    /**
     *
     * @returns {*}
     */
    toValue = () => {
        return this.state.image;
    };

    _toImageSource = (image) => {
        if (typeof image == 'string') {
            return {uri: image}
        }
        else {
            return image;
        }
    };

    _onPress = () => {
        NativeModules.ImagePickerManager.showImagePicker({
            title: '选择图片上传',
            cancelButtonTitle: '取消',
            takePhotoButtonTitle: '拍新的照片',
            chooseFromLibraryButtonTitle: '已有照片中选择',
        }, this._onSelect)
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
            let image = response.data,
                {qiniuTokenUrl} = this.props;
            if (qiniuTokenUrl) {
                UIFetch(qiniuTokenUrl, {
                    method: 'GET',
                    handler: (r) => {
                        r = JSON.parse(r);
                        return {result: 1, data: r.uptoken};
                    }
                }).then(t => this._useQiNiuUpload(t, image));
            }
            else {
                this.setState({image});
            }
        }
    };

    _useQiNiuUpload = (token, b4) => {
        UIFetch('http://up.qiniu.com/putb64/-1', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/octet-stream',
                'Authorization': `UpToken ${token}`,
            },
            body: b4,
            handler: (data) => {
                data = JSON.parse(data)
                return {result: 1, data: data.hash};
            }
        }).then((r) => {
            let {qiniuDomain} = this.props,
                imageUrl = qiniuDomain + r;
            //console.log(imageUrl)
            this.setState({image: imageUrl})
        })
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
