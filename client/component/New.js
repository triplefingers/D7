import React, {Component} from "react";
import ActionBar from "./ActionBar";

class New extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {

  }

  render() {

    return (
      <div>
        <button onClick={() => {this.props.goto("/create"); this.props._save({creatingProjectFirst: true})}}>Create New Project</button>
        <br /><br /><br /><br /><br /><br />
        <button onClick={() => {this.props.goto("/select"); this.props._save({leaveHistoryClicked: true})}}>Leave History</button>
      </div>
    );
  }
}

export default New;