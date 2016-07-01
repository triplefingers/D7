





  import React, {Component} from "react";

class SideBar extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    this.props.data.fetchOngoingProjects();

    /* list: ongoing / userProjects */
    this.setState({data: this.props.data.data.list});
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
    if (this.state.data && this.state.data.userProjects) {
      var stats = this.state.data.userProjects;
    }


    if (this.state.data && this.state.data.ongoing) {
      onGoingProjects = this.state.data.ongoing.map((project) => {
        return (<li>{project.title} (on day {project.onDay})</li>);
      })
    }

    if (this.state.data && this.state.data.userProjects) {
      userStats = (
        <div>
          <li>Total: {stats.total}</li>
          <li>Success: {stats.success}</li>
          <li>Fail: {stats.fail}</li>
        </div>
      );
    }

    return (
      <div style={sideBarStyle} id="sidebar">
        <div>
          <p>Photo</p>
          <h1>Dongwoo Kim</h1>
          <ul>
            {userStats}
          </ul>
        </div>
        <div>
          <div>
            <h2>Ongoing Projects</h2>
            <ul>
              {onGoingProjects}
            </ul>
            <h2>Project History</h2>
            <h2>Wish List</h2>
            <h2>Settings</h2>
          </div>
        </div>
      </div>
    );
  }
}

export default SideBar;
