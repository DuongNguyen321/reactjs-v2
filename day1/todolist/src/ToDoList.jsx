import React from "react";
import ModalBox from "./ModalBox";
import "bootstrap/dist/css/bootstrap.min.css";

export default class TodoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      doLists: [],
    };
  }

  getDoList = (data) => {
    this.setState({
      doLists: data,
    });
  };

  render() {
    const doListsJsx = this.state.doLists.map((doItem, index) => {
      return (
        <div className="border p-3 rounded mb-3" key={index}>
          <div className="row">
            <div className="col-11">
              <h4>{doItem.title}</h4>
              <p>{doItem.summary}</p>
            </div>
            <div className="col-1">
              <a
                className="remove"
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  new ModalBox().removeItem(
                    index,
                    this.state.doLists,
                    this.getDoList
                  );
                }}
              >
                <i className="fa-solid fa-trash-can"></i>
              </a>
            </div>
          </div>
        </div>
      );
    });

    return (
      <>
        <div className="container py-5 lists">
          <div className="row justify-content-center">
            <div className="col-6">
              <h1 className="title">My Tasks</h1>

              {doListsJsx}

              <ModalBox doLists={this.getDoList} />
            </div>
          </div>
        </div>
      </>
    );
  }
}
