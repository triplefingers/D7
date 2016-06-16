import React, {Component} from "react";
import ProjectDetail from '../component/ProjectDetail'

class ProjectDetailContainer extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.log("ProjectDetailContainer mounted :)");
  }

  render() {
    let queryData = {
      title: this.props.state.title,
      onDay: this.props.state.onDay,
      id: this.props.params.id
    }
    return (<ProjectDetail queryData={queryData} saveDayDetail={this.props.saveDayDetail}/>)
  }
}

export default ProjectDetailContainer