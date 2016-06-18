import React, {Component, cloneElement} from "react";
import {Router, Route, Link, browserHistory, hashHistory, IndexRoute} from "react-router";
import axios from "axios";

class AppContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {list: null};
  };

  componentDidMount() {
    console.log("RecordContainer Mounted :)");
  };

  // For App
  reset() {
    var prevState = this.state;
    var nextState = {};
    for (let key in prevState) {
      nextState[key] = undefined;
    }
    this.setState(nextState);
  };


  // For Create
  goto(url) {
    url = url !== undefined ? String(url) : "/";
    // this.props.history.push(url);
    this.context.router.push(url);
  };

  validateAll(callback, ...args) {
    let isValid = true;
    args.forEach((item) => {
      if (!callback(item)) isValid = false;
    })
    return isValid;
  };

  handleChange(what, event) {
    console.log("what is ", what);
    let data = {};
    data[what] = event.target.value;
    this.setState(data);
  };

  saveNewProject(userId, title, desc, startDate) {
    axios.post("/api/newproject", {
      userId : userId,
      title: title,
      description: desc,
      startAt: startDate
    })
    .then((res) => {
      console.log("saveNewProject success: ", res);
      //store {id, title, description, onDay} to this.state
      this._save({id: res.data.id, onDay: res.data.onDay});
      this.goto("/create/complete");
    })
    .catch((err) => {
      console.error("Error occured while saving new Project");
    });
  };

  // For Record
  fetchOngoingProjects(userId) {
    axios.get("/api/projects", {
      params: {
        userId : userId,
        type: "ongoing"
      }
    })
    .then((res) => {
      this.setState({list: res.data});
    });
  };

  _save(dataObject) {
    // dataObject should be below
    // {<keyname>: <value>}
    console.log("data in _save is ", dataObject);
    this.setState(dataObject);
  };

  saveDayDetail(userId, id, day, text) {
    axios.post("/api/record", {
      userId : userId,
      id: id,
      day: day,
      text: text
    })
    .then((res) => {
      console.log("saveDayDetail success: ", res);
      this.goto("/record/complete");
    })
    .catch((err) => {
      console.error("Error occured while saving DayDetail");
    });
  };

  // For History
  fetchAllProjects(userId) {
    axios.get("/api/projects", {
      params: {
        userId : userId,
        type: "all"
      }
    })
    .then((res) => {
      this.setState({list: res.data});
      console.log(this.state.list);
    })
    .catch((err) => {
      console.error("Error occured while fetching all projects");
    });
  };

  // For recommendation
  fetchRecommendation(userId) {
    axios.get("/api/projects", {
      params: {
        userId : userId,
        type: "recommended"
      }
    })
    .then((res) => {
      this.setState({list: res.data});
      console.log(this.state.list);
    })
    .catch((err) => {
      console.error("Error occured while fetching recommended projects");
    });
  };

  render() {
    let injection = {};

    // For App
    injection.reset = this.reset.bind(this);

    // For Record
    injection.saveNewProject = this.saveNewProject.bind(this);
    injection.data = this.state;
    injection.handleChange = this.handleChange.bind(this);
    injection.goto = this.goto.bind(this);

    // For Create
    injection._save = this._save.bind(this);
    injection.fetchOngoingProjects = this.fetchOngoingProjects.bind(this);
    injection.saveDayDetail = this.saveDayDetail.bind(this);
    injection.validateAll = this.validateAll.bind(this);

    // For History
    injection.fetchAllProjects = this.fetchAllProjects.bind(this);

    // For recommendation
    injection.fetchRecommendation = this.fetchRecommendation.bind(this);

    let child = this.props.children && React.cloneElement(this.props.children, injection);

    return child;
  }
}

AppContainer.contextTypes = {
  router: () => React.PropTypes.func.isRequired
};


export default AppContainer;
