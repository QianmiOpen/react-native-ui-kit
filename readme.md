# 目前还在拆分, 不能保证能使用

[DEMO](https://github.com/brothers-js/react-native-ui-kit-demo)




# Start
```javascript
import React, { AppRegistry } from 'react-native';
import {UIApp, UIRoute} from 'ui-kit';
import LoginView from '...'
const routeMapper = {
    Login: LoginView
};
AppRegistry.registerComponent('', () => {
    return (
        <UIApp>
            <UIRoute routeMapper={routeMapper}></UIRoute>
        <UIApp>
    );
});
```

## Config
```
const Config = {
  /**
   * 默认导航条样式
   */
  scene: {
    defaultHeaderStyle: null,
  },

  /**
   *
   */
  fetch: {
    //是否开启响应日志
    debug: false,
    //默认请求头
    request: {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    },
    //默认域名
    host: '',
    //回调解析
    handler: (r) => {
      return {result: r.code == 200, data: r.data};
    }
  },

  /**
   * 
   */
  list: {
    //响应回来的解析对应名称
    response: {
      totalName: 'total',
      dataName: 'dataList',
    },
    //请求的时候对应名称
    request: {
      pageName: 'pageIndex',
      pageSize: 'pageSize',
    }
  },
}
```

## Scene
```javascript
import {UIScene} from 'ui-kit';
import {connectToStore, Store} from 'iflux-native';
const data = Store({});
class MyView extends React.Component {
    render(){
        let store = this.props.store;
        return (
            <UIScene
                >
                ....
            </UIScene>
        );
    }
}
export default connectToStore(data)(MyView);
```

## App
* UIApp
    * 提供 this.context().actionSheet().showActionSheetWithOptions()
    * 提供 this.context().popover().show()

## Root
* UIScene
    * style
    * bodyStyle
    * header
    * hasBack (boolean) 用于是否显示回退按钮
    * onBackHandler 点击回退回调, 默认是回退到上一个scene
    * renderHeader 用于自定义头部
    * onMount (Function)
    * refresh (boolean) true的话会包一个scrollview在对外面, 可以用手下拉刷新整个view, 调用onMount
* UIHeader
    * header
    * hasBack (boolean)
* UIBody
    * onNetworkBreak (Function) 没网络触发
    * onNetworkBack (Function) 有网络触发
* UIActionSheet (无需独自使用, 只要使用 UIApp即可)
    * 参考 https://github.com/exponentjs/react-native-action-sheet

## TabBar
* UITabBar 为了统一ios和android, 使用js写的一套
* UITabBar.Item
    * icon 默认图标
    * selectedIcon 选中图标
    * badge 小徽章, 用于辅助按钮
    * title 文字

## Route
* UIRoute
    * routeMapper (JSON<路由字符, React.Component>)
    * routeFilter (Function) 用于跳转Scene的时候可以拦截一下, 比如有些场景需要登录, 就可以过滤一下

## ListView Row
* UIListView
    * style
    * dataSource (Function 只接受promise| string 请求地址| Array 静态数据)  
    * renderEmpty 
    * renderRow
    * renderSection 当dataProvider返回时一个json的时候会使用这个
    * renderHeader
    * renderFooter
    * pageSize (number)
* UISimpleRow
    * image 左边的图标
    * title 上面的文字
    * subTitle 下面的文字
    * onPress
    * nextScene 点击后跳转的下一个场景, 设置了这个, 可以不设置onPress

## From
* UIFrom
    * validateMap (JSON<name, Array[Regexp]>)
* UIFrom.Item
    * icon
    * label
* UIFrom.Date (注意: 必须使用UIApp作为顶层Root, 会使用Popover弹出日期)
    * icon
    * label
    * mode (string) date time datetime
* UIFrom.Text
    * icon
    * label
    * text
* UIFrom.Input
    * icon
    * label
    * value
    * editable (boolean) 是否允许编辑
    * onBlur (Function)
    * keyboardType (string)
    * maxLength (int)
    * placeholder (string)
    * onChangeText (Function)
* UIFrom.Password
    * icon
    * label
    * value
    * toggleAble (boolean) 是否可以查看非密文
    * editable (boolean) 是否允许编辑
    * onBlur (Function)
    * keyboardType (string)
    * maxLength (int)
    * placeholder (string)
    * onChangeText (Function)
* UIFrom.Select
    * icon
    * label
    * value
    * multi (boolean) 是否允许多选
    * dataProvider (Promise or Array)
* UIForm.Image 用于显示图片
    * icon
    * label
    * value
    * imageStyle
* UIForm.Upload 用于上传图片 (依赖 https://github.com/lwansbrough/react-native-camera)
    * icon
    * label
    * way  ("picker" 从设备选择 | "camera" 从摄像头照相 | "all" 可选择, 将会弹出一个ActionSheet选择前面2个)
* UIForm.Switch 用于切换
    * icon
    * label
    * value       
    * selectValue 选中的值
    * unSelectValue 未选中的值

## Button
* UIBtn
    * style
    * onPress
* UITimerBtn 用于点击一次后, 一段时间内不能再次点击
    * style
    * time 单位:秒
    * text
    * pressText
    * onPress
* UIIconBtn 带图标的按钮
    * style
    * image (require | {uri: ''})
    * imageStyle
    * text
    * textStyle
    * onPress
    * direction ("v" 上下 | "h" 左右)
* UIButtonGroup
    * style
    * defaultStyle 
    * defaultTextStyle 
    * selectStyle
    * selectTextStyle
    * onChange (Function)
    * btnList (Array) [{name, onPress} | '' ...]

## Control
* UIPopover
    * style
    * show (boolean)
* UIOverlay
    * style
    * show (boolean)
* UIProgress
    * style
    * maxValue
    * value
    * maxValueColor
    * valueColor
    * animated (boolean)
    
## ScrollView
* UIScrollView
    * style
    * onBottomHeight (int)  ios only
    * onBottomPush (Function) ios only
    * onBottomPushing (Function) ios only
    * onTopHeight (int) ios only
    * onTopPull (Function) ios only
    * onTopPulling (Function) ios only
* UIRefreshControl
    * pullHeight
    * mode 'normal' 'pull' 'refresh'
