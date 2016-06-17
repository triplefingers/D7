import React, {Component} from "react";
import {Router, Route, Link, browserHistory, hashHistory, IndexRoute} from "react-router";

class RecordComplete extends Component {
  constructor(props) {
    super(props);
  };
  render() {
    return (
      <div>
        <h1>Complete</h1>
        <button onClick={this.props.goto.bind(null, "/history/projects")}>to History</button>
        <button onClick={this.props.goto.bind(null, "/")}>to Main</button>
      </div>
    );
  }
}

export default RecordComplete;
