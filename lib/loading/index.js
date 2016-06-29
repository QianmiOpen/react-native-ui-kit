import React from 'react';
import  {
    View,
    ActivityIndicatorIOS,
    StyleSheet,
    ProgressBarAndroid,
    Platform
} from 'react-native';

/**
 * Usage
 * var {Loading} = require('qmkit');
 *
 * <Loading/>
 */
class UILoading extends React.Component {
    static defaultProps = {
        //是否悬浮loading
        overflow: false
    };

    render() {
        const { overflow } = this.props;

        return (
            <View style={[styles.loading, overflow && styles.overflow,  this.props.style]}>
                {
                    Platform.OS === 'ios' ?
                        <ActivityIndicatorIOS size='small'/>
                        :
                        <ProgressBarAndroid color='#3d85cc' styleAttr='LargeInverse' style={styles.progress}/>
                }
            </View>
        );
    }
}

/**
 * style
 */
const styles = StyleSheet.create({
    loading: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    progress: {
        width: 30,
        height: 30
    },
    overflow: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.1)'
    }
});

export default UILoading;