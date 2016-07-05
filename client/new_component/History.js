import React, {Component} from "react";
import DetailUserProjectCard from "./DetailUserProjectCard";


class History extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentWillMount(){
    this.props.fetchAllProjects();
  }

  componentWillUnmount() {
    this.props.reset(["history"]);
  }

  render() {

    const { history } = this.props.data;
    const { fetchUserProjectDetail, goto } = this.props;

    if(history){
      let { onGoing, waiting, complete } = history;

      console.log('COMPLETE', complete);
      console.log('WAITING', waiting);
      console.log('ONGOING', onGoing);

      onGoing = onGoing.map((project) => {
          return <DetailUserProjectCard key={project.id} data={project} fetchUserProjectDetail={fetchUserProjectDetail} goto={goto}/>
        });

      waiting = waiting.map((project) => {
          return <DetailUserProjectCard key={project.id} data={project} fetchUserProjectDetail={fetchUserProjectDetail} goto={goto}/>
        });

      complete = complete.map((project) => {
          return <DetailUserProjectCard key={project.id} data={project} fetchUserProjectDetail={fetchUserProjectDetail} goto={goto}/>
        });

      return (
        <div>
          <h2>Project History</h2>
          <div className="card projectCard statusTitle">
            <h3 className="noMargins">Ongoing</h3>
          </div>
          {onGoing}
          <div className="card projectCard statusTitle">
            <h3 className="noMargins">Waiting</h3>
          </div>
          {waiting}
          <div className="card projectCard statusTitle">
            <h3 className="noMargins">Complete</h3>
          </div>
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
