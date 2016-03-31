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
* defaultHeaderStyle 默认导航条样式

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
                store={store}>
                ....
            </UIScene>
        );
    }
}
export default connectToStore(data)(MyView);
```


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

## ListView Row
* UIListView
    * style
    * dataProvider (Function | string) 返回一个promise对象的函数, 如果是string, 默认是会用post去请求
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
    * label
* UIFrom.Date (注意: 必须使用UIApp作为顶层Root, 会使用Popover弹出日期)
    * label
    * mode (string) date time datetime
* UIFrom.Text
    * label
    * text
* UIFrom.Input
    * label
    * value
    * editable (boolean) 是否允许编辑
    * onBlur (Function)
    * keyboardType (string)
    * maxLength (int)
    * placeholder (string)
    * onChangeText (Function)
* UIFrom.Password
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
    * label
    * value
    * multi (boolean) 是否允许多选
    * dataProvider (Promise or Array)

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
* UIButtonGroup
    * style
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
    * onPull (Function)
    * onPush (Function)
* UIPullRefreshScrollView
    * style
    * needInitLoading (boolean) 是否显示加载
    * onRefresh (Function)
