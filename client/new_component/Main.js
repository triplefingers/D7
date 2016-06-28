import React, {Component} from "react";
import Tabbar from "./Tabbar";
import RecordBox from "./RecordBox";
import axios from "axios";

class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    // this.fetchRecentposts();
  }

  fetchRecentPosts() {
    axios.get("/api/post/recent")
    .then((res) => {
      console.log("Recent Posts: ", res);
    })
    .catch((err) => {
      console.log("Error occurred while fetching recent posts: ", err);
    });
  }


  render() {
    // let Contents;
    // if() Contents=Recent;
    // else if() Contents=Popular;
    // else() Contents=Suggestion;

    return (
      <div>
        <Tabbar />
        <RecordBox />
      </div>
    );
  }
}

export default Main;