/**
 * TabBar.Item组件,
 * 尽量和TabBarIOS的Item的api相同
 *
 * @type {ReactNative|exports|module.exports}
 */
var React = require('react-native');
var Badge = require('./badge');

var {
	TouchableNativeFeedback,
	View,
	Text,
	Image,
	StyleSheet
} = React;


/**
 * yes, we need empty empty function.
 */
var noop = () => {};


var TabBarItem = React.createClass({
	getDefaultProps(){
		return {
			selected: false,
			onPress: noop
		}
	},


	render(){
		return (
			<TouchableNativeFeedback
				onPress={this.props.onPress}>
				<View style={styles.container}>
					{this._getImage()}
					<Text style={[styles.title, this.props.selected && {
						color: '#418cd6'
					}]}>{this.props.title}</Text>
				</View>
			</TouchableNativeFeedback>
		);
	},


	/**
	 * 获取图片
	 */
	_getImage(){
		if (!this.props.selectedIcon &&  !this.props.icon) {
			return null;
		}

		/*选中的图片*/
		if (this.props.selected) {
			return (
				<View>
					<Image style={styles.img} source={this.props.selectedIcon}/>
					{this.props.badge ? <Badge count={this.props.badge}/> : null}
				</View>
			);
		} else {
			return (
				<View>
					<Image style={styles.img} source={this.props.icon}/>
					{this.props.badge ? <Badge count={this.props.badge}/> : null}
				</View>
			);
		}
	}
});


var styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	title: {
		color: 'gray',
		fontSize: 10
	},
	img: {
		width: 20,
		height: 20,
		resizeMode: Image.resizeMode.stretch
	}
});


module.exports = TabBarItem;
