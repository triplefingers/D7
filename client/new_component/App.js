import React, {Component, cloneElement} from "react";
import Navigation from "./Navigation";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { list: null };
  }

  componentDidMount() {
    // fetch all projects
  }

  /* FETCH RECENT POSTS IN MAIN PAGE */
  fetchRecentPosts() {
    axios.get("/api/posts/recent")
    .then((res) => {
      console.log("Recent Posts: ", res);
      this.setState({recent: res});
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
      this.setState({popular: res});
    })
    .catch((err) => {
      console.log("Error occurred while fetching popular posts: ", err);
    });
  }

  render() {
    const injection = {};

    // Main
    // some code
    injection.appstate = this.state;

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
