/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import "./tree.css";
export default class Tree extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formula: [],
    };
  }

  renderTree = (formulas) => {
    for (let j = 0; j < formulas.length; j++) {
      let formula = formulas[j];
      if (formula.children) {
        return (
          <ul>
            <li onClick={() => this.props.handleDefineNewFormula(formula.id)}>
              <a href="#">{formula.name}</a>
              {this.renderTree(formula.children)}
            </li>
          </ul>
        );
      } else {
        return (
          <li onClick={() => this.props.handleDefineNewFormula(formula.id)}>
            <a href="#">{formula.name}</a>
          </li>
        );
      }
    }
  };

  render() {
    return (
      <div className="tree">
        {/* {this.renderTree(this.state.formula)} */}
        <ul>
          <li>
            <a href="#">
              {this.props.formula.name}{" "}
              {this.props.formula.root && (
                <span
                  onClick={(e) => this.props.addNewChildren(e, "calculation")}
                >
                  Add New
                </span>
              )}
            </a>
            {this.props.formula.children ? (
              <ul>
                {this.props.formula.children.map((formula) => {
                  return (
                    <li
                      onClick={() => this.props.handleDefineNewFormula(formula)}
                    >
                      {formula.children ? (
                        <Tree formula={formula} {...this.props} />
                      ) : (
                        <a href="#">
                          {/* <a href="#">{formula.name}</a> */}
                          <input
                            value={formula.name}
                            onChange={(e) =>
                              this.props.handleTitleChange(e, formula.id)
                            }
                          />
                          <span
                            onClick={() => this.props.handleSelectNode(formula)}
                          >
                            {formula.type === "calculation"
                              ? "Define Formula"
                              : ""}
                          </span>
                        </a>
                      )}
                    </li>
                  );
                })}
              </ul>
            ) : null}
          </li>
        </ul>
      </div>
    );
  }
}

/**
 formula: {
        id: 1,
        name: "Formula 1",
        type: "calculation",
        children: [
          {
            id: 2,
            name: "Formula 2",
            children: [
              {
                id: 3,
                name: "Formula 3",
                children: [
                  {
                    id: 4,
                    name: "Formula 4",
                  },
                ],
              },
              {
                id: 5,
                name: "Formula 5",
              },
            ],
          },
          {
            id: 21,
            name: "Formula 21",
            children: [
              {
                id: 41,
                name: "Formula 41",
              },
            ],
          },
        ],
      },
 */

/**
       * 
       * <input
                          value={formula.name}
                          onChange={(e) =>
                            this.props.handleTitleChange(e, formula.id)
                          }
                        />
       */
