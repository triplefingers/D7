import React, {Component} from "react";
import Calendar from "react-calendar-pane";
import moment from "moment";

class CreateDate extends Component {
  constructor(props) {
    super(props);
  };

  componentDidMount() {
    // save today's date in AppContainer
    this.props._save({startAt: new Date().toJSON().slice(0, 10)});
  };

  _save(object) {
    this.props._save(object);
  };

  onSelect(date, previousDate, currentMonth) {
    console.log("date, prevDate, currentMonth ", date, previousDate, currentMonth);
    console.log("today is ", moment());
    if (new Date(date.format().slice(0, 10)).valueOf() < new Date(new Date().toJSON().slice(0, 10)).valueOf()) {
      console.log("same day today");
      // return false;
      return;
    }

    if (currentMonth.isSame(date, "month")) {
      this._save({startAt: date.format().slice(0, 10)});
      return true;
    }
    else {
      // console.info('onSelect: none', date);
    }
  };

  dayClasses(date) {
    const classArr = [];
    const day = date.isoWeekday();

    const dateInSec = new Date(date.format().slice(0, 10)).valueOf();
    const todayInSec = new Date(new Date().toJSON().slice(0, 10)).valueOf();

    if (day == 6 || day == 7) {
      classArr.push("weekend");
    }
    if (dateInSec < todayInSec) {
      classArr.push("inavailableDay");
    }
    if (dateInSec >= todayInSec) {
      classArr.push("availableDay");
    }
    return classArr;
  };

  render() {
    const title = this.props.data.title;
    const description = this.props.data.description;
    const startAt = this.props.data.startAt;
    const text = this.props.data.text;

    const today = new Date().toJSON().slice(0,10);


    const newProject = {
      title: title,
      description: description,
      startAt: today
    };

    if (window.publicIds) {
      var publicIds = window.publicIds;
    } else {
      publicIds = [];
    }


    return (
      <div>
        <div className="Title">
          <h1>Pick a Date</h1>
          <h2>Title: {this.props.data.title}</h2>
        </div>
        <Calendar date={moment(today, "YYYY-MM-DD")} dayClasses={this.dayClasses} onSelect={this.onSelect.bind(this)}/>
        <div className="ActionBar">
          <button onClick={this.context.router.goBack}>Cancel</button>
          <button onClick={() => {
            this.props.saveDayDetail(1, undefined, 1, text, publicIds, newProject);
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
