import React, {Component, cloneElement} from "react";
import {Router, Route, Link, browserHistory, hashHistory, IndexRoute} from "react-router";
import ReactDOM from "react-dom";

import AppContainer from "./container/AppContainer";
import App from "./component/App";
import ProjectList from "./component/ProjectList";
import ProjectDetail from "./component/ProjectDetail";
import ProjectDetailContainer from "./container/ProjectDetailContainer";
import RecordComplete from "./component/RecordComplete";

import CreateDate from "./component/CreateDate";
import CreateComplete from "./component/CreateComplete";
import CreateBasicInfo from "./component/CreateBasicInfo";

import HistoryList from "./component/HistoryList";
import HistoryDetail from "./component/HistoryDetail";


ReactDOM.render(
  (
  <Router history={browserHistory}>
    <Route component={AppContainer}>
      <Route path="/" component={App}/>

    {/* Record */}
        <Route path="/record/projects" component={ProjectList}/>
        <Route path="/record/project/:id" component={ProjectDetailContainer}/>
        <Route path="/record/complete" component={RecordComplete}/>

    {/* Create */}
        <Route path="/create/basicinfo" component={CreateBasicInfo}/>
        <Route path="/create/date" component={CreateDate}/>
        <Route path="/create/complete" component={CreateComplete}/>

    {/* History */}
        <Route path="/history/projects" component={HistoryList}/>
        <Route path="/history/project/:id" component={HistoryDetail}/>

    {/* Recommendation */}
        {/*<Route path="recommendation" component={}/>*/}
        {/*<Route path="recommendation/projects" component={}/>*/}

    </Route>
  </Router>
  ), document.getElementById("container"));
