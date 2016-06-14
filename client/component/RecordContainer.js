import React, {Component, cloneElement} from "react";
import {Link} from "react-router";

import ProjectList from "./ProjectList";

class RecordContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {title: "fingers", child: <div>hello</div>, flag: true};
  };

  changetitle() {
    this.setState({title: "hands"});
  };
  force() {
    this.setState({flag: !this.state.flag});
  };
  // componentDidMount() {
  //   // this.child = this.props.children && React.cloneElement(this.props.children, {title: this.state.title, changetitle: this.changetitle.bind(this)});
  //   this.setState({child: this.props.children && React.cloneElement(this.props.children, {title: this.state.title, changetitle: this.changetitle.bind(this), force: this.force.bind(this)})});
  // }
  render() {
    var child = this.props.children && React.cloneElement(this.props.children, {title: this.state.title, changetitle: this.changetitle.bind(this), force: this.force.bind(this)});
    // console.log(this.props.children);
    return (
      child
    );
  };
}

export default RecordContainer
