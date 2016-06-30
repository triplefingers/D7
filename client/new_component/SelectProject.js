import React, {Component} from "react";
import ActionBar from "./ActionBar";
import SelectBox from "./SelectBox";

class SelectProject extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    this.props.fetchOngoingProjects();
  }

  render() {
    const onGoingProjects = this.props.data.list;
    let projects;

    projects = onGoingProjects.map((project) => {
      return <SelectBox title={this.props.data.selectedProject} handleChange={this.props.handleChange} project={project} />
    })

    return (
      <div>
        <div>
          <h2>Select Your Project</h2>
          <form>
            {projects}
          </form>
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