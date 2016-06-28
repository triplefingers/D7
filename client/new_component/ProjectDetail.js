import React, {Component} from "react";

import

class ProjectDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  componentDidMount() {
    this.appstate.popular=[1,2,3,4,5,6,7,8];
  }



  render() {
    let Contents;
    this.props.appstate.wishlist.map((post) => {
        <DetailPostCard data={post}/>
    });


    // some code about RecordBox rendering

    return (
      <div>
        <Tabbar />
        {/* RecordBox don't appear on Recommended Project page */}
        <RecordBox />
        {Contents}

      </div>
    );
  }
}

export default ProjectDetail;
