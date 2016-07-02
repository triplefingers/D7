import React, {Component} from "react";
import ActionBar from "./ActionBar";

class Payment extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {

  }

  render() {

    const data = this.props.data;
    const title = data.title;
    const description = data.description;
    const text = data.text;
    const publicIds = window.publicIds;
    const today = new Date().toJSON().slice(0,10);
    let startAt = data.startAt;
    if (!startAt) {
      startAt = today;
    }

    const payment = {
      cardNumber: data.cardNumber,
      expiry: data.expiry,
      birth: data.birth,
      pwd2digit: data.pwd2digit,
      amount: 7000,
      currency: "won"
    };
    const newProject = {
      title: title,
      description: description,
      startAt: startAt
    };


    let actionBar;

    if (this.props.data.creatingProjectFirst) {
      actionBar = (
        <div>
          <button onClick={() => this.props.goto("/create/date")}>Back</button>
          <button onClick={() => this.props.saveNewProject(undefined, title, description, startAt, payment)}>
          Save</button>
        </div>
      );
    } else if (this.props.data.creatingProjectLast) {
      actionBar = (
        <div>
          <button onClick={() => this.props.goto("/create")}>Back</button>
          <button onClick={() => this.props.saveDayDetail(undefined, undefined, 1, text, publicIds, newProject, payment)}>
          Save</button>
        </div>
      );
    } else if (this.props.data.existingProjectChosen) {
      if (this.props.data.selectedProject) {
        const selectedProject =this.props.data.selectedProject;
        var projectId = selectedProject.projectId;
      }
      actionBar = (
        <div>
          <button onClick={() => this.props.goto("/create/date")}>Back</button>
          <button onClick={() => this.props.saveExistingProject(projectId, startAt, payment)}>
          Save</button>
        </div>
      );
    }

    return (
      <div>
        <h1>Payment</h1>
        <label>Card Number </label>
        <input type="text" placeholder="XXXX-XXXX-XXXX-XXXX" onChange={this.props.handleChange.bind(null, "cardNumber")}/><br />
        <label>Expiration Date </label>
        <input type="text" size="7" maxLength="7" placeholder="YYYY-MM" onChange={this.props.handleChange.bind(null, "expiry")} /><br />
        <label>Birth Date </label>
        <input type="text" size="6" maxLength="6" placeholder="921029" onChange={this.props.handleChange.bind(null, "birth")} /><br />
        <label>Password First Two Digit </label>
        <input type="text" maxLength="2" size="2" placeholder="XX" onChange={this.props.handleChange.bind(null, "pwd2digit")}/>XX<br />
        {actionBar}
      </div>
    );
  }
}

export default Payment;
