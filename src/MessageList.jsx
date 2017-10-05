import React, { Component } from 'react';
import Message from './message.jsx'

class MessageList extends Component {
    render() {
        console.log("Rendering <MessageList/>")
        let notifyUserWithMsg =  null;
        let allMessages = null;
        let allNotifications = null;
        
        const getFromProps = this.props.dataForMessages;
        allMessages = getFromProps.map((message) => {
        
            if(message.type === "incomingMessage"){

                if(/\.(?:png|jpg|gif)/.test({message.username})) {
                    return (
                        <div className="message" key={message.id}>
                            <span className="message-username" style={{color: this.props.userColor}}>{message.username}</span>
                            <span className="message-content">{message.content}</span>
                        </div>
                    )
                }
                else {
                    
                    return (
                        <div className="message" key={message.id}>
                            <span className="message-username" style={{color: this.props.userColor}}>{message.username}</span>
                            <span className="message-content">{message.content}</span>
                        </div>
                    )
                }

            } 
            else if(message.type === "incomingNotification") {
                notifyUserWithMsg = `${message.oldUsername} has changed to ${message.newUsername}`;                
                return (
                    <Message toShowonMsgList = {notifyUserWithMsg}/>
                )
            }
        });  

        return (
            <div>
            {allMessages}
            </div>
        )
    }
}

export default MessageList;