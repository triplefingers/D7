import React, {Component, cloneElement} from "react";
import Navigation from "./Navigation";
import axios from "axios";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { list: null };
  }

  componentDidMount() {
    // fetch all projects
    console.log("App Mounted");
  }

  componentWillUpdate() {
    console.log("App rerenderd");
    console.log("Current State: ", this.state);
  }

  /* FETCH RECENT POSTS IN MAIN PAGE */
  fetchRecentPosts() {
    axios.get("/api/posts/recent")
    .then((res) => {
      console.log("Recent Posts: ", res);
      this.setState({recent: res.data});
    })
    .catch((err) => {
      console.log("Error occurred while fetching recent posts: ", err);
    });
  }

  /* FETCH POPULAR POSTS IN MAIN PAGE */
  fetchPopularPosts() {
    axios.get("/api/posts/popular")
    .then((res) => {
      console.log("Popular Posts: ", res);
      this.setState({popular: res.data});
    })
    .catch((err) => {
      console.log("Error occurred while fetching popular posts: ", err);
    });
  }

  render() {
    const injection = {};
    Object.assign(injection, this.props);

    // Main
    // some code
    injection.appstate = Object.assign({}, this.state);

    injection.fetchRecentPosts = this.fetchRecentPosts.bind(this);
    injection.fetchPopularPosts = this.fetchPopularPosts.bind(this);

    const child = this.props.children && React.cloneElement(this.props.children, injection);

    return (
      <div>
        <Navigation />
        {child}
      </div>
    );
  }
}

export default App;
