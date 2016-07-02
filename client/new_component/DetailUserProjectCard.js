import React, {Component} from "react";

class DetailUserProjectCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  clickProjectCard() {
    this.props.fetchProjectDetail(this.props.data.id);
    this.props.goto("/userproject");
  }

  render() {
    /* Project image 추가, userPhoto 제외 */
    const { id, title, description, doneWish, wishCount, username } = this.props.data;

    const cardStyle = {
      backgroundColor: "white",
      margin: "10px 0",
    }

    return (
      <div tyle={cardStyle} onClick={this.clickProjectCard.bind(this)}>
        <div>
          <h1>{projectTitle}</h1>
          <p>{projectDescription}</p>
        </div>
        <div>
          <img src={userPhoto} alt="user profile" width="20px" height="20px"/>
          <span>{username}</span>
        </div>
        <div>
          <WishSet id={projectId} doneWish={doneWish} wishCount={wishCount} />
          <button onClick={this.handleProjectClick.bind(this)}>-></button>
        </div>
        <div>
          {projectStatus}
          <div>{startAt}~{endAt}</div>
        </div>
        {transaction}
      </div>
    );
  }
}

export default DetailUserProjectCard;
