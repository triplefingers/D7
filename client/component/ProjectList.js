import React, {Component} from "react";
import {Link} from "react-router";

class ProjectList extends Component {
  constructor(props) {
    super(props);
  };

  render() {
    console.log(this.props.fore);
    return (
      <div>

        <h1>This is ProjetList</h1>
        {this.props.title}
        <button onClick={this.props.changetitle}>버튼버튼</button><br/>

        <Link to="/record/complete" onClick={this.props.force}>프로젝트1</Link>
      </div>
    )
  }
}

export default ProjectList;
