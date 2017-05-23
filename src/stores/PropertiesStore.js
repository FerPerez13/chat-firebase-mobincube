import { EventEmitter } from 'events';

import propertiesHelper from '../util/PropertiesHelper';

import Dispatcher from '../dispatcher/Dispatcher';
import Constants from '../constants/Constants';

const Actions = Constants.actions;
const Events = Constants.events;

let properties = {};

function saveProperties(propertiesArr) {
  properties = Object.assign({}, properties, propertiesArr);
}

const PropertiesStore = Object.assign({}, EventEmitter.prototype, {
  getProperties() {
    return properties;
  },

  fetchProperties() {
    propertiesHelper.init({
      success: fetchedProperties => this.saveProperties(fetchedProperties),
    });
  },

  saveProperties(fetchedProperties) {
    saveProperties(fetchedProperties);
    this.emit(Events.PROPERTYCHANGE);
  },

  addPropertyChangeListener(callback) {
    this.on(Events.PROPERTYCHANGE, callback);
  },

  removePropertyChangeListener(callback) {
    this.removeListener(Events.PROPERTYCHANGE, callback);
  },
});

Dispatcher.register((Action) => {
  switch (Action.actionType) {
    case Actions.FETCHPROPERTIES:
      PropertiesStore.setMaxListeners(0);
      PropertiesStore.fetchProperties();
      break;
    default:
      break;
  }
});

module.exports = PropertiesStore;
