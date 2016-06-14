import React, {Component} from "react";
import {Router, Route, Link, browserHistory, hashHistory, IndexRoute} from "react-router";


class ProjectList extends Component {
  constructor(props) {
    super(props);
  };

  render() {
    let array = [1,2,3];
    let projects = array.map((project) => (
      <Link to={"/record/project/" + project}><li>{"프로젝트" + " " + project}</li></Link>
    ));
    return (
      <div>
        <ul>
          {projects}
        </ul>
        {this.props.children}
      </div>


    );
  };
}

export default ProjectList;
