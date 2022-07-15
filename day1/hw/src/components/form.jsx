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
  render() {
    return (
      <form action="" className="input" onSubmit={this.handleSubmit}>
        <input
          type="text"
          value={this.state.text}
          onChange={this.handleChange}
        />
        <button>New Task</button>
      </form>
    );
  }
}

export default Form;
