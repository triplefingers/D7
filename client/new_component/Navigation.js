import React, {Component} from "react";

class Navigation extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
  }

  toggleSidebar() {
    $('#sidebar').css("left", "0%");
  }

  clickHome() {
    this.props.data._save({selectedMain: "recent"});
    this.props.data.goto("/");
  }

  render() {

    const buttonStyle = {
      display: "inline",
      marginRight: "25%"
    }

    const navigationStyle = {
      background: "#BF8C6F"
    }

    return (
      <div>
        <div style={navigationStyle}>
          <button style={buttonStyle} onClick={() => this.toggleSidebar()}>side</button>
          <button style={buttonStyle} onClick={this.clickHome.bind(this)}>D7</button>
          <button style={buttonStyle} onClick={() => this.props.data.goto("/new")}>new</button>
        </div>
        <div style={{display:"none"}}>
          Save Complete!
        </div>
      </div>
    );
  }
}

export default Navigation;
