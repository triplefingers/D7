import React, {Component} from "react";
import {Router, Route, Link, browserHistory, hashHistory, IndexRoute} from "react-router";


class CreateBasicInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  };

  componentDidMount() {

  }

  render() {
    return (
      <div>
        <Link to="/"><button>Home</button></Link>
        <h1>New Project</h1>
        <hr/>
        <div>
          <label>Title</label>
          <br/>
          <input required type="text" value={this.props.data.title} placeholder="title" onChange={this.props.handleChange.bind(null, "title")}/>
          <br/>
          <label>Description</label>
          <br/>
          <textarea value = {this.props.data.description} onChange={this.props.handleChange.bind(undefined,"description")} rows="6"/>
          <br/>
          <button onClick={() => this.props.goto("/")}>Cancel</button>
          <button>
            <Link to="/create/date" query={{title: this.props.data.title, description: this.props.data.description}}>Next</Link>
          </button>
        </div>
      </div>
    );
  };
}

export default CreateBasicInfo;
