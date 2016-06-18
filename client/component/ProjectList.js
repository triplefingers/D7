import React, {Component} from "react";
import Navigation from "./Navigation";

class ProjectList extends Component {
  constructor(props) {
    super(props);
  };

  componentDidMount() {
    this.props.reset();
    this.props.fetchOngoingProjects();
  }

  render() {
    console.log("data passed? (in render)", this.props.list);
    let list = this.props.data.list;
    let array = list;

    if (array) {
      var projects = array.map((project) => (
        <li onClick={() => {this.props._save({title: project.title, onDay: project.onDay}); this.props.goto("/record/project/" + project.id);}}>{project.title + " on day " + project.onDay}</li>
      ));
    }

    return (
      <div>
        <Navigation title="Leave History"/>
        <ul>
          {projects}
        </ul>
      </div>
    );
  };
}

export default ProjectList;
