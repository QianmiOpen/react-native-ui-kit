import {
    StyleSheet,
    Platform
} from 'react-native';

import Kit from '../kit';

/**
 * 样式可以区分IOS和Android
 */
export default UIStyle = {

    /**
     * 
     */
    create(styles) {
        let platformStyles = {};
        Object.keys(styles).forEach((name) => {
            let {ios, android, ...style} = { ...styles[name] };
            if (ios && Kit.isIOS()) {
                style = { ...style, ...ios };
            }
            else if (android && Kit.isAndroid()) {
                style = { ...style, ...android };
            }

            if (name === 'ios' && Kit.isIOS()) {
                Object.keys(style).forEach((styleName) => {
                    if (platformStyles[styleName]) {
                        platformStyles[styleName] = { ...platformStyles[styleName], ...style[styleName] };
                    }
                });
            }

            if (name === 'android' && Kit.isAndroid()) {
                Object.keys(style).forEach((styleName) => {
                    if (platformStyles[styleName]) {
                        platformStyles[styleName] = { ...platformStyles[styleName], ...style[styleName] };
                    }
                });
            }

            if (name != 'ios' && name != 'android') {
                platformStyles[name] = style;
            }
        });
        return StyleSheet.create(platformStyles);
    }
}