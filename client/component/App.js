import React, {Component, cloneElement} from "react";
// import {Link} from "react-router";
import {Router, Route, Link, browserHistory, hashHistory, IndexRoute} from "react-router";


class App extends Component {
  render() {
    return (
      <div>
        <ul>
          <li>
            <Link to="/record/projects">기록하기</Link>
          </li>
          <li>
            <Link to="/create/basicinfo">새 프로젝트</Link>
          </li>
          <li>
            <Link to="/history/projects">히스토리</Link>
          </li>
          <li>
            <Link to="/recommendation/projects">추천</Link>
          </li>
        </ul>
      </div>
    )
  }
};

export default App;
