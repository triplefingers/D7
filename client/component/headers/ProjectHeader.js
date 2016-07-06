import React, {Component} from "react";
import WishSet from "../subcomponents/WishSet";
import UserSet from "../subcomponents/UserSet";

class ProjectHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    console.log(this.props);

    const { projectId, projectTitle, projectDescription, doneWish, userPhoto, username, wishCount } = this.props.data;

    const imageSrc = "http://res.cloudinary.com/daxutqqyt/image/upload/c_scale,w_200/v1467554303/" + this.props.data.projectImage + ".jpg";

    return (
      <div className="card projectHeader">
        {/* Header */}
        <div>
          <img className="conImg" src={imageSrc}/>
        </div>
        {/* Content */}
        <div className="card-block">
          <h3 className="card-title">{projectTitle}</h3>
          <p className="card-text">
            {projectDescription}
          </p>
          <button className="btn btn-default" onClick={() => {this.props.callback.goto("/create/date"); this.props.callback._save({selectedProject: this.props.data, existingProjectChosen: true});}}>Start this project</button>
        </div>
        {/* Footer */}
        <div className="card-block">
          <div className="pull-left">
            <WishSet id={projectId} doneWish={doneWish} wishCount={wishCount} />
          </div>
          <div className="pull-right">
            <UserSet userPhoto={userPhoto} username={username} />
          </div>
          <div style={{clear: "both"}}/>
        </div>
      </div>
    );
  }
};

export default ProjectHeader;
