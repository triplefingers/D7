import React, {Component} from "react";
class ActionBar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
  }
  render() {
    /* Validation Process */
    const validationCallback = (item) => {
      if (item && item.length > 0) {
        return true;
      } else if (item) {
        return true;
      }
      return false;
    };
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
    if (this.props.nextUrl && this.props.data) {
      console.log("First case");
      let validator = () => {
        if (this.props.validateAll(validationCallback, this.props.data.selectedProject)) {
          console.log("Project Selected");
          this.props.goto(this.props.nextUrl);
        } else {
          alert("Check again : Pick a project before proceed");
        }
      };
      rightButton = <li className="next"><a onClick={validator}>Next</a></li>;
    } else if ((this.props.data && (!this.props.data.leaveHistoryClicked)) ||
      ((this.props.callback) && this.props.callback.data.leaveHistoryInProgress)) {
      console.log("Second case");
      let validator = () => {
        if ((this.props.data && (this.props.validateAll(validationCallback, this.props.data.selectedProject))) && this.props.callback) {
          console.log("Project Selected");
          this.props.callback.saveDayDetail(undefined, userProjectId, onDay, text, publicIds);
          this.props.callback.navAlert("save");
          setTimeout(() => {
            this.props.callback.navAlert(null);
          }, 2000);

        } else if (!this.props.callback && this.props.validateAll(validationCallback, this.props.data.selectedProject)) {
          this.props.saveDayDetail(undefined, userProjectId, onDay, text, publicIds);
          this.props.navAlert("save");

          setTimeout(() => {
            this.props.navAlert(null);
          }, 2000);
        } else if (this.props.callback.validateAll(validationCallback, this.props.callback.data.selectedProject)) {
          this.props.callback.saveDayDetail(undefined, userProjectId, onDay, text, publicIds);
          this.props.callback.navAlert("save");
          setTimeout(() => {
            this.props.callback.navAlert(null);
          }, 2000);
        } else {
          alert("Check again : Pick a project before proceed");
        }
      };

      rightButton = <li className="next"><a onClick={validator}>Save</a></li>;
      if (this.props.callback) {
        rightButton = <li className="next"><a onClick={validator}>Save</a></li>;
      }
    } else {
      console.log("Third case");
      rightButton = <li className="next"><a onClick={()=>{this.props.goto(this.props.nextUrl);}}>Next</a></li>;
    }
    return (
      <ul className="pager">
        <li className="previous"><a onClick={() => this.props.goto("/")}>Back</a></li>
        {rightButton}
      </ul>
    );
  }
}


export default ActionBar;
