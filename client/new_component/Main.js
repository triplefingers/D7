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
    };
  }

  componentDidMount() {
    console.log("this.props._save");
    if(!this.props.data.selectedMain){
      this.props._save({selectedMain: "recent"});
    }
    this.props.reset("recent");
    /* Promise로 순서 적용 */
    this.props.fetchRecentPosts();
    this.props.fetchPopularPosts();
    this.props.fetchRecommendation();
    /* Reset the AppContainer's state */
  }

  // some code about tapping tab and according rendering
  switchContents(menu) {
    if (menu === "recent") {
      this.props._save({selectedMain: "recent"});
      this.props.fetchRecentPosts();
    } else if (menu === "popular") {
      this.props._save({selectedMain: "popular"});
    } else {
      this.props._save({selectedMain: "suggestion"});
    }
  }

  render() {
    let Contents;

    if (!this.props.data.selectedMain){
      return(<div>Loading...</div>);
    } else if (this.props.data.selectedMain === "recent") {
      if (this.props.data.recent) {
        console.log("Recent ",this.props.data.recent);
        Contents = this.props.data.recent.map((post) => {
          return <MainPostCard data={post} key={post.id} goto={this.props.goto} fetchUserProjectDetail={this.props.fetchUserProjectDetail}/>
        });
      }
    } else if (this.props.data.selectedMain === "popular") {
      if (this.props.data.popular) {
        Contents = this.props.data.popular.map((post) => {
          return <MainPostCard data={post} key={post.id} goto={this.props.goto} fetchUserProjectDetail={this.props.fetchUserProjectDetail}/>
        });
      }
    } else if(this.props.data.selectedMain === "suggestion") {
      /* Fetched data about RecommendedProjects are stored in AppContainer */
      if (this.props.data.recommended) {
        Contents = this.props.data.recommended.map((project) => {
          console.log(project);
          return <MainProjectCard data={project} key={project.id} goto={this.props.goto} fetchProjectDetail={this.props.fetchProjectDetail}/>
        });
      }
    }

    // some code about RecordBox rendering

    return (
      <div>
        <Tabbar switchContents={this.switchContents.bind(this)} />
        {/* RecordBox don't appear on Recommended Project page */}
        <RecordBox data={this.props} handleChange={this.props.handleChange}/>
        {Contents}
      </div>
    );
  }
}

export default Main;
