import React from "react";
import { Component } from "react";
import "./App.css";
import Node from "./component/node.component";

class App extends Component {
  constructor() {
    super();
    this.state = {
      obj: {
        title: "Demontiaon and prep",
        value: "jfkd",
      },
    };
  }
  render() {
    return (
      <div className="App">
        <h1>Tree</h1>
        <Node obj={this.state.obj} />
      </div>
    );
  }
}

export default App;
