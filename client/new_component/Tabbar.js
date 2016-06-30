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
          <li><a onClick={this.props.switchContents.bind(this, "recent")}>Recent</a></li>
          <li><a onClick={this.props.switchContents.bind(this, "popular")}>Popular</a></li>
          <li><a onClick={this.props.switchContents.bind(this, "suggestion")}>Suggestion</a></li>
        </ul>
      </div>
    );
  }
}

export default Tabbar;
