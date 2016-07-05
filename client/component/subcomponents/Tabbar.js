import React, {Component} from "react";

class Tabbar extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {

  }

  render() {
    return (
      <div className="btn-group btn-group-justified text-center" role="group">

          {/* Define onClick callbacks later */}
          <div className="btn-group" role="group">
            <button type="button" className="btn" onClick={this.props.switchContents.bind(this, "recent")}>Recent</button>
          </div>
          <div className="btn-group" role="group">
            <button type="button" className="btn" onClick={this.props.switchContents.bind(this, "popular")}>Popular</button>
          </div>
          <div className="btn-group" role="group">
            <button type="button" className="btn" onClick={this.props.switchContents.bind(this, "suggestion")}>Suggestion</button>
          </div>

      </div>
    );
  }
}

export default Tabbar;
