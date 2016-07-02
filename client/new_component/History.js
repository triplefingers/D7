import React, {Component} from "react";

class History extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentWillMount(){
    this.props.fetchAllProjects();
  }

  render() {

    const { history } = this.props.data;

    if(history){
      let { onGoing, waiting, complete } = history;
      console.log('COMPLETE', complete);
      console.log('WAITING', waiting);
      console.log('ONGOING', onGoing);

      onGoing = onGoing.map((project) => (
          <li key={project.id} onClick={() => {
            this.props._save({
              id: project.id,
              title: project.title,
              description: project.description,
              onDay: project.onDay,
              status: "ongoing",
              doneToday: project.doneToday
            });
            // should change userid;
            this.props.fetchDayDetail(1, project.id);
          }}>
          {
            project.title
            + " on day" + " " + project.onDay
          }
          </li>
        ));

      waiting = waiting.map((project) => (
          <li key={project.id} onClick={() => {
            this.props._save({
              id: project.id,
              title: project.title,
              description: project.description,
              onDay: project.onDay,
              status: "waiting"
            });
            // should change userid;
            this.props.fetchDayDetail(1, project.id);
          }}>
          {
            project.title
          }
          </li>
        ));

      complete = complete.map((project) => (
          <li key={project.id} onClick={() => {
            this.props._save({
              id: project.id,
              title: project.title,
              description: project.description,
              onDay: project.onDay,
              status: "complete"
            });
            // should change userid;
            this.props.fetchDayDetail(1, project.id);
          }}>
          {
            project.title
          }
          </li>
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

    return (
      <div>
        loading...
      </div>
    );
  }
}

export default History;
