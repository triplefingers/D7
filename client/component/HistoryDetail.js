import React, {Component} from "react";
import Navigation from "./Navigation";

class HistoryDetail extends Component {
  constructor(props) {
    super(props);
  };

  componentDidMount() {
    console.log("HistoryDetail Mounted :)");
    console.log("Detail Passed?: ", this.props.data.detail);
  }

  render() {
    let id = this.props.data.id;
    let title = this.props.data.title;
    let description = this.props.data.description;
    let details = this.props.data.detail;

    let imageHeight = 200;
    let imageWidth = 200;
    let imageUrl = "http://res.cloudinary.com/daxutqqyt/image/upload/c_fill,h_" + imageHeight + ",w_" + imageWidth + "/v1466579054/";

    details = details.map((detail) => {
      let publicIds = detail.publicIds;
      publicIds = publicIds.map((id) => {
        if (id.indexOf("http") === -1) {
          id = imageUrl + id;
        }
        return <img src={id} style={{width: imageWidth + "px", height: imageHeight + "px"}}/>
      })
      return (
        <li>
          <span>On Day {detail.day}</span>
          <div>
            {publicIds}
          </div>
          <div>
            {detail.text}
          </div>
        </li>
      )
    })
    console.log("details is ", details);
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
          {details}

        </ul>
        <button onClick={this.context.router.goBack.bind(this)}>Back</button>
        {/*<button onClick={this.props.saveDayDetail.bind(this, id, onDay, text)}>Save</button>*/}
      </div>
    );
  }
}


HistoryDetail.contextTypes = {
  router: () => React.PropTypes.func.isRequired
};

export default HistoryDetail;
