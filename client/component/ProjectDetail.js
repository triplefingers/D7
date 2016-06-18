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

    let vaidationCallback = (item) => {
      if (item && (item !== "")) {
        return true;
      }
      return false;
    };

    let validator = () => {
      if (this.props.validateAll(vaidationCallback, id, text, onDay)) {
        console.log("validator activated");
        this.props.saveDayDetail("1234", id, onDay, text);
      } else {
        alert("Check again : there is invalid inputs");
      }
    };

    return (
      <div>
        <h3>{title}</h3>
        <h1>On Day {onDay}</h1>
        <button>Camera</button>
        <textarea value = {this.props.data.text} onChange={this.props.handleChange.bind(null,"text")} rows="6"/>
        <br/>
        <button onClick={this.context.router.goBack.bind(this)}>Cancel</button>
        // have to edit userId
        <button onClick={validator}>Save</button>
      </div>
    );
  }
}


ProjectDetail.contextTypes = {
  router: () => React.PropTypes.func.isRequired
};

export default ProjectDetail;
