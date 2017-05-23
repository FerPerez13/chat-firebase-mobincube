import React from 'react';

import NameStore from '../stores/NameStore';

export default function Message(props) {
  const message = props.message;

  let messageClass = 'message';
  let styleUserText = {};
  let styleClass = {};

  const styleMessageOthers = {
    backgroundColor: props.properties.othersMessagesBubbleColorChat,
    color: props.properties.fontColorMessage,
  };
  const styleMessageMine = {
    backgroundColor: props.properties.ourMessagesBubbleColorChat,
    color: props.properties.fontColorOwnMessage,
  };
  const styleUserTextMine = {
    fontSize: props.properties.textSizeChat,
    color: props.properties.fontColorOwnUsername,
  };
  const styleUserTextOthers = {
    fontSize: props.properties.textSizeChat,
    color: props.properties.fontColorUsername,
  };

  if (NameStore.getName() === message.username) {
    messageClass += ' mine';
    styleClass = styleMessageMine;
    styleUserText = styleUserTextMine;
  } else {
    styleClass = styleMessageOthers;
    styleUserText = styleUserTextOthers;
  }

  const styleMessageText = {
    fontSize: props.properties.textSizeChat,
  };

  const messageUser = message.username.split('\n').map((item, index) => {
    const divKeyUser = message.key + index;
    return (<div style={styleUserText} key={divKeyUser}>{item}</div>);
  });
  const messageBody = message.message.split('\n').map((item, index) => {
    const divKey = message.key + index;
    return (<div style={styleMessageText} key={divKey}>{item}</div>);
  });

  return (
    <div className={messageClass} style={styleClass}>
      <div className="userMessage">
        <div className="userName">{messageUser}</div>
      </div>
      <div className="textMessage">
        <div className="textMsg">{messageBody}</div>
      </div>
    </div>
  );
}

Message.propTypes = {
  message: React.PropTypes.shape({
    message: React.PropTypes.string,
    username: React.PropTypes.string,
  }),

  properties: React.PropTypes.shape({
    othersMessagesBubbleColorChat: React.PropTypes.string,
    textSizeChat: React.PropTypes.string,
    fontColorUsername: React.PropTypes.string,
    fontColorOwnUsername: React.PropTypes.string,
    fontColorMessage: React.PropTypes.string,
    ourMessagesBubbleColorChat: React.PropTypes.string,
    fontColorOwnMessage: React.PropTypes.string,
  }),
};

Message.defaultProps = {
  message: {},
  properties: {},
};
