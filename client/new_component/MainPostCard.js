import React, {Component} from "react";
import axios from "axios";

class MainPostCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      liked: false,
      likeCount: 0
    };
  }

  componentDidMount() {
    const { doneLike, likeCount } = this.props.data;
    if(doneLike){
      this.setState({liked: true, likeCount: likeCount});
    } else {
      this.setState({likeCount: likeCount});
    }
  }

  toggleLike() {
    if(this.state.liked){
      this.setState({liked: false, likeCount: this.state.likeCount - 1});
    } else {
      this.setState({liked: true, likeCount: this.state.likeCount + 1});
    }
    /* Add send post request to server api for like */
  }

  clickUserProjectCard() {
    this.props.fetchUserProjectDetail(this.props.data.userProjectId);
    this.props.goto("/userproject");
  }

  render() {

    const { createdAt, day, doneLike, doneReport, likeCount, projectTitle, projectDescription, publicIds, text, userPhoto, userProjectId, userId, username } = this.props.data;

    const imageHeight = 200;
    const imageWidth = 200;
    const imageUrl = "http://res.cloudinary.com/daxutqqyt/image/upload/c_fill,h_" + imageHeight + ",w_" + imageWidth + "/v1466579054/";

    const images = publicIds.map((id) => {
        if (id.indexOf("http") === -1) {
          id = imageUrl + id;
        }
        return <img key={id} src={id} style={{width: imageWidth + "px", height: imageHeight + "px"}}/>;
      });

    const cardStyle = {
      backgroundColor: "white",
      margin: "10px 0",
    };

    let likeButton;
    if(this.state.liked){
      likeButton = (
        <button onClick={this.toggleLike.bind(this)}>Like clicked</button>
      );
    } else {
      likeButton = (
        <button onClick={this.toggleLike.bind(this)}>Like not clicked</button>
      );
    }

    return (
      <div style={cardStyle} onClick={this.clickUserProjectCard.bind(this)}>
        {/* Card Header */}
        <div>
          {/* Header Left Part */}
          <div>
            <div>
              {/* 추후에 Cloudinary id로 변경해야 함 */}
              <img src={userPhoto} width="20px" height="20px"/>
              <span>{username}</span>
            </div>
            <div>{projectTitle}</div>
          </div>
          {/* Header Right Part */}
          <div>
            <div>{day}</div>
            <div>{createdAt}</div>
          </div>
        </div>
        {/* Card Content */}
        <div>
          <div>
          {images}
          </div>
          <div>
            <p>
              {text}
            </p>
          </div>
        </div>
        {/* Card Footer */}
        <div>
          {/* Footer Left Part */}
          <div>
            {likeButton}
            <span>{this.state.likeCount}</span>
          </div>
          {/* Footer Right Part */}
          <div>
            <button>...</button>
          </div>
        </div>
      </div>
    );
  }
}

export default MainPostCard;
