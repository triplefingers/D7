import React, {Component} from "react";
import {Router, Route, Link, browserHistory, hashHistory, IndexRoute} from "react-router";
import Navigation from "./Navigation";

class CreateBasicInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  };

  componentDidMount() {

  }

  render() {
    let vaidationCallback = (item) => {
      if (item && item.length > 0) {
        return true;
      }
      return false;
    };

    let validator = () => {
      if (this.props.validateAll(vaidationCallback, this.props.data.title, this.props.data.description)) {
        this.props.goto("/create/date");
      } else {
        alert("Check again : there is invalid inputs");
      }
    };

    return (
      <div>
        <Navigation title="New Project"/>
        <div>
          <label>Title</label>
          <br/>
          <input type="text" value={this.props.data.title} placeholder="title" onChange={this.props.handleChange.bind(null, "title")}/>
          <br/>
          <label>Description</label>
          <br/>
          <textarea value = {this.props.data.description} onChange={this.props.handleChange.bind(undefined,"description")} rows="6"/>
          <br/>
          <button onClick={() => this.props.goto("/")}>Cancel</button>
          <button onClick={validator}>Next</button>
        </div>
      </div>
    );
  };
}

export default CreateBasicInfo;
