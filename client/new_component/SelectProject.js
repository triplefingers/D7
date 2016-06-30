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
    let projects;

    projects = onGoingProjects.map((project) => {
      return <SelectBox _save={this.props._save} project={project} />
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
        <ActionBar saveDayDetail={this.props.saveDayDetail} goto={this.props.goto} project={this.props.data.selectedProject} data={this.props.data}/>
      </div>

    );
  }
}

export default SelectProject;