import React from "react";
import Form from "./components/form";
import Filter from "./components/filter";
import List from "./components/list";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "@fortawesome/fontawesome-svg-core";
import { dom } from "@fortawesome/fontawesome-svg-core";
import "./_app.scss"
dom.watch();
class App extends React.Component {
  getId = () => Math.floor(Math.random() * 9000) + 1000;

  state = {
    filter: "all",
    todos: [],
  };

  filterBy = (value) => {
    this.setState({
      filter: value,
    });
  };

  completeTask = (id) => {
    let idx = this.state.todos.findIndex((item) => item.id == id);
    if (idx != -1) {
      const todo = { ...this.state.todos[idx] };
      todo.completed = !todo.completed;
      const newTodos = [...this.state.todos];
      newTodos[idx] = todo;

      this.setState({
        todos: newTodos,
      });
    }
  };

  createTask = (text) => {
    const todo = { id: this.getId(), text: text, completed: false };
    const newTodos = [...this.state.todos];
    newTodos.push(todo);
    this.setState({
      todos: newTodos,
    });
  };

  render() {
    const currentOption = this.state.filter;
    const todos = this.state.todos;

    let filteredTodos = [];

    switch (currentOption) {
      case "notdone":
        filteredTodos = todos.filter((item) => !item.completed);
        break;
      case "done":
        filteredTodos = todos.filter((item) => item.completed);
        break;
      default:
        filteredTodos = todos;
    }
    window.onload = function () {
      let body = document.body;
      var theme = localStorage.getItem("theme");
      let btnToggle = document.querySelector(".btn-toggle");

      if (theme === "light") {
        body.classList = "light";
        btnToggle.classList.add("fa-moon");
        btnToggle.classList.remove("fa-sun");
      } else if (theme === "dark") {
        body.classList = "dark";
        btnToggle.classList.remove("fa-moon");
        btnToggle.classList.add("fa-sun");
      } else {
        body.classList = "light";
        btnToggle.classList.add("fa-moon");
        btnToggle.classList.remove("fa-sun");
      }
    };
    return (
      <div className="container">
        <Form createTask={this.createTask} />
        <Filter currentOption={this.state.filter} filterBy={this.filterBy} />

        <List todos={filteredTodos} completeTask={this.completeTask} />
      </div>
    );
  }
}
export default App;
