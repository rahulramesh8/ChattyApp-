import React, { Component } from 'react';

class Message extends Component {
  render() {
    console.log("Rendering <Message/>")
    return (

      <div className="message system">
        {this.props.toShowonMsgList}
      </div>
    )
  }
}

export default Message;