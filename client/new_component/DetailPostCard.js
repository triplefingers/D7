import React, {Component} from "react";
import LikeSet from "./LikeSet";
import ReportSet from "./ReportSet";

class DetailPostCard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    console.log("DetailPostCard", this.props.data);
    const { id, createdAt, day, likeCount, doneLike, doneReport, publicIds, text } = this.props.data;

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

    return (
      <div style={cardStyle}>
        {/* Card Header */}
        <div>
          {/* Header Left Part */}
          <div>
            <div>
              <h2>Day {day}</h2>
            </div>
          </div>
          {/* Header Right Part */}
          <div>
            <div>{createdAt}</div>
          </div>
        </div>
        {/* Card Content */}
        <div>
          {/* Images */}
          <div>{images}</div>
          {/* Text */}
          <div>
            <p>
              {text}
            </p>
          </div>
        </div>
        {/* Card Footer */}
        <div>
          {/* Footer Right Part */}
          <LikeSet id={id} doneLike={doneLike} likeCount={likeCount}/>
          {/* Footer Left Part */}
          <ReportSet id={id} goto={this.props.goto}/>
        </div>
      </div>
    );
  }
}

export default DetailPostCard;
