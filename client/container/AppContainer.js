import React, {Component, cloneElement} from "react";
import {Router, Route, Link, browserHistory, hashHistory, IndexRoute} from "react-router";
import axios from "axios";
import $ from "jquery";

class AppContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedMain: "recent",
      text: "",
      description: "",
      title: "",
      startAt: "",
      cardNumber: "",
      expiry: "",
      birth: "",
      pwd2digit: "",
      amount: "",
      currency: "won"
    };
  };

  // Check if session exists
  componentWillMount() {
    this.checkIfLogined();
  }

  componentDidMount() {
    window.publicIds = [];
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
    // console.log("EVENT: ", event);
    let data = {};
    data[what] = event.target.value;
    this.setState(data);
  };

  saveNewProject(userId, title, desc, startDate, payment, image) {
    axios.post("/api/newproject", {
      userId : userId,
      title: title,
      description: desc,
      startAt: startDate,
      payment: JSON.stringify(payment),
      image: image
    })
    .then((res) => {
      console.log("saveNewProject success: ", res);
      //store {id, title, description, onDay} to this.state
      this._save({
        id: res.data.id,
        onDay: res.data.onDay
      });
      this.goto("/");
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
      this.setState({
        onGoing: res.data
      });
    });
  };

  _save(dataObject) {
    // dataObject should be below
    // {<keyname>: <value>}
    console.log("data in _save is ", dataObject);
    this.setState(dataObject);
  };

  /*newProject : object (title, description, startAt - 10자리 string)*/
  saveDayDetail(userId, id, onDay, text, publicIds, newProject, payment) {
    axios.post("/api/record", {
      userId : userId,
      id: id,
      onDay: onDay,
      text: text,
      publicIds: JSON.stringify(publicIds),
      newProject: JSON.stringify(newProject),
      payment: JSON.stringify(payment)
    })
    .then((res) => {
      console.log("saveDayDetail success: ", res.data);
      this.goto("/");
    })
    .catch((err) => {
      console.error("Error occured while saving DayDetail");
    });
  };

  saveExistingProject(projectId, startAt, payment) {
    axios.post("/api/newuserproject", {
      projectId: projectId,
      startAt: startAt,
      payment: JSON.stringify(payment)
    })
    .then((res) => {
      console.log("start existing project success: ", res.data);
      this.goto("/");
    })
    .catch((err) => {
      console.error("Error occurred while starting existing project");
    });
  }

  // For History
  fetchAllProjects() {
    axios.get("/api/projects/all")
    .then((res) => {
      this.setState({
        history: res.data
      });
      console.log('HISTORY', this.state.history);
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
      this.setState({
        dayDetails: res.data
      });
      console.log(this.state.dayDetails);
      this.goto("/history/project/" + userProjectId);
    })
    .catch((err) => {
      console.error("Error occured while fetching project dayDetails: ", err);
    });
  }

  // For recommendation
  fetchRecommendation() {
    axios.get("/api/projects/recommended", {
      params: {
        page : this.state.suggestionPage+1
      }
    })
    .then((res) => {
      if(this.state.suggestionPage===0){
        this.setState({
          recommended: res.data,
          suggestionPage: this.state.suggestionPage+1
        });
      } else {
        this.setState({
          recommended: this.state.recommended.concat(res.data),
          suggestionPage: this.state.suggestionPage+1
        });
      }
      this._save({suggestionPage: this.state.suggestionPage+1});
    })
    .catch((err) => {
      console.error("Error occured while fetching recommended projects", err);
    });
  };

  /* FETCH RECENT POSTS IN MAIN PAGE */
  fetchRecentPosts() {
    axios.get("/api/posts/recent", {
      params: {
        page : this.state.recentPage+1
      }
    })
    .then((res) => {
      // console.log("Recent Posts: ", res);
      if(this.state.recentPage===0){
        this.setState({
          recent: res.data,
          recentPage: this.state.recentPage+1
        });
      } else {
        this.setState({
          recent: this.state.recent.concat(res.data),
          recentPage: this.state.recentPage+1
        });
      }
      this._save({recentPage: this.state.recentPage+1});
    })
    .catch((err) => {
      console.error("Error occurred while fetching recent posts: ", err);
    });
  }

  /* FETCH POPULAR POSTS IN MAIN PAGE */
  fetchPopularPosts() {
    axios.get("/api/posts/popular", {
      params: {
        page : this.state.popularPage+1
      }
    })
    .then((res) => {
      // console.log("Popular Posts: ", res);
      if(this.state.popularPage===0){
        this.setState({
          popular: res.data,
          popularPage: this.state.popularPage+1
        });
      } else {
        this.setState({
          popular: this.state.popular.concat(res.data),
          popularPage: this.state.popularPage+1
        });
      }
      this._save({popularPage: this.state.popularPage+1});
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
      this.setState({
        project: res.data
      });
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
      this.setState({
        userproject: res.data
      });
    })
    .catch((err) => {
      console.error("Error occurred while fetching userproject detail: ", err);
    });
  }

  /* FETCH USER DATA */
  fetchUser() {
    axios.get("/api/user")
    .then((res) => {
      console.log("User: ", res);
      this.setState({user: res.data});
    })
    .catch((err) => {
      console.error("Error occurred while fetching user data: ", err);
    });
  }

  /* POST EDITED USER DATA */
  saveUserData(data) {
    axios.post("/api/user", data)
    .then((res) => {
      console.log("User: ", res);
      // this.setState({user: res.data});
    })
    .catch((err) => {
      console.error("Error occurred while fetching project detail: ", err);
    });
  }

  /* FETCH WISHLIST PROJECTS */
  fetchWishList() {
    axios.get("/api/projects/wish")
    .then((res) => {
      this.setState({wishList: res.data});
    })
    .catch((err) => {
      console.error("Error occurred while fetching wish list: ", err);
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
    injection.saveExistingProject = this.saveExistingProject.bind(this);

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

    /* For user data */
    injection.fetchUser = this.fetchUser.bind(this);
    injection.saveUserData = this.saveUserData.bind(this);

    /* For Wish List */
    injection.fetchWishList = this.fetchWishList.bind(this);

    let child = this.props.children && React.cloneElement(this.props.children, injection);

    return (
      <div>
        {child}
      </div>);
  }
}

AppContainer.contextTypes = {
  router: React.PropTypes.object
};


export default AppContainer;
