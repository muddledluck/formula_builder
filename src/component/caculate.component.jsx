import React, { Component } from "react";

export default class Caculate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formula: [],
      materials: [],
      userInput: [],

      selectedCaculation: [],
      selectedIndex: [],
      equationSolution: [],
      equation: [],
    };
  }
  componentDidMount() {
    const { formula, materails, userInput } = this.props.location.state;
    this.setState({
      formula: formula,
      materials: materails,
      userInput: userInput,
    });
  }

  handleCaculateSelection = (e) => {
    const currentSelectedFormula = this.state.formula.find(
      (formula) => formula.id === e.target.value
    );
    this.setState(
      {
        selectedCaculation: [
          ...this.state.selectedCaculation,
          currentSelectedFormula,
        ],
        equationSolution: [
          ...this.state.equationSolution,
          currentSelectedFormula.value,
        ],
        equation: [...this.state.equation, 0],
      },
      () => {
        const selectedCaculationIdx = this.state.equationSolution.length - 1;
        console.log("selectedC: ", selectedCaculationIdx);
        this.filterMaterials(currentSelectedFormula.dependsOn).map((item) => {
          this.handleMaterials(item.value, item.id, selectedCaculationIdx);
          return 0;
        });
      }
    );
  };

  calculateEquation = (elem, id) => {
    try {
      const solution = eval(elem);
      console.log(solution);
      const equation = [...this.state.equation];
      equation[id] = solution;
      this.setState({ equation });
    } catch (error) {
      console.log(error);
      return 0;
    }
  };

  handleUserInput = (e, id, idx) => {
    const tempId = "###" + id;
    let equation = [...this.state.equationSolution];
    console.log("prev: ", equation[idx], e.target.value);
    const tempEquation = equation[idx].replace(tempId, e.target.value);
    console.log("next: ", equation[idx], e.target.value);
    this.calculateEquation(tempEquation, idx);
  };
  handleMaterials = (val, id, idx) => {
    const tempId = "@@@" + id;
    let equation = [...this.state.equationSolution];
    equation[idx] = equation[idx].replace(tempId, val);
    this.setState({ equationSolution: equation });
  };

  filterUserInput = (dependsOn) => {
    return dependsOn.filter((elem) => elem.value === null);
  };

  filterMaterials = (dependsOn) => {
    return dependsOn.filter((elem) => elem.value !== null);
  };

  filterServices = (dependsOn) => {
    return dependsOn.filter((elem) => elem.dependsOn);
  };

  render() {
    return (
      <div>
        <h1>Caculate</h1>
        <select onChange={this.handleCaculateSelection}>
          {this.state.formula.map((item, idx) => {
            return (
              <option key={idx} value={item.id}>
                {item.name} = {item.formula}
              </option>
            );
          })}
        </select>

        <div style={{ margin: "0% 5%" }}>
          {this.state.selectedCaculation.map((item, idx) => {
            return (
              <div style={{ padding: "1% 1%" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    backgroundColor: "gray",
                  }}
                >
                  <h3>{item.formula}</h3>
                  <span>{this.state.equation[idx]}</span>
                </div>
                {this.filterUserInput(item.dependsOn).map((item, fIdx) => {
                  return (
                    <>
                      <span key={fIdx}>{item.name}</span>
                      <input
                        type="number"
                        onChange={(e) => this.handleUserInput(e, item.id, idx)}
                      />
                    </>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
