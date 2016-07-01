import React, {Component} from "react";

class CreateProject extends Component {
  constructor(props) {
    super(props);
  }

  render() {

    return (
      <div>
        <p>This is CreateProject Page</p>
        <button onClick={()=>{this.props.goto("/create/date")}}>Button</button>
      </div>
    );
  }
}

export default CreateProject;
