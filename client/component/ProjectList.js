import React, {Component} from "react";
import {Router, Route, Link, browserHistory, hashHistory, IndexRoute} from "react-router";


class ProjectList extends Component {
  constructor(props) {
    super(props);
  };

  componentDidMount() {
    this.props.fetchOngoingProjects();
  }

  render() {
    console.log("data passed? (in render)", this.props.data);
    let data = this.props.state.data;
    let array = data;
    if (array) {
      var projects = array.map((project) => (
        <li onClick={() => {this.props._save({title: project.title, onDay: project.onDay}); this.props.goto("/record/project/" + project.id)}}>{"프로젝트" + " " + project.title}</li>
        // <Link to={"/record/project/" + project.id} query={{title: project.title, onDay: project.onDay}}><li>{"프로젝트" + " " + project.title}</li></Link>
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
