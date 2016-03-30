/**
 *
 * expose
 */
import React, {SwitchIOS, TabBarIOS} from 'react-native';

//
import UIConfig from './lib/config';

//
import UIBtn from './lib/button/button';
import UIIconBtn from './lib/button/icon.button';
import UITimerBtn from './lib/button/timer.button';
import UIButtonGroup from './lib/button.group';

//
import UIScene from './lib/scene/';
import UIHeader from './lib/scene/header';
import UIBody from './lib/scene/body';

//
import UIApp from './lib/app';
import UIRoute from './lib/route';
import UIKit from './lib/kit';

//
import UIForm from './lib/form';

//
import UIListView from './lib/list.view';
import UISimpleRow from './lib/list.row/simple.row';

//
import UITabBar from './lib/tabbar/';


//
import UIScrollView from './lib/scrollview/advance.scroll.view';
import UIPullRefreshScrollView from './lib/scrollview/';

export {
  UIConfig,

  UIApp,
  UIRoute,
  UIKit,

  UIBtn,
  UIIconBtn,
  UITimerBtn,
  UIButtonGroup,

  UITabBar,
  UIScene,
  UIHeader,
  UIBody,

  UIForm,

  UIListView,
  UISimpleRow,

  UIScrollView,
  UIPullRefreshScrollView,
}
