import React, {StyleSheet, View, PixelRatio, Image, Text} from 'react-native';
import {msg} from 'iflux-native';
import BtnContainer from '../button/button';

class SimpleRow extends React.Component {

    static defaultProps = {
        style: null,
        image: null,
        imageStyle: null,
        title: null,
        titleStyle: null,
        subTitle: null,
        nextScene: null,
        nextSceneParam: {},
        onPress: null,
        hasRight: true,
    };

    state = {};

    componentDidMount() {
    }

    render() {
        let {style, hasRight, imageStyle} = this.props;
        return (
            <BtnContainer
                style={[styles.rowContainer, style]}
                onPress={() => this._onPress()}>
                <View style={styles.row}>
                    {this.props.image ? <Image style={[styles.rowImg, imageStyle]} source={this.props.image}/> : null}
                    {this._renderTitle()}
                </View>
                {hasRight && <Image style={styles.arrow} source={require('./image/right.png')}/>}
            </BtnContainer>
        );
    }

    _renderTitle() {
        let {titleStyle, subTitle, title} = this.props;
        if (subTitle) {
            return (
                <View>
                    <Text style={[styles.text, titleStyle]}>{title}</Text>
                    <Text style={styles.detailTxt}>{subTitle}</Text>
                </View>
            )
        }
        else {
            return (
                <Text style={[styles.text, titleStyle]}>{title}</Text>
            )
        }
    }

    _onPress() {
        let {onPress} = this.props;
        if (onPress) {
            if (typeof onPress == 'string') { //快速跳转
                msg.emit('route:goToNext', {sceneName: onPress});
            }
            else {
                this.props.onPress();
            }
        }
        else if (this.props.nextScene) {
            msg.emit('route:goToNext', {sceneName: this.props.nextScene, ...this.props.nextSceneParam});
        }
    }
}

const styles = StyleSheet.create({
    rowContainer: {
        borderBottomWidth: 1,
        borderColor: '#e1e1e1',
        flexDirection: 'row',
        height: 50,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#fff'
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    rowImg: {
        width: 20,
        height: 20,
        marginRight: 8,
    },
    arrow: {
        height: 15,
        width: 8,
    },
    text: {
        fontSize: 16,
        color: '#333'
    },
    detailTxt: {
        marginTop: 3,
        marginBottom: 3,
        fontSize: 12,
        color: '#bbc1c6'
    }
});

export default SimpleRow;