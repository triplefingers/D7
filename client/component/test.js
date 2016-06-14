import React, {Component} from "react";
import {Link} from "react-router";

class Test extends Component {
  constructor(props) {
    super(props);
  };
  render() {
    return (
      <div>
        {this.props.title}
        <h1>in test</h1>
      </div>
    )

  }
}

export default Test
