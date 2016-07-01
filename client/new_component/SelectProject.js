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
    const onGoingProjects = this.props.data.onGoing;
    let projects, createNewProject;

    if (onGoingProjects) {
      projects = onGoingProjects.map((project) => {
        return (
          <SelectBox _save={this.props._save} project={project} />
          );
      })
    }

    if (!this.props.data.leaveHistoryClicked) {
      createNewProject = (
        <div>
          <h2>Create New Project</h2>
          <button onClick={()=>this.props.goto("/create")}>+</button>
        </div>
      );
    }

    let nextUrl = undefined;

    if (this.props.data.creatingProjectFirst) {
      nextUrl = "/write"
    } else if (this.props.data.leaveHistoryClicked) {
      nextUrl = "/write"

    }

    return (
      <div>
        <div>
          <h2>Select Your Project</h2>
          <form>
            {projects}
          </form>
        </div>
        {createNewProject}
        <ActionBar saveDayDetail={this.props.saveDayDetail} goto={this.props.goto} project={this.props.data.selectedProject} data={this.props.data} nextUrl={nextUrl} />
      </div>

    );
  }
}

export default SelectProject;