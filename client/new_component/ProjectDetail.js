import React, {Component} from "react";

import ProjectHeader from "./ProjectHeader";

class ProjectDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
    this.props.fetchProjectDetail();
  }

  render() {
    let Contents;
    if(this.props.data.project){
      console.log(this.props.data.project);
    }

    return (
      <div>
        <ProjectHeader />
        Project Contents!
      </div>
    );
  }
}

export default ProjectDetail;
