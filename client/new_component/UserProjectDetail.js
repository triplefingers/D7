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
  }

  render() {
    let Contents;
    Contents = this.props.appstate.up.map((post) => {
        <DetailPostCard data={post}/>
    });

    // some code about RecordBox rendering

    return (
      <div>
        {UserProjectHeader}
        {Contents}
      </div>
    );
  }
}

export default UserProjectHeader;
