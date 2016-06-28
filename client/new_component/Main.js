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
    // this.props.fetchRecentPosts();
    // this.props.fetchPopularPosts();
    // this.props.fetchRecommendation();
    this.appstate.recent=[1,2,3,4,5,6,7,8];
    this.appstate.popular=[1,2,3,4,5,6,7,8];
  }



  render() {
    let Contents;
    if (this.state.selected === "recent") {
      Contents = this.props.appstate.recent.map((post) => {
        <MainPostCard data={post}/>
      });
    } else if (this.state.selected === "popular") {
      Contents = this.props.appstate.popular.map((post) => {
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
