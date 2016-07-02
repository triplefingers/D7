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

    if(this.props.data){
      console.log('THIS.PROPS.DATA in DetailUserProjectCard', this.props.data);
    }
    /* Project image 추가, userPhoto 제외 */
    // const cardStyle = {
    //   backgroundColor: "white",
    //   margin: "10px 0",
    // }
    //
    // const { projectId, projectTitle, projectDescription, wishCount, doneWish, startAt, endAt, userPhoto, username, status, others, onDay } = this.props.data;
    // const { amount, currency, paymentDue } = this.props.data.transaction;
    //
    // let projectStatus;
    // let transaction;
    //
    // if(others){
    //   if(status === "ongoing" || status === "waiting"){
    //     projectStatus = <div>On day {onDay}</div>;
    //   } else {
    //     projectStatus = "COMPLETE";
    //   }
    // } else {
    //   if(status === "ongoing" || status === "waiting"){
    //     projectStatus = <div>On day {onDay}</div>;
    //   } else {
    //     projectStatus = status.toUpperCase();
    //   }
    //   transaction = (<div>{amount} {currency} on {paymentDue}</div>);
    // }
    //
    // return (
    //   <div tyle={cardStyle} onClick={this.clickProjectCard.bind(this)}>
    //     <div>
    //       <h1>{projectTitle}</h1>
    //       <p>{projectDescription}</p>
    //     </div>
    //     <div>
    //       {projectStatus}
    //       <div>{startAt}~{endAt}</div>
    //     </div>
    //   </div>
    // );
    return (<div>My project card</div>);
  }
}

export default DetailUserProjectCard;
