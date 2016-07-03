import React, {Component} from "react";

class UserSet extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  //
  // handleUserClick(e){
  //   e.stopPropagation();
  //   this.props.fetchProjectDetail(this.props.data.projectId);
  //   this.props.goto("/history");
  // }

  render() {
    const { userPhoto, username } = this.props;

    return (
      <div>
        <img src={userPhoto} alt="user profile" width="20px" height="20px"/>
        <span>{username}</span>
      </div>
    );
  }
}

export default UserSet;
