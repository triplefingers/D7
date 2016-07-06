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
    $(".sidebarBg").css("left", "-100%");
    $(".sidebar").css("left", "-100%");
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

    /* ongoing = onGoing*/
    let onGoingProjects, userStats;
    const { user, onGoing } = this.props.data.data;
    const { goto, fetchWishList, fetchAllProjects, fetchUser } = this.props.data;

    /* Practice */
      if (user && onGoing) {
        const imageSrc = "http://res.cloudinary.com/daxutqqyt/image/upload/c_scale,w_200,h_200/v1467554303/" + user.userPhoto + ".jpg";
        userStats = (
          <ul>
            <li>Total : {user.userProjects.total}</li>
            <li>Success : {user.userProjects.success}</li>
            <li>Fail : {user.userProjects.fail}</li>
          </ul>
        );

        const onGoingProjects = onGoing.map((project) => {
          return (<li key={project.id}><a onClick={this.handleClickOngoing.bind(this, project.id)}>{project.title} on day {project.onDay}</a></li>);
        });

        return (
          <div className="popupBackground sidebarBg" onClick={this.toggleSidebar}>
            <a className="close pull-right glyphicon glyphicon-remove" onClick={this.toggleSidebar}></a>
            <div className="sidebar popup">
              <div className="userphoto">
                <img src={imageSrc} className="img-responsive" alt="" />
              </div>
              <div className="userinfo">
                <div className="username">
                  {user.username}
                </div>
                <div className="userstats">
                  {userStats}
                </div>
              </div>
              <div className="menu">
                <ul className="nav">
                  <li>
                    <a onClick={this.handleClick.bind(this, "/history", "history", fetchAllProjects)}>
                    Ongoing Projects </a>
                  <ul className="ongoing">
                      {onGoingProjects}
                    </ul>
                  </li>
                  <li>
                    <a onClick={this.handleClick.bind(this, "/history", "history",fetchAllProjects)}>
                    Project History </a>
                  </li>
                  <li>
                    <a onClick={this.handleClick.bind(this, "/wishlist", "wishlist",fetchWishList)}>
                    Wishlist </a>
                  </li>
                  <li>
                    <a onClick={this.handleClick.bind(this, "/settings")}>
                    Settings </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

        );


      } else {
      return (<div className="sidebar" id="sidebar"><button onClick={this.toggleSidebar}>X close</button>loading...</div>);
    }

  }
}

export default SideBar;
