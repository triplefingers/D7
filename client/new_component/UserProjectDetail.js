import React, {Component} from "react";

import UserProjectHeader from "./UserProjectHeader";
import DetailPostCard from "./DetailPostCard";

class UserProjectDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
    console.log("UserProjectDetail Mounted ", this.props.data);
  }

  render() {
    let Contents=(<div>Contents</div>);

    console.log(this.props.data);

    // Contents = this.props.data.useproject.map((post) => {
    //     <DetailPostCard data={post}/>
    // });


    return (
      <div>
        {UserProjectHeader}
        {Contents}
      </div>
    );
  }
}

export default UserProjectDetail;
