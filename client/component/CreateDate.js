import React, {Component} from "react";
import {Router, Route, Link, browserHistory, hashHistory, IndexRoute, RouterContext} from "react-router";


class CreateDate extends Component {
  constructor(props) {
    super(props);
  };

  render() {

    let title = this.props.data.title;
    let desc = this.props.data.description;
    let startDate = this.props.data.startAt;

    let minDate = new Date().toJSON().slice(0,10);


    return (
      <div>
        <h1>Pick a Date</h1>
        <h2>Title: {this.props.data.title}</h2>
        <hr/>
        <div>
          <input type="date" min={minDate} onChange={this.props.handleChange.bind(null, "startAt")} />
          <br/>
          <button onClick={this.context.router.goBack}>Cancel</button>
          <button onClick={() => {
            this.props.saveNewProject(title, desc, startDate)
          }}>Save</button>
        </div>
      </div>
    )
  };
}

CreateDate.contextTypes = {
  router: () => React.PropTypes.func.isRequired
}

export default CreateDate;
