import React, {Component} from "react";
import {Router, Route, Link, browserHistory, hashHistory, IndexRoute} from "react-router";


class ProjectList extends Component {
  constructor(props) {
    super(props);
  };

  componentDidMount() {
    // console.log("data passed? ", this.props.temp);
    console.log("in ProjectList ----");
    this.props.fetchOngoingProjects();
    // console.log("data passed? ", this.props.data);

  }

  render() {
    console.log("data passed? (in render)", this.props.data);
    let data = this.props.data;
    let array = data;
    if (array) {
      var projects = array.map((project) => (
        <Link to={"/record/project/" + project.id} query={{title: project.title, onDay: project.onDay}}><li>{"프로젝트" + " " + project.title}</li></Link>
      ));
    }

    return (
      <div>
        <ul>
          {projects}
        </ul>
      </div>


    );
  };
}

export default ProjectList;
