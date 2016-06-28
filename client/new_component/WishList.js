import React, {Component} from "react";

import MainProjectCard from "./MainProjectCard";


class WishList extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
    this.appstate.wishlist=[1,2,3,4,5,6,7,8];
  }

  render() {
    let Contents;
    this.props.appstate.wishlist.map((post) => {
        <MainProjectCard data={post}/>
    });

    // some code about RecordBox rendering

    return (
      <div>
        {Contents}
      </div>
    );
  }
}

export default WishList;
