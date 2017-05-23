import React from 'react';

import ChatAction from '../actions/ChatAction';

import ChatStore from '../stores/ChatStore';
import NameStore from '../stores/NameStore';

import Message from '../components/Message';
import Spinner from '../components/Spinner';
import Toolbar from '../components/Toolbar';

function getChatState(isChatEmpty = false) {
  const messages = ChatStore.getMessageList();
  const loading = messages.length === 0 || isChatEmpty;

  return {
    messages,
    loading,
  };
}

export default class Chat extends React.Component {
  constructor() {
    super();
    this.state = getChatState();

    this.onReceiveMessage = this.onReceiveMessage.bind(this);
    this.onEmptyChat = this.onEmptyChat.bind(this);
  }

  componentWillMount() {
    ChatAction.receivedMessage();
    ChatAction.hasMessages();
  }

  componentDidMount() {
    ChatStore.addMessageListener(this.onReceiveMessage);
    ChatStore.addChatIsEmptyListener(this.onEmptyChat);

    this.scrollChat();
  }

  componentDidUpdate() {
    this.scrollChat();
  }

  componentWillUnmount() {
    ChatStore.removeMessageListener(this.onReceiveMessage);
    ChatStore.removeChatIsEmptyListener(this.onEmptyChat);
  }

  onReceiveMessage() {
    this.setState(getChatState());
  }

  onEmptyChat() {
    const isChatEmpty = true;
    this.setState(getChatState(isChatEmpty));
  }

  scrollChat() {
    const conversation = document.querySelector('.conversation');
    conversation.scrollTop = conversation.scrollHeight;
    return this;
  }

  sendMessage() {
    const messageInput = document.querySelector('#messageInput');
    const textMessage = messageInput.innerText;
    const username = NameStore.getName();

    if (textMessage.trim() && username) {
      ChatAction.sendMessage({
        message: textMessage,
        username,
      });
    }

    messageInput.innerHTML = '';

    return this;
  }

  render() {
    const messages = [];

    this.state.messages.forEach((message) => {
      messages.push(<Message
        message={message}
        properties={this.props.properties}
        key={message.key}
      />);
    });

    const screenStyle = {
      backgroundColor: this.props.properties.backgroundColorChat,
      color: this.props.properties.fontColorChat,
    };

    const imageButtonSend = this.props.properties.imageSendButtonChat;
    const buttonSendSyle = {
      backgroundColor: this.props.properties.backgroundColorImageChat,
      backgroundImage: imageButtonSend ? `url('${imageButtonSend}')` : '',
    };

    const boxChatBody = this.state.loading ?
    (<Spinner properties={this.props.properties} />) : messages;

    const styleMessageInput = {
      backgroundColor: this.props.properties.inputMessageColor,
      fontSize: this.props.properties.textSizeInput,
      color: this.props.properties.fontColorInput,
    };

    return (
      <div className="boxChat" style={screenStyle}>
        <Toolbar properties={this.props.properties} name={this.props.name} />
        <div className="conversation">
          {boxChatBody}
        </div>
        <div className="boxInputMessage">
          <div
            id="messageInput"
            contentEditable="true"
            style={styleMessageInput}
          />
          <button
            className="button-send"
            onClick={this.sendMessage}
            style={buttonSendSyle}
          />
        </div>
      </div>
    );
  }
}
Chat.propTypes = {
  properties: React.PropTypes.shape({
    backgroundColorChat: React.PropTypes.string,
    backgroundColorImageChat: React.PropTypes.string,
    fontColorChat: React.PropTypes.string,
    fontColorInput: React.PropTypes.string,
    imageSendButtonChat: React.PropTypes.string,
    textSizeInput: React.PropTypes.string,
    othersMessagesBubbleColor: React.PropTypes.string,
    ourMessagesBubbleColor: React.PropTypes.string,
    inputMessageColor: React.PropTypes.string,
  }),
  name: React.PropTypes.string,
};
Chat.defaultProps = {
  properties: {},
  name: '',
};
