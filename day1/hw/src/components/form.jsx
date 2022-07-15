import React from "react";
class Form extends React.Component {
  state = {
    text: "",
  };
  handleChange = (e) => {
    this.setState({
      text: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.createTask(this.state.text);
    this.setState({ text: "" });
  };
  handleForm = () => {
    const input = document.querySelector(".input")
    input.classList.add("active")
  }
  handleCloseForm= () => {
     const input = document.querySelector(".input");
     input.classList.remove("active");
  }
  render() {
    return (
      <div className="taskform">
        <form action="" className="input" onSubmit={this.handleSubmit}>
          <input
            type="text"
            value={this.state.text}
            onChange={this.handleChange}
          />
          <button onClick={this.handleCloseForm}>Add task</button>
          <h1 className="close" onClick={this.handleCloseForm}>
            X
          </h1>
        </form>
        <button className="newtask" onClick={this.handleForm}>
          New task
        </button>
      </div>
    );
  }
}

export default Form;
