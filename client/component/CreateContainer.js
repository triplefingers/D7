import React, {Component, cloneElement} from "react";
import {Router, Route, Link, browserHistory, hashHistory, IndexRoute} from "react-router";

class CreateContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {title: 1234};
  };

  changetitle() {
    this.setState({title: this.state.title * 2});
  };

  save(completeUrl) {
    alert("Save done");
    this.goto(completeUrl);
  };

  goto(url) {
    url = url !== undefined ? String(url) : "/";
    this.props.history.push(url);
    // this.context.router.enqueue(url);

  };

  render() {
    var injection = {}
    injection.title = this.state.title;
    injection.changetitle = this.changetitle.bind(this);
    injection.save = this.save.bind(this);
    injection.goto = this.goto.bind(this);

    var child = this.props.children && React.cloneElement(this.props.children, injection);

    return (
      child
    );
  };
}

export default CreateContainer
