/**
 *
 * expose
 */
import React, {SwitchIOS} from 'react-native';

//
import UIBtn from './lib/button/button';
import UIIconBtn from './lib/button/icon.button';
import UITimerBtn from './lib/button/timer.button';

//
import UIScene from './lib/scene/';
import UIHeader from './lib/scene/header';
import UIBody from './lib/scene/body';

//
import UIRoute from './lib/route';

//
import UIFrom from './lib/form';

//
import UIListView from './lib/pull-refresh-list-view/pull-refresh-list-view';
import UISimpleRow from './lib/row/simple.row';

//
import UITabBar from './lib/tabbar/';


let UISwitch = null;
if (QMKit.isAndroid ()) {
  UISwitch = require ('SwitchAndroid');
}
else {
  UISwitch = SwitchIOS;
}

export {
  UISwitch,

  UIRoute,

  UIBtn,
  UIIconBtn,
  UITimerBtn,

  UITabBar,
  UIScene,
  UIHeader,
  UIBody,

  UIFrom,

  UIListView,
  UISimpleRow,
}
