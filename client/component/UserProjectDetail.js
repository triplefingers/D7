import React, {Component} from "react";

import UserProjectHeader from "./UserProjectHeader";
import DetailPostCard from "./DetailPostCard";

class UserProjectDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentWillUnmount() {
    this.props.reset(["userproject"]);
  }

  render() {
    /* status > waiting, ongoing 추가 */
    const { userproject } = this.props.data;

    console.log("UserProjectDetail Rendered ", this.props.data.userproject);

    let Contents;
    if(userproject){
      Contents = userproject.posts.map((post) => {
          return <DetailPostCard data={post} key={post.id}/>
      });
      return (
        <div>
          <UserProjectHeader data={userproject} fetchProjectDetail={this.props.fetchProjectDetail} goto={this.props.goto}/>
          {Contents}
        </div>
      );
    } else {
      return (<div>Loading</div>);
    }
  }
}

export default UserProjectDetail;
