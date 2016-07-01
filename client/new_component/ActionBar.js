import React, {Component} from "react";

class ActionBar extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {

  }

  render() {

    if (this.props.project) {
      var data = this.props.project;
      var userProjectId = data.id;
      var onDay = data.onDay;
      var text = this.props.data.text;

      if (window.publicIds) {
        var publicIds = window.publicIds;
      } else {
        publicIds = [];
      }
    } else if (this.props.callback) {
      var data = this.props.callback.data;
      var userProjectId = data.selectedProject.id;
      var onDay = data.selectedProject.onDay;
      var text = data.text;

      if (window.publicIds) {
        var publicIds = window.publicIds;
      } else {
        publicIds = [];
      }
    }

    let rightButton;

    // If parent passes nextUrl props
    // onClick 할때 이동하는 url 을 props 로 받음
    // url이 넘어오지 않는다면 항상 SAVE -> / 로 이동

    if ((this.props.data && (!this.props.data.leaveHistoryClicked)) ||
      ((this.props.callback) && this.props.callback.data.leaveHistoryInProgress)) {

      rightButton = <button onClick={() => this.props.saveDayDetail(1, 1, onDay, text, publicIds)}>Save</button>

      if (this.props.callback) {
        rightButton = <button onClick={() => this.props.callback.saveDayDetail(undefined, userProjectId, onDay, text, publicIds)}>Save</button>
      }

    } else {
      rightButton = <button onClick={()=>{this.props.goto(this.props.nextUrl)}}>Next</button>
    }

    // if (this.props.nextUrl || this.props.data.leaveHistoryClicked) {
    //   console.log("ACTION BAR ----- nextUrl? ", this.props.nextUrl);
    //   rightButton = <button onClick={()=>{this.props.goto(this.props.nextUrl)}}>Next</button>
    // } else {
    //   rightButton = <button onClick={() => this.props.saveDayDetail(null, userProjectId, onDay, text, publicIds)}>Save</button>
    // }

    return (
      <div>
        <button onClick={() => this.props.goto("/")}>Back</button>
        {rightButton}
      </div>
    );
  }
}

export default ActionBar;