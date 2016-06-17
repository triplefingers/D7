import React, {Component, cloneElement} from "react";
import {Router, Route, Link, browserHistory, hashHistory, IndexRoute} from "react-router";
import axios from "axios";

class CreateContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  };

  goto(url) {
    url = url !== undefined ? String(url) : "/";
    // this.props.history.push(url);
    this.context.router.push(url);
  };

  handleChange(what, event) {
    console.log("what is ", what);
    let data = {}
    data[what] = event.target.value
    this.setState(data);
  };

  saveNewProject(title, desc, startDate) {
    axios.post("/api/record", {
      title: title,
      description: desc,
      startAt: startDate
    })
    .then((res) => {
      console.log("saveNewProject success: ", res);
      //store {id, title, description, onDay} to this.state
      this.goto("/create/complete")
    })
    .catch((err) => {
      console.error("Error occured while saving new Project");
    })
  }

  render() {
    var injection = {};
    injection.saveNewProject = this.saveNewProject.bind(this);
    injection.data = this.state;
    injection.handleChange = this.handleChange.bind(this);
    injection.goto = this.goto.bind(this);

    var child = this.props.children && React.cloneElement(this.props.children, injection);

    return child;
  };
};

CreateContainer.contextTypes = {
  router: () => React.PropTypes.func.isRequired
};

export default CreateContainer
