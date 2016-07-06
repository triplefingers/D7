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

    if(this.props.data.loggedIn){
      return (
        <div>
          <SideBar data={injection} className="sidebar" />
          <div>
            <Navigation data={injection}/>
            {child}
          </div>
        </div>
      );
    } else {
      return <div>Loading...</div>
    }
  }
}

export default App;
