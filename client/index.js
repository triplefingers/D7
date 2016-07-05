import "./assets/style.css";

import React, {Component, cloneElement} from "react";
import {Router, Route, Link, browserHistory, hashHistory, IndexRoute} from "react-router";
import ReactDOM from "react-dom";

import AppContainer from "./container/AppContainer";
/* Original AppContainer is now Appcontainer_original */

import App from "./component/App";
import Login from "./component/Login";
import Main from "./component/Main";
import New from "./component/New";
import SelectProject from "./component/SelectProject";
import ProjectDetail from "./component/ProjectDetail";
import UserProjectDetail from "./component/UserProjectDetail";
import CreateProject from "./component/CreateProject";
import CreateDate from "./component/CreateDate";
import LeaveHistory from "./component/LeaveHistory";
import History from "./component/History";
import WishList from "./component/WishList";
import Settings from "./component/Settings";
import Payment from "./component/Payment";

ReactDOM.render(
  (
  <Router history={browserHistory}>
    <Route component={AppContainer}>
      <Route path="/login" component={Login}/>
      <Route component={App}>
        <Route path="/" component={Main}/>
        <Route path="/new" component={New}/>
        <Route path="/select" component={SelectProject}/>
        <Route path="/create" component={CreateProject}/>
        <Route path="/write" component={LeaveHistory}/>
        <Route path="/create/date" component={CreateDate}/>
        <Route path="/project" component={ProjectDetail}/>
        <Route path="/userproject" component={UserProjectDetail}/>
        <Route path="/history" component={History}/>
        <Route path="/wishlist" component={WishList}/>
        <Route path="/settings" component={Settings}/>
        <Route path="/payment" component={Payment}/>
      </Route>

    </Route>
  </Router>
  ), document.getElementById("container"));
