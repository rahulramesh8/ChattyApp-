import React, { Component } from 'react';
import ChatBar from './ChatBar.jsx'
import MessageList from './messageList.jsx'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {name: "Anonymous"}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: [],
      clients: 0,
      color: "black"
    }
  }

  scrollToBottom = () => {
    const node = this.refs.Bottomdiv;
    node.scrollIntoView({ behavior: "smooth" });
  }

  componentDidMount() {
    console.log("componentDidMount <App />")

    //Storing the socket inside the class
    this.socket = new WebSocket("ws://localhost:3001")
    this.socket.onopen = (event) => {
      console.log("Connected to server");
      
      //Listening for message from server
      this.socket.onmessage = (event) => {

        const data = JSON.parse(event.data);
        switch(data.type) {
          case "incomingMessage":
            let incomingMsg = JSON.parse(event.data);

            let newMessageInfo = [...this.state.messages,{
              type: incomingMsg.type,
              id: incomingMsg.id,
              username: incomingMsg.username,
              content: incomingMsg.content
            }];

            this.setState({messages: newMessageInfo})
            break;

          case "incomingNotification":
            let incomingUsername = JSON.parse(event.data);
            this.setState({messages:[...this.state.messages,
            { type:incomingUsername.type,
              newUsername:incomingUsername.username,
              oldUsername:incomingUsername.oldUsername}]});
            break;
          
          case "clientCounter":
            this.setState({clients: data.size});
            break;

          case "clientColor":
            this.setState({color: data.color});
            break;
        }
      }
    };
  }

  //Scrolling down to empty div every time component is mounted.
  componentDidUpdate() {
    this.scrollToBottom();
  }
  
  _usernameHandler = (username) => {
    //Object to be sent to server with username and notification
    var oldUsername = this.state.currentUser.name;
    let sendUsernameToServer ={
      type: "postNotification",
      username: username,
      oldUsername: oldUsername,
    }
    this.setState({currentUser: {name: username}});
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
    this.socket.send(JSON.stringify(sendMsgToServer));
  }

  render() {
    console.log("Rendering <App/>")

    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
          <span className="navbar-usercount">Users online: {this.state.clients}</span>
        </nav>
        <main>
          <MessageList usernameForMsgs = {this.state.currentUser.name} dataForMessages = {this.state.messages} userColor = {this.state.color}/>
          
          {/* Empty div to help auto-scroll down */}
          <div style={{ float:"left", clear: "both" }}
             ref="Bottomdiv">
          </div>

        </main>
        <footer>
          <ChatBar sendCurrentUser = {this.state.currentUser.name} onUsernameChange = {this._usernameHandler} onMessageChange ={this._contentHandler} dataForChatBar = {this.state.currentUser}  />
        </footer>
      </div>
    );
  }
}
export default App;