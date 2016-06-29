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
    /* Promise로 순서 적용 */
    this.props.fetchRecentPosts();
    this.props.fetchPopularPosts();
    this.props.fetchRecommendation();
    console.log("Received Recent posts: ", this.props.data.recent);


  }

  // some code about tapping tab and according rendering
  switchContents(menu) {
    if (menu === "recent") {
      this.setState({selected: "recent"});
    } else if (menu === "popular") {
      this.setState({selected: "popular"});
    } else {
      this.setState({selected: "suggestion"});
    }
  }

  render() {
    let Contents;

    if (!this.props.data){
      return(<div>Loading...</div>);
    } else if (this.state.selected === "recent") {
      if(this.props.data.recent) {
        Contents = this.props.data.recent.map((post) => {
          return <MainPostCard data={post} key={post.id}/>
        });
      }
    } else if (this.state.selected === "popular") {
      if (this.props.data.popular) {
        Contents = this.props.data.popular.map((post) => {
          return <MainPostCard data={post} key={post.id}/>
        });
      }
    } else {
      /* Fetched data about RecommendedProjects are stored in AppContainer */
      if (this.props.data.list) {
        Contents = this.props.data.list.map((project) => {
          return <MainProjectCard data={project} key={project.id}/>
        });
      }
    }

    // some code about RecordBox rendering

    return (
      <div>
        <Tabbar switchContents={this.switchContents.bind(this)} />
        {/* RecordBox don't appear on Recommended Project page */}
        <RecordBox />
        {Contents}
      </div>
    );
  }
}

export default Main;
