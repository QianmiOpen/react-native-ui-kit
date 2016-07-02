import React from 'react';
import  {
    StyleSheet,
    View,
    Image,
    Text,
} from 'react-native';

import Btn from '../../button/button';

class LeftRow extends React.Component {

    static defaultProps = {};

    state = {};

    componentDidMount () {
    }

    render () {
        return (
            <Btn
                style={styles.container}>
            </Btn>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    //
});

export default LeftRow;