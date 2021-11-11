import React, { Component } from "react";
import { nanoid } from "nanoid";
import "./material.css";
import { validateArthmaticString } from "../utils/validator";
export default class AddMaterial extends Component {
  constructor(props) {
    super(props);
    this.state = {
      materails: [
        {
          id: nanoid(),
          name: "m1",
          value: 10,
        },
        {
          id: nanoid(),
          name: "m2",
          value: 32,
        },
      ],
      services: [],
      formulas: [],
      estimation: [],
      userInput: [
        {
          id: nanoid(),
          name: "u1",
          value: null,
        },
        {
          id: nanoid(),
          name: "u2",
          value: null,
        },
      ],
      newUserInput: "",
      newMaterial: {
        id: null,
        name: "",
        value: "",
        tempFormula: "",
      },
      newService: {
        id: null,
        name: "",
        value: "",
        formula: "",
        dependsOn: [],
      },

      serviceValue: [],
      serviceTempArray: [],
      tempServiceToShow: "",
      error: false,
    };
  }

  handleAddnewVlaue = (e) => {
    e.preventDefault();
    this.setState({ serviceTempArray: [...this.state.serviceTempArray, 0] });
  };

  handleServiceTitleChange = (e) => {
    const newService = { ...this.state.newService };
    newService.name = e.target.value;
    this.setState({ newService });
  };

  handleUserInputChange = (e) => {
    console.log(e.target.value);
    this.setState({ newUserInput: e.target.value });
  };

  handleUserInputAdd = (e) => {
    e.preventDefault();
    this.setState({
      userInput: [
        ...this.state.userInput,
        {
          id: nanoid(),
          name: this.state.newUserInput,
          value: null,
        },
      ],
      newUserInput: "",
    });
  };

  handleMaterailChange = (e) => {
    const newMaterial = { ...this.state.newMaterial };
    newMaterial[e.target.name] = e.target.value;
    this.setState({ newMaterial });
  };

  handleMaterailAdd = (e) => {
    e.preventDefault();
    if (!this.state.newMaterial.name) {
      return;
    }
    const id = nanoid();
    const newMaterial = { ...this.state.newMaterial };
    newMaterial.id = id;
    const materails = [...this.state.materails, newMaterial];
    console.log("materails: ", materails);
    this.setState({ materails, newMaterial: {} });
  };

  handleServiceChange = (e, idx) => {
    console.log("e: ", e.target.value, idx);
    const newServiceValue = [...this.state.serviceValue];
    if (newServiceValue.length <= idx) {
      newServiceValue.push(e.target.value);
    } else {
      newServiceValue[idx] = e.target.value;
    }
    this.setState({ serviceValue: newServiceValue }, () => {
      const tempServiceToShow = this.handleGenerateFormula();
      this.setState({ tempServiceToShow: tempServiceToShow.tempFormula });
    });
  };

  handleServiceToShow = (serviceType, idx) => {
    switch (serviceType) {
      case "materail":
        return (
          <select onChange={(e) => this.handleServiceChange(e, idx)}>
            {this.state.materails.map((materail) => {
              return (
                <option value={"@@@" + materail.id} key={materail.id}>
                  {materail.name} ={materail.value}
                </option>
              );
            })}
          </select>
        );
      case "userInput":
        return (
          <select onChange={(e) => this.handleServiceChange(e, idx)}>
            {this.state.userInput.map((user) => {
              return (
                <option value={"###" + user.id} key={user.id}>
                  {user.name} ={user.value}
                </option>
              );
            })}
          </select>
        );
      case "arthmatic":
        return (
          <select onChange={(e) => this.handleServiceChange(e, idx)}>
            {["+", "-", "/", "*"].map((opertaion) => {
              return <option value={opertaion}>{opertaion}</option>;
            })}
          </select>
        );
      case "number":
        return (
          <input
            type="number"
            placeholder="number"
            onChange={(e) => this.handleServiceChange(e, idx)}
          />
        );
      case "breaket":
        return (
          <select onChange={(e) => this.handleServiceChange(e, idx)}>
            {["(", ")"].map((breaket) => {
              return <option value={breaket}>{breaket}</option>;
            })}
          </select>
        );
      case "service":
        return (
          <select onChange={(e) => this.handleServiceChange(e, idx)}>
            {this.state.services.map((service) => {
              return (
                <option value={"***" + service.id}>
                  {service.name} = {service.formula}
                </option>
              );
            })}
          </select>
        );
      default:
        return "";
    }
  };

  handleGenerateFormula = (e) => {
    if (e) {
      e.preventDefault();
    }
    const { serviceValue } = this.state;
    if (serviceValue.length) {
      let formula = "";
      let tempFormula = "";
      const dependsOn = [];
      for (let i = 0; i < serviceValue.length; i++) {
        console.log("value: ", serviceValue[i]);
        if (serviceValue[i].startsWith("@@@")) {
          const val = serviceValue[i].replace("@@@", "");
          const elem = this.state.materails.filter((mat) => {
            return mat.id === val;
          })[0];
          formula += serviceValue[i];
          tempFormula += elem.name;
          dependsOn.push({
            name: elem.name,
            type: "materails",
            value: elem.value,
          });
        } else if (serviceValue[i].startsWith("###")) {
          const val = serviceValue[i].replace("###", "");
          const elem = this.state.userInput.filter((mat) => {
            return mat.id === val;
          })[0];
          formula += serviceValue[i];
          tempFormula += elem.name;
          dependsOn.push({
            name: elem.name,
            type: "userInput",
            value: elem.value,
          });
        } else if (serviceValue[i].startsWith("***")) {
          const val = serviceValue[i].replace("***", "");
          const elem = this.state.services.filter((mat) => {
            return mat.id === val;
          })[0];
          formula += serviceValue[i];
          tempFormula += elem.name;
          dependsOn.push({
            name: elem.name,
            type: "services",
            value: elem.value,
            formula: elem.formula,
            dependsOn: elem.dependsOn,
          });
        } else {
          formula += serviceValue[i];
          tempFormula += serviceValue[i];
        }
      }
      let isValid = validateArthmaticString(tempFormula);
      if (e && isValid.validate) {
        const newService = { ...this.state.newService };
        newService.id = nanoid();
        newService.value = formula;
        newService.formula = tempFormula;
        newService.dependsOn = dependsOn;
        this.setState({
          services: [...this.state.services, newService],
          newService: {
            id: null,
            name: "",
            value: "",
            formula: "",
            dependsOn: [],
          },
          serviceTempArray: [],
          serviceValue: [],
          tempServiceToShow: "",
        });
      }
      console.log(isValid, tempFormula);
      if (!isValid.validate) {
        this.setState({ error: true });
      } else {
        this.setState({ error: false });
      }

      return { formula, tempFormula };
    }
    return "";
  };

  render() {
    return (
      <div>
        {/* Add Materail Sumulation */}
        <div>
          <h4>Materails</h4>
          <div>
            <div className="input-fildes">
              <input
                className="fileds"
                type="text"
                placeholder="title"
                name="name"
                onChange={this.handleMaterailChange}
                value={this.state.newMaterial.name}
              />
              <input
                className="fileds"
                type="text"
                placeholder="value"
                name="value"
                onChange={this.handleMaterailChange}
                value={this.state.newMaterial.value}
              />
              <button className="fileds" onClick={this.handleMaterailAdd}>
                Add
              </button>
            </div>
            <div>
              <h5>All Materails</h5>
              <select>
                {this.state.materails.map((materail) => {
                  return (
                    <option value={materail.id} key={materail.id}>
                      {materail.name} ={materail.value}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
        </div>
        {/* Add User input Sumulation */}
        <div>
          <h4>User Input</h4>
          <div>
            <div className="input-fildes">
              <input
                className="fileds"
                type="text"
                placeholder="title"
                name="name"
                onChange={this.handleUserInputChange}
                value={this.state.newUserInput}
              />
              <button className="fileds" onClick={this.handleUserInputAdd}>
                Add
              </button>
            </div>
            <div>
              <h5>All UserInput</h5>
              <select>
                {this.state.userInput.map((materail) => {
                  return (
                    <option value={materail.id} key={materail.id}>
                      {materail.name}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
        </div>

        {/* Add new Service */}
        <div>
          <h4>Service</h4>
          <div>
            {/* <select
              onChange={(e) => this.setState({ serviceType: e.target.value })}
            >
              <option value="materail">materail</option>
              <option value="userInput">userInput</option>
              <option value="arthmatic">arthmatic</option>
              <option value="number">number</option>
              <option value="breaket">breaket</option>
            </select> */}
            <input
              type="text"
              placeholder="title"
              onChange={this.handleServiceTitleChange}
              value={this.state.newService.name}
            />
            {/* place option to add value admin can add service useing userInput and materails */}
            {this.state.serviceTempArray.map((_service, idx) => {
              return (
                <>
                  {this.handleServiceToShow(
                    this.state.serviceTempArray[idx],
                    idx
                  )}
                  <select
                    onChange={(e) => {
                      const newServ = [...this.state.serviceTempArray];
                      newServ[idx] = e.target.value;
                      this.setState({ serviceTempArray: newServ });
                    }}
                  >
                    <option value="materail">materail</option>
                    <option value="userInput">userInput</option>
                    <option value="arthmatic">arthmatic</option>
                    <option value="number">number</option>
                    <option value="breaket">breaket</option>
                    <option value="service">service</option>
                  </select>
                </>
              );
            })}
            <button onClick={this.handleAddnewVlaue}>Add new value</button>
          </div>
          <button
            onClick={this.handleGenerateFormula}
            disabled={this.state.error}
          >
            Add Service
          </button>
          {this.state.error ? "Error in formula" : "Everything fine"}
          <h6>{this.state.tempServiceToShow}</h6>

          <div>
            <h5>All Services</h5>
            <select>
              {this.state.services.map((serv) => {
                return (
                  <option value={serv.value} key={serv.id}>
                    {serv.name} = {serv.formula}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
      </div>
    );
  }
}
