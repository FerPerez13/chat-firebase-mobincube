import Dispatcher from '../dispatcher/Dispatcher';
import Constants from '../constants/Constants';

const Actions = Constants.actions;
const Events = Constants.events;
const EventEmitter = require('events').EventEmitter;

const messageList = [];

function addMessage(message) {
  messageList.push(message);
}

const ChatStore = Object.assign({}, EventEmitter.prototype, {
  sendMessage: (message) => {
    firebase.database().ref('messages').push().set(message);
  },

  receiveMessage: () => {
    if (messageList.length) {
      return;
    }

    const messagesRef = firebase.database().ref('messages');

    messagesRef.on('child_added', (snapshot) => {
      const key = { key: snapshot.key };
      const message = Object.assign({}, snapshot.val(), key);

      addMessage(message);
      ChatStore.emitMessageEvent();
    });
  },

  emitMessageEvent() {
    this.emit(Events.MESSAGE);
  },

  getMessageList() {
    return messageList;
  },

  addMessageListener(callback) {
    this.on(Events.MESSAGE, callback);
  },

  removeMessageListener(callback) {
    this.removeListener(Events.MESSAGE, callback);
  },

  addChatIsEmptyListener(callback) {
    this.on(Events.CHATISEMPTY, callback);
  },

  removeChatIsEmptyListener(callback) {
    this.removeListener(Events.CHATISEMPTY, callback);
  },

  hasMessages() {
    const messagesRef = firebase.database().ref('messages');
    messagesRef.once('value').then((snapshot) => {
      const numMessages = snapshot.numChildren();
      if (numMessages === 0) {
        this.emit(Events.CHATISEMPTY);
      }
    });
  },
});

Dispatcher.register((Action) => {
  switch (Action.actionType) {
    case Actions.SENDMESSAGE:
      ChatStore.sendMessage(Action.message);
      break;
    case Actions.MESSAGERECEIVED:
      ChatStore.receiveMessage();
      break;
    case Actions.HASMESSAGES:
      ChatStore.hasMessages();
      break;
    default:
      break;
  }
});

module.exports = ChatStore;
