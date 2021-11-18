import React, { Component } from "react";
import Tree from "./tree";
import Popup from "../popup/popup";
export default class NewSerice extends Component {
  constructor(props) {
    super(props);
    this.state = {
      material: [],
      variation: [],
      formula: {
        id: 1,
        name: "Formula 1",
        type: "calculation",
        root: true,
      },
      definingNode: {
        id: null,
        formula: "",
        dependsOn: "",
        name: "",
        type: "",
      },
      selectedNode: null, // selected node for defination,
      definingNodeService: "",
    };
  }
  componentDidMount() {
    if (!this.props.location.state) {
      this.props.history.push("/");
      return;
    }
    const { variation, material } = this.props.location.state;
    console.log("variaiotn", variation, material);
    this.setState({ variation, material });
  }

  handleAddNewChild(tree, parent, arrival, lookup, newChild) {
    // if parent id is equal to the lookup(node which we are finding) then insert newChild into parent child
    if (parent.id === lookup) {
      if (parent.children) {
        parent.children.push(newChild);
      } else {
        const newChildren = [newChild];
        parent.children = newChildren;
      }
      this.setState({ formula: tree });
    }
    const children = parent.children || [];
    for (let i = 0; i < children.length; i++) {
      if (children[i].id !== arrival) {
        this.handleAddNewChild(tree, children[i], parent, lookup, newChild);
      }
    }
  }

  onAddElement = (e, type, lookupId = this.state.formula.id) => {
    /**
     * @e - event
     * @type - type of node (one of [constant, variable, calculation])
     * @lookupId - id of the node which we are finding
     */
    e.preventDefault();
    const newChild = {
      id: Date.now() * Math.floor(Math.random() * 10000),
      name: "",
      type,
      formula: "",
    };
    this.handleAddNewChild(
      this.state.formula,
      this.state.formula,
      this.state.formula.id,
      lookupId,
      newChild
    );
  };

  findBlockInTree = (tree, parent, arrival, lookup) => {
    /**
     * @tree - tree to search in
     * @parent - parent of the tree
     * @arrival - node which we are already visited
     * @lookup - node which we are looking for
     */
    if (parent.id === lookup) {
      return parent;
    }
    const children = parent.children || [];
    let result;
    for (let i = 0; i < children.length; i++) {
      if (result) {
        return result;
      }
      if (children[i].id !== arrival) {
        result = this.findBlockInTree(tree, children[i], parent, lookup);
      }
    }
    return result;
  };

  handleDefineNewFormula = (formula) => {
    this.setState({});
  };

  handleTitleChange = (
    e,
    id,
    parent = this.state.formula,
    arrival = this.state.formula.id,
    tree = this.state.formula
  ) => {
    if (parent.id === id) {
      parent.name = e.target.value;
      this.setState({ formula: tree });
    }
    const children = parent.children || [];
    for (let i = 0; i < children.length; i++) {
      if (children[i].id !== arrival) {
        this.handleTitleChange(e, id, children[i], parent, tree);
      }
    }
  };

  handleSelectNode = (node) => {
    this.setState({ selectedNode: node });
  };

  handleDeselectNode = () => {
    this.setState({ selectedNode: null });
  };

  popupDefineNode = () => {
    const { selectedNode, definingNode } = this.state;
    return (
      <Popup
        handleClose={this.handleDeselectNode}
        content={
          <div>
            <h1>Define {selectedNode.name}</h1>
            <div>
              <label htmlFor="formula-input">Formula</label>
              <input id="formula-input" value={definingNode.formula} />
            </div>
            <div>
              <label htmlFor="service-input">Depends on</label>

              <input
                id="service-input"
                onChange={(e) => {
                  this.setState({ definingNodeService: e.target.value });
                }}
              />
              <label
                htmlFor="service-input"
                onClick={() =>
                  this.handleUpdateNewFormula(this.state.definingNodeService)
                }
              >
                Add
              </label>
            </div>
            <button onClick={this.handleAddFormula}>Add Formula</button>
          </div>
        }
      />
    );
  };

  handleAddFormula = (e) => {
    e.preventDefault();
    console.log("definingNode", this.state.definingNode);
  };

  handleUpdateNewFormula = (value) => {
    const definingNode = { ...this.state.definingNode };
    definingNode.formula = definingNode.formula + value;
    console.log("value: ", value, definingNode);
    this.setState({ definingNode });
  };

  handleServiceToShow = (serviceType, idx) => {
    switch (serviceType) {
      case "materail":
        return (
          <select onChange={(e) => this.handleServiceChange(e, idx)}>
            <option>Select</option>
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
              <option>Select</option>;
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
            <option>Select</option>
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
            <option>Select</option>
            {["(", ")"].map((breaket) => {
              return <option value={breaket}>{breaket}</option>;
            })}
          </select>
        );
      case "service":
        return (
          <select onChange={(e) => this.handleServiceChange(e, idx)}>
            <option>Select</option>
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

  render() {
    return (
      <div>
        {this.state.selectedNode && this.popupDefineNode()}
        <h1>New Formula</h1>
        <Tree
          formula={this.state.formula}
          addNewChildren={this.onAddElement}
          handleTitleChange={this.handleTitleChange}
          handleDefineNewFormula={this.handleDefineNewFormula}
          handleSelectNode={this.handleSelectNode}
        />
        {/* <div>
          <button onClick={this.onAddElement}>Add Element</button>
        </div> */}
      </div>
    );
  }
}
