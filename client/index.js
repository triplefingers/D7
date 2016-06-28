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

ReactDOM.render(
  (
  <Router history={browserHistory}>
    <Route component={AppContainer}>
      <Route path="/login" component={Login}/>
      <Route component={App}>
        <Route path="/" component={Main}/>
      </Route>

    </Route>
  </Router>
  ), document.getElementById("container"));
