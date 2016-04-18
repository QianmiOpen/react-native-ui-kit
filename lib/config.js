import PullRefreshControl from './scrollview/refresh.control';

//
import SceneConfig from './scene/config';
import ButtonGroupConfig from './button.group/config';
import ListViewConfig from './list.view/config';
import ScrollViewConfig from './scrollview/config';
import FormConfig from './form/config';
import FetchConfig from './fetch.config';
//
const Config = {
  /**
   *
   */
  scene: SceneConfig,

  /**
   *
   */
  buttonGroup: ButtonGroupConfig,

  /**
   *
   */
  form: FormConfig,

  /**
   *
   */
  fetch: FetchConfig,

  /**
   *
   */
  listView: ListViewConfig,

  /**
   * 下拉刷新
   */
  scrollView: ScrollViewConfig,

  setConfig(key, config){
    Object.assign(Config[key], config);
    return this;
  }
};

export default Config;
