import React, {Component} from "react";

class UserProjectHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
  }

  render() {
    console.log("USERPROEJCT HEADER", this.props.data);
    const { projectTitle, projectDescription, wishCount, doneWish, startAt, endAt, userPhoto, username, posts } = this.props.data;

    return (
      <div>
        <div>
          <h1>{projectTitle}</h1>
          <p>{projectDescription}</p>
        </div>
        <div>
          <img src={userPhoto} alt="user profile" width="20px" height="20px"/>
          <span>{username}</span>
        </div>
        <div>
          <button>Pin</button><span>{wishCount}</span>
          <button>-></button>
        </div>
        <div>
          <div>On day {posts[posts.length-1].day}</div>
          <div>{startAt}~{endAt}</div>
        </div>
      </div>
    );
  }
}

export default UserProjectHeader;
