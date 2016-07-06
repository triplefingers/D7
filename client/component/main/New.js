import React, {Component} from "react";
import ActionBar from "../subcomponents/ActionBar";

class New extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  clickNewProject() {
    this.props.goto("/create"); this.props._save({creatingProjectFirst: true});
  }

  clickLeaveHistory() {
    this.props.goto("/select"); this.props._save({leaveHistoryClicked: true});
  }


  render() {

    return (
      <div>
        <button className="btn btn-lg btn-primary btn-block" onClick={this.clickNewProject}>Create New Project</button>
        <button className="btn btn-lg btn-primary btn-block" onClick={this.clickLeaveHistory}>Leave History</button>
      </div>
    );
  }
}

export default New;
