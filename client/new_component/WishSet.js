import React, {Component} from "react";
import axios from "axios";

class WishSet extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
    console.log("wishSet monted ", this.props);
    const { doneWish, wishCount } = this.props;
    if(doneWish){
      this.setState({wished: true, wishCount: wishCount});
    } else {
      this.setState({wished: false, wishCount: wishCount});
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

  render() {

    const { id, doneWish, wishCount } = this.props;

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
      <div>
        {wishButton}
        <span>{this.state.wishCount}</span>
      </div>
    );
  }
}

export default WishSet;
