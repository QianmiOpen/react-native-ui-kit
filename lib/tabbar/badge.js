var React = require('react-native');
var {msg} = require('iflux-native');
var {
  View,
  Text,
  StyleSheet,
  Animated,InteractionManager
} = React;


/**
 * badge组件
 */
var Badge = React.createClass({

  getInitialState(){
    return {
      size: new Animated.Value(17)
    };
  },

  /**
   * 判断用户是否登录
   */
  componentDidMount() {
    //全局的tip处理
    msg.on('badpe:tip', this._handleAnimatedTip);
  },


  /**
   * destroy
   */
  componentWillUnmount() {
    msg.removeListener('badpe:tip', this._handleAnimatedTip);
  },

  getStyle: function() {
    return [
      styles.container, this.props.style,
      {
        height: this.state.size,
        width: this.state.size
      }
    ];
  },

  render() {
    var count = this.props.count > 99 ? '99+' : this.props.count;

    return (
      <Animated.View style={this.getStyle()}>
        <Text style={styles.text}>{count}</Text>
      </Animated.View>
    );
  },

  _handleAnimatedTip(){

    var an = Animated.sequence([
      Animated.spring(this.state.size, {   // and twirl
        friction: 3,
        tension: 60,
        toValue: 23,
      }),
    ]);

    an.start();
    setTimeout(() => {
      an.stop();

      Animated.spring(this.state.size, {   // and twirl
        tension: 6,
        toValue: 17
      }).start();
    }, 200);
  }
});


var styles = StyleSheet.create({
  container: {
    borderLeftWidth: 2,
    borderRightWidth: 2,
    backgroundColor: 'red',
    position: 'absolute',
    borderRadius:12,
    justifyContent: 'center',
    alignItems: 'center',
    top: -2,
    right:-12,
  },
  text: {
    color: '#FFF',
    fontSize: 10
  }
});


module.exports = Badge;
