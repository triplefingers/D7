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

  componentDidMount() {
    console.log("ReportSet mounted ", this.props);
  }

  clickDotButton() {
    this.setState({step: 1});
  }

  clickReport() {
    this.setState({step: 2});
  }

  clickCancel(){
    this.setState({step: 0});
  }

  handleChange(what, event) {
    let data = {};
    data[what] = event.target.value;
    this.setState(data);
  };

  saveReport(postId, description, url) {
    axios.get("/api/projects/report", {
       postId: postId,
       description: description
    })
    .then((res) => {
      this.goto(url);
    })
    .catch((err) => {
      console.error("Error occurred while saving report: ", err);
    });
  }

  render() {

    const { id } = this.props;
    let step1;
    let step2;

    if(step===0){
      step1 = null;
      step2 = null;
    } else if(step===1){
      step1 = (
        <div>
          <button onClick={this.clickReport.bind(this)}>Report</button>
          <button onClick={this.clickCancel.bind(this)}>Cancel</button>
        </div>
        );
      step2=null;
    } else if(step===2){
      step1= null;
      step2 = (
        <div>
          <textarea value={this.state.text} onChange={this.handleChange.bind(this, "text")} rows="2" placeholder="Why do you want to report this post?"/><br/>
          <button onClick={this.clickCancel.bind(this)}>Cancel</button>
          <button onClick={this.saveReport(id, this.state.text, "/")}>Report</button>
        </div>
      )
    }

    return (
      <div>
        <button onClick={this.clickDotButton.bind(this)}>...</button>
        {step1}
        {step2}
      </div>
    );
  }
}

export default ReportSet;
