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
      console.log("ACTION BAR - data : ", data);
      var userProjectId = data.id;
      var onDay = data.onDay;
      var text = this.props.data.text;

      if (window.publicIds) {
        var publicIds = window.publicIds;
      }
    }

    let rightButton;

    // If parent passes nextUrl props
    // onClick 할때 이동하는 url 을 props 로 받음
    // url이 넘어오지 않는다면 항상 SAVE -> / 로 이동
    if (this.props.nextUrl) {
      rightButton = <button>Next</button>
    } else {
      rightButton = <button onClick={() => this.props.saveDayDetail(null, userProjectId, onDay, text, publicIds)}>Save</button>
    }

    return (
      <div>
        <button onClick={() => this.props.goto("/")}>Back</button>
        {rightButton}
      </div>
    );
  }
}

export default ActionBar;