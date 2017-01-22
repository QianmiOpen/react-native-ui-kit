import React from 'react';
import  {
    Dimensions,
    Platform,
    Linking,
    ListView,
    PixelRatio,
} from 'react-native';

import {msg} from 'iflux-native';
import Moment from 'moment';

const noop = () => {
};

const KIT = {

    /**
     * 路由方法
     */
    routeReplace: (sceneConfig) => {
        msg.emit('route:replaceRoute', sceneConfig);
    },
    routeBack: () => {
        msg.emit('route:backToLast');
    },
    routeBackToLast: () => {
        msg.emit('route:backToTop');
    },
    routeNext: (sceneConfig) => {
        msg.emit('route:goToNext', sceneConfig);
    },
    popShow: (component) => {
        msg.emit('ui.popover', {component})
    },
    popHide: () => {
        msg.emit('ui.popover', {visible: false});
    },

    /**
     *
     */
    toDateString: (src) => {
        return Moment(src).format('YYYY-MM-DD HH:mm:ss');
    },

    /**
     *
     */
    Width: Dimensions.get('window').width,
    Height: Dimensions.get('window').height,

    /**
     * 获取相对高度和宽度
     */
    getWidth (width){
        return PixelRatio.getPixelSizeForLayoutSize(width);
    },
    getHeight(height){
        return PixelRatio.getPixelSizeForLayoutSize(height);
    },

    /**
     *
     */
    noop: noop,

    /**
     *
     */
    simpleDataSource() {
        const dataSource = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 != r2
        });
        return dataSource;
    },

    /**
     * 判断是否是android
     * @returns {boolean}
     */
    isAndroid (): boolean {
        return Platform.OS === 'android';
    },

    /**
     * 判断是否是ios
     * @returns {boolean}
     */
    isIOS (): boolean {
        return !KIT.isAndroid();
    },

    /**
     *
     */
    leftPadding(src, size, char){
        src = src + '';
        let srcLen = src.length,
            offset = size - srcLen;
        for (let i = 0; i < offset; i++) {
            src = (char || ' ') + src;
        }
        //console.log(src, srcLen, offset, char)
        return src;
    },

    /**
     * 把一个数组按数量分割几份
     */
    splitByCount(src, count, isF, full){
        var rr = [],
            r;
        for (let i = 0; i < src.length; i++) {
            if (i % count == 0) {
                r = [];
                rr.push(r);
            }
            r.push(src[i]);
        }

        //补齐
        if (isF && r) {
            for (let i = r.length; i < count; i++) {
                r.push(full || '');
            }
        }
        return rr;
    }
};

export default KIT;
