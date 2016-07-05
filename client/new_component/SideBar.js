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

  handleClick(url, statename) {
    this.props.data.reset([statename]);
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
    const { goto } = this.props.data;
    console.log('THIS.PROPS.DATA', this.props.data);
    console.log('ONGOING', onGoing);
    console.log('USER', user);

    if (user && onGoing) {
      userStats = (
        <ul>
          <li>Total: {user.userProjects.total}</li>
          <li>Success: {user.userProjects.success}</li>
          <li>Fail: {user.userProjects.fail}</li>
        </ul>
      );

      onGoingProjects = onGoing.map((project) => {
        return (<li key={project.id}><a onClick={this.handleClickOngoing.bind(this, project.id)}>{project.title} on day {project.onDay}</a></li>);
      });

      const imageSrc = "http://res.cloudinary.com/daxutqqyt/image/upload/c_scale,w_200/v1467554303/" + user.userPhoto + ".jpg";

      return (
        <div style={sideBarStyle} id="sidebar">
          <button onClick={this.toggleSidebar}>X close</button>
          <div>
            <img src={imageSrc} width="100px" height="100px"/>
            <h1>{user.username}</h1>
            <ul>
              {userStats}
            </ul>
          </div>
          <div>
            <div>
              <h2 onClick={this.handleClick.bind(this, "/history", "history")}>Ongoing Projects</h2>
              <ul>
                {onGoingProjects}
              </ul>
              <h2 onClick={this.handleClick.bind(this, "/history", "history")}>Project History</h2>
              <h2 onClick={this.handleClick.bind(this, "/wishlist", "wishlist")}>Wish List</h2>
              <h2 onClick={this.handleClick.bind(this, "/settings", "settings")}>Settings</h2>
            </div>
          </div>
        </div>
      );
    } else {
      return (<div style={sideBarStyle} id="sidebar"><button onClick={this.toggleSidebar}>X close</button>loading...</div>);
    }
  }
}

export default SideBar;
