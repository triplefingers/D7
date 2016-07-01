import React, {Component} from "react";
import axios from "axios";

class DetailPostCard extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    const { doneLike, likeCount } = this.props.data;
    if(doneLike){
      this.setState({liked: true, likeCount: likeCount});
    } else {
      this.setState({liked:false, likeCount: likeCount});
    }
  }

  toggleLike(postId, e) {
    e.stopPropagation();
    if(this.state.liked){
      axios.post("/api/like", {
        postId: postId
      }).then((res) => {
        this.setState({
          liked: false,
          likeCount: res.data.likeCount
        });
      });
    } else {
      axios.post("/api/like", {
        postId: postId
      }).then((res) => {
        this.setState({
          liked: true,
          likeCount: res.data.likeCount
        });
      });
    }
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

    let likeButton;
    if(this.state.liked){
      likeButton = (
        <button onClick={this.toggleLike.bind(this, id)}>Like clicked</button>
      );
    } else {
      likeButton = (
        <button onClick={this.toggleLike.bind(this, id)}>Like not clicked</button>
      );
    }

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
          <div>
            {likeButton}
            <span>{this.state.likeCount}</span>
          </div>
          {/* Footer Left Part */}
          <div>
            <button>...</button>
          </div>
        </div>
      </div>
    );
    return <div>Card</div>
  }
}

export default DetailPostCard;
