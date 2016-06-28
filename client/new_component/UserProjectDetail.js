import React, {Component} from "react";

import DetailPostCard from "./DetailPostCard";

class UserProjectDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
    this.appstate.up=[1,2,3,4,5,6,7,8];
  }



  render() {
    let Contents;
    this.props.appstate.up.map((post) => {
        <DetailPostCard data={post}/>
    });

    // some code about RecordBox rendering

    return (
      <div>
        {/* USERPROJECT HEADER */}
        <div>

        </div>
        {Contents}
      </div>
    );
  }
}

export default UserProjectDetail;
