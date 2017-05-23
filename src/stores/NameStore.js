import { EventEmitter } from 'events';
import MobincubeHelper from '../util/MobincubeHelper';
import Dispatcher from '../dispatcher/Dispatcher';
import Constants from '../constants/Constants';

const Actions = Constants.actions;
const Events = Constants.events;

let name = '';

function saveName(newName) {
  name = newName;
}

const NameStore = Object.assign({}, EventEmitter.prototype, {
  getName() {
    return name;
  },

  fetchName() {
    return new Promise((resolve) => {
      if (MobincubeHelper.isRunningOnMobile()) {
        MobincubeHelper.getCookie('username').then(resolve);
      } else {
        resolve(window.localStorage.getItem('username'));
      }
    });
  },

  getListNames: () => {
    const usersRef = firebase.database().ref('users');
    return usersRef.once('value');
  },

  setName(newName) {
    this.storeName(newName);
    this.emit(Events.SAVE);
  },

  storeName(newName) {
    if (MobincubeHelper.isRunningOnMobile()) {
      MobincubeHelper.setCookie('username', newName);
    } else {
      window.localStorage.setItem('username', newName);
    }

    saveName(newName);
  },

  signOut() {
    saveName('');
    this.emit(Events.SAVE);
  },

  addSaveListener(callback) {
    this.on(Events.SAVE, callback);
  },

  removeSaveListener(callback) {
    this.removeListener(Events.SAVE, callback);
  },
  addFetchNameListener(callback) {
    this.on(Events.FETCHNAME, callback);
  },

  removeFetchNameListener(callback) {
    this.removeListener(Events.FETCHNAME, callback);
  },
});

Dispatcher.register((Action) => {
  switch (Action.actionType) {
    case Actions.SETNAME:
      NameStore.setName(Action.name);
      break;
    case Actions.FETCHNAME:
      NameStore.fetchName()
        .then(newName => NameStore.setName(newName));
      break;
    case Actions.SIGNOUT:
      NameStore.signOut();
      break;
    default:
      break;
  }
});
module.exports = NameStore;
