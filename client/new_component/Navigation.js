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
  //
  // clickHome() {
  //   this.props.data._save({selectedMain: "recent"});
  //   this.props.data.goto("/");
  // }

  render() {

    // const buttonStyle = {
    //   display: "inline",
    //   marginRight: "25%"
    // }

    const navigationStyle = {
      background: "#BF8C6F",
      textAlign: "center",
      fontSize: "20px",
      color: "black"
    };

    const navCenter = {
      display: "inline-block",
      marginTop: "5px",
      marginBottom: "0"
    };
    const navLeft = {
      marginLeft: "5px"
    };
    const navRight = {
      marginRight: "5px"
    };

    return (
      <div>
        <nav style={navigationStyle} className="navbar-header">
            <a className="navbar-btn pull-left glyphicon glyphicon-menu-hamburger" style={navLeft} onClick={() => this.toggleSidebar()} ></a>
            <a className="navbar-btn pull-center" style={navCenter}
              onClick={() => {this.props.data.goto("/"); this.props.data._save({selectedMain: "recent"})}}>D7</a>
            <a className="navbar-btn pull-right glyphicon glyphicon-edit"
              style={navRight} onClick={() => this.props.data.goto("/new")}></a>
        </nav>
        <div style={{display:"none"}}>
          Save Complete!
        </div>
      </div>
    );
  }
}

export default Navigation;
