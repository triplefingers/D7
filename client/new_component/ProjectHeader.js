import React, {Component} from "react";
import WishSet from "./WishSet";
import UserSet from "./UserSet";

class ProjectHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    console.log(this.props);

    const { projectId, projectTitle, projectDescription, doneWish, userPhoto, username, wishCount } = this.props.data;

    const imageSrc = "http://res.cloudinary.com/daxutqqyt/image/upload/c_scale,w_200/v1467554303/" + this.props.data.userPhoto + ".jpg";

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
          <button onClick={() => {this.props.callback.goto("/create/date"); this.props.callback._save({selectedProject: this.props.data, existingProjectChosen: true});}}>Start this project</button>
        </div>
        {/* Footer */}
        <div>
          <WishSet id={projectId} doneWish={doneWish} wishCount={wishCount} />
          <UserSet userPhoto={userPhoto} username={username} />
        </div>
      </div>
    );
  }
};

export default ProjectHeader;
