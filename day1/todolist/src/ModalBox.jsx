import React from "react";
import { Modal } from "react-bootstrap";
export default class ModalBox extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      form: {
        title: "",
        summary: "",
      },
      errors: {
        title: "",
        summary: "",
      },

      lists: [],

      show: false,
    };
  }

  changeValue = (e) => {
    let data = this.state.form;

    data[e.target.name] = e.target.value;

    this.setState({ form: data });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const { title, summary } = this.state.form;

    const errors = {};

    const lists = this.state.lists;

    if (title === "") {
      errors.title = "Please fill title";
    }

    if (summary === "") {
      errors.summary = "Please fill summary";
    }

    this.setState({
      errors: errors,
    });

    if (Object.keys(errors).length === 0) {
      lists.push({
        title: title,
        summary: summary,
      });

      this.setState({
        form: {
          title: "",
          summary: "",
        },
        show: false,
      });
    }

    this.setState({
      lists: lists,
    });

    this.props.doLists(lists);
  };

  removeItem = (index, lists, callback) => {
    if (window.confirm("Are you sure")) {
      lists.splice(index, 1);

      callback(lists);
    }
  };

  handleShow = () => {
    this.setState({
      show: true,
    });
  };

  handleClose = () => {
    this.setState({
      show: false,
    });
  };

  render() {

    return (
      <>
        <div className="d-grid gap-2">
          <button
            type="button"
            onClick={this.handleShow}
            className="btn btn-primary"
          >
            Add Task
          </button>
        </div>
        <Modal show={this.state.show} onHide={this.state.show}>
          <Modal.Header>
            <Modal.Title>New Task</Modal.Title>
            <button
              onClick={this.handleClose}
              type="button"
              className="btn-close"
              aria-label="Close"
            ></button>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={this.handleSubmit}>
              <div className="mb-3">
                <label>Title</label>
                <input
                  type="text"
                  name="title"
                  className="form-control"
                  placeholder="Title..."
                  onChange={this.changeValue}
                  key={this.state.form.title}
                  defaultValue={this.state.form.title}
                  autoFocus
                />
                {this.state.errors.title ? (
                  <span className="text-danger">{this.state.errors.title}</span>
                ) : (
                  false
                )}
              </div>
              <div className="mb-3">
                <label>Summary</label>
                <input
                  type="text"
                  name="summary"
                  className="form-control"
                  placeholder="Summary..."
                  onChange={this.changeValue}
                  key={this.state.form.summary}
                  defaultValue={this.state.form.summary}
                  autoFocus
                />
                {this.state.errors.summary ? (
                  <span className="text-danger">
                    {this.state.errors.summary}
                  </span>
                ) : (
                  false
                )}
              </div>

              <div className="row">
                <div className="col-6">
                  <a
                    href="#"
                    onClick={this.handleClose}
                    className="close-modal"
                    data-bs-dismiss="modal"
                  >
                    Cancel
                  </a>
                </div>
                <div className="col-6 d-flex justify-content-end">
                  <button type="submit" className="btn btn-primary">
                    Create Task
                  </button>
                </div>
              </div>
            </form>
          </Modal.Body>
        </Modal>
      </>
    );
  }
}
