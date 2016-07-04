import React from 'react';
import  {
    StyleSheet,
    View,
    Image,
    Text,
} from 'react-native';

import Btn from '../../button/button';
import Kit from '../../kit';
import SimpleRow from '../../list.row/simple.row';

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
            <SimpleRow
                style={styles.btn}
                title={text}
                onPress={this.props.onPress}>
            </SimpleRow>
        );
    }
}

const styles = StyleSheet.create({
    //
    btn: {
        padding: 5,
        paddingLeft: 10,
        paddingRight: 10,
        backgroundColor: '#EEE',
        marginBottom: 10,
        height: 30,
    },

    //
    btnText: {
        textAlign: 'center',
    },
});

export default RightRow;