import React, {Component} from "react";

import axios from "axios";

import Tabbar from "./Tabbar";
import RecordBox from "./RecordBox";
import MainPostCard from "./MainPostCard";
import MainProjectCard from "./MainProjectCard";


class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selected: "recent"
    };
  }

  componentDidMount() {
    // this.fetchRecentPosts();
    // this.fetchPopularPosts();
    // this.props.fetchRecommendation();
  }

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
    let Contents;
    if (this.state.selected === "recent") {
      Contents = this.state.recent.map((post) => {
        <MainPostCard data={post}/>
      });
    } else if (this.state.selected === "popular") {
      Contents = this.state.popular.map((post) => {
        <MainPostCard data={post}/>
      });
    } else {
      /* Fetched data about RecommendedProjects are stored in AppContainer*/

      // Contents = this.state.recent.map((post) => {
      //   <MainProjectCard data={post}/>
      // });
    }

    // some code about RecordBox rendering

    return (
      <div>
        <Tabbar />
        {/* RecordBox don't appear on Recommended Project page */}
        <RecordBox />
        {Contents}

      </div>
    );
  }
}

export default Main;