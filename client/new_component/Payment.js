import React, {Component} from "react";

class Payment extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {

  }

  render() {

    return (
      <div>
        <label>Card Number</label>
        <input type="text" placeholder="1234-4444-4444-4444"/>
        <label>Expiration Date</label>
        <input type="text" placeholder="06-19" />
        <label>Birth Date</label>
        <input type="text" placeholder="10-29-1992"/>
        <label>Password First Two Digit</label>
        <input type="text" placeholder="XX"/>
      </div>
    );
  }
}

export default Payment;
