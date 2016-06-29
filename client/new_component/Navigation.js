import React, {Component} from "react";

class Navigation extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
  }

  render() {
    return (
      <div>
        <div>
          <button>menu</button>
          <span>D7</span>
          <button onClick={this.props.data.goto.bind(null, "/write")}>write</button>
        </div>
        <div style={{display:"none"}}>
          Save Complete!
        </div>
      </div>
    );
  }
}

export default Navigation;