import React from "react"; 

import Part from "./Part.jsx";
export default class MainChat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mess: [],
      newMess: {
        title: "",
        description: "",
      },
    };
  }
  renderMesss = (mess) =>
    mess.map((mess, index) => {
      return (
        <div className="message" key={index}>
          <h1 className="name">{mess.title}</h1>
          <p className="mess">{mess.description}</p>
        </div>
      );
    });
  handleEditMess = (value, editIndex) => {
    const { mess } = this.state;
    const newMesss = mess.map((mess, index) => {
      if (index === editIndex) {
        mess.title = value;
      }
      return mess;
    });
    this.setState({ mess: newMesss });
  };
  handleAdd = (e) => {
    const { newMess } = this.state;
    newMess.title = e.target.value;
    this.setState({ newMess: newMess });
  };
  handleSubmit = (e) => {
    const { newMess, mess } = this.state;
    e.preventDefault();
    mess.push({
      title: newMess.title,
      description: newMess.description,
    });
    this.setState({ mess });
  };
  onChangeText = (description) => {
    const { newMess } = this.state;
    newMess.description = description;
    this.setState({ newMess });
  };
  render() {
    const { mess, newMess } = this.state;
    return (
      <div className="container">
        <div className="chatarena">{this.renderMesss(mess)}</div>
        <form action="" className="chatform">
          <div className="nameform">
            <span>Name:</span>
            <input value={newMess.title} onChange={this.handleAdd} />
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

