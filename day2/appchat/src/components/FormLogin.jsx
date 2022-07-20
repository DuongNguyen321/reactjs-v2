import Login from "./login/Login";

export default function FormLogin(props) {

    const handleCloselogin = (e) => {
      let loginForm = document.querySelector(".login-form-container");
      loginForm.classList.remove("active");
    };
    return (
      <div className="login-form-container">

        <i
          className="fas fa-times"
          id="form-close"
          onClick={handleCloselogin}
        ></i>
        <form action="">
          <Login />
        </form>
      </div>
    );
  }
  