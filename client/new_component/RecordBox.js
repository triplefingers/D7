import React, {Component, cloneElement} from "react";

class RecordBox extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {

  }

  render() {
    return (
      <div>
        <textarea rows="2" placeholder="What did you do today?"/><br/>
        <button>Add Photos</button>
        <button>Post</button>
      </div>
    );
  }
}

export default RecordBox;