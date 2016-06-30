import React, {Component, cloneElement} from "react";

class RecordBox extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    console.log("RecordBox mounted");
  }

  render() {
    return (
      <div>
        <textarea value={this.props.data.text} onChange={this.props.data.handleChange.bind(null, "text")} rows="2" placeholder="What did you do today?"/><br/>
        <button>Add Photos</button>
        <button onClick={() => this.props.data.goto("/select")}>Post</button>
      </div>
    );
  }
}

export default RecordBox;