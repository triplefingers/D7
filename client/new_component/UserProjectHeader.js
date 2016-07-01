import React, {Component} from "react";
import WishSet from "./WishSet";

class UserProjectHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    console.log("USERPROEJCT HEADER", this.props.data);

    const { projectId, projectTitle, projectDescription, wishCount, doneWish, startAt, endAt, userPhoto, username, status, others } = this.props.data;
    const { amount, currency, paymentDue } = this.props.data.transaction;

    let projectStatus;
    let transaction;

    if(others){
      if(status === "ongoing" || status === "waiting"){
        projectStatus = <div>On day {onDay}</div>;
      } else {
        projectStatus = "COMPLETE";
      }
    } else {
      if(status === "ongoing" || status === "waiting"){
        projectStatus = <div>On day {onDay}</div>;
      } else {
        projectStatus = status.toUpperCase();
      }
      transaction = (<div>{amount} {currency} on {paymentDue}</div>);
    }

    return (
      <div>
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
          <button>-></button>
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

export default UserProjectHeader;
