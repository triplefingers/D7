import React, {Component, cloneElement} from "react";
import {Router, Route, Link, browserHistory, hashHistory, IndexRoute} from "react-router";
import axios from "axios";
import $ from "jquery";

class AppContainer extends Component {
  constructor(props) {
    super(props);
    window.publicIds = [];
    this.state = {list: null, selectedMain: "recent"};
  };

  // Check if session exists
  componentWillMount() {
    this.checkIfLogined();
  }

  componentDidMount() {
    console.log("AppContainer Mounted :)");
  };

  // For App
  checkIfLogined() {
    axios.get("/api/checklogin")
    .then((res) => {
      console.log("already logined");
      this.goto("/");
    })
    .catch((err) => {
      console.log("error in checkIfLogined: ", err);
      // this.goto(err.data.path);
      this.goto("/login");
    });
  };

  reset(keys) {
    if(!keys){
      const prevState = this.state;
      const nextState = {};
      for (let key in prevState) {
        nextState[key] = undefined;
      }
      this.setState(nextState);
    } else {
      const nextState = {};
      for(let i=0; i<keys.length; i++) {
        nextState[keys[i]] = undefined;
      }
    this.setState(nextState);
    }
  };

  calcWindowSize(whichSide) {
    // argument "h" means height, "w" means width
    if (typeof whichSide !== "string") {
      return null;
    }
    let result = null;
    whichSide = whichSide.toLowerCase();

    if (whichSide === "h" || whichSide === "height") {
      console.log("innerHeight is ", innerHeight);
      result = innerHeight;
    } else if (whichSide === "w" || whichSide === "width") {
      console.log("innerWidth is ", innerWidth);
      result = innerWidth;
    }
    return result;
  }


  // For Create
  goto(url) {
    url = url !== undefined ? String(url) : "/";
    // this.props.history.push(url);
    this.context.router.push(url);
  };

  // validates args with callback
  // callback should return true/false, and it will pass args as its argument
  // if even one of callback(arg[i]) returns false, validateAll will return false
  // if all of callback(args[i]) are true, validateAll will return true;
  validateAll(callback, ...args) {
    let isValid = true;
    args.forEach((item) => {
      if (!callback(item)) isValid = false;
    });
    return isValid;
  };

  handleChange(what, event) {
    console.log("EVENT: ", event);
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
    axios.get("/api/projects/ongoing", {
      params: {
        userId : userId
      }
    })
    .then((res) => {
      this.setState({onGoing: res.data});
    });
  };

  _save(dataObject) {
    // dataObject should be below
    // {<keyname>: <value>}
    console.log("data in _save is ", dataObject);
    this.setState(dataObject);
  };

  saveDayDetail(userId, id, onDay, text, publicIds) {
    axios.post("/api/record", {
      userId : userId,
      id: id,
      onDay: onDay,
      text: text,
      publicIds: JSON.stringify(publicIds)
    })
    .then((res) => {
      console.log("saveDayDetail success: ", res);
      this.goto("/");
    })
    .catch((err) => {
      console.error("Error occured while saving DayDetail");
    });
  };

  // For History
  fetchAllProjects(userId) {
    axios.get("/api/projects/all", {
      params: {
        userId : userId
      }
    })
    .then((res) => {
      this.setState({list: res.data});
      console.log(this.state.list);
    })
    .catch((err) => {
      console.error("Error occured while fetching all projects: ", err);
    });
  };

  // userId to be added
  fetchDayDetail(userId, userProjectId) {
    console.log("here in fetchdaydetail");
    axios.get("/api/project/", {
      params: {
        userId: userId,
        id: userProjectId
      }
    })
    .then((res) => {
      // App Container 에 detail 데이터 추가
      this.setState({dayDetails: res.data});
      console.log(this.state.dayDetails);
      this.goto("/history/project/" + userProjectId);
    })
    .catch((err) => {
      console.error("Error occured while fetching project dayDetails: ", err);
    });
  }

  // For recommendation
  fetchRecommendation(userId) {
    axios.get("/api/projects/recommended", {
      params: {
        userId : userId
      }
    })
    .then((res) => {
      this.setState({recommended: res.data});
    })
    .catch((err) => {
      console.error("Error occured while fetching recommended projects", err);
    });
  };

  /* FETCH RECENT POSTS IN MAIN PAGE */
  fetchRecentPosts() {
    axios.get("/api/posts/recent")
    .then((res) => {
      // console.log("Recent Posts: ", res);
      this.setState({recent: res.data});
    })
    .catch((err) => {
      console.error("Error occurred while fetching recent posts: ", err);
    });
  }

  /* FETCH POPULAR POSTS IN MAIN PAGE */
  fetchPopularPosts() {
    axios.get("/api/posts/popular")
    .then((res) => {
      // console.log("Popular Posts: ", res);
      this.setState({popular: res.data});
    })
    .catch((err) => {
      console.error("Error occurred while fetching popular posts: ", err);
    });
  }

  /* FETCH PROJECT DETAIL PAGE */
  fetchProjectDetail(projectId) {
    axios.get("/api/project", {
      params: {
        projectId : projectId
      }
    })
    .then((res) => {
      // console.log("Project detail: ", res);
      this.setState({project: res.data});
    })
    .catch((err) => {
      console.error("Error occurred while fetching project detail: ", err);
    });
  }

  /* FETCH USERPROJECT DETAIL PAGE */
  fetchUserProjectDetail(userProjectId) {
    axios.get("/api/userproject", {
      params: {
        userProjectId : userProjectId
      }
    })
    .then((res) => {
      // console.log("Userproject detail: ", res);
      this.setState({userproject: res.data});
    })
    .catch((err) => {
      console.error("Error occurred while fetching project detail: ", err);
    });
  }

  render() {
    let injection = {};

    /* For App */
    injection.reset = this.reset.bind(this);
    injection.checkIfLogined = this.checkIfLogined.bind(this);
    injection.calcWindowSize = this.calcWindowSize.bind(this);

    /* For Record */
    injection.saveNewProject = this.saveNewProject.bind(this);
    injection.data = this.state;
    injection.handleChange = this.handleChange.bind(this);
    injection.goto = this.goto.bind(this);

    /* For Create */
    injection._save = this._save.bind(this);
    injection.fetchOngoingProjects = this.fetchOngoingProjects.bind(this);
    injection.saveDayDetail = this.saveDayDetail.bind(this);
    injection.validateAll = this.validateAll.bind(this);

    /* For History */
    injection.fetchAllProjects = this.fetchAllProjects.bind(this);
    injection.fetchDayDetail = this.fetchDayDetail.bind(this);

    /* For recommendation */
    injection.fetchRecommendation = this.fetchRecommendation.bind(this);

    /* For main */
    injection.fetchRecentPosts = this.fetchRecentPosts.bind(this);
    injection.fetchPopularPosts = this.fetchPopularPosts.bind(this);

    /* For detail pages */
    injection.fetchProjectDetail = this.fetchProjectDetail.bind(this);
    injection.fetchUserProjectDetail = this.fetchUserProjectDetail.bind(this);

    let child = this.props.children && React.cloneElement(this.props.children, injection);

    return (
      <div>
        {child}
      </div>);
  }
}

AppContainer.contextTypes = {
  router: () => React.PropTypes.func.isRequired
};


export default AppContainer;
