import React from "react";
import Part from "./Part.jsx";

export default class MainChat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mess: [],
      newMess: {
        name: "",
        message: "",
      },
    };
  }
  componentDidMount = () => {
    fetch("http://localhost:3004/mess")
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          mess: data,
        });
      });
  };

  renderMess = (mess) =>
    mess.map((mess, index) => {
      return (
        <div className="message" key={index}>
          <h1 className="name">{mess.name}</h1>
          <p className="mess">{mess.message}</p>
        </div>
      );
    });
  handleEditMess = (value, editIndex) => {
    const { mess } = this.state;
    const newMess = mess.map((mess, index) => {
      if (index === editIndex) {
        mess.name = value;
      }
      return mess;
    });
    this.setState({ mess: newMess });
  };
  handleAdd = (e) => {
    const { newMess } = this.state;
    newMess.name = e.target.value;
    this.setState({ newMess: newMess });
  };
  handleSubmit = (e) => {
    const { newMess, mess } = this.state;
    e.preventDefault();
    mess.push({
      name: newMess.name,
      message: newMess.message,
    });
    this.setState({ mess });
    fetch('http://localhost:3004/mess', {
      method: 'post',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({
           "mess": this.state.newMess
      })
   });
  };
  onChangeText = (message) => {
    const { newMess } = this.state;
    newMess.message = message;
    this.setState({ newMess });
  };
  render() {
    const { mess, newMess } = this.state;
    return (
      <div className="container">
        <div className="chatarena">{this.renderMess(mess)}</div>
        <form action="" className="chatform">
          <div className="nameform">
            <span>Name:</span>
            <input value={newMess.name} onChange={this.handleAdd} />
          </div>
          <Part mess={newMess} onChangeText={this.onChangeText} />
          <button className="sendform" onClick={this.handleSubmit}>
            Send
          </button>
          <hr />
        </form>
        <form action="" className="chatform">
          <div className="nameform">
            <span>Name:</span>
            <input value={newMess.name} onChange={this.handleAdd} />
          </div>
          <Part mess={newMess} onChangeText={this.onChangeText} />
          <button className="sendform" onClick={this.handleSubmit}>
            Send
          </button>
          <hr />
        </form>
      </div>
    );
  }
}
