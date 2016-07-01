import "./assets/style.css";

import React, {Component, cloneElement} from "react";
import {Router, Route, Link, browserHistory, hashHistory, IndexRoute} from "react-router";
import ReactDOM from "react-dom";

import AppContainer from "./container/AppContainer";
/* Original AppContainer is now Appcontainer_original */

// import App from "./component/App";

// import ProjectList from "./component/ProjectList";
// import ProjectDetailContainer from "./container/ProjectDetailContainer";
// import ProjectDetail from "./component/ProjectDetail";
// import RecordComplete from "./component/RecordComplete";

// import CreateDate from "./component/CreateDate";
// import CreateComplete from "./component/CreateComplete";
// import CreateBasicInfo from "./component/CreateBasicInfo";
// import Login from "./component/Login";

// import HistoryList from "./component/HistoryList";
// import HistoryDetail from "./component/HistoryDetail";

// import Recommendation from "./component/Recommendation";

// ReactDOM.render(
//   (
//   <Router history={browserHistory}>
//     <Route component={AppContainer}>
//       <Route path="/" component={Login}/>
//       <Route path="/home" component={App}/>

//     {/* Record */}
//         <Route path="/record/projects" component={ProjectList}/>
//         <Route path="/record/project/:id" component={ProjectDetailContainer}/>
//         <Route path="/record/complete" component={RecordComplete}/>

//     {/* Create */}
//         <Route path="/create/basicinfo" component={CreateBasicInfo}/>
//         <Route path="/create/date" component={CreateDate}/>
//         <Route path="/create/complete" component={CreateComplete}/>

//     {/* History */}
//         <Route path="/history/projects" component={HistoryList}/>
//         <Route path="/history/project/:id" component={HistoryDetail}/>

//     {/* Recommendation */}
//         <Route path="/recommendation/projects" component={Recommendation}/>

//     </Route>
//   </Router>
//   ), document.getElementById("container"));


import App from "./new_component/App";
import Login from "./new_component/Login";
import Main from "./new_component/Main";
import New from "./new_component/New";
import SelectProject from "./new_component/SelectProject";
import ProjectDetail from "./new_component/ProjectDetail";
import UserProjectDetail from "./new_component/UserProjectDetail";
import CreateProject from "./new_component/CreateProject";
import CreateDate from "./new_component/CreateDate";
import LeaveHistory from "./new_component/LeaveHistory";

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
      </Route>

    </Route>
  </Router>
  ), document.getElementById("container"));
