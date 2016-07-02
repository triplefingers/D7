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

    const { onGoing, waiting, complete } = this.props.data.history;

    if(history){
      console.log('COMPLETE', complete);
      console.log('WAITING', waiting);
      console.log('ONGOING', onGoing);

      return (
        <div>
          History
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
