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
            let fileName = message.content;
            if(message.type === "incomingMessage"){
                console.log(fileName);
                console.log(/\.(?:png|jpg|gif)/.test(fileName));
                if(/\.(?:png|jpg|gif)/.test(fileName)) {
                    return (
                        <div className="message" key={message.id}>
                            <span className="message-username" style={{color: this.props.userColor}}>{message.newUsername}</span>
                            <img src={message.content} className="message-image" />
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