import React from 'react';
import  {
    StyleSheet,
    View,
    Image,
    Text,
} from 'react-native';

import Btn from '../../button/button';
import Kit from '../../kit';

class RightRow extends React.Component {

    static defaultProps = {
        data: '',
        onPress: Kit.noop,
    };

    state = {};

    componentDidMount () {
    }

    render () {
        let {data} = this.props,
            text = data ? (data.text || data) : '';
        return (
            <Btn
                style={styles.btn}
                textStyle={styles.btnText}
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
    btnText: {
        textAlign: 'center',
    },
});

export default RightRow;