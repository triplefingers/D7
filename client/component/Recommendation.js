import React, {Component} from "react";

class Recommendation extends Component {
  constructor(props) {
    super(props);
    this.state = {clicked: "none"};
  }

  componentDidMount() {
    this.props.reset();
    this.props.fetchRecommendation("1234");
    console.log("Recommendation mounted");
  }

  render() {
    let list = [];
    let popUpStyle = {display: this.state.clicked};

    if (this.props.data.list) {
      list = this.props.data.list;
    }


    list = list.map((project) => (
        <li onClick={() => {this.props._save({title: project.title, description: project.description}); this.setState({clicked: "initial"});}}>{"프로젝트" + " " + project.title}</li>
      ));

    return (
      <div>
        <h1>Recommended</h1>
        {list}

        <div style={popUpStyle}>
          <button onClick={() => this.props.goto("/create/date")}>start this project</button>
          <button onClick={() => this.setState({clicked: "none"})}>cancel</button>
        </div>
      </div>

    );
  }

}

export default Recommendation;
