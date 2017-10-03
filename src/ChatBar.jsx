import React, { Component } from 'react';

class ChatBar extends Component {
    render() {
        return (
            <div className = "chatbar">
                <input className="chatbar-username" placeholder= {this.props.dataForChatBar.name} />
                <input className="chatbar-message" placeholder= "Type a message and hit Enter" />
            </div>
        )   
    }
}

export default ChatBar;