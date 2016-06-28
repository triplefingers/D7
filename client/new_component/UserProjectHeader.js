import React, {Component} from "react";

class UserProjectHeader extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
  }

  render() {
    return (
      <div>
        <div>
          <h1>Project Title</h1>
          <p>Project description Project description Project description</p>
        </div>
        <div>
          <img src="http://library.unn.edu.ng/wp-content/uploads/sites/42/2016/03/prifile-pic.png" alt="user profile"/>
          <span>User Name</span>
        </div>
        <div>
          <button>Pin</button>
          <button>-></button>
        </div>
        <div>
          <div>On day 4</div>
          <div>2016/06/21-06/27</div>
        </div>
      </div>
    );
  }
}

export default UserProjectHeader;
