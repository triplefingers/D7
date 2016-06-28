import React, {Component} from "react";

class Tabbar extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {

  }

  render() {
    return (
      <div>
        <ul>
          {/* Define onClick callbacks later */}
          <li><a>Recent</a></li>
          <li><a>Popular</a></li>
          <li><a>Suggestion</a></li>
        </ul>
      </div>
    );
  }
}

export default Tabbar;