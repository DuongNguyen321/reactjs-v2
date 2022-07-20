import React from "react";
import Part from "./Part.jsx";
import FormLogin from "./FormLogin";
import Name from "./Name.jsx";

export default class MainChat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      mess: [],
      newMess: {
        name: "",
        message: "",
      },
    };
  }

  // const { user, isAuthenticated } = useAuth0();
  // if (isAuthenticated === true) {
  //   newMess.name = user.name;
  // } else {
  //   newMess.name = "Ẩn Danh";
  // }

  componentDidMount() {
    fetch("https://api4chat.herokuapp.com/mess")
      .then((res) => res.json())
      .then(
        (data) => {
          this.setState({
            isLoaded: true,
            mess: data,
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error,
          });
        }
      );
  }

  componentDidUpdate() {
    fetch("https://api4chat.herokuapp.com/mess")
      .then((res) => res.json())
      .then(
        (data) => {
          this.setState({
            isLoaded: true,
            mess: data,
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error,
          });
        }
      );
  }

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
    fetch("https://api4chat.herokuapp.com/mess", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(this.state.newMess),
    });
  };
  onChangeText = (message) => {
    const { newMess } = this.state;
    newMess.message = message;
    this.setState({ newMess });
  };
  handleLogin = () => {
    let loginForm = document.querySelector(".login-form-container");
    loginForm.classList.add("active");
  };

  render() {
    const { mess, newMess } = this.state;
    function Checkuser() {
      const nameuser = document.querySelector(".container h3").className;
      const chatform = document.querySelector(".container .chatform");
      const loginform = document.querySelector(".container .loginform");
      // console.log(loginform);
      if (nameuser ==="userlogin") {
        chatform.classList.add("active");
        loginform.classList.remove("active");
      }
       else if (nameuser === "notuser") {
        chatform.classList.remove("active");
        loginform.classList.add("active");
      }
    }
    const checkuser = setTimeout(Checkuser, 100);

    function myStopFunction() {
      clearTimeout(checkuser);
    }
    return (
      <div className="container">
        <FormLogin />
        <div className="chatarena">{this.renderMess(mess)}</div>
          <Name/>
        <form action="" className="chatform">
          <div className="nameform">
            <input
              value={newMess.name}
              onChange={this.handleAdd}
              placeholder="Bạn có thể dùng nickname để chat"
            />
          </div>
          <Part mess={newMess} onChangeText={this.onChangeText} />
          <button
            type="submit"
            className="sendform"
            onClick={this.handleSubmit}
          >
            Send
          </button>
          <i
            className="fas fa-user"
            id="login-btn"
            onClick={this.handleLogin}
          />
        </form>
        <div className="loginform">
          <h3>Bạn đang ẩn danh !</h3>
          <button type="button" className="btn" onClick={this.handleLogin}>
            Đăng nhập ngay
          </button>
        </div>
      </div>
    );
  }
}
