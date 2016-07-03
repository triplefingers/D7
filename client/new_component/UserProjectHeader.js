import React, {Component} from "react";
import WishSet from "./WishSet";
import UserSet from "./UserSet";

class UserProjectHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleProjectClick(){
      this.props.fetchProjectDetail(this.props.data.projectId);
      this.props.goto("/project");
    }


  render() {
    console.log("USERPROEJCT HEADER", this.props.data);

    const { projectId, projectTitle, projectDescription, wishCount, doneWish, startAt, endAt, userPhoto, username, status, others, onDay } = this.props.data;
    const { amount, currency, paymentDue } = this.props.data.transaction;

    let projectStatus;
    let transaction;
    let user;

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
        <UserSet userPhoto={userPhoto} username={username} />
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

export default UserProjectHeader;
