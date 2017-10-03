import React, { Component } from 'react';
import Message from './message.jsx'

class MessageList extends Component {
  render() {
    console.log("Rendering <MessageList/>")
    const getFromProps = this.props.dataForMessages;
    const allMessages = getFromProps.map((message) =>
    <div className="message" key={message.id}>
        <span className="message-username">{message.username}</span>
        <span className="message-content">{message.content}</span>
    </div>
    )
    return (
        <div>
            {allMessages}
            <Message />
        </div>
    )
  }
}

export default MessageList;