import React from "react";
import { Component } from "react";
import "./App.css";
import AddMaterial from "./component/material.compnent";

class App extends Component {
  constructor() {
    super();
    this.state = {
      obj: {
        title: "Demontiaon and prep",
        value: "jfkd",
      },
      isAddingMaterial: false,
    };
  }
  handleAddMaterail = (e) => {
    e.preventDefault();
    this.setState({ isAddingMaterail: !this.state.isAddingMaterial });
  };

  render() {
    return (
      <div className="App">
        {/* <button onClick={this.handleAddMaterail}>
          {isAddingMaterail ? "Cancle Materail Add" : "Add Materail"}
        </button> */}
        <AddMaterial />
      </div>
    );
  }
}

export default App;
