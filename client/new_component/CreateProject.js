import React, {Component} from "react";

class CreateProject extends Component {
  constructor(props) {
    super(props);
  }

  render() {

    let vaidationCallback = (item) => {
      if (item && item.length > 0) {
        return true;
      }
      return false;
    };

    let validator = () => {
      if (this.props.validateAll(vaidationCallback, this.props.data.title, this.props.data.description)) {
        this.props.goto("/create/date");
      } else {
        alert("Check again : there is invalid inputs");
      }
    };


    return (
      <div>
        <h1>Create New Project</h1>
        <div>
          <label>Title</label>
          <br/>
          <input type="text" value={this.props.data.title} placeholder="title" onChange={this.props.handleChange.bind(null, "title")}/>
          <br/>
          <label>Description</label>
          <br/>
          <textarea value = {this.props.data.description} onChange={this.props.handleChange.bind(undefined,"description")} rows="6"/>
          <br/>
          <button onClick={() => this.props.goto("/select")}>Back</button>
          <button onClick={validator}>Next</button>
        </div>
      </div>
    );
  }
}

export default CreateProject;
