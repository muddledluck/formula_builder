import React, { Component } from "react";

export default class NewSerice extends Component {
  constructor(props) {
    super(props);
    this.state = {
      material: [],
      variation: [],
    };
  }
  componentDidMount() {
    const { variation, material } = this.props.location.state;
    console.log("variaiotn", variation, material);
  }
  render() {
    return <div>Serivce</div>;
  }
}
