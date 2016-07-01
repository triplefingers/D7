import React, {Component} from "react";

class SelectBox extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {

  }

  render() {
    let selectedProject;

    if (this.props.project) {
      selectedProject = {
        selectedProject: this.props.project
      }
    }

    return (
      <div>
        <input type="radio" id={this.props.project.id} name="project" value={this.props.project.title} onChange={this.props._save.bind(null, selectedProject)} />
        <label for={this.props.project.id}> {this.props.project.title}</label>
      </div>
    );
  }
}

export default SelectBox;