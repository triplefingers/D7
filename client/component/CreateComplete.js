import React, {Component} from "react";
import {Router, Route, Link, browserHistory, hashHistory, IndexRoute} from "react-router";


class CreateComplete extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  };

  render() {
    return (
      <div>
        <h1>Complete</h1>
        <button onClick={this.props.goto.bind(this, "/myProject")}>Leave History (not working)</button>
        <button onClick={this.props.goto.bind(this, "/")}>to Main</button>
      </div>
    )
  }
}

export default CreateComplete;
