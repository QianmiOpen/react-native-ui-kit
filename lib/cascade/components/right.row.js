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
        index: 0,
        onPress: Kit.noop,
    };

    state = {};

    componentDidMount() {
    }

    render() {
        let {data} = this.props,
            text = data ? (data.text || data) : '';
        return (
            <SimpleRow
                style={styles.btn}
                title={text}
                onPress={this.props.onPress}
                imageRender={this._renderImage}>
            </SimpleRow>
        );
    }

    _renderImage = () => {
        let {index} = this.props,
            colorIndex = index % 4;
        return <View style={[styles.point, styles['pointColor_' + colorIndex]]}/>;
    };
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

    //
    point: {
        width: 8,
        height: 8,
        marginRight: 5,
        borderRadius: 4,
    },
    pointColor_0: {backgroundColor: '#fb7574',},
    pointColor_1: {backgroundColor: '#ffc617',},
    pointColor_2: {backgroundColor: '#3fb7ea',},
    pointColor_3: {backgroundColor: '#33d3ac',},
});

export default RightRow;