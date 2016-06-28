import React, {Component} from "react";

class Settings extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {

  }

  render() {
    return (
      <div>
        <h1>Settings</h1>
        <p>
          Photo
        </p>
        <h2>Dongwoo Kim</h2>
        <h3>idforcoding@gmail.com</h3>
        <h3>Complete 3 | Ongoing 2 | Fail 100</h3>
        <div>
          <h2>Transaction History</h2>
          <ul>
            <li>Date, Project, Amount, Status</li>
          <ul>
        </div>
      </div>
    );
  }
}

export default Settings;