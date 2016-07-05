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

  clickDisable() {
    e.stopPropagation();
    e.preventDefault();
  };

  handleChange(what, event) {
    let data = {};
    data[what] = event.target.value;
    this.setState(data);
  };

  saveReport(postId, description, url, e) {
    e.stopPropagation();
    axios.get("/api/projects/report", {
       postId: postId,
       description: description
    })
    .then((res) => {
      this.setState({step: 3});
      setTimeout(() => {
        this.setState({step: 0, text:""});
        this.props.goto(url);
      }, 2000);
    })
    .catch((err) => {
      console.error("Error occurred while saving report: ", err);
    });
  }

  render() {

    const { id } = this.props;

    if(id) {
      const {step, text} = this.state;
      let step1;
      let step2;
      let step3;

      if(step===0){
        step1 = null;
        step2 = null;
        step3 = null;
      } else if(step===1){
        step1 = (
          <div className="reportBox" onClick={() => e.stopPropagation()}>
            <div className="reportButtonSet">
              <div className="btn-group btn-group-justified text-center" role="group">
                <div className="btn-group" role="group">
                  <button className="btn btn-default" onClick={this.clickReport.bind(this)}>Report this post</button>
                {/*</div>
                <div className="btn-group" role="group">*/}
                  <button className="btn btn-default" onClick={this.clickCancel.bind(this)}>Cancel</button>
                </div>
              </div>
            </div>
          </div>
          );
        step2=null;
      } else if(step===2){
        step1= null;
        step2 = (
          <div className="reportBox" onclick={() => e.stopPropagation()}>
            <div className="reportButtonSet">
              <textarea onClick={(e)=> e.stopPropagation()} value={text} onChange={this.handleChange.bind(this, "text")} rows="2" placeholder="Why do you want to report this post?"/><br/>
              <div className="btn-group btn-group-justified text-center" role="group">
                <div className="btn-group" role="group">
                  <button className="btn btn-default" onClick={this.saveReport.bind(this, id, text, "/")}>Report</button>
                {/*</div>
                <div className="btn-group" role="group">*/}
                  <button className="btn btn-default" onClick={this.clickCancel.bind(this)}>Cancel</button>
                </div>
              </div>
            </div>
          </div>
        );
      } else if (step===3) {
        step1=null;
        step2=null;
        step3= (
          <div className="reportBox" onclick={() => e.stopPropagation()}>
            <div className="reportButtonSet">
              <div className="btn-group btn-group-justified text-center" role="group">
                <div className="btn-group" role="group">
                  <button className="btn btn-success" onClick={this.clickDisable.bind(this)}>Report Done!</button>
                  <button className="btn btn-default" onClick={this.clickCancel.bind(this)}>Cancel</button>
                </div>
              </div>
            </div>
          </div>
        )
      }

      return (
        <div className="pull-right">
          <button className="reportSet glyphicon glyphicon-option-horizontal" onClick={this.clickDotButton.bind(this)}></button>
            {step1}
            {step2}
            {step3}
        </div>
      );
    } else {
      return <div>loading...</div>
    }
  }
}

export default ReportSet;
