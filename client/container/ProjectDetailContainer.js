import React, {Component} from "react";
import ProjectDetail from '../component/ProjectDetail'

class ProjectDetailContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.state = {title: this.props.location.query.title, onDay: this.props.location.query.onDay};
  }

  componentDidMount() {
    console.log("ProjectDetailContainer mounted :)");
  }

  render() {
    let queryData = {
      title: this.state.title,
      onDay: this.state.onDay,
      id: this.props.params.id
    }
    return (<ProjectDetail queryData={queryData} saveDayDetail={this.props.saveDayDetail}/>)
  }
}

export default ProjectDetailContainer