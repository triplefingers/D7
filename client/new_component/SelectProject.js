import React, {Component} from "react";
import ActionBar from "./ActionBar";

class SelectProject extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    this.props.fetchOngoingProjects();
    const onGoingProjects = this.props.data.list;
  }

  render() {

    const projects = onGoingProjects.map((project) => {
      <SelectBox data={project} />
    })

    return (
      <div>
        <div>
          <h2>Select Your Project</h2>
          {projects}
        </div>
        <div>
          <h2>Create New Project</h2>
          <button>+</button>
        </div>
        <ActionBar />
      </div>

    );
  }
}

export default SelectProject;