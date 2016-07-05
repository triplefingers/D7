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
    let count = <span>{this.state.wishCount}</span>;

    if(this.state.wished){
      wishButton = (
        <a className="glyphicon glyphicon-star" onClick={this.toggleWish.bind(this, id)}></a>
      );
    } else {
      wishButton = (
        <a className="glyphicon glyphicon-star-empty" onClick={this.toggleWish.bind(this, id)}></a>
      );
    }

    if (this.props.count === false) {
      count = undefined;
    }

    return (
      <div className="wishSet pull-left">
        {wishButton}
        {count}
      </div>
    );
  }
}

export default WishSet;
