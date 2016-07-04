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
        placeholder: '按关键词搜索',
        onSearch: Kit.noop,
    };

    state = {};

    componentDidMount () {
    }

    render () {
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
                        placeholder={props.placeholder}
                        autoCorrect={false}
                        underlineColorAndroid="transparent"
                        onSubmitEditing={this._onSubmitEditing}
                    />
                </View>
            </View>
        )
    }

    _onSubmitEditing = (evt) => {
        this.props.onSearch(evt.nativeEvent.text);
    };
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
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
        height: 20,
        fontSize: 14,
    },
});

export default UISearch;
