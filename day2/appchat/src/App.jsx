import React from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "@fortawesome/fontawesome-svg-core";
import { dom } from "@fortawesome/fontawesome-svg-core";
import MainChat from "./components/Mainchat";
dom.watch();

class App extends React.Component {
  render() {
    return (
      <div className="app">
        <MainChat/>
      </div>
    );
  }
}
export default App;
