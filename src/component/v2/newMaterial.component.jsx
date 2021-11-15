import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class NewMaterial extends Component {
  constructor(props) {
    super(props);
    this.state = {
      variation: [],
      material: [],
      selectedVarient: [],
      units: ["sqrt", "m", "feet", "ton", "kg"],
      newMaterialTitle: "",
      newMaterialVarient: [{ name: "", unit: "", cost: "" }],
    };
  }

  componentDidMount = () => {
    // const newMaterial = {
    //   name: "",
    //   id: Date.now() + Math.floor(Math.random() * 100000),
    // };
    this.setState({
      material: [
        {
          name: "",
          id: 1636975762915,
        },
        {
          name: "test",
          id: 1636975734369,
        },
        {
          name: "material 2",
          id: 1636975789368,
        },
      ],
      variation: [
        {
          name: "",
          unit: "",
          cost: "",
          materialId: 1636975762915,
        },
        {
          name: "m1",
          unit: "sqrt",
          cost: "154555",
          materialId: 1636975734369,
        },
        {
          name: "m12",
          unit: "m",
          cost: "154555432",
          materialId: 1636975789368,
        },
        {
          name: "m13",
          unit: "feet",
          cost: "456",
          materialId: 1636975789368,
        },
        {
          name: "m14",
          unit: "ton",
          cost: "78",
          materialId: 1636975789368,
        },
        {
          name: "m15",
          unit: "sqrt",
          cost: "7895",
          materialId: 1636975789368,
        },
      ],
    });
  };

  findAllVariationByMaterialID = (materialId) => {
    console.log("materailId: ", materialId);
    const variationList = this.state.variation.filter((variation) => {
      console.log(variation, materialId, variation.materialId === materialId);
      return variation.materialId.toString() === materialId.toString();
    });
    return variationList;
  };

  handleAddMaterial = (e) => {
    e.preventDefault();
    const newMaterial = {
      name: this.state.newMaterialTitle,
      id: Date.now() + Math.floor(Math.random() * 100000),
    };
    const newVariation = [...this.state.newMaterialVarient].map((variation) => {
      variation.materialId = newMaterial.id;
      return variation;
    });
    this.setState({
      material: [...this.state.material, newMaterial],
      variation: [...this.state.variation, ...newVariation],
      newMaterialTitle: "",
      newMaterialVarient: [{ name: "", unit: "", cost: "" }],
    });
  };

  handleMaterialChange = (e) => {
    const { value } = e.target;
    this.setState({ newMaterialTitle: value });
  };
  handleMaterialVariantChange = (idx) => (e) => {
    const { value, name } = e.target;
    const newMaterialVarient = [...this.state.newMaterialVarient];
    newMaterialVarient[idx][name] = value;
    this.setState({ newMaterialVarient });
  };

  handleAddNewVarient = () => {
    const newMaterialVarient = [
      ...this.state.newMaterialVarient,
      { name: "", unit: "", cost: "" },
    ];
    this.setState({ newMaterialVarient });
  };

  handleRemoveNewVarient = (idx) => {
    const newMaterialVarient = [...this.state.newMaterialVarient];
    newMaterialVarient.splice(idx, 1);
    this.setState({ newMaterialVarient });
  };

  handleMaterialSelect = (e) => {
    const { value } = e.target;
    console.log("value", value);
    const variationList = this.findAllVariationByMaterialID(value);
    this.setState({ selectedVarient: variationList });
  };

  render() {
    return (
      <div>
        <div>
          <h6>Add Materail</h6>
          <form>
            <div>
              Name{" "}
              <input
                type="text"
                value={this.state.newMaterialTitle}
                name="material"
                onChange={this.handleMaterialChange}
              />
              {"  "}
              <button onClick={this.handleAddMaterial}>Add New Materail</button>
            </div>
            {this.state.newMaterialVarient.map((varia, idx) => {
              return (
                <React.Fragment key={idx}>
                  <div>
                    Varient:{" "}
                    <input
                      type="text"
                      name="name"
                      onChange={this.handleMaterialVariantChange(idx)}
                    />{" "}
                    Unit:{" "}
                    <select
                      name="unit"
                      onChange={this.handleMaterialVariantChange(idx)}
                    >
                      <option />
                      {this.state.units.map((unit, idx) => (
                        <option key={idx}>{unit}</option>
                      ))}
                    </select>{" "}
                    Cost:{" "}
                    <input
                      type="text"
                      name="cost"
                      onChange={this.handleMaterialVariantChange(idx)}
                    />
                    {idx === this.state.newMaterialVarient.length - 1 ? (
                      <span
                        style={{ marginLeft: "100px" }}
                        onClick={this.handleAddNewVarient}
                      >
                        Add
                      </span>
                    ) : (
                      <span
                        style={{ marginLeft: "100px" }}
                        onClick={this.handleRemoveNewVarient}
                      >
                        Remove
                      </span>
                    )}
                  </div>
                </React.Fragment>
              );
            })}
          </form>
        </div>
        <div>
          <h6>View Material</h6>
          <select onChange={this.handleMaterialSelect}>
            {this.state.material.map((material, idx) => {
              return (
                <option key={idx} value={material.id}>
                  {material.name}
                </option>
              );
            })}
          </select>
          <br />
          <br />
          {this.state.selectedVarient.map((variation, idx) => {
            return (
              <div key={idx}>
                <span>{variation.name}</span> <span>{variation.cost}</span>{" "}
                <span>{variation.unit}</span>{" "}
              </div>
            );
          })}
        </div>
        <Link
          to={{
            pathname: "/new-serivce",
            state: {
              variation: this.state.variation,
              material: this.state.material,
            },
          }}
        >
          <h3>Create Service</h3>
        </Link>
      </div>
    );
  }
}
