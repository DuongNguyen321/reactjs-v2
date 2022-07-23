import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import "./customer.css"
export default class Customers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      customers: [],
      action: "lists",
      form: {
        id: 0,
        name: "",
        email: "",
        phone: "",
      },
      errors: {},
      msg: "",
      msgType: "danger",
      isLoading: true,
      paginate: {
        maxPage: 0,
        currentPage: 1,
      },
    };

    this.customersApi = "https://apiforlearn.herokuapp.com/customers";

    this.perPage = 3;
  }

  setMaxPage = () => {
    fetch(this.customersApi)
      .then((response) => response.json())
      .then((customers) => {
        const maxPage = Math.ceil(customers.length / this.perPage);

        const paginate = { ...this.state.paginate };

        paginate.maxPage = maxPage;

        this.setState({
          paginate: paginate,
        });
      });
  };

  getUsers = () => {
    fetch(
      this.customersApi +
        `?_page=${this.state.paginate.currentPage}&_limit=${this.perPage}`
    )
      .then((response) => response.json())
      .then((customers) => {
        this.setState({
          customers: customers,
          isLoading: false,
        });
      });
  };

  getUser = (userId) => {
    fetch(this.customersApi + "/" + userId)
      .then((response) => response.json())
      .then((customer) => {
        this.setState({
          form: customer,
        });
      });
  };

  deleteUser = (userId) => {
    fetch(this.customersApi + "/" + userId, {
      method: "DELETE",
    });
  };

  componentDidMount() {
    this.getUsers();
    this.setMaxPage();
  }

  componentDidUpdate() {
    this.getUsers();
  }

  paginateRender = () => {
    let paginateItem = [];
    let active;
    const currentPage = this.state.paginate.currentPage;

    for (let page = 1; page <= this.state.paginate.maxPage; page++) {
      active = parseInt(page) === parseInt(currentPage) ? "active" : "";
      paginateItem.push(
        <li
          key={page}
          className={`page-item ${active}`}
          onClick={(e) => {
            e.preventDefault();
            this.goPaginate(page);
          }}
        >
          <a className="page-link" href="#">
            {page}
          </a>
        </li>
      );
    }

    return (
      <nav
        aria-label="Page navigation example"
        className="d-flex justify-content-end"
      >
        <ul className="pagination">
          {this.state.paginate.currentPage > 1 ? (
            <li className="page-item">
              <a className="page-link" href="#" onClick={this.prevPaginate}>
                Trước
              </a>
            </li>
          ) : (
            false
          )}

          {paginateItem}
          {this.state.paginate.currentPage < this.state.paginate.maxPage ? (
            <li className="page-item">
              <a className="page-link" href="#" onClick={this.nextPaginate}>
                Sau
              </a>
            </li>
          ) : (
            false
          )}
        </ul>
      </nav>
    );
  };

  goPaginate = (page) => {
    const paginate = { ...this.state.paginate };

    paginate.currentPage = page;
    this.setState({
      paginate: paginate,
      isLoading: true
    });
  };

  prevPaginate = (e) => {
    e.preventDefault();
    let page = this.state.paginate.currentPage;
    page = page - 1;
    if (page < 0) {
      page = 1;
    }

    this.goPaginate(page);
  };

  nextPaginate = (e) => {
    e.preventDefault();
    let page = this.state.paginate.currentPage;
    page = page + 1;
    if (page > this.state.paginate.maxPage) {
      page = this.state.paginate.maxPage;
    }

    this.goPaginate(page);
  };

  customersRender = () => {
    let count = 0;
    if (this.state.isLoading) {
      return (
        <tr>
          <td colSpan={6}>
            <div className="alert alert-success text-center">
              Đang tải dữ liệu...
            </div>
          </td>
        </tr>
      );
    }

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
                this.handleAction("update", e.target.dataset.id);
              }}
              data-id={customer.id}
            >
              Sửa
            </a>
          </td>
          <td>
            <a
              href="#"
              data-id={customer.id}
              onClick={(e) => {
                e.preventDefault();

                this.handleDeleteSubmit(e.target.dataset.id);
              }}
              className="btn btn-danger btn-sm"
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
              <div className={`alert alert-${this.state.msgType} text-center`}>
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
            {this.state.msg !== "" ? (
              <div className={`alert alert-${this.state.msgType} text-center`}>
                {this.state.msg}
              </div>
            ) : (
              false
            )}
            <form onSubmit={this.handleUpdateSubmit}>
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
            {this.paginateRender()}
          </>
        );
        break;
    }

    return jsx;
  };

  handleAction = (action, id = 0) => {
    if (id !== 0) {
      this.getUser(id);
    }

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

  handleUpdateSubmit = (e) => {
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
      fetch(this.customersApi + "/" + this.state.form.id, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(this.state.form),
      })
        .then((response) => response.json())
        .then((customer) => {
          if (typeof customer === "object") {
            this.setState({
              msg: "Cập nhật thành công",
              msgType: "success",
            });
          }
        });
    }

    this.setState({
      errors: errors,
      msg: msg,
    });
  };

  handleDeleteSubmit = (id) => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className="custom-ui">
            <h1>Are you sure?</h1>
            <p>You want to delete this file?</p>
            <button onClick={onClose}>No</button>
            <button
              onClick={() => {
                this.deleteUser(id);
                onClose();
              }}
            >
              Yes, Delete it!
            </button>
          </div>
        );
      },
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

  render() {
    return (
      <>
        <div className="container">{this.renderAction()}</div>
      </>
    );
  }
}
