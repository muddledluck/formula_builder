import React from "react";
import { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./App.css";
import Caculate from "./component/caculate.component";
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
        <BrowserRouter>
          <Switch>
            <Route path="/" exact component={AddMaterial} />
            <Route path="/cacluate-formula" exact component={Caculate} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
