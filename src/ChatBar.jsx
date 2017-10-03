import React, { Component } from 'react';

class ChatBar extends Component {


    _handleUserChange = (event) => {
        this.props.onUsernameChange(event.target.value);
    }

    _handleContentChange = (event) => {
        if (event.key === 'Enter') {
            this.props.onMessageChange(event.target.value);
        }
    }


    render() {
        return (
            <div className = "chatbar">
                <input className="chatbar-username" placeholder= {this.props.dataForChatBar.name} onChange= {this._handleUserChange} />
                <input className="chatbar-message" placeholder= "Type a message and hit Enter" onKeyPress ={this._handleContentChange}  />
            </div>
        )   
    }

}

export default ChatBar;