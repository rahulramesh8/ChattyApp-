import React, { Component } from 'react';
import ChatBar from './ChatBar.jsx'
import MessageList from './messageList.jsx'


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {name: "Bob"}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: []
    }
  }
  componentDidMount() {
    console.log("componentDidMount <App />")
    //Storing the socket inside the class
    this.socket = new WebSocket("ws://localhost:3001")
    this.socket.onopen = (event) => {
      console.log("Connected to server");
      
      
      
      const keepOldUser = this.state.currentUser.name;
      this.socket.onmessage = (event) => {
        console.log(event);

        const data = JSON.parse(event.data);
        switch(data.type) {
          case "incomingMessage":
            //Receving messages from the server
            let incomingMsg = JSON.parse(event.data);
            console.log("Incoming msg: ", incomingMsg)
            let newMessageInfo = [...this.state.messages,{
              type: incomingMsg.type,
              id: incomingMsg.id,
              username: incomingMsg.username,
              content: incomingMsg.content
            }];
            console.log("newMsgInfo: ", newMessageInfo);
            this.setState({messages: newMessageInfo})
            this.setState({currentUser: {name:incomingMsg.username}})
            break;

          case "incomingNotification":
          let incomingUsername = JSON.parse(event.data);
            console.log("Incoming data for username change: ", incomingUsername);        
            this.setState({currentUser: {name:incomingUsername.username}})
            this.setState({messages:[...this.state.messages,
                                          { type:incomingUsername.type,
                                            newUsername:incomingUsername.username,
                                            oldUsername:incomingUsername.oldUsername}]});
            break;
          
          default:
            throw new Error("Uknown event type" + data.type);
        }

      }


    };



  }
  
  
  _usernameHandler = (username) => {
    
    //Object to be sent to server with username and notification
    var oldUsername = this.state.currentUser.name;
    let sendUsernameToServer ={
      type: "postNotification",
      username: username,
      oldUsername: oldUsername,
    }
    // Send the msg object to the server as a JSON-formatted string.
    this.socket.send(JSON.stringify(sendUsernameToServer));
   }

  _contentHandler = (msg) => {
    
    //Object to be sent to server with username and message
    let sendMsgToServer ={
      type: "postMessage",
      username: this.state.currentUser.name,
      content: msg,
      id: null
    }

    // Send the msg object to the server as a JSON-formatted string.
    this.socket.send(JSON.stringify(sendMsgToServer));

  }

  render() {
    console.log("Rendering <App/>")

    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
        </nav>
        <main>
          <MessageList dataForMessages = {this.state.messages}/>
        </main>
        <footer>
          <ChatBar sendCurrentUser = {this.state.currentUser.name} onUsernameChange = {this._usernameHandler} onMessageChange ={this._contentHandler} dataForChatBar = {this.state.currentUser}  />
        </footer>
      </div>
    );
  }
}
export default App;