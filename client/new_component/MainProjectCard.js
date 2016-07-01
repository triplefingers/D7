import React, {Component} from "react";
import axios from "axios";

class MainProjectCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      wished: false,
      wishCount: 0
    };
  }

  componentDidMount() {
    const { doneWish, wishCount } = this.props.data;
    if(doneWish){
      this.setState({wished: true, wishCount: wishCount});
    } else {
      this.setState({wishCount: wishCount});
    }
  }

  toggleWish(projectId, e) {
    e.stopPropagation();
    if(this.state.wished){
      axios.post("/api/wish", {
        projectId: projectId
      }).then((res) => {
        console.log('RES', res);
        this.setState({
          wished: false,
          wishCount: res.data.wishCount
        });
      });
    } else {
      axios.post("/api/wish", {
        projectId: projectId
      }).then((res) => {
        console.log('RES', res);
        this.setState({
          wished: true,
          wishCount: res.data.wishCount
        });
      });
    }
  }

  clickProjectCard() {
    this.props.fetchProjectDetail(this.props.data.id);
    this.props.goto("/project");
  }

  render() {
    /* Project image 추가, userPhoto 제외 */
    const { id, title, description, doneWish, username } = this.props.data;

    const cardStyle = {
      backgroundColor: "white",
      margin: "10px 0",
    }

    let wishButton;
    if(this.state.wished){
      wishButton = (
        <button style={{zIndex: "10"}} onClick={this.toggleWish.bind(this, id)}>Wish clicked</button>
      );
    } else {
      wishButton = (
        <button style={{zIndex: "10"}} onClick={this.toggleWish.bind(this, id)}>Wish not clicked</button>
      );
    }

    return (
      <div style={cardStyle} onClick={this.clickProjectCard.bind(this)}>
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
            {wishButton}
            <span>{this.state.wishCount}</span>
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
