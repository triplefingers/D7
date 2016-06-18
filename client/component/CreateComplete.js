import React, {Component} from "react";
import {Router, Route, Link, browserHistory, hashHistory, IndexRoute} from "react-router";


class CreateComplete extends Component {
  constructor(props) {
    super(props);
  };

  render() {
    let toHistoryButton;
    if (this.props.data.onDay) {
      toHistoryButton  = <button onClick={this.props.goto.bind(this, "/record/project/" + this.props.data.id)}>Leave History</button>;
    }
    return (
      <div>
        <h1>Save Complete!</h1>
        {toHistoryButton}
        <button onClick={this.props.goto.bind(this, "/")}>Home</button>
      </div>
    );
  }
}

export default CreateComplete;
