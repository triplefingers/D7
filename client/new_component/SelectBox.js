import React, {Component} from "react";

class SelectBox extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div>
        <input type="radio" name={this.props.project.title} value={this.props.project.title} onChange={this.props.handleChange.bind(null, "selectedProject")} />
        <label for={this.props.project.title}> {this.props.project.title}</label>
      </div>

    );
  }
}

export default SelectBox;