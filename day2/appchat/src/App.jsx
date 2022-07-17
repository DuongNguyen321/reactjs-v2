import React from "react";

import Part from "./components/Part.jsx";

class App extends React.Component {
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
      console.log(mess);
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

  handleSubmit = () => {
    const { newMess, mess } = this.state;
    mess.push({
      title: newMess.title,
      description: newMess.description,
    });
    console.log(mess);
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
        <div className="chatform">
          <div className="nameform">
            <span>Name:</span>
            <input value={newMess.title} onChange={this.handleAdd} />
          </div>
          <Part mess={newMess} onChangeText={this.onChangeText} />
          <button className="sendform" onClick={this.handleSubmit}>Send</button>
          <hr />
        </div>
      </div>
    );
  }
}

export default App;
