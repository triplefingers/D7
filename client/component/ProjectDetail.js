import React, {Component} from "react";

class ProjectDetail extends Component {
  constructor(props) {
    super(props);
  };

  componentDidMount() {
    console.log("ProjectDetail Mounted :)");
  }

  render() {
    let id = this.props.queryData.id;
    let title = this.props.queryData.title;
    let onDay = this.props.queryData.onDay;

    let text = this.props.data.text;

    return (
      <div>
        <h1>Project Detail</h1><hr/>
        <h1>Title: {title}</h1>
        <h1>Onday: {onDay}</h1>
        <textarea value = {this.props.data.text} onChange={this.props.handleChange.bind(null,"text")} rows="6"/>
        <br/>
        <button onClick={this.context.router.goBack.bind(this)}>Cancel</button>
        // have to edit userId
        <button onClick={this.props.saveDayDetail.bind(this, "1234", id, onDay, text)}>Save</button>
      </div>
    );
  }
}


ProjectDetail.contextTypes = {
  router: () => React.PropTypes.func.isRequired
};

export default ProjectDetail;
