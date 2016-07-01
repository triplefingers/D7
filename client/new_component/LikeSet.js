import React, {Component} from "react";
import axios from "axios";

class LikeSet extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
    console.log("likeSet monted ", this.props.data);
    const { doneLike, likeCount } = this.props.data;
    if(doneLike){
      this.setState({liked: true, likeCount: likeCount});
    } else {
      this.setState({like:false, likeCount: likeCount});
    }
  }

  toggleLike(postId, e) {
    e.stopPropagation();
    if(this.state.liked){
      axios.post("/api/like", {
        postId: postId
      }).then((res) => {
        console.log('RES', res);
        this.setState({
          liked: false,
          likeCount: res.data.likeCount
        });
      });
    } else {
      axios.post("/api/like", {
        postId: postId
      }).then((res) => {
        console.log('RES', res);
        this.setState({
          liked: true,
          likeCount: res.data.likeCount
        });
      });
    }
  }

  render() {

    const { id, doneLike, likeCount } = this.props.data;

    let likeButton;
    if(this.state.liked){
      likeButton = (
        <button style={{zIndex: "10"}} onClick={this.toggleLike.bind(this, id)}>Like clicked</button>
      );
    } else {
      likeButton = (
        <button style={{zIndex: "10"}} onClick={this.toggleLike.bind(this, id)}>Like not clicked</button>
      );
    }

    return (
      <div>
        {likeButton}
        <span>{this.state.likeCount}</span>
      </div>
    );
  }
}

export default LikeSet;
