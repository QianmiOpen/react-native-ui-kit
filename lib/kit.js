import React from 'react';
import  {
    Dimensions,
    Platform,
    Linking,
    ListView,
} from 'react-native';

import {msg} from 'iflux-native';

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
    Width: Dimensions.get('window').width,
    Height: Dimensions.get('window').height,

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
