'use strict'

import React, {
  Text,
  View,
  Image,
  Platform,
  StyleSheet
} from 'react-native';

import BtnContainer from './button';

/**
 * just do nothing.
 */
const noop = () => {};


/**
 * header模块
 * Usage
 *
 * [LeftArrow LeftTilte brandName title home search shoppingCart rightTitle rightArrow]
 */
export default class extends React.Component {

  state = {
    isEdit: false
  };

  static defaultProps = {
    home: false,
    search: false,
    shoppingCart: false,
    edit: false,
    showEdit: false,
    brandName: '',
    leftTitle: '',
    onLeftMenuPress: noop,
    onSearchPress: noop,
    onHomePress: noop,
    onShoppingCartPress: noop,
    onEditPress: noop,
  };

  render() {
    return (
      <View style={[styles.container, this.props.style]}>
        {this._renderLeft()}
        <View style={styles.rightContainer}>
          {this._renderHome()}
          {this._renderSearch()}
          {this._renderShoppingCart()}
          {this._renderEditBtn()}
        </View>
        {
          this.props.brandName ?
            <View><Text></Text></View> :
            <BtnContainer
              style={styles.leftBack}
              onPress={this.props.onLeftMenuPress}>
              <Image
                style={styles.imgLeft}
                source={require('img/left.png')}/>
            </BtnContainer>
        }
      </View>
    );
  }


  _renderLeft() {
    if (this.props.brandName) {
      return (
        <View style={[styles.leftMenu]}>
          <Text style={styles.brandName}>
            {this.props.brandName}
          </Text>
        </View>
      );
    } else {
      return (
        <View style={[styles.leftMenu]}>
          <Text style={styles.leftTitle}>
            {this.props.leftTitle}
          </Text>
        </View>
      );
    }
  }


  _renderHome() {
    if (this.props.home) {
      return (
        <BtnContainer
          style={styles.right}
          onPress={this.props.onHomePress}>
          <Image
            style={styles.img}
            source={require('img/home_white.png')}/>
        </BtnContainer>
      );
    }

    return null;
  }

  _renderSearch() {
    if (this.props.search) {
      return (
        <BtnContainer
          style={styles.right}
          onPress={this.props.onSearchPress}>
          <Image
            style={styles.img}
            source={require('img/search_white.png')}/>
        </BtnContainer>
      );
    }

    return null;
  }

  /**
   * 是否编辑
   */
  _renderEditBtn(){
    if (this.props.showEdit) {
      return (
        <BtnContainer
          style={[styles.right,styles.edit]}
          onPress={this._showEdit}>
          {
            this.props.edit ? <Text style={styles.txt}>完成</Text> : <Text style={styles.txt}>编辑</Text>
          }
        </BtnContainer>
      );
    }

    return null;
  }


  _showEdit(){
    this.state.isEdit = !this.state.isEdit;
    this.props.onEditPress();
  }


  _renderShoppingCart() {
    if (this.props.shoppingCart) {
      return (
        <BtnContainer
          style={styles.right}
          onPress={this.props.onShoppingCartPress}>
          <Image
            style={styles.img}
            source={require('img/cart_white.png')}/>
        </BtnContainer>
      );
    }

    return null;
  }
}


/*是不是Android*/
var isAndroid = Platform.OS === 'android';
var styles = StyleSheet.create({
  container: {
    paddingRight: 10,
    paddingTop: isAndroid ? 10 : 30,
    paddingLeft: 10,
    height: isAndroid ? 40 : 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#3d85cc'
  },
  leftBack: {
    position: 'absolute',
    left: 10,
    height: 19,
    width: 80,
    marginBottom: 10,
  },
  leftMenu: {
    flex: 1,
    height: 30,
    paddingBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent'
  },
  leftTitle: {
    color: '#fff',
    fontSize: 16
  },
  rightContainer: {
    position: 'absolute',
    right: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  imgLeft: {
    marginRight: 7,
    width: 10,
    height: 19
  },
  right: {
    height: 30,
    justifyContent: 'center',
    paddingBottom: 9,
  },
  img: {
    width: 21,
    height: 21
  },
  brandName: {
    fontSize: 16,
    color: 'white'
  },
  edit: {
    paddingLeft: 20,
  },
  txt: {
    fontSize: 14,
    color: "#fff",
  }
});
