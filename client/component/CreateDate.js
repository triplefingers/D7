import React, {Component} from "react";
import {Router, Route, Link, browserHistory, hashHistory, IndexRoute} from "react-router";


class CreateDate extends Component {
  constructor(props) {
    super(props);
  };

  render() {

    return (
      <div>
        <label>Title</label><input type="text" value="title"/>
      </div>


    );
  };
}

export default CreateDate;
