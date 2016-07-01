import React, {Component} from "react";
import WishSet from "./WishSet";

class ProjectHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    console.log(this.props);

    const { projectId, projectTitle, projectDescription, doneWish, userPhoto, username, wishCount } = this.props.data;

    return (
      <div>
        {/* Header */}
        <div>
          <img src="https://www.colourbox.com/preview/1744283-set-of-paintbrushes-and-color-paint-on-canvas-background.jpg" width="400px" height="200px"/>
        </div>
        {/* Content */}
        <div>
          <h2>{projectTitle}</h2>
          <p>
            {projectDescription}
          </p>
          <button>Start this project</button>
        </div>
        {/* Footer */}
        <div>
          <WishSet id={projectId} doneWish={doneWish} wishCount={wishCount} />
          <div>
            <img src={userPhoto} width="20px" height="20px"/>
            <span>{username}</span>
          </div>
        </div>
      </div>
    );
  }
};

export default ProjectHeader;
