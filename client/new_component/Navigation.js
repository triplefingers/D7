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
          <button>write</button>
        </div>
        <div style={{display:"none"}}>
          Save Complete!
        </div>
      </div>
    );
  }
}

export default Navigation;