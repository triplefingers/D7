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
    console.log("Received Recent posts: ", this.props.data.recent);
  }


  render() {
    let Contents;
    if (!this.props.data){
      return(<div>Loading...</div>);
    } else if (this.state.selected === "recent") {
      if(this.props.data.recent) {
        Contents = this.props.data.recent.map((post) => {
          return <MainPostCard data={post}/>
        });
      }

    } else if (this.state.selected === "popular") {
      Contents = this.props.data.popular.map((post) => {
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
