import HttpDataProvider from './data/http.data';
import ArrayDataProvider from './data/static.data';
import EmptyDataProvider from './data/empty.data';

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