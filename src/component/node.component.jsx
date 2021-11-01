import React, { Component } from "react";
import constants from "../utils/contants.utils";

const allowed = [
  "+",
  "-",
  "*",
  "/",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "0",
];

export default class Node extends Component {
  constructor(props) {
    super(props);
    this.state = {
      variables: [],
      newVariable: {},
      formula: "",
      addingFormula: false,
      newConstants: [],
    };
  }

  handleConstants = (value) => {
    const newConstants = constants.filter((consts) =>
      consts.title.toLowerCase().includes(value.toLowerCase())
    );
    this.setState({ newConstants, addingFormula: newConstants.length !== 0 });
  };

  handleVariableName = (e) => {
    const newVariable = { ...this.state.newVariable };
    newVariable.name = e.target.value;
    this.setState({ newVariable });
  };

  handleFormula = (e) => {
    let value = e.target.value;
    const lastKeyPressed = value[value.length - 1]?.toString();
    if (allowed.includes(lastKeyPressed)) {
      this.handleFormulaClick(lastKeyPressed);
      return;
    }
    value = value.split(/[*\-_+/]/);
    value = value[value.length - 1];
    this.handleConstants(value);
  };

  handleAdd = (e) => {
    e.preventDefault();
    console.log(this.state.newVariable);
    const newArray = [...this.state.variables, this.state.newVariable];
    this.setState({
      variables: newArray,
      newVariable: {},
    });
  };

  handleFormulaClick = (value) => {
    const newVariable = { ...this.state.newVariable };
    newVariable.formula = newVariable.formula
      ? newVariable.formula.toString() + value.toString()
      : value.toString();
    this.setState({ newVariable });
  };
  render() {
    return (
      <div>
        <h1>Formula</h1>
        {this.state.variables.map((variable) => {
          return (
            <>
              <span>{variable.name}</span> = <span>{variable.formula}</span>
            </>
          );
        })}
        <h2>Add Variables</h2>
        <div>
          <label htmlFor="variable">Name: </label>
          <input
            id="variable"
            type="text"
            onChange={this.handleVariableName}
            value={this.state.newVariable.name}
          />
          <label htmlFor="formula">formula: </label>
          <input
            id="formula"
            type="text"
            onChange={this.handleFormula}
            value={this.state.newVariable.formula}
          />
          <div>
            {this.state.newConstants.map((con) => {
              return (
                <div
                  onClick={() =>
                    this.handleFormulaClick(con.title.replace(" ", "_"))
                  }
                >
                  {con.title}
                </div>
              );
            })}
          </div>
          <button onClick={this.handleAdd}>add</button>
        </div>
      </div>
    );
  }
}
