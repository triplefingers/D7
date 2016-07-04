import React, {Component} from "react";
import WishSet from "./WishSet";

class MainProjectCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  clickProjectCard() {
    this.props.fetchProjectDetail(this.props.data.id);
    this.props.goto("/project");
  }

  render() {
    /* Project image 추가, userPhoto 제외 */
    const { id, title, description, doneWish, wishCount, username } = this.props.data;

    const cardStyle = {
      backgroundColor: "white",
      margin: "10px 0",
    }

    const project = this.props.data
    const imageSrc = "http://res.cloudinary.com/daxutqqyt/image/upload/c_scale,w_200,h_200/v1467554303/" + project.image + ".jpg";

    return (
      <div style={cardStyle} onClick={this.clickProjectCard.bind(this)}>
        {/* Card Header */}
        <div>
          <img src={imageSrc} width="400px" height="200px"/>
        </div>
        {/* Card Content */}
        <div>
          <h2>{title}</h2>
          <p>
            {description}
          </p>
        </div>
        {/* Card Footer */}
        <div>
          {/* Footer Left Part */}
          <WishSet id={id} doneWish={doneWish} wishCount={wishCount} />
          {/* Footer Right Part */}
          <div>
            <span>by</span>
            <span>{username}</span>
          </div>
        </div>
      </div>
    );
  }
}

export default MainProjectCard;
