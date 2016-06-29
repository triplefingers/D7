import React, {Component} from "react";

class MainPostCard extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
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
        return <img src={id} style={{width: imageWidth + "px", height: imageHeight + "px"}}/>;
      });

    return (
      <div>
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
          {/* Text */}
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
            <button>Like</button>
            <span>{likeCount}</span>
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
