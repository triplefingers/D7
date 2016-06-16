import React, {Component} from "react";
import {Router, Route, Link, browserHistory, hashHistory, IndexRoute, RouterContext} from "react-router";


class CreateDate extends Component {
  constructor(props) {
    super(props);
  };

  render() {

    let today = new Date();
    let minDate = this.props.convertNumDateToFullString(today.getFullYear(), today.getMonth() + 1, today.getDate());

    return (
      <div>
        <h1>Pick a Date</h1>
        <h2>Title: {this.props.data.title}</h2>
        <hr/>
        <div>
          <input type="date" min={minDate} defaultValue={minDate}/>
          <br/>
          <button onClick={this.context.router.goBack}>Cancel</button>
          <button>Save</button>
        </div>
      </div>
    )
  };
}

CreateDate.contextTypes = {
  router: () => React.PropTypes.func.isRequired
}

export default CreateDate;
