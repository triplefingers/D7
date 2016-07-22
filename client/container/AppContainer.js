import React, {Component, cloneElement} from "react";
import {Router, Route, Link, browserHistory, hashHistory, IndexRoute} from "react-router";
import axios from "axios";
import $ from "jquery";
import Actions from "../action/Actions";

class AppContainer extends Actions {
  constructor() {
    super();
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
      currency: "won",
      loggedIn: false,
    };
  };

  componentWillMount() {
    /* Check if session exists */
    this.checkIfLogined();
  }

  componentDidMount() {
    window.publicIds = [];
    console.log("AppContainer Mounted :)");
  };

  render() {
    const injection = {};

    injection.data = this.state;

    /* For App */
    injection.reset = this.reset.bind(this);
    injection.checkIfLogined = this.checkIfLogined.bind(this);
    injection.calcWindowSize = this.calcWindowSize.bind(this);

    /* For Auth */
    injection.logout = this.logout.bind(this);

    /* For Navigation Bar */
    injection.navAlert = this.navAlert.bind(this);

    /* For Record */
    injection.saveNewProject = this.saveNewProject.bind(this);
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

    const child = this.props.children && React.cloneElement(this.props.children, injection);

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
