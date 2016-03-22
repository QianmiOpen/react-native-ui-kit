import HttpDataProvider from './provider/http.data';
import ArrayDataProvider from './provider/static.data';
import EmptyDataProvider from './provider/empty.data';

class DataFactory {

  static createDataProvider (props:JSON = {}):DataProvider {
    if (props.url) {
      return new HttpDataProvider (props);
    }
    else if (props.dataList) {
      return new ArrayDataProvider (props);
    }
    else {
      return new EmptyDataProvider ();
    }
  }
}

export default DataFactory;