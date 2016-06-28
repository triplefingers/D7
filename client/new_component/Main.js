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
    console.log("Main mounted");
    this.props.fetchRecentPosts();
    this.props.fetchPopularPosts();
    this.props.fetchRecommendation();
  }

  componentWillUpdate() {
    // console.log("Main rerendered");
    console.log("Received Recent posts: ", this.props.appstate.recent.data);
  }

  render() {
    let Contents;
    if (!this.state.data){
      return(<div>Loading...</div>);
    }
    if (this.state.selected === "recent") {
      Contents = this.props.data.recent.data.map((post) => {
        <MainPostCard data={post}/>
      });
    } else if (this.state.selected === "popular") {
      Contents = this.props.data.popular.data.map((post) => {
        <MainPostCard data={post}/>
      });
    } else {
      /* Fetched data about RecommendedProjects are stored in AppContainer */
      Contents = this.props.data.list.map((post) => {
        <MainProjectCard data={post}/>
      });
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
