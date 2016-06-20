import React, {Component} from "react";
import Navigation from "./Navigation";

class ProjectList extends Component {
  constructor(props) {
    super(props);
  };

  componentDidMount() {
    this.props.reset();
    this.props.fetchOngoingProjects(1);
  }

  render() {
    console.log("data passed? (in render)", this.props.list);
    let list = this.props.data.list;
    let array = list;

    let validateCallback = (project) => {
      if (!project.doneToday) {
        this.props._save({title: project.title, onDay: project.onDay});
        this.props.goto("/record/project/" + project.id);
      } else {
        alert("This project is already done today");
      }
    };

    let validator = (doneToday) => {
      this.props.validateAll(validateCallback, doneToday);
    };

    if (array) {
      var projects = array.map((project) => (
        <li onClick={validator.bind(null, project)}>{project.title + " on day " + project.onDay}</li>
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
