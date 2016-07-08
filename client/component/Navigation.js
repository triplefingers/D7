import React, {Component} from "react";
import New from "./subcomponents/New";

class Navigation extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
  }

  toggleSidebar() {
    $('.sidebarBg').css("left", "0%");
    $('.sidebar').css("left", "0%");
  }

  clickHome() {
    this.props.data._save({selectedMain: "recent"});
    this.props.data.goto("/");
  }

  render() {

    // const buttonStyle = {
    //   display: "inline",
    //   marginRight: "25%"
    // }

    const navigationStyle = {
      background: "#181818",
      textAlign: "center",
      fontSize: "20px",
    };

    const navCenter = {
      display: "inline-block",
      marginTop: "5px",
      marginBottom: "0"
    };
    const navLeft = {
      marginLeft: "5px"
    };


    let msg = null;
    const navAlertMsg = this.props.data.data.navAlertMsg;
    console.log("------navAlertMsg is ",this.props);
    console.log("------navAlertMsg is ",navAlertMsg);

    if (navAlertMsg === "save") {
      msg = (
        <div className="alert success">
          Save Complete!
        </div>
      );
    } else if (navAlertMsg === "report") {
      console.log("----success");
      msg = (
        <div className="alert success">
          Report Complete!
        </div>
      );
    } else if (navAlertMsg === "error") {
      msg = (
        <div className="alert fail">
          Error!
        </div>
      );
    }{
      msg = null;
    }

    return (
      <div id="navigation">
        <nav style={navigationStyle} className="navbar-header">
          <a className="navbar-btn pull-left glyphicon glyphicon-menu-hamburger" style={navLeft} onClick={() => this.toggleSidebar()} ></a>
          <a className="navbar-btn pull-center" style={navCenter}
            onClick={this.clickHome.bind(this)}>D7</a>
          <New goto={this.props.data.goto} _save={this.props.data._save}/>
        </nav>
        <span>lllll</span>
        {msg}
      </div>
    );
  }
}

export default Navigation;
