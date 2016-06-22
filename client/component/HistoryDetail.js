import React, {Component} from "react";
import Navigation from "./Navigation";

class HistoryDetail extends Component {
  constructor(props) {
    super(props);
  };

  render() {
    let id = this.props.data.id;
    let title = this.props.data.title;
    let description = this.props.data.description;
    let dayDetails = this.props.data.dayDetails;

    let imageHeight = 200;
    let imageWidth = 200;
    let imageUrl = "http://res.cloudinary.com/daxutqqyt/image/upload/c_fill,h_" + imageHeight + ",w_" + imageWidth + "/v1466579054/";

    dayDetails = dayDetails.map((dayDetail) => {
      let images = dayDetail.publicIds;
      images = images.map((id) => {
        if (id.indexOf("http") === -1) {
          id = imageUrl + id;
        }
        return <img src={id} style={{width: imageWidth + "px", height: imageHeight + "px"}}/>
      });

      return (
        <li>
          <span>On Day {dayDetail.day}</span>
          <div>
            {images}
          </div>
          <div>
            {dayDetail.text}
          </div>
        </li>
      )
    })
    let writeButton;
    if (this.props.data.status === "ongoing") {
      writeButton = <button onClick={this.props.goto.bind(null, "/record/project/" + id)}>write</button>;
    }

    return (
      <div>
        <Navigation title="Detail" rightButtonName="write" rightButtonLink={"/record/project/" + id} rightButtonCondition={() => !this.props.data.doneToday}/>
        <h1>Project Detail</h1><hr/>
        <h1>Title: {title}</h1>
        <h1>Description: {description}</h1>
        <ul>
          {dayDetails}
        </ul>
        <button onClick={this.context.router.goBack.bind(this)}>Back</button>
      </div>
    );
  }
}


HistoryDetail.contextTypes = {
  router: () => React.PropTypes.func.isRequired
};

export default HistoryDetail;
