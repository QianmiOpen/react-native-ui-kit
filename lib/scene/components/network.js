import React from 'react';
import  {StyleSheet, View, Text, Image} from 'react-native';

import Button from '../../button/button';
import Kit from '../../kit';

class NoNetwork extends React.Component {

    static defaultProps = {
        onPress: Kit.noop
    };

    state = {};

    componentDidMount() {
    }

    render() {
        return (
            <View
                style={styles.container}>

                <View
                    style={[styles.body]}>
                    >
                    <Text
                        style={[styles.bodyText, styles.bodyTitle]}>
                        网络请求失败
                    </Text>
                    <Text
                        style={[styles.bodyText, styles.bodySubTitle]}>
                        请检查您的网络
                    </Text>
                    <Button
                        style={[styles.button]}
                        onPress={this.props.onPress}>
                        <Text>重新加载</Text>
                    </Button>
                </View>
            </View>
        );
    }

    _handleSetting = () => {
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    settingRow: {
        backgroundColor: '#777777'
    },
    settingRowTitle: {
        color: '#fff'
    },

    body: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    bodyImage: {
        width: 96,
        height: 59,
        resizeMode: Image.resizeMode.stretch,
        marginBottom: 20,
    },
    bodyText: {
        color: '#b3b3b3',
        paddingTop: 5,
        paddingBottom: 5,
    },
    bodyTitle: {
        fontSize: 20
    },

    button: {
        marginTop: 20,
        borderWidth: 1,
        borderColor: '#b3b3b3',
        borderRadius: 2,
        paddingTop: 8,
        paddingBottom: 8,
        paddingLeft: 32,
        paddingRight: 32,
    }
});

export default NoNetwork; 