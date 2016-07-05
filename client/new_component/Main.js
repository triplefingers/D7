import React, {Component} from "react";

import axios from "axios";

import Tabbar from "./Tabbar";
import RecordBox from "./RecordBox";
import MainPostCard from "./MainPostCard";
import MainProjectCard from "./MainProjectCard";
import moment from "moment"

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentWillMount(){
    this.props._save({
      leaveHistoryClicked: false,
      creatingProjectFirst: false,
      creatingProjectLast: false,
      leaveHistoryInProgress: false,
      existingProjectChosen: false,
      cardNumber: "",
      birth: "",
      expiry: "",
      recentPage: 0,
      popularPage: 0,
      suggestionPage: 0
    });
  }

  componentDidMount() {
    this.props.reset(["text", "selectedProject", "title", "description", "startAt"]);
    const { _save, fetchRecentPosts, fetchPopularPosts, fetchRecommendation } = this.props;
    const { selectedMain } = this.props.data;
    /* Promise로 순서 적용 */
    if(!selectedMain){
      fetchRecentPosts();
      _save({selectedMain: "recent"});
    } else if(selectedMain==="recent"){
      fetchRecentPosts();
    } else if(selectedMain==="popular"){
      fetchPopularPosts();
    } else {
      fetchRecommendation();
    }

  }

  componentWillUnmount() {
    this.props.reset(["recent", "popular", "recommended", "recentPage", "popularPage", "suggestionPage"]);
  }

  switchContents(menu) {
    const { _save, fetchRecentPosts, fetchPopularPosts, fetchRecommendation } = this.props;
    const { recent, popular, recommended } = this.props.data;

    if (menu === "recent") {
      _save({selectedMain: "recent"});
      if(!recent){
        fetchRecentPosts();
      }
    } else if (menu === "popular") {
      _save({selectedMain: "popular"});
      if(!popular){
        fetchPopularPosts();
      }
    } else {
      _save({selectedMain: "suggestion"});
      if(!recommended){
        fetchRecommendation();
      }
    }
  }

  clickMore() {
    const { _save, fetchRecentPosts, fetchPopularPosts, fetchRecommendation } = this.props;
    const { recent, popular, recommended, recentPage, popularPage, suggestionPage, selectedMain } = this.props.data;

    if (selectedMain === "recent") {
      fetchRecentPosts();
    } else if (selectedMain === "popular") {
      fetchPopularPosts();
    } else if (selectedMain==="suggestion"){
      fetchRecommendation();
    }

  }

  render() {
    console.log("Render main");
    const { goto, fetchUserProjectDetail, saveReport, fetchProjectDetail } = this.props;
    const { selectedMain, recent, popular, recommended } = this.props.data;

    let Contents;
    let Record = <RecordBox data={this.props}/>;
    let MoreButton = <div className="btn-group btn-group-justified text-center" role="group">
      <div className="btn-group" role="group">
        <button className="btn btn-default" onClick={this.clickMore.bind(this)}>Load more...</button>
      </div>
    </div>

    if (!selectedMain){
      return(<div>Loading...</div>);
    } else if (selectedMain === "recent") {
      if (recent) {
        console.log("Recent ", recent);
        Contents = recent.map((post) => {
          return <MainPostCard data={post} key={post.id} goto={goto} fetchUserProjectDetail={fetchUserProjectDetail} saveReport={saveReport}/>
        });
      }
    } else if (selectedMain === "popular") {
      if (popular) {
        Contents = popular.map((post) => {
          return <MainPostCard data={post} key={post.id} goto={goto} fetchUserProjectDetail={fetchUserProjectDetail} saveReport={saveReport} />
        });
      }
    } else if(selectedMain === "suggestion") {
      /* Fetched data about RecommendedProjects are stored in AppContainer */
      if (recommended) {
        Contents = recommended.map((project) => {
          return <MainProjectCard data={project} key={project.id} goto={goto} fetchProjectDetail={fetchProjectDetail} />
        });
      }
      Record = null;
    }

    return (
      <div>
        <Tabbar switchContents={this.switchContents.bind(this)} />
        {Record}
        {Contents}
        {MoreButton}
      </div>
    );
  }
}

export default Main;
