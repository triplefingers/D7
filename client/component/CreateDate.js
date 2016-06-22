import React, {Component} from "react";

class CreateDate extends Component {
  constructor(props) {
    super(props);
  };

  componentDidMount() {
    // save today's date in AppContainer
    this.props._save({startAt: new Date().toJSON().slice(0, 10)});
  };

  render() {
    let title = this.props.data.title;
    let desc = this.props.data.description;
    let startDate = this.props.data.startAt;

    // the earliest date that user can select
    let minDate = new Date().toJSON().slice(0,10);
    
    let today = new Date().toJSON().slice(0,10);

    return (
      <div>
        <h1>Pick a Date</h1>
        <h2>Title: {this.props.data.title}</h2>
        <hr/>
        <div>
          <input type="date" min={minDate} defaultValue={today} onChange={this.props.handleChange.bind(null, "startAt")} />
          <br/>
          <button onClick={this.context.router.goBack}>Cancel</button>
          <button onClick={() => {
            // have to edit userId
            this.props.saveNewProject(1, title, desc, startDate);
          }}>Save</button>
        </div>
      </div>
    );
  };
}

CreateDate.contextTypes = {
  router: () => React.PropTypes.func.isRequired
};

export default CreateDate;
