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
    debug: false,
    request: {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Platform': Platform.OS
      }
    },
    host: '',
    handler: (responseText) => {
    }
  }
}

export default Config;
