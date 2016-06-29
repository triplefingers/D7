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
          <button>side</button>
          <button onClick={() => this.props.data.goto("/")}>D7</button>
          <button onClick={() => this.props.data.goto("/write")}>write</button>
        </div>
        <div style={{display:"none"}}>
          Save Complete!
        </div>
      </div>
    );
  }
}

export default Navigation;