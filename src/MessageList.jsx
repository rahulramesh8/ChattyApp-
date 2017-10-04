import React, { Component } from 'react';
import Message from './message.jsx'

class MessageList extends Component {
  render() {
    console.log("Rendering <MessageList/>")
    let notifyUserWithMsg =  null;
    let allMessages = null;

    const getFromProps = this.props.dataForMessages;
    allMessages = getFromProps.map((message) => {
    
        if(message.type == "postMessage") {
            <div className="message" key={message.id}>
                <span className="message-username">{message.username}</span>
                <span className="message-content">{message.content}</span>
            </div>
        }
    });

    const allNotifications = getFromProps.map((message) => {
        
        if(message.type = "postNotification") {
            notifyUserWithMsg = `${this.props.usernameForMessages.oldUsername} has changed to ${this.props.usernameForMessages.username}`;                
        }
    
    });


    
return (
    <div>
        {allMessages}
        <Message toShowonMsgList = {notifyUserWithMsg}/>
    </div>
)
  }
}

export default MessageList;