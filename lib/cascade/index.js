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
        selectIndex: 0,
    };

    componentDidMount () {
    }

    render () {
        let {dataSource, style, leftStyle, rightStyle} = this.props,
            {selectIndex} = this.state,
            rightData = dataSource ? dataSource[selectIndex] : [];
        return (
            <View
                style={[styles.container, style]}>
                <ScrollView
                    style={[styles.leftScrollView, leftStyle]}>
                    {this._renderLeftList(dataSource)}
                </ScrollView>
                <ScrollView
                    style={[styles.rightScrollView, rightStyle]}>
                    {this._renderRightList(rightData)}
                </ScrollView>
            </View>
        );
    }

    _renderLeftList = (dataList) => {
        return (dataList || []).map(this._renderLeft);
    };

    _renderLeft = (item, index) => {
        let {leftRender} = this.props;
        if (leftRender) {
            return leftRender(item, index, this._onLeftPress);
        }
        else {
            return <LeftRow data={data} key={index}/>
        }
    };

    _renderRightList = () => {
        return (dataList || []).map(this._renderRight);
    };

    _renderRight = (item, index) => {
        let rightRender = this.props;
        if (rightRender) {
            return rightRender(item, index);
        }
        else {
            return <RightRow data={data} key={index}/>
        }
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
    },

    //
    rightScrollView: {
        flex: 4,
    },
});

export default UICascade;