import React, {Component} from "react";

class DetailPostCard extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
  }

  render() {

    return (
      <div>
        {/* Card Header */}
        <div>
          {/* Header Left Part */}
          <div>
            <div>
              <h2>Day 1</h2>
            </div>
          </div>
          {/* Header Right Part */}
          <div>
            <div>6 hours ago</div>
          </div>
        </div>
        {/* Card Content */}
        <div>
          {/* Images */}
          <div>Images</div>
          {/* Text */}
          <div>
            <p>
              At the very first, You have to transpile ES6 written Javascript files. Run gulp and you will get bundled file of client-side-files in client/, and babel-transpiled file of server-side
            </p>
          </div>
        </div>
        {/* Card Footer */}
        <div>
          {/* Footer Right Part */}
          <div>
            <span>Like</span>
            <span>12</span>
          </div>
          {/* Footer Left Part */}
          <div>
            ...
          </div>
        </div>
      </div>
    );
  }
}

export default DetailPostCard;
