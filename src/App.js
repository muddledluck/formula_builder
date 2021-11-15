import React from "react";
import { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./App.css";
import Caculate from "./component/caculate.component";
import AddMaterial from "./component/material.compnent";
import NewMaterial from "./component/v2/newMaterial.component";
import NewSerice from "./component/v2/newSerivice.component";

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
      <BrowserRouter>
        <div className="App">
          <Switch>
            <Route path="/" exact component={NewMaterial} />
            <Route path="/new-serivce" exact component={NewSerice} />
            <Route path="/material" exact component={AddMaterial} />
            <Route path="/cacluate-formula" exact component={Caculate} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
