import React, {Component} from "react";
import ActionBar from "../subcomponents/ActionBar";
import SelectBox from "../subcomponents/SelectBox";

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
          <div className="radio">
            <SelectBox _save={this.props._save} project={project} />
          </div>
          );
      })
    }

    if (!this.props.data.leaveHistoryClicked) {
      createNewProject = (
        <div>
          <h2>Create New Project</h2>
          <img id="CreateNewProject" width="100" heigh="100" src="http://www.clker.com/cliparts/A/P/L/b/V/G/blue-plus-sign-md.png"
               onClick={() => {this.props.goto("/create"); this.props._save({creatingProjectLast: true});}} />
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
      <div className="SelectProject">
        <h2>Select Your Project</h2>

        <form className="form">
          {projects}
        </form>

        {createNewProject}
        <ActionBar navAlert={this.props.navAlert} saveDayDetail={this.props.saveDayDetail} goto={this.props.goto} project={this.props.data.selectedProject} data={this.props.data} nextUrl={nextUrl} validateAll={this.props.validateAll}/>
      </div>

    );
  }
}

export default SelectProject;
