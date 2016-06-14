import React, {Component, cloneElement} from "react";
import {Router, Route, Link, browserHistory, hashHistory, IndexRoute} from "react-router";
import ReactDOM from "react-dom";

import Test from "./component/Test";
import App from "./component/App";
import RecordContainer from "./component/RecordContainer";
import ProjectList from "./component/ProjectList";
import ProjectDetail from "./component/ProjectDetail";
import RecordComplete from "./component/RecordComplete";

import CreateContainer from "./component/CreateContainer";
import CreateDate from "./component/CreateDate";
import CreateComplete from "./component/CreateComplete";
import CreateBasicInfo from "./component/CreateBasicInfo";

ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={App}/>
    <Route component={RecordContainer}>
      <Route path="/record/projects" component={ProjectList}/>
      <Route path="/record/project/:id" component={ProjectDetail}/>
      <Route path="/record/complete" component={RecordComplete}/>
    </Route>

    <Route component={CreateContainer}>
      <Route path="/create/basicinfo" component={CreateBasicInfo}/>
      <Route path="/create/date" component={CreateDate}/>
      <Route path="/create/complete" component={CreateComplete}/>
    </Route>
    {/*<Route path="/record/projects" component={RecordContainer}/>*/}


    {/*<Route path="/" component={App}>
      <Route path="/record/projects" component={RecordContainer}/>
    </Route>*/}

    {/*<Route path="/record/projects/:id" component={}/>
    <Route path="/record/complete" component={}/>

    <Route path="create/basicinfo" component={}/>
    <Route path="create/date" component={}/>
    <Route path="create/complete" component={}/>

    <Route path="history" component={}/>
    <Route path="history/projects" component={}/>
    <Route path="history/projects/:id" component={}/>

    <Route path="recommendation" component={}/>
    <Route path="recommendation/projects" component={}/>*/}



  </Router>
), document.getElementById("container"));
