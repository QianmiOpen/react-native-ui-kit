import React from 'react';
import  {
    View,
    Text,
    PixelRatio,
    TouchableWithoutFeedback,
    StyleSheet
} from 'react-native';

import Kit from '../kit';
import FormItem from './form.item';

class TextField extends React.Component {
    static defaultProps = {
        onPress: Kit.noop
    };

    render () {
        return (
            <FormItem
                {...this.props}>
                <TouchableWithoutFeedback onPress={this._handlePress}>
                    <View style={styles.inputBox}>
                        <Text numberOfLines={2} style={[styles.input, this.props.textColor]}>
                            {this.props.value}
                        </Text>
                    </View>
                </TouchableWithoutFeedback>
            </FormItem>
        );
    }

    _handlePress = () => {
        this.props.onPress();
    };
}

const styles = StyleSheet.create({
    view: {
        padding: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 1 / PixelRatio.get(),
        borderBottomColor: '#e1e1e1'
    },
    text: {
        fontSize: 14,
        color: '#333'
    },
    inputBox: {
        justifyContent: 'center',
        alignItems: 'flex-end',
        height: 32,
        width: 200,
        marginRight: 5
    },
    input: {
        textAlign: 'right',
        fontSize: 14,
        color: '#bbc1c6',
    }
});

export default TextField;