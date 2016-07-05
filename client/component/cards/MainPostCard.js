import React, {Component} from "react";
import LikeSet from "../subcomponents/LikeSet";
import ReportSet from "../subcomponents/ReportSet";
import UserSet from "../subcomponents/UserSet";
import moment from "moment";

class MainPostCard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  clickUserProjectCard() {
    this.props.fetchUserProjectDetail(this.props.data.userProjectId);
    this.props.goto("/userproject");
  }

  render() {

    const { id, doneLike, likeCount, createdAt, day, doneReport, projectTitle, projectDescription, publicIds, text, userPhoto, userProjectId, userId, username } = this.props.data;

    const imageHeight = 420;
    const imageWidth = 840;
    const imageUrl = "http://res.cloudinary.com/daxutqqyt/image/upload/c_fill,h_" + imageHeight + ",w_" + imageWidth + "/v1466579054/";

    const images = publicIds.map((id) => {
        if (id.indexOf("http") === -1) {
          id = imageUrl + id;
        }
        return <img key={id} src={id} style={{width: "100%", height: "auto"}}/>;
      });

    // const cardStyle = {
    //   backgroundColor: "white",
    //   margin: "10px 0",
    // };

    return (
      <div className="card">
        <div onClick={this.clickUserProjectCard.bind(this)}>
          <div className="card-block">
            <div className="pull-left">
              <UserSet userPhoto={userPhoto} username={username} />
              <span className="text-muted">{projectTitle}</span>
            </div>
            <div className="pull-right">
              <div>{moment(createdAt).fromNow()}</div>
            </div><br />
            <div className="text-muted pull-right">
              <div>On Day {day}</div>
            </div>
            <div style={{clear: "both"}}></div>
          </div>
          {images}
          <div className="card-block">
            <p className="card-text">
              {text}
            </p>
          </div>
        </div>
        <hr/>
        <div className="card-block">
          <LikeSet id={id} doneLike={doneLike} likeCount={likeCount} />
          <ReportSet id={id} goto={this.props.goto}/>
          <div style={{clear: "both"}}></div>
        </div>
      </div>
    );
  }
}

export default MainPostCard;
