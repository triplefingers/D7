import React, {Component} from "react";

class SideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    this.props.data.fetchOngoingProjects();
    this.props.data.fetchUser();
  }

  componentDidMount() {
    console.log("Sidebar Mounted");
    // this.setState({data: this.props.data.data.list});
  }

  toggleSidebar() {
    $('#sidebar').css("left", "-100%");
  }

  handleClick(url, statename, fn) {
    if(statename){
      this.props.data.reset([statename]);
    }
    if(fn){
      fn();
    }
    this.props.data.goto(url);
    this.toggleSidebar();
  }

  handleClickOngoing(id, e) {
    e.preventDefault();
    this.props.data.fetchUserProjectDetail(id);
    this.props.data.goto("/userproject");
    this.toggleSidebar();
  }

  render() {

    const sideBarStyle = {
      left: "-100%",
      top: "0px",
      width: "70%",
      height: "100%",
      position: "fixed",
      background: "skyblue",
      transition: "all 0.5s",
      zIndex: "10"
      // ,left: "0%"
    }

    /* ongoing = onGoing*/
    let onGoingProjects, userStats;
    const { user, onGoing } = this.props.data.data;
    const { goto, fetchWishList, fetchAllProjects, fetchUser } = this.props.data;


    /* Practice */
    // SIDEBAR USERPIC
      if (user && onGoing) {

        const imageSrc = "http://res.cloudinary.com/daxutqqyt/image/upload/c_scale,w_200,h_200/v1467554303/" + user.userPhoto + ".jpg";
        userStats = (
                <ul>
                  <li>Total: {user.userProjects.total}</li>
                  <li>Success: {user.userProjects.success}</li>
                  <li>Fail: {user.userProjects.fail}</li>
                </ul>
        );

        const onGoingProjects = onGoing.map((project) => {
          return (<li key={project.id}><a onClick={this.handleClickOngoing.bind(this, project.id)}>{project.title} on day {project.onDay}</a></li>);
        });

        return (
          <div style={sideBarStyle} id="sidebar">
            <a id="close" className="pull-right" onClick={this.toggleSidebar}>X close</a>
            <div className="profile-userpic">
              <img src={imageSrc} className="img-responsive" alt="" />
            </div>
            <div className="profile-usertitle">
              <div className="profile-usertitle-name">
                {user.username}
              </div>
              <div className="profile-usertitle-job">
                {userStats}
              </div>
            </div>
            {/*<div className="profile-userbuttons">
              <button type="button" className="btn btn-success btn-sm">Follow</button>
              <button type="button" className="btn btn-danger btn-sm">Message</button>
            </div>*/}
            <div className="profile-usermenu">
              <ul className="nav">
                <li>
                  <a onClick={this.handleClick.bind(this, "/history", "history", fetchAllProjects)}>
                  <i className="glyphicon glyphicon-home"></i>
                  Ongoing Projects </a>
                  <ul>
                    {onGoingProjects}
                  </ul>
                </li>
                <li>
                  <a onClick={this.handleClick.bind(this, "/history", "history",fetchAllProjects)}>
                  <i className="glyphicon glyphicon-user"></i>
                  Project History </a>
                </li>
                <li>
                  <a onClick={this.handleClick.bind(this, "/wishlist", "wishlist",fetchWishList)}>
                  <i className="glyphicon glyphicon-ok"></i>
                  Wishlist </a>
                </li>
                <li>
                  <a onClick={this.handleClick.bind(this, "/settings")}>
                  <i className="glyphicon glyphicon-flag"></i>
                  Settings </a>
                </li>

              </ul>
            </div>
          </div>
        );


      } else {
      return (<div style={sideBarStyle} id="sidebar"><button onClick={this.toggleSidebar}>X close</button>loading...</div>);
    }

  }
}

export default SideBar;
