import React, {Component} from "react";

import ProjectHeader from "../headers/ProjectHeader";
import MainPostCard from "../cards/MainPostCard";
import Loading from "../subcomponents/Loading";

class ProjectDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentWillUnmount() {
    this.props.reset(["project"]);
  }

  render() {
    const { project } = this.props.data;

    if(project){
      let Contents;
      console.log(project);
      Contents = project.posts.map((post)=>{
        return <MainPostCard data={post} key={post.id}/>
      });
      return (
        <div>
          <ProjectHeader callback={this.props} data={project}/>
          {Contents}
        </div>
      );
    } else {
      return <Loading />;
    }
  }
}

export default ProjectDetail;
