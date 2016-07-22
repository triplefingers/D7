import React, {Component} from "react";
import LikeSet from "../subcomponents/LikeSet";
import ReportSet from "../subcomponents/ReportSet";
import moment from "moment";

class DetailPostCard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    console.log("DetailPostCard", this.props.data);
    const { id, createdAt, day, likeCount, doneLike, doneReport, publicIds, text } = this.props.data;

    const imageHeight = 420;
    const imageWidth = 840;
    const imageUrl = "http://res.cloudinary.com/daxutqqyt/image/upload/c_fill,h_" + imageHeight + ",w_" + imageWidth + "/v1466579054/";

    const images = publicIds.map((id) => {
      if (id.indexOf("http") === -1) {
        id = imageUrl + id;
      }
      return <img key={id} src={id} style={{width: "100%", height: "auto"}}/>;
    });

    return (
      <div className="card">
        <div className="card-block">
          <h4 className="card-title pull-left">Day {day}</h4>
          <div className="pull-right">
            {moment(createdAt).fromNow()}
          </div>
          <div style={{clear: "both"}}></div>
        </div>
        {images}
        <div className="card-block">
          <p className="card-text">{text}</p>
        </div>
        <hr/>
        <div className="card-block">
          <LikeSet id={id} doneLike={doneLike} likeCount={likeCount}/>
          <ReportSet id={id} goto={this.props.goto} navAlert={this.props.navAlert}/>
          <div style={{clear: "both"}}></div>
        </div>
      </div>
    );
  }
}

export default DetailPostCard;
