import React from 'react';
import  {
    StyleSheet,
    View,
    Image,
    Text,
} from 'react-native';

import Btn from '../../button/button';
import Kit from '../../kit';

class LeftRow extends React.Component {

    static defaultProps = {
        data: '',
        onPress: Kit.noop,
        isSelected: false,
    };

    state = {};

    componentDidMount () {
    }

    render () {
        let {data, isSelected} = this.props,
            text = data ? (data.text || data) : '';
        return (
            <Btn
                style={[styles.btn, isSelected ? styles.selectedBtn : null]}
                textStyle={[styles.btnText, isSelected ? styles.selectedBtnText : null]}
                text={text}
                onPress={this.props.onPress}>
            </Btn>
        );
    }
}

const styles = StyleSheet.create({
    //
    btn: {
        padding: 10,
        borderBottomWidth: 1,
        borderColor: '#EEE',
    },

    //
    selectedBtn: {
        backgroundColor: '#EEE',
    },

    //
    btnText: {
        color: '#999',
        textAlign: 'center',

    },
    selectedBtnText: {
        color: '#000',
        fontWeight: 'bold',
    },
});

export default LeftRow;