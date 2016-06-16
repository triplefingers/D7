import React, {Component, cloneElement} from "react";
import {Router, Route, Link, browserHistory, hashHistory, IndexRoute} from "react-router";
import helpers from "../helpers/helpers.js";

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

  render() {
    var injection = {};
    injection.data = this.state;
    injection.handleChange = this.handleChange.bind(this);
    injection.goto = this.goto.bind(this);
    injection.convertNumDateToFullString = helpers.convertNumDateToFullString;

    var child = this.props.children && React.cloneElement(this.props.children, injection);

    return child;
  };
};

CreateContainer.contextTypes = {
  router: () => React.PropTypes.func.isRequired
};

export default CreateContainer
