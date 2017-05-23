import React from 'react';

import MobincubeHelper from '../util/MobincubeHelper';

import ChatAction from '../actions/ChatAction';

export default class NameInput extends React.Component {
  constructor(props) {
    super(props);

    this.saveName = this.saveName.bind(this);
  }

  saveName() {
    if (!this.props.properties.databaseURL) {
      MobincubeHelper.notify('You need to specify a firebase database URL');
      return;
    }

    const name = document.getElementById('nameInput').value.trim();
    if (name) {
      ChatAction.setName(name);
    }
  }

  handleKeyPress(e) {
    if (e.key === 'Enter') {
      this.saveName();
    }
  }

  render() {
    const screenStyle = {
      backgroundColor: this.props.properties.backgroundColorNameInput,
      color: this.props.properties.fontColorNameInput,
    };

    const styleNameInput = {
      backgroundColor: this.props.properties.backgroundColorInputNameInput,
      fontSize: `${this.props.properties.textSizeNameInput}px`,
    };

    const txtBttnSave = this.props.properties.textButtonNameInput;

    const styleBttnSave = {
      backgroundColor: this.props.properties.backgroundColorButtonNameInput,
      fontSize: `${this.props.properties.textSizeButtonNameInput}px`,
      color: this.props.properties.buttonFontColor,
    };

    return (
      <div className="userInputwrap" style={screenStyle}>
        <div className="userInputHelper">
          <div className="userInputContent">
            <input
              maxLength="20"
              placeholder="Enter your name"
              id="nameInput"
              type="text"
              onKeyPress={e => this.handleKeyPress(e)}
              style={styleNameInput}
            />
            <button
              className="button-save" onClick={this.saveName}
              style={styleBttnSave}
            >{txtBttnSave}</button>
          </div>
        </div>
      </div>
    );
  }
}
NameInput.propTypes = {
  properties: React.PropTypes.shape({
    backgroundColorNameInput: React.PropTypes.string,
    fontColorNameInput: React.PropTypes.string,
    textSizeNameInput: React.PropTypes.numbers,
    buttonFontColor: React.PropTypes.string,
    backgroundColorInputNameInput: React.PropTypes.string,
    backgroundColorButtonNameInput: React.PropTypes.string,
    textButtonNameInput: React.PropTypes.string,
    textSizeButtonNameInput: React.PropTypes.string,
    databaseURL: React.PropTypes.string,
  }),
};

NameInput.defaultProps = {
  properties: {},
};
