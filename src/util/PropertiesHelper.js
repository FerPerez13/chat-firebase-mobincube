class PropertiesHelper {
  constructor() {
    this.file = 'properties.json';
    this.properties = [];
    this.options = {};

    window.addEventListener('message', e => this.onPropertyChange(e.data), false);
  }
  init(options) {
    this.options = options;

    if (this.options.file) {
      this.file = options.file;
    }

    const req = new XMLHttpRequest();

    req.onload = () => this.onLoad(req);
    req.open('GET', this.file);
    req.send();
  }
  callback() {
    if (this.options.success) {
      this.options.success(this.properties);
    }
  }
  mapProperties(json) {
    return json.tabs.map(tab => tab.properties.map((prop) => {
      this.properties[prop.key] = prop.value;

      return this.properties[prop.key];
    }));
  }
  onLoad(req) {
    let json;

    if (req.readyState === 4 && req.status === 200) {
      try {
        json = JSON.parse(req.responseText);
        this.mapProperties(json);
      } catch (g) {
        return;
      }

      this.callback();
    }
  }
  onPropertyChange(changedProperties) {
    this.mapProperties(changedProperties);
    this.callback();
  }
}
export default new PropertiesHelper();
