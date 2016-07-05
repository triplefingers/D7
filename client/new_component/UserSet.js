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
    const imageUrl = "http://res.cloudinary.com/daxutqqyt/image/upload/c_scale,w_200,h_200/v1467554303/" + userPhoto + ".jpg";

    return (
      <div className="card-subtitle">
        <img src={imageUrl} alt="user profile" width="14px" height="14px"/>
        <span>{username}</span>
      </div>
    );
  }
}

export default UserSet;
