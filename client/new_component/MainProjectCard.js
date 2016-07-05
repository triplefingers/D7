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

    // const cardStyle = {
    //   backgroundColor: "white",
    //   margin: "10px 0",
    // }

    const project = this.props.data
    const imageSrc = "http://res.cloudinary.com/daxutqqyt/image/upload/c_scale,w_840,h_420/v1467554303/" + project.image + ".jpg";

    return (
      <div className="card" onClick={this.clickProjectCard.bind(this)}>
        <img src={imageSrc} width="100%" height="auto"/>
        <div className="card-block">
          <h2 className="card-title">{title}</h2>
          <p className="card-text">
            {description}
          </p>
        </div>
        <hr/>
        <div className="card-block">
          <WishSet id={id} doneWish={doneWish} wishCount={wishCount} />
          <div className="pull-right">
            <span>by </span>
            <span>{username}</span>
          </div>
          <div style={{clear:"both"}}></div>
        </div>
      </div>
    );
  }
}

export default MainProjectCard;
