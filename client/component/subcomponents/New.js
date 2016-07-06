import React, {Component} from "react";

class New extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clicked: false,
    };
  }

  clickNewProject(e) {
    e.stopPropagation();
    this.props.goto("/create"); this.props._save({creatingProjectFirst: true});
    this.setState({clicked: false});
  }

  clickLeaveHistory(e) {
    e.stopPropagation();
    this.props.goto("/select"); this.props._save({leaveHistoryClicked: true});
    this.setState({clicked: false});
  }

  clickNewButton(e) {
    e.stopPropagation();
    this.setState({clicked: true});
  }

  clickCancel(e) {
    e.stopPropagation();
    this.setState({clicked: false});
  }


  render() {

    const navRight = {
      marginRight: "5px"
    };

    if(!this.state.clicked){
      return (
        <a className="navbar-btn pull-right glyphicon glyphicon-edit"
          style={navRight} onClick={this.clickNewButton.bind(this)}></a>
      );
    } else {
      return (
        <div>
          <a className="navbar-btn pull-right glyphicon glyphicon-edit"
            style={navRight}></a>
<<<<<<< Updated upstream
          <div className="popupBackground">
            <div className="popup">
=======
          <div className="popupBackground" onClick={this.clickCancel.bind(this)}>
            <div className="popup btn-group text-center" role="group">
>>>>>>> Stashed changes
              <button className="btn btn-lg btn-primary btn-block" onClick={this.clickNewProject.bind(this)}>Create New Project</button>
              <button className="btn btn-lg btn-primary btn-block" onClick={this.clickLeaveHistory.bind(this)}>Leave History</button>
              <button className="btn btn-lg  btn-block" onClick={this.clickCancel.bind(this)}>Cancel</button>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default New;
