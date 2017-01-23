
//
import SceneConfig from './scene/config';
import ListViewConfig from './listview/config';
import FormConfig from './form/config';
import FetchConfig from './net/fetch.config';
import ButtonConfig from './button/config';
import RouteConfig from './route/config';

//
const Config = {
    /**
     *
     */
    scene: SceneConfig,

    /**
     *
     */
    route: RouteConfig,

    /**
     *
     */
    button: ButtonConfig,

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

    setConfig(key, config){
        Object.assign(Config[key], config);
        return this;
    }
};

export default Config;
