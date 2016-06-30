import React from 'react';
import  {
    StyleSheet,
    View,
    ScrollView,
} from 'react-native';

import UIKit from '../kit';
import UIBtn from '../button/button';
import Config from './config';

class ButtonGroup extends React.Component {

    static defaultProps = {
        style: null,
        defaultStyle: null,
        selectStyle: null,
        defaultTextStyle: null,
        selectTextStyle: null,

        dataSource: [],
        scrollAble: false,
        onSelect: UIKit.noop,
    };

    state = {
        selectIndex: 0,
    };

    componentDidMount () {
    }

    render () {
        let {dataSource, style, scrollAble} = this.props;
        if (scrollAble) {
            return (
                <View
                    onLayout={this._onLayout}
                    style={[styles.container, Config.style, style]}>
                    <ScrollView
                        ref="scrollView"
                        removeClippedSubviews={false}
                        automaticallyAdjustContentInsets={false}
                        horizontal={true}>
                        {dataSource.map(this._renderBtn)}
                    </ScrollView>
                </View>

            )
        }
        else {
            return (
                <View
                    style={[styles.container, Config.style, style]}>
                    {dataSource.map(this._renderBtn)}
                </View>
            );
        }

    }

    _renderBtn = (item, index) => {
        let text = item.text || item,
            {selectIndex} = this.state,
            isSelect = selectIndex == index,
            {defaultStyle, selectStyle, defaultTextStyle, selectTextStyle} = this.props,
            s = [],
            st = [];
        if (isSelect) {
            s.push(styles.selectBtn, Config.selectStyle, selectStyle);
            st.push(styles.selectBtnTxt, Config.selectTextStyle, selectTextStyle);
        }
        else {
            s.push(Config.defaultStyle, defaultStyle);
            st.push(Config.defaultTextStyle, defaultTextStyle);
        }

        //
        return (
            <UIBtn
                key={index}
                ref={`btn${index}`}
                style={[styles.btn, s]}
                text={text}
                textStyle={[styles.btnTxt, st]}
                onPress={() => this._onPress(item, index)}/>
        );
    };

    _onLayout = ({nativeEvent}) => {
        this.layout = nativeEvent.layout;
    };

    _onPress = (item, selectIndex) => {
        this.setState({selectIndex});
        this.props.onSelect(selectIndex, item);
        if (this.props.scrollAble) {
            this._scrollToIndex(selectIndex);
        }
    };

    _scrollToIndex = (index) => {
        let layout = this.refs[`btn${index}`].layout;
        if (layout) {
            this._scrollToX(layout.x, layout.width); //居中
        }
    };

    _scrollToX = (x, width) => {
        let scrollView = this.refs.scrollView;
        if (!scrollView) {
            return;
        }
        let halfWidth = this.layout.width / 2;
        x = x - halfWidth + width / 2;
        scrollView.scrollTo({x});
    };
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: '#fff',

    },

    btn: {
        flex: 1,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: '#eee',
        borderBottomWidth: 1,
    },
    btnTxt: {
        color: '#999',
    },

    selectBtn: {
        borderBottomWidth: 1,
        borderColor: '#FF495A'
    },
    selectBtnTxt: {
        color: '#FF495A',
    },
});

export default ButtonGroup;
