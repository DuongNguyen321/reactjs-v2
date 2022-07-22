import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
export default class Customers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      customers: [],
      action: "lists",
      form: {
        name: "",
        email: "",
        phone: "",
      },
      updateform: {
        name: "",
        email: "",
        phone: "",
      },
      errors: {},
      msg: "",
    };

    this.customersApi = "https://apiforlearn.herokuapp.com/customers/";
  }

  getUsers = () => {
    fetch(this.customersApi)
      .then((response) => response.json())
      .then((customers) => {
        this.setState({
          customers: customers,
        });
      });
  };

  componentDidMount() {
    this.getUsers();
  }

  componentDidUpdate() {
    this.getUsers();
  }

  customersRender = () => {
    let count = 0;
    return this.state.customers.map((customer) => {
      return (
        <tr key={customer.id}>
          <td>{++count}</td>
          <td>{customer.name}</td>
          <td>{customer.email}</td>
          <td>{customer.phone}</td>
          <td>
            <a
              href="#"
              className="btn btn-warning btn-sm"
              onClick={(e) => {
                e.preventDefault();
                this.handleAction("update");
              }}
              data-id={customer.id}
            >
              Sửa
            </a>
          </td>
          <td>
            <a
              href="#"
              className="btn btn-danger btn-sm"
              onClick={(e) => {
                e.preventDefault();
                this.deleteValue();
              }}
              data-id={customer.id}
            >
              Xoá
            </a>
          </td>
        </tr>
      );
    });
  };

  renderAction = () => {
    let jsx;
    switch (this.state.action) {
      case "add":
        jsx = (
          <>
            <h1>Thêm khách hàng</h1>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => {
                this.handleAction("lists");
              }}
            >
              Quay lại
            </button>
            <hr />
            {this.state.msg !== "" ? (
              <div className="alert alert-danger text-center">
                {this.state.msg}
              </div>
            ) : (
              false
            )}
            <form onSubmit={this.handleAddSubmit}>
              <div className="mb-3">
                <label>Tên</label>
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  placeholder="Tên"
                  value={this.state.form.name}
                  onChange={this.changeValue}
                />
                {this.state.errors.name ? (
                  <span style={{ color: "red" }}>{this.state.errors.name}</span>
                ) : (
                  false
                )}
              </div>

              <div className="mb-3">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  placeholder="Email"
                  value={this.state.form.email}
                  onChange={this.changeValue}
                />
                {this.state.errors.email ? (
                  <span style={{ color: "red" }}>
                    {this.state.errors.email}
                  </span>
                ) : (
                  false
                )}
              </div>

              <div className="mb-3">
                <label>Điện thoại</label>
                <input
                  type="text"
                  name="phone"
                  className="form-control"
                  placeholder="Điện thoại"
                  value={this.state.form.phone}
                  onChange={this.changeValue}
                />
                {this.state.errors.phone ? (
                  <span style={{ color: "red" }}>
                    {this.state.errors.phone}
                  </span>
                ) : (
                  false
                )}
              </div>
              <button type="submit" className="btn btn-primary">
                Thêm mới
              </button>
            </form>
          </>
        );
        break;

      case "update":
        jsx = (
          <>
            <h1>Cập nhật khách hàng</h1>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => {
                this.handleAction("lists");
              }}
            >
              Quay lại
            </button>
            <hr />
            <form onSubmit={this.updateValue}>
              <div className="mb-3">
                <label>Tên</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Tên"
                  name="name"
                  value={this.state.updateform.name}
                  onChange={this.handleUpdateValue}
                />
              </div>

              <div className="mb-3">
                <label>Email</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email"
                  name="email"
                  value={this.state.updateform.email}
                  onChange={this.handleUpdateValue}
                />
              </div>

              <div className="mb-3">
                <label>Điện thoại</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Điện thoại"
                  name="phone"
                  value={this.state.updateform.phone}
                  onChange={this.handleUpdateValue}
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Lưu thay đổi
              </button>
            </form>
          </>
        );

        break;

      default:
        jsx = (
          <>
            <h1>Danh sách khách hàng</h1>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => {
                this.handleAction("add");
              }}
            >
              Thêm mới
            </button>
            <hr />
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th width="5%">STT</th>
                  <th>Tên</th>
                  <th>Email</th>
                  <th>Điện thoại</th>
                  <th width="5%">Sửa</th>
                  <th width="5%">Xoá</th>
                </tr>
              </thead>
              <tbody>{this.customersRender()}</tbody>
            </table>
          </>
        );
        break;
    }
    return jsx;
  };

  handleAction = (action) => {
    this.setState({
      action: action,
    });
  };

  handleAddSubmit = (e) => {
    e.preventDefault();

    const errors = {};

    let msg = "";

    const { name, email, phone } = this.state.form;

    if (name === "") {
      errors.name = "Vui lòng nhập tên";
    }

    if (email === "") {
      errors.email = "Vui lòng nhập email";
    }

    if (phone === "") {
      errors.phone = "Vui lòng nhập điện thoại";
    }

    if (Object.keys(errors).length) {
      msg = "Vui lòng kiểm tra các lỗi bên dưới";
    } else {
      //post api
      fetch(this.customersApi, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(this.state.form),
      })
        .then((response) => response.json())
        .then((customer) => {
          if (typeof customer === "object") {
            this.setState({
              form: {
                name: "",
                email: "",
                phone: "",
              },
            });
            this.handleAction("lists");
          }
        });
    }

    this.setState({
      errors: errors,
      msg: msg,
    });
  };

  changeValue = (e) => {
    e.preventDefault();
    const data = { ...this.state.form };

    data[e.target.name] = e.target.value;

    this.setState({
      form: data,
    });
  };
  handleUpdateValue = (e) => {
    e.preventDefault();
    const data = { ...this.state.updateform };

    data[e.target.name] = e.target.value;

    this.setState({
      updateform: data,
    });
  };

  updateValue = (e) => {
    e.preventDefault();
    fetch(this.customersApi + "1", {
      method: "PUT",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify(this.state.updateform),
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
    this.handleAction("list");
  };

  deleteValue = (e) => {
    // e.preventDefault();
    fetch(this.customersApi + "1", {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((res) => {
        if (res.ok) {
          console.log("HTTP request successful");
        } else {
          console.log("HTTP request unsuccessful");
        }
        return res;
      })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((error) => console.log(error));
  };

  render() {
    return (
      <>
        <div className="container">{this.renderAction()}</div>
      </>
    );
  }
}
