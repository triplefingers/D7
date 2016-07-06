// import React, {Component} from "react";

// class SelectBox extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {};
//   }

//   componentDidMount() {

//   }

//   render() {
//     let selectedProject;

//     if (this.props.project) {
//       selectedProject = {
//         selectedProject: this.props.project
//       }
//     }
//     const disable = this.props.project.doneToday;

//     return (
//       <div>
//         <input type="radio" id={this.props.project.id} name="project" value={this.props.project.title} onChange={this.props._save.bind(null, selectedProject)} disabled={disable}/>
//         <label for={this.props.project.id}> {this.props.project.title}</label>
//       </div>
//     );
//   }
// }

// export default SelectBox;

import React, {Component} from "react";

class SelectBox extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {

  }

  render() {
    let selectedProject;

    if (this.props.project) {
      selectedProject = {
      selectedProject: this.props.project;
      }
    }
    const disable = this.props.project.doneToday;

    return (
      <div>
        <label>
          <input type="radio" name="optradio" id={this.props.project.id} key={this.props.project.id} value={this.props.project.title} onChange={this.props._save.bind(null, selectedProject)} disabled={disable} />
          <span>{this.props.project.title}</span>
        </label>

        {/*<input type="radio" id={this.props.project.id} name="optradio" value={this.props.project.title} onChange={this.props._save.bind(null, selectedProject)} disabled={disable}/>
        <label for={this.props.project.id}>{this.props.project.title}</label>*/}
      </div>
    );
  }
}

export default SelectBox;