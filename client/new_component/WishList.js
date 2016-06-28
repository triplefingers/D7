import React, {Component} from "react";

import MainProjectCard from "./MainProjectCard";


class WishList extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
  }

  render() {
    let Contents;
    Contents = this.props.appstate.wishlist.map((project) => {
        <MainProjectCard data={project}/>
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
