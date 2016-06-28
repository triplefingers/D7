import React, {Component} from "react";

class RecommendedProjectCard extends Component {
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
          Project Image
        </div>
        {/* Card Content */}
        <div>
          <h2>Project Title</h2>
          <p>
            At the very first, You have to transpile ES6 written Javascript files. Run gulp and you will get bundled file of client-side-files in client/, and babel-transpiled file of server-side
          </p>
        </div>
        {/* Card Footer */}
        <div>
          {/* Footer Right Part */}
          <div>
            <span>Pin</span>
            <span>12</span>
          </div>
          {/* Footer Left Part */}
          <div>
            <span>by</span>
            <span>User Name</span>
          </div>
        </div>
      </div>
    );
  }
}

export default RecommendedProjectCard;
