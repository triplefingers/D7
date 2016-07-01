import React, {Component} from "react";
import axios from "axios";

class ProjectHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      wished: false,
      wishCount: 0
    };
  }

  componentDidMount() {
    const { doneWish, wishCount } = this.props.data;
    if(doneWish){
      this.setState({wished: true, wishCount: wishCount});
    } else {
      this.setState({wishCount: wishCount});
    }
  }

  toggleWish(projectId, e) {
    e.stopPropagation();
    if(this.state.wished){
      axios.post("/api/wish", {
        projectId: projectId
      }).then((res) => {
        console.log('RES', res);
        this.setState({
          wished: false,
          wishCount: res.data.wishCount
        });
      });
    } else {
      axios.post("/api/wish", {
        projectId: projectId
      }).then((res) => {
        console.log('RES', res);
        this.setState({
          wished: true,
          wishCount: res.data.wishCount
        });
      });
    }
  }

  render() {
    console.log(this.props);

    const { projectId, projectTitle, projectDescription, doneWish, userPhoto, username, wishCount } = this.props.data;

    let wishButton;
    if(this.state.wished){
      wishButton = (
        <button style={{zIndex: "10"}} onClick={this.toggleWish.bind(this, projectId)}>Wish clicked</button>
      );
    } else {
      wishButton = (
        <button style={{zIndex: "10"}} onClick={this.toggleWish.bind(this, projectId)}>Wish not clicked</button>
      );
    }

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
          <div>
            {wishButton}
            <span>{this.state.wishCount}</span>
          </div>
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
