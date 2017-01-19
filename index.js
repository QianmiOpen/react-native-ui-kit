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
import UIButtonGroup from './lib/button.group';

//
import UIScene from './lib/scene/';
import UIScrollScene from './lib/scene/index.scroll';
import UIHeader from './lib/scene/header';
import UIBody from './lib/scene/body';

//
import UIRoute from './lib/route';
import UIKit from './lib/kit';
import UIFetch from './lib/fetch';

//
import UIForm from './lib/form';

//
import UIListView from './lib/list.view/list';
import UISimpleRow from './lib/list.row/simple.row';

//
import UITabBar from './lib/tabbar/';
import UITabBarScene from './lib/scene.tabbar';

//
import UIScrollView from './lib/scrollview/advance.scroll.view';
import UIRefreshControl from './lib/scrollview/refresh.control';

//
import UIProgress from './lib/progress';
import UIWebView from './lib/webview';
import UICascade from './lib/cascade';
import UISearch from './lib/search';

//
import UIStyle from './lib/style';

export {
    UIConfig,
    UIStyle,

    UIWebView,

    UICascade,
    UISearch,

    UIRoute,
    UIKit,
    UIFetch,

    UIBtn,
    UIImageBtn,
    UIIconBtn,
    UITimerBtn,
    UIButtonGroup,

    UITabBar,
    UITabBarScene,

    UIScene,
    UIScrollScene,
    UIHeader,
    UIBody,

    UIForm,

    UIProgress,

    UIListView,
    UISimpleRow,

    UIScrollView,
    UIRefreshControl,
}
