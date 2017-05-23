const MobincubeHelper = {
  isRunningOnMobile() {
    const validUserAgents = [
      'mobincube', // iOS or Android application
      'Windows Phone', // Windows Phone 8.1 or greater application
      'Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; Win64; x64; Trident/6.0)', // Windows phone 8 application (minor version < 10)
      'Mozilla/5.0 (Windows Phone 8.1;Trident/7.0; Touch; rv:11; IEMobile/11.0) like Gecko', // Windows phone 8 application (minor version >= 10)
    ];

    const validUserAgentsFound = validUserAgents.filter(validAgent =>
      navigator.userAgent.search(validAgent) !== -1);

    return validUserAgentsFound.length > 0;
  },
  notify(message) {
    if (this.isRunningOnMobile()) {
      window.location = `mobincube://action/toast/${message}`;
    } else {
      /* eslint-disable */
      window.alert(message);
      /* eslint-enable */
    }
  },

  setCookie(name, val) {
    return new Promise((resolve) => {
      window.location = `mobincube://action/set/{cookie.${name}}=${val}`;
      setTimeout(resolve);
    });
  },
  getCookie(name) {
    return new Promise((resolve) => {
      window.location = `mobincube://javascript/handleGetCookie('{cookie.${name}}')`;
      window.handleGetCookie = val => resolve(val);
    });
  },
};

module.exports = MobincubeHelper;
