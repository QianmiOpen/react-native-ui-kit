/**
 *
 * expose
 */
import React from 'react';
import {SwitchIOS, TabBarIOS} from 'react-native';

//
import UIConfig from './lib/config';

//
import UIBtn from './lib/button/button';
import UIImageBtn from './lib/button/image.button';
import UIIconBtn from './lib/button/icon.button';
import UITimerBtn from './lib/button/timer.button';

//
import UIScene from './lib/scene/';
import UIHeader from './lib/scene/header';
import UIBody from './lib/scene/body';
import UIBackground from './lib/scene/background';

//
import UIRoute from './lib/route';
import UIKit from './lib/kit';
import UIFetch from './lib/fetch';

//
import UIListView from './lib/list.view/list';
import UISimpleRow from './lib/list.row/simple.row';

//
import UITabBar from './lib/tabbar/';
import UITabBarScene from './lib/scene.tabbar';

//
import UIStyle from './lib/style';

export {
    UIConfig,
    UIStyle,

    UIRoute,
    UIKit,
    UIFetch,

    UIBtn,
    UIImageBtn,
    UIIconBtn,
    UITimerBtn,

    UITabBar,
    UITabBarScene,

    UIScene,
    UIHeader,
    UIBody,
    UIBackground,

    UIListView,
    UISimpleRow,
}
