import React, { Component } from 'react';
import ChatBar from './ChatBar.jsx'
import MessageList from './messageList.jsx'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {name: "Bob"}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: [
        { 
          id:1,
          username: "Bob",
          content: "Has anyone seen my marbles?",
        },
        {
          id:2,
          username: "Anonymous",
          content: "No, I think you lost them. You lost your marbles Bob. You lost them for good."
        }
      ]
    }
  }

  componentDidMount() {
    console.log("componentDidMount <App />");
    setTimeout(() => {
      console.log("Simulating incoming message");
      // Add a new message to the list of messages in the data store
      const newMessage = {id: 3, username: "Michelle", content: "Hello there!"};
      const messages = this.state.messages.concat(newMessage)
      // Update the state of the app component.
      // Calling setState will trigger a call to render() in App and all child components.
      this.setState({messages: messages})
    }, 3000);
  }
  
  _usernameHandler = (username) => {
    this.setState({currentUser:{name: username}});
  }

  _contentHandler = (msg,id) => {
    let newMessageInfo = [...this.state.messages,{
      id: id,
      username: this.state.currentUser.name,
      content: msg
    }];

    this.setState({messages: newMessageInfo});
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