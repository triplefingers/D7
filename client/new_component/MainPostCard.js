import React, {Component} from "react";

class MainPostCard extends Component {
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
              <img src={this.props.data.userPhoto} width="100px" height="100px" alt="user profile"/>
              <span>User Name</span>
            </div>
            <div>Project Title</div>
          </div>
          {/* Header Right Part */}
          <div>
            <div>Day 1</div>
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
          {/* Footer Left Part */}
          <div>
            <span>Like</span>
            <span>12</span>
          </div>
          {/* Footer Right Part */}
          <div>
            ...
          </div>
        </div>

      </div>
    );
  }
}

export default MainPostCard;
