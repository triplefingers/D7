import React, {Component} from "react";
import axios from "axios";

class LikeSet extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
    const { doneLike, likeCount } = this.props;
    if(doneLike){
      this.setState({liked: true, likeCount: likeCount});
    } else {
      this.setState({liked:false, likeCount: likeCount});
    }
  }

  toggleLike(postId, e) {
    e.stopPropagation();
    if(this.state.liked){
      axios.post("/api/like", {
        postId: postId
      }).then((res) => {
        console.log("RES", res);
        this.setState({
          liked: false,
          likeCount: res.data.likeCount
        });
      });
    } else {
      axios.post("/api/like", {
        postId: postId
      }).then((res) => {
        console.log("RES", res);
        this.setState({
          liked: true,
          likeCount: res.data.likeCount
        });
      });
    }
  }

  render() {

    const { id, doneLike, likeCount } = this.props;

    let likeButton;
    if(this.state.liked){
      likeButton = (
        <a className="glyphicon glyphicon-heart
" onClick={this.toggleLike.bind(this, id)}></a>
      );
    } else {
      likeButton = (
        <a className="glyphicon glyphicon-heart-empty
" onClick={this.toggleLike.bind(this, id)}></a>
      );
    }

    return (
      <div className="likeSet pull-left">
        {likeButton}
        <span> {this.state.likeCount}</span>
      </div>
    );
  }
}

export default LikeSet;
