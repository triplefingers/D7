import React, {Component, cloneElement} from "react";
import Navigation from "./Navigation";
import SideBar from "./SideBar";
import axios from "axios";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const injection = {};
    Object.assign(injection, this.props);

    const child = this.props.children && React.cloneElement(this.props.children, injection);

    return (
      <div>
        <Navigation data={injection}/>
        <SideBar data={injection} className="sidebar" />
        {child}
      </div>
    );
  }
}

export default App;
