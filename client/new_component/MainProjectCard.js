import React, {Component} from "react";

class MainProjectCard extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
  }

  render() {
    /* Project image 추가, userPhoto 제외 */
    const { title, description, doneWish, username, wishCount } = this.props.data;
    const { goto } = this.props;

    const cardStyle = {
      backgroundColor: "white",
      margin: "10px 0",
    }

    return (
      <div style={cardStyle} onClick={()=>goto("/project")}>
        {/* Card Header */}
        <div>
          <img src="https://www.colourbox.com/preview/1744283-set-of-paintbrushes-and-color-paint-on-canvas-background.jpg" width="400px" height="200px"/>
        </div>
        {/* Card Content */}
        <div>
          <h2>{title}</h2>
          <p>
            {description}
          </p>
        </div>
        {/* Card Footer */}
        <div>
          {/* Footer Left Part */}
          <div>
            <button>Pin</button>
            <span>{wishCount}</span>
          </div>
          {/* Footer Right Part */}
          <div>
            <span>by</span>
            <span>{username}</span>
          </div>
        </div>
      </div>
    );
  }
}

export default MainProjectCard;
