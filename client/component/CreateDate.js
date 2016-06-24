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
    // if (moment(date).isSame(previousDate)) {
    //   console.info('onSelect: false', date);
    //   return false;
    // }
    // else
    if (currentMonth.isSame(date, "month")) {
      // console.info('onSelect: true', date.format());
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
    let title = this.props.data.title;
    let desc = this.props.data.description;
    let startDate = this.props.data.startAt;
    let today = new Date().toJSON().slice(0,10);

    return (
      <div>
        <h1>Pick a Date</h1>
        <h2>Title: {this.props.data.title}</h2>
        <hr/>
        <div>
          <Calendar date={moment(today, "YYYY-MM-DD")} dayClasses={this.dayClasses} onSelect={this.onSelect.bind(this)}/>
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
