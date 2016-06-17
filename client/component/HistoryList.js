import React, {Component} from "react";

class HistoryList extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    this.props.fetchAllProjects();
    console.log("HistoryList mounted");
  }

  render() {
    let complete = [];
    let onGoing = [];
    let waiting = [];

    if (this.props.data.list) {
      if (this.props.data.list.complete) {
        complete = this.props.data.list.complete;
      }
      if (this.props.data.list.ongoing) {
        onGoing = this.props.data.list.ongoing;
      }
      if (this.props.data.list.waiting) {
        waiting = this.props.data.list.waiting;
      }

    }

    onGoing = onGoing.map((project) => (
        <li onClick={() => {this.props._save({id: project.id, title: project.title, description: project.description, onDay: project.onDay, status: "ongoing"}); this.props.goto("/history/project/" + project.id)}}>{"프로젝트" + " " + project.title}</li>
      ));

    waiting = waiting.map((project) => (
        <li onClick={() => {this.props._save({id: project.id, title: project.title, description: project.description, onDay: project.onDay, status: "waiting"}); this.props.goto("/history/project/" + project.id)}}>{"프로젝트" + " " + project.title}</li>
      ));

    complete = complete.map((project) => (
        <li onClick={() => {this.props._save({id: project.id, title: project.title, description: project.description, onDay: project.onDay, status: "complete"}); this.props.goto("/history/project/" + project.id)}}>{"프로젝트" + " " + project.title}</li>
      ));
    return (
      <div>
        <h1>Ongoing</h1>
        {onGoing}
        <h1>Waiting</h1>
        {waiting}
        <h1>Complete</h1>
        {complete}
      </div>

    );
  }

}

export default HistoryList