import React, {Component, cloneElement} from "react";
// import {Link} from "react-router";
import {Router, Route, Link, browserHistory, hashHistory, IndexRoute} from "react-router";

class App extends Component {

  // Everytime App is mounted, resets the current data passed by AppContainer
  componentDidMount() {
    this.props.reset();
  }

  render() {
    return (
      <div>
        <ul>
          <li>
            <button><Link to="/record/projects">기록하기</Link></button>
          </li>
          <li>
            <button><Link to="/create/basicinfo">새 프로젝트</Link></button>
          </li>
          <li>
            <button><Link to="/history/projects">히스토리</Link></button>
          </li>
          <li>
            <button><Link to="/recommendation/projects">추천</Link></button>
          </li>
        </ul>
      </div>
    );
  }
};

export default App;
