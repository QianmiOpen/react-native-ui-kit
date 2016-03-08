//@flow
import React, {
  Dimensions,
  Platform,
  Linking,
  ListView,
} from 'react-native';

const noop = () => {
};

const KIT = {
  /**
   *
   */
  Width: Dimensions.get ('window').width,
  Height: Dimensions.get ('window').height,

  /**
   *
   */
  noop: noop,

  /**
   *
   */
  simpleDataSource() {
    const dataSource = new ListView.DataSource ({
      rowHasChanged: (r1, r2) => r1 != r2
    });
    return dataSource;
  },

  /**
   * 判断是否是android
   * @returns {boolean}
   */
  isAndroid (): boolean {
    return Platform.OS === 'android';
  },

  /**
   * 判断是否是ios
   * @returns {boolean}
   */
  isIOS (): boolean {
    return !KIT.isAndroid ();
  },

};

export default KIT;
