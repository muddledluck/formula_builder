import React, { Component } from "react";

export default class NewMaterial extends Component {
  constructor(props) {
    super(props);
    this.state = {
      variation: [],
      material: [],
      units: ["sqrt", "m", "feet", "ton", "kg"],
    };
  }

  componentDidMount = () => {
    const newMaterial = {
      name: "",
      id: Date.now() + Math.floor(Math.random() * 100000),
    };
    this.setState({
      material: [newMaterial],
      variation: [
        {
          name: "",
          unit: "",
          cost: "",
          material_id: newMaterial.id,
        },
      ],
    });
  };

  handleMaterialChange = (e) => {
    
  }
  render() {
    return (
      <div>
        <div>
          <h6>Add Materail</h6>
          <form>
            {this.state.variation.map((varia, idx) => {
              return (
                <>
                  <div>
                    Name{" "}
                    <input type="text" value={this.state.material[idx].name} name="material"/>
                  </div>
                  ;
                  <div>
                    Varient: <input type="text" />
                    Unit:{" "}
                    <select>
                      <option />
                      {this.state.units.map((unit) => (
                        <option>{unit}</option>
                      ))}
                    </select>
                    cost: <input type="text" />
                    <span style={{ marginLeft: "100px" }}>Add</span>
                  </div>
                </>
              );
            })}
          </form>
        </div>
      </div>
    );
  }
}
