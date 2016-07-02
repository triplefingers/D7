import React, {Component} from "react";

class DetailUserProjectCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  clickProjectCard() {
    this.props.fetchUserProjectDetail(this.props.data.id);
    this.props.goto("/userproject");
  }

  render() {

    if(this.props.data){
      console.log('THIS.PROPS.DATA in DetailUserProjectCard', this.props.data);
      const { id, title, description, startAt, endAt, onDay, success } = this.props.data;

      let projectStatus;
      if(onDay===undefined){
        if(success){
          projectStatus = "SUCCESS";
        } else {
          projectStatus = "FAILED";
        }
      } else {
        if(onDay < 0){
          projectStatus = `D${onDay}`;
        } else {
          projectStatus = `on Day ${onDay}`;
        }
      }

      const cardStyle = {
        backgroundColor: "white",
        margin: "10px 0",
      }

      return (
        <div style={cardStyle} onClick={this.clickProjectCard.bind(this)}>
          <div>
            <h1>{title}</h1>
            <p>{description}</p>
          </div>
          <div>
            {projectStatus}
            <div>{startAt}~{endAt}</div>
          </div>
        </div>
      );
    } else {
      return (<div>My project card</div>);
    }
  }
}

export default DetailUserProjectCard;
