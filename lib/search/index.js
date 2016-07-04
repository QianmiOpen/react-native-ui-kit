import React from 'react';
import {
    StyleSheet,
    View,
    Image,
    Text,
    TextInput,
} from 'react-native';

import Kit from '../kit';

class UISearch extends React.Component {

    static defaultProps = {
        style: null,
        onSearch: Kit.noop,
    };

    state = {};

    componentDidMount() {
    }

    render() {
        let props = this.props;
        return (
            <View
                style={[styles.container, props.style]}>
                <View
                    style={styles.imageContainer}>
                    <Image
                        style={styles.image}
                        source={require('./images/search.png')}/>
                </View>
                <View
                    style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        autoCapitalize="none"
                        placeholder="请输入关键词"
                        autoCorrect={false}
                        underlineColorAndroid="transparent"
                    />
                </View>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        paddingTop: 5,
        paddingBottom: 5,
        flexDirection: 'row',
        backgroundColor: '#FFF',
        borderBottomWidth: 1,
        borderColor: '#EEE',
        alignItems: 'center',
    },

    //
    imageContainer: {
        marginRight: 10,
    },
    image: {
        width: 20,
        height: 20,
        resizeMode: Image.resizeMode.stretch,
    },

    //
    inputContainer: {
        flex: 8,
    },
    input: {
        textAlign: 'left',
        textDecorationLine: 'none',
        padding: 4,
    },
});

export default UISearch;
