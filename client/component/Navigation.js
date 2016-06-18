import React, {Component} from "react";

class Navigation extends Component {
  constructor(props) {
    super(props);
  }

  goto(url) {
    url = url !== undefined ? String(url) : "/";
    // this.props.history.push(url);
    this.context.router.push(url);
  };

  componentDidMount() {
    console.log("Navigation mounted :)");
  }

  render() {
    let leftButton = <button onClick={() => this.goto("/")}>Home</button>
    let rightButton = this.props.rightButtonName ? <button onClick={() => this.goto(this.props.rightButtonLink)}>{this.props.rightButtonName}</button> : undefined;
    let title = this.props.title ? <span>{this.props.title}</span> : undefined;
    return (
      <div>
        {leftButton}
        {title}
        {rightButton}
        <hr/>
      </div>
    );
  }
}

Navigation.contextTypes = {
  router: () => React.PropTypes.func.isRequired
};

export default Navigation;
