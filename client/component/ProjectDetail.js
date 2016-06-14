import React, {Component} from "react";
import {Router, Route, Link, browserHistory, hashHistory, IndexRoute} from "react-router";

class ProjectDetail extends Component {
  constructor(props) {
    super(props);
  };
  render() {
    return (
      <div>
        this.props.title is {this.props.title}<br/>
        this.props.params.id is {this.props.params.id}
        <h1>Project Detail</h1>
        <button onClick={this.props.changetitle}>자라나라버튼버튼</button><br/>
        <button>Cancel</button>
        <button onClick={this.props.save.bind(this, "/record/complete")}>Save</button>
      </div>
    )
  }
}

export default ProjectDetail
