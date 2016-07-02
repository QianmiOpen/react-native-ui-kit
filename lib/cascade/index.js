import React from 'react';
import  {
    StyleSheet,
    View,
    Image,
    Text,
} from 'react-native';

import ScrollView from '../scrollview/advance.scroll.view';
import Kit from '../kit';
import LeftRow from './components/left.row';
import RightRow from './components/right.row';

class UICascade extends React.Component {

    static defaultProps = {
        style: null,
        leftStyle: null,
        rightStyle: null,
        renderLeft: null,
        renderRight: null,
        dataSource: []
    };

    state = {
        leftSelect: null,
        rightSelect: null,
    };

    componentDidMount () {
    }

    render () {
        let {dataSource, style, leftStyle, rightStyle} = this.props,
            {leftSelect} = this.state,
            rightDataList = [];
        if (leftSelect) {
            rightDataList = dataSource[leftSelect];
        }
        return (
            <View
                style={[styles.container, style]}>
                <ScrollView
                    hasRefresh={false}
                    style={[styles.leftScrollView, leftStyle]}>
                    {this._renderLeftList(dataSource)}
                </ScrollView>
                <ScrollView
                    style={[styles.rightScrollView, rightStyle]}>
                    {this._renderRightList(rightDataList)}
                </ScrollView>
            </View>
        );
    }

    /**
     * {} 或者 []
     * @param dataList
     * @returns {Array}
     * @private
     */
    _renderLeftList = (dataList) => {
        dataList = Object.keys(dataList);
        return (dataList || []).map(this._renderLeft);
    };

    _renderLeft = (item, index) => {
        let {leftRender} = this.props,
            {leftSelect} = this.state,
            isSelected = item == leftSelect;
        if (leftRender) {
            return leftRender(item, index, isSelected, this._onLeftPress);
        }
        else {
            return (
                <LeftRow
                    data={item}
                    isSelected={isSelected}
                    key={index}
                    onPress={() => this._onLeftPress(item, index)}/>
            );
        }
    };

    _renderRightList = (dataList) => {
        return (dataList || []).map(this._renderRight);
    };

    _renderRight = (item, index) => {
        let {rightRender} = this.props,
            {rightLeft} = this.state,
            isSelectedIndex = rightLeft == item;
        if (rightRender) {
            return rightRender(item, index, isSelectedIndex);
        }
        else {
            return (
                <RightRow
                    data={item}
                    key={index}
                    isSelected={isSelectedIndex}
                    onPress={this._onRightPress}/>
            )
        }
    };

    _onLeftPress = (item, index) => {
        let {leftPress} = this.props;
        if (leftPress) {
            leftPress(item, index);
        }
        this.setState({leftSelect: item});
    };

    _onRightPress = (item, index) => {
        let {rightPress} = this.props;
        if (rightPress) {
            rightPress(item, index, this.state.leftSelect);
        }
        this.setState({rightSelect: item});
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
    },

    //
    leftScrollView: {
        flex: 1,
        backgroundColor: '#FFF',
    },

    //
    rightScrollView: {
        flex: 3,
    },
});

export default UICascade;