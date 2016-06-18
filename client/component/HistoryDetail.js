import React, {Component} from "react";
import Navigation from "./Navigation";

class HistoryDetail extends Component {
  constructor(props) {
    super(props);
  };

  componentDidMount() {
    console.log("HistoryDetail Mounted :)");
  }

  render() {
    let id = this.props.data.id;
    let title = this.props.data.title;
    let description = this.props.data.description;

    let writeButton;
    if (this.props.data.status === "ongoing") {
      writeButton = <button onClick={this.props.goto.bind(null, "/record/project/" + id)}>write</button>;
    }

    return (
      <div>
        <Navigation title="Detail" rightButtonName="write" rightButtonLink={"/record/project/" + id} rightButtonCondition={() => this.props.data.status === "ongoing"}/>
        <h1>Project Detail</h1><hr/>
        <h1>Title: {title}</h1>
        <h1>Description: {description}</h1>

        <button onClick={this.context.router.goBack.bind(this)}>Back</button>
        {/*<button onClick={this.props.saveDayDetail.bind(this, id, onDay, text)}>Save</button>*/}
      </div>
    );
  }
}


HistoryDetail.contextTypes = {
  router: () => React.PropTypes.func.isRequired
};

export default HistoryDetail;
