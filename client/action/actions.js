import React, {Component} from "react";
import {Router, Route, Link, browserHistory, hashHistory, IndexRoute} from "react-router";
import axios from "axios";
import $ from "jquery";

class Actions extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.checkIfLogined = function() {
      axios.get("/api/checklogin")
      .then((res) => {
        console.log("already logined");
        this.goto("/");
        this._save({loggedIn: true});
      })
      .catch((err) => {
        console.log("error in checkIfLogined: ", err);
        // this.goto(err.data.path);
        this.goto("/login");
      });
    };

    this.logout = function(){
      axios.get("/api/logout")
      .then((res) => {
        console.log(res.message);
        this.reset();
      }).then(() => {
        this._save({
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
          currency: "won",
          loggedIn: false
        });
        this.goto("/login");
      });
    };

    this.reset = function(keys) {
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

    this.calcWindowSize = function(whichSide) {
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
    };

    // For navigation
    /* Navigation bar alert msg */
    this.navAlert = function(msg) {
      console.log("navAlert.... msg is ", msg);
      this.setState({navAlertMsg: msg});
    };

    // For Create
    this.goto = function(url) {
      url = url !== undefined ? String(url) : "/";
      // this.props.history.push(url);
      this.context.router.push(url);
    };

    // validates args with callback
    // callback should return true/false, and it will pass args as its argument
    // if even one of callback(arg[i]) returns false, validateAll will return false
    // if all of callback(args[i]) are true, validateAll will return true;
    this.validateAll = function(callback, ...args) {
      let isValid = true;
      args.forEach((item) => {
        if (!callback(item)) isValid = false;
      });
      return isValid;
    };

    this.handleChange = function(what, event) {
      // console.log("EVENT: ", event);
      let data = {};
      data[what] = event.target.value;
      this.setState(data);
    };

    this.saveNewProject = function(userId, title, desc, startDate, payment, image) {
      return axios.post("/api/newproject", {
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
    this.fetchOngoingProjects = function(userId) {
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

    this._save = function(dataObject) {
      // dataObject should be below
      // {<keyname>: <value>}
      console.log("data in _save is ", dataObject);
      this.setState(dataObject);
    };

    /*newProject : object (title, description, startAt - 10자리 string)*/
    this.saveDayDetail = function(userId, id, onDay, text, publicIds, newProject, payment) {
      return axios.post("/api/record", {
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

    this.saveExistingProject = function(projectId, startAt, payment) {
      return axios.post("/api/newuserproject", {
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
    };

    // For History
    this.fetchAllProjects = function() {
      axios.get("/api/projects/all")
      .then((res) => {
        this.setState({
          history: res.data
        });
        console.log("HISTORY", this.state.history);
      })
      .catch((err) => {
        console.error("Error occured while fetching all projects: ", err);
      });
    };

    // userId to be added
    this.fetchDayDetail = function(userId, userProjectId) {
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
    };

    // For recommendation
    this.fetchRecommendation = function() {
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
      })
      .catch((err) => {
        console.error("Error occured while fetching recommended projects", err);
      });
    };

    /* FETCH RECENT POSTS IN MAIN PAGE */
    this.fetchRecentPosts = function() {
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
      })
      .catch((err) => {
        console.error("Error occurred while fetching recent posts: ", err);
      });
    };

    /* FETCH POPULAR POSTS IN MAIN PAGE */
    this.fetchPopularPosts = function() {
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
      })
      .catch((err) => {
        console.error("Error occurred while fetching popular posts: ", err);
      });
    };

    /* FETCH PROJECT DETAIL PAGE */
    this.fetchProjectDetail = function(projectId) {
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
    };

    /* FETCH USERPROJECT DETAIL PAGE */
    this.fetchUserProjectDetail = function(userProjectId) {
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
    };

    /* FETCH USER DATA */
    this.fetchUser = function() {
      axios.get("/api/user")
      .then((res) => {
        console.log("User: ", res);
        this.setState({user: res.data});
      })
      .catch((err) => {
        console.error("Error occurred while fetching user data: ", err);
      });
    };

    /* POST EDITED USER DATA */
    this.saveUserData = function(data) {
      axios.post("/api/user", data)
      .then((res) => {
        console.log("User: ", res);
        // this.setState({user: res.data});
      })
      .catch((err) => {
        console.error("Error occurred while fetching project detail: ", err);
      });
    };

    /* FETCH WISHLIST PROJECTS */
    this.fetchWishList = function() {
      axios.get("/api/projects/wish")
      .then((res) => {
        this.setState({wishList: res.data});
      })
      .catch((err) => {
        console.error("Error occurred while fetching wish list: ", err);
      });
    };

  }
}


export default Actions;
