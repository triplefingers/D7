import React, {Component} from "react";
import axios from "axios";

class ReportSet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 0,
      text: ""
    };
  }

  clickDotButton(e) {
    e.stopPropagation();
    this.setState({step: 1});
  }

  clickReport(e) {
    e.stopPropagation();
    this.setState({step: 2});
  }

  clickCancel(e){
    e.stopPropagation();
    this.setState({step: 0});
  }

  clickDisable(e) {
    e.stopPropagation();
    e.preventDefault();
  };

  validator() {
   if (this.state.text.length === 0) {
     return false;
   }
   return true;
 };

  handleChange(what, event) {
    let data = {};
    data[what] = event.target.value;
    this.setState(data);
  };

  saveReport(postId, description, url, e) {
    e.stopPropagation();
    if (this.validator() === true) {
      axios.get("/api/projects/report", {
         postId: postId,
         description: description
      })
      .then((res) => {
        this.setState({step: 0, text: ""});
        this.props.navAlert("report");
        this.props.goto(url);
        // setTimeout(() => {
        //   this.props.navAlert(null);
        // }, 1000);
      })
      .catch((err) => {
        console.error("Error occurred while saving report: ", err);
      });
    }
  }

  render() {

    const { id } = this.props;

    if(id) {
      const {step, text} = this.state;
      let step1;
      let step2;

      if(step===0){
        step1 = null;
        step2 = null;
      } else if(step===1){
        step1 = (
          <div className="reportBox" onClick={this.clickCancel.bind(this)}>
            <div className="reportButtonSet">
              <button className="reportBtn btn btn-lg btn-danger btn-block" onClick={this.clickReport.bind(this)}>Report this post</button>
              <button className="reportBtn btn btn-lg btn-default btn-block" onClick={this.clickCancel.bind(this)}>Cancel</button>
            </div>
          </div>
        );
        step2=null;
      } else if(step===2){
        let reportBtn = (
          <button className="reportBtn reportRightBtn btn btn-lg btn-danger" onClick={this.saveReport.bind(this, id, text, "/")}>Report</button>
        );
        if (!this.validator()) {
          reportBtn = (
            <button className="reportBtn reportRightBtn btn btn-lg btn-danger" onClick={this.saveReport.bind(this, id, text, "/")} disabled>Report</button>
          );
        }
        step1= null;
        step2 = (
          <div className="reportBox" onClick={this.clickDisable.bind(this)}>

            <div className={"reportInputBox"}>
              <textarea id="reportTextInput" onClick={this.clickDisable.bind(this)} value={text} onChange={this.handleChange.bind(this, "text")} rows="2" placeholder="Why do you want to report this post?"/>
              <div className="reportButtonSet">
                <div className="btn-group btn-group-justified text-center" role="group">
                  <div className="btn-group" role="group">
                    <button className="reportBtn reportLeftBtn btn btn-lg btn-default" onClick={this.clickCancel.bind(this)}>Cancel</button>
                  </div>
                  <div className="btn-group" role="group">
                    {reportBtn}
                  </div>
                </div>
              </div>
            </div>

          </div>
        );
      }

      return (
        <div className="pull-right">
          <a className="reportSet glyphicon glyphicon-option-horizontal" onClick={this.clickDotButton.bind(this)}></a>
            {step1}
            {step2}
        </div>
      );
    } else {
      return <div>loading...</div>
    }
  }
}

export default ReportSet;
