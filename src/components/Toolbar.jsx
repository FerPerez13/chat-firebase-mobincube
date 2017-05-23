import React from 'react';
import ChatAction from '../actions/ChatAction';

export default class Toolbar extends React.Component {
  signOut() {
    ChatAction.signOut();
    return this;
  }

  render() {
    const styleToolbar = {
      backgroundColor: this.props.properties.backgroundColorToolbar,
    };

    const styleTittleToolbar = {
      color: this.props.properties.fontColorToolbar,
      fontSize: this.props.properties.textSizeToolbar,
    };

    const imageLogout = this.props.properties.buttonImageLogout;
    const styleLogout = {
      backgroundImage: imageLogout ? `url('${imageLogout}')` : '',
    };

    return (
      <div className="boxToolbar" style={styleToolbar}>
        <div className="titleToolbar" style={styleTittleToolbar}>
          {this.props.properties.nameAppToolbar}
        </div>
        <div className="signOutToolbar">
          <button
            className="buttonSignOut"
            style={styleLogout}
            onClick={this.signOut}
          />
        </div>
      </div>
    );
  }
}

Toolbar.propTypes = {
  properties: React.PropTypes.shape({
    nameAppToolbar: React.PropTypes.string,
    buttonImageLogout: React.PropTypes.string,
    fontColorToolbar: React.PropTypes.string,
    backgroundColorToolbar: React.PropTypes.string,
    textSizeToolbar: React.PropTypes.string,
  }),
};

Toolbar.defaultProps = {
  properties: {},
};
