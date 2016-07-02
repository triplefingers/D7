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
<<<<<<< 7894603aa24382ac77dd07252c2a1b86451fd46f
          return <DetailUserProjectCard key={project.id} data={project} fetchUserProjectDetail={fetchUserProjectDetail} goto={goto} />
        });

      waiting = waiting.map((project) => {
          return <DetailUserProjectCard key={project.id} data={project} fetchUserProjectDetail={fetchUserProjectDetail} goto={goto}/>
        });

      complete = complete.map((project) => {
          return <DetailUserProjectCard key={project.id} data={project} fetchUserProjectDetail={fetchUserProjectDetail} goto={goto}/>
=======
          return <DetailUserProjectCard key={project.id} data={project} />
        });

      waiting = waiting.map((project) => {
          return <DetailUserProjectCard key={project.id} data={project} />
        });

      complete = complete.map((project) => {
          return <DetailUserProjectCard key={project.id} data={project} />
>>>>>>> (feat) Apply DetailUserProjectCard Component in History page
        });

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
