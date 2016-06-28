import React, {Component} from "react";

class ActionBar extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {

  }

  render() {

    let rightButton;

    // If parent passes nextUrl props
    // onClick 할때 이동하는 url 을 props 로 받음
    // url이 넘어오지 않는다면 항상 SAVE -> / 로 이
    if (!this.props.nextUrl) {
      rightButton = <button>Next</button>
    } else {
      rightButton = <button>Save</button>
    }

    return (
      <div>
        <button>Back</button>
        {rightButton}
      </div>
    );
  }
}

export default ActionBar;