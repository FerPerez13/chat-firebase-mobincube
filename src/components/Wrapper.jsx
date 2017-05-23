import React from 'react';

import ChatAction from '../actions/ChatAction';

import NameInput from './NameInput';
import Chat from './Chat';

import PropertiesStore from '../stores/PropertiesStore';
import NameStore from '../stores/NameStore';

function getWrapperState() {
  return {
    properties: PropertiesStore.getProperties(),
    name: NameStore.getName(),
  };
}

export default class Wrapper extends React.Component {
  constructor(props) {
    super(props);

    this.state = getWrapperState();

    this.isFirebaseActive = false;

    this.onSaveName = this.onSaveName.bind(this);
    this.onChangeProperty = this.onChangeProperty.bind(this);
  }

  componentDidMount() {
    PropertiesStore.addPropertyChangeListener(this.onChangeProperty);
    NameStore.addSaveListener(this.onSaveName);

    ChatAction.fetchProperties();
  }

  componentWillUnmount() {
    PropertiesStore.removePropertyChangeListener(this.onChangeProperty);
    NameStore.removeSaveListener(this.onSaveName);
  }

  onSaveName() {
    this.setState(getWrapperState());
  }

  onChangeProperty() {
    this.setState(getWrapperState(), () => {
      this.initFirebase();
    });
  }

  initFirebase() {
    if (!this.checkFirebase()) {
      return;
    }

    const config = {
      apiKey: this.state.properties.apiKey,
      databaseURL: this.state.properties.databaseURL,
    };

    if (this.isFirebaseActive) {
      firebase.app().delete().then(() => firebase.initializeApp(config));
    } else {
      firebase.initializeApp(config);
      this.isFirebaseActive = true;
    }
  }

  checkFirebase() {
    return !!this.state.properties.databaseURL;
  }

  render() {
    return this.state.name ?
      <Chat properties={this.state.properties} name={this.state.name} /> :
      <NameInput properties={this.state.properties} />;
  }
}
