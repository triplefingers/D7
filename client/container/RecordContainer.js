import React, {Component, cloneElement} from "react";
import {Router, Route, Link, browserHistory, hashHistory, IndexRoute} from "react-router";
import axios from "axios";

class RecordContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {data: null}
  };

  componentDidMount() {
    console.log("RecordContainer Mounted :)");
  }

  fetchOngoingProjects() {
    axios.get("/api/projects", {
      params: {
          type: "ongoing"
      }
    })
    .then((res) => {
      // console.log(res);
      this.setState({data: res.data});
      // console.log("state changed? ", this.state.data);
    })
  };

  saveDayDetail(id, onDay, text) {
    axios.post("/api/record", {
      id: id,
      onDay: onDay,
      text: text
    })
    .then((res) => {
      console.log("saveDayDetail success: ", res);
      this.goto("/record/complete")
    })
    .catch((err) => {
      console.error("Error occured while saving DayDetail");
    })
  }

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
    let injection = {};
    injection.save = this.save.bind(this); // to del
    injection.goto = this.goto.bind(this);
    injection.data = this.state.data;
    injection.fetchOngoingProjects = this.fetchOngoingProjects.bind(this);
    injection.saveDayDetail = this.saveDayDetail.bind(this);




    let child = this.props.children && React.cloneElement(this.props.children, injection);

    return (
      child
    );
  };
}

export default RecordContainer
