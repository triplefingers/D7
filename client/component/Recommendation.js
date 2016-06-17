import React, {Component} from "react";

class Recommendation extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchRecommendation();
    console.log("Recommendation mounted");
  }

  render() {
    let list = [];

    if (this.props.data.list) {
      list = this.props.data.list;
    }

    list = list.map((project) => (
        <li onClick={() => {this.props._save({id: project.id, title: project.title, description: project.description, onDay: project.onDay, status: "ongoing"}); this.props.goto("/history/project/" + project.id);}}>{"프로젝트" + " " + project.title}</li>
      ));

    return (
      <div>
        <h1>Recommended</h1>
        {list}
      </div>

    );
  }

}

export default Recommendation;
