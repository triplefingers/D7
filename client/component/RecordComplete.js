import React, {Component} from "react";
import {Router, Route, Link, browserHistory, hashHistory, IndexRoute} from "react-router";

class RecordComplete extends Component {
  constructor(props) {
    super(props);
  };
  render() {
    return (
      <div>
        <h1>Save Complete!</h1>
        <button onClick={this.props.goto.bind(null, "/history/projects")}>View History</button>
        <button onClick={this.props.goto.bind(null, "/")}>Home</button>
      </div>
    );
  }
}

export default RecordComplete;
