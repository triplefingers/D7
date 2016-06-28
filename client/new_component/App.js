import React, {Component, cloneElement} from "react";
import Navigation from "./Navigation";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    // fetch all projects
  }

  render() {
    const injection = {};

    // Main
    // some code

    const child = this.props.children && React.cloneElement(this.props.children, injection);

    return (
      <div>
        <Navigation />
        {child}
      </div>
    );
  }
}

export default App;