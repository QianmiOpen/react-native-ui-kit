/**
 * @flow
 */
import {
    Navigator,
    Dimensions
} from 'react-native';
const {width: SCREEN_WIDTH} = Dimensions.get('window');

/**
 * 自定义手势，全屏支持drag
 * 扩展PushFromRight
 */
const basicSceneConfig = Navigator.SceneConfigs.PushFromRight;


const CustomPushFromRightGesture = Object.assign({}, basicSceneConfig.gestures.pop, {
    // Make it snap back really quickly after canceling pop
    snapVelocity: 10,
    // Make it so we can drag anywhere on the screen
    edgeHitWidth: SCREEN_WIDTH
});


/**
 * 自定义config
 */
const CustomSceneConfig = Object.assign({}, basicSceneConfig, {
    // A very tighly wound spring will make this transition fast
    springTension: 100,
    springFriction: 3,
    // Use our custom gesture defined above
    gestures: {
        pop: CustomPushFromRightGesture,
    }
});


export default {
    defaultRouteEffect: CustomSceneConfig,

    statusBarIsWhite: false,
};