import React from 'react';
import  {
    StyleSheet,
    View,
    Animated,
} from 'react-native';

class Progress extends React.Component {

    static defaultProps = {
        style: null,
        maxValue: 100,
        maxValueColor: null,
        value: 0,
        valueColor: null,
        animated: true,
    };

    state = {
        isMeasure: false,
        maxWidth: -1,
        measureWidth: new Animated.Value(0),
    };

    componentDidMount () {
    }

    componentWillReceiveProps (nextProps) {
        if (nextProps.value != this.props.value) {
            this._valueChange(nextProps.value, nextProps.maxValue || this.props.maxValue);
        }
    }

    render () {
        let {measureWidth} = this.state,
            {maxValueColor, valueColor, style} = this.props;
        return (
            <View
                style={[styles.container, style, {backgroundColor: maxValueColor}]}
                onLayout={this._onLayout}>
                <Animated.View
                    style={[styles.container, {width: measureWidth, backgroundColor: valueColor}]}
                />
            </View>
        );
    }

    _onLayout = (e) => {
        let {isMeasure} = this.state,
            {value} = this.props,
            {layout} = e.nativeEvent;
        if (isMeasure) {
            return;
        }
        this.state.maxWidth = layout.width;
        this._valueChange(value, this.props.maxValue);
    };

    _valueChange = (value, maxValue) => {
        let {maxWidth} = this.state,
            width = maxWidth * (value / maxValue);
        width = Math.min(width, maxWidth);
        Animated
            .timing(this.state.measureWidth, {
                toValue: width,
            })
            .start();
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});

export default Progress;
