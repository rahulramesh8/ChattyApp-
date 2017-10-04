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
    console.log("Connected to server")

  }
  
  _usernameHandler = (username) => {
    this.setState({currentUser:{name: username}});
  }

  _contentHandler = (msg) => {
    
    // let newMessageInfo = [...this.state.messages,{
    //   id: Date.now(),
    //   username: this.state.currentUser.name,
    //   content: msg
    // }];

    //Was initially used to set the state after adding an instance
    // this.setState({messages: newMessageInfo})
    
    //Object to be sent to server with username and message
    let sendToServer ={
      username: this.state.currentUser.name,
      content: msg,
      id: null
    }

    // Send the msg object to the server as a JSON-formatted string.
    this.socket.send(JSON.stringify(sendToServer));

    //Receving messages from the server
    this.socket.onmessage = (event) => {
      console.log("Event data is: ", event.data);
    }
  }

  render() {
    console.log("Rendering <App/>")

    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
        </nav>
        <main>
          <MessageList dataForMessages = {this.state.messages} />
        </main>
        <footer>
          <ChatBar onUsernameChange = {this._usernameHandler} onMessageChange ={this._contentHandler} dataForChatBar = {this.state.currentUser}  />
        </footer>
      </div>
    );
  }
}
export default App;