import React, {Component} from "react";

class SideBar extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    this.props.fetchOngoingProjects();
    this.setState({onGoing: this.props.data.list});
    // How the number data get passed into data.list?
  }

  render() {
    return (
      <div>
        <div>
          <p>Photo</p>
          <h1>Dongwoo Kim</h1>
        </div>
        <div>
          <div>
            <h2>Ongoing Projects</h2>
            <ul>
              <li>Draw 1 Picture A day (on day 4)<li>
              <li>Toy Problem (on Day 1)<li>
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