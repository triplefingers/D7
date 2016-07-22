import React, {Component} from "react";
import WishSet from "../subcomponents/WishSet";
import UserSet from "../subcomponents/UserSet";

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

    const { projectId, projectTitle, projectDescription, wishCount, doneWish, startAt, userPhoto, username, status, others, onDay } = this.props.data;
    let { endAt } = this.props.data;
    const { amount, paymentDue } = this.props.data.transaction;
    let { currency } = this.props.data.transaction;

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
      if(status === "ongoing"){
        projectStatus = <div>On day {onDay}</div>;
      } else if (status === "waiting") {
        projectStatus = <div>D{onDay}</div>;
      } else {
        projectStatus = status.toUpperCase();
      }
      if (currency === "won") {
        currency = "₩";
      } else if (currency === "dollar") {
        currency = "$";
      }
      transaction = (<div>{currency}{amount} on {paymentDue}</div>);
    }

    if (startAt.slice(0, 4) === endAt.slice(0, 4)) {
      endAt = endAt.slice(5);
    }

    return (
      <div>
        <div className="card projectCard">
          <div className="card-block">
            <h3 className="pull-right">
              <WishSet id={projectId} doneWish={doneWish} wishCount={wishCount} count={false}/>
              <a className="pull-right createProjectBtn glyphicon glyphicon-circle-arrow-right" onClick={this.handleProjectClick.bind(this)}/>
              <span style={{padding: "0 0.5rem"}}></span>
            </h3>
            <h3 className="card-title">{projectTitle}</h3>
            <p className="card-text">{projectDescription}</p>
            <UserSet userPhoto={userPhoto} username={username} />

          </div>
          <div className="card-block">
            <strong>{projectStatus}</strong>
            <div>{startAt}~{endAt}</div>
          </div>
        </div>
        <div className="card card-block">
          {transaction}
        </div>
      </div>
    );
  }
}

export default UserProjectHeader;
