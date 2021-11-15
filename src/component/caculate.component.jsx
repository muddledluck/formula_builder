/* eslint-disable array-callback-return */
/* eslint-disable no-eval */
import React, { Component } from "react";

export default class Caculate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formula: [],
      materials: [],
      userInput: [],

      selectedCaculation: [],
      equationSolution: [],
      equation: [],

      formulaDependsOn: [],
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

  componentDidUpdate(_prevProps, prevState) {
    if (
      prevState.equationSolution.length !== this.state.equationSolution.length
    ) {
      this.handleEquation([...this.state.equationSolution], true);
    }
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

  handleEquation = (selectedEquation, root) => {
    let equation = [...selectedEquation];
    console.log("equation: ", equation);
    equation = equation.map((equ) => {
      const regex = /(\*\*\*[0-9]{0,})\w/g;
      const match = equ.match(regex);
      console.log("regex match", match, equ);
      if (match) {
        match.map((item) => {
          const service = this.findService(item);
          const serviceFormula = `(${service.value})`;
          equ = equ.replace(item, serviceFormula);
          if (service.dependsOn?.length) {
            this.handleEquation([equ]);
          }
        });
      }
      return equ;
    });
    if (root) {
      console.log("equation: ", equation, root);
      console.log("root");
      this.setEquationToState(equation);
    }
    // return equation;
  };
  setEquationToState = (equation) => {
    console.log("this.state: ", this.state.equationSolution);
    this.setState(
      {
        equationSolution1: equation,
      },
      () => {
        console.log("root2: ", this.state.equationSolution1, equation);
        const newEquation = [...this.state.equationSolution1];
        this.setState({ equationSolution: newEquation });
      }
    );
  };
  findService = (serviceId) => {
    const id = serviceId.replace("***", "");
    return this.state.formula.find((item) => item.id === id);
  };

  handleUserInput = (e, id, idx) => {
    console.log("id: ", id, "idx: ", idx);
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

  renderCaculation = (form, idx, i) => {
    return (
      <>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            backgroundColor: "gray",
            marginBottom: "10px",
          }}
        >
          <div style={{ display: "flex", justifyContent: "start" }}>
            <h2>{form.name}</h2> = <h3>{form.formula}</h3>
          </div>
          <span>{this.state.equation[idx]}</span>
        </div>
        {form.dependsOn.map((item, fIdx) => {
          const dependsOnLength = item.dependsOn?.length || 0;
          if (dependsOnLength) {
            return this.renderCaculation(item, fIdx, i + 1);
          } else if (item.value === null) {
            return (
              <>
                <span key={fIdx}>{item.name}</span>
                <input
                  type="number"
                  onChange={(e) => this.handleUserInput(e, item.id, idx)}
                />
              </>
            );
          } else {
            return (
              <>
                <span>{item.name}</span> = <span>{item.value}</span>
              </>
            );
          }
        })}
      </>
    );
  };

  render() {
    return (
      <div>
        <span onClick={() => this.props.history.goBack()}>GO BACK</span>
        <h1>Caculate</h1>
        <select onChange={this.handleCaculateSelection}>
          <option>select</option>
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
                {/* <div
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
                })} */}
                {this.renderCaculation(item, idx, 1)}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
