import React, {Component} from "react";

class CreateProject extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    window.publicIds = [];

    $(document).ready(() => {

          console.log("jQuery Mounted");
          $.cloudinary.config({cloud_name: "daxutqqyt"});

          // Dynamically Attached
          $(".upload_form").append($.cloudinary.unsigned_upload_tag("mmbawtto",
            { cloud_name: "daxutqqyt" }));

          $(".cloudinary_fileupload").attr("accept", "image/*;capture=camera");

          $(".cloudinary_fileupload").unsigned_cloudinary_upload("mmbawtto",
            { cloud_name: "daxutqqyt", tags: "browser_uploads" })

          .bind("cloudinarydone", function(e, data) {
            $(".preview").append($.cloudinary.image(data.result.public_id,
                  { format: data.result.format, version: data.result.version,
                    crop: "fill", width: 200, height: 200 }));
            console.log("Pushing new public ID");
            console.log("Uploaded image: ", data);
            publicIds.push(data.result.public_id);
            // $(".progress_bar").css("width", 0 + "%");
          })

          .bind("cloudinaryprogress", function(e, data) {
            $(".progress_bar").css("width",
              Math.round((data.loaded * 100.0) / data.total) + "%");
          });
        });

        this.props._save({leaveHistoryInProgress: true})
  }

  render() {
    let validationCallback = (item) => {
      if (item && item.length > 0) {
        return true;
      }
      return false;
    };

    let validator = () => {
      if (this.props.validateAll(validationCallback, this.props.data.title, this.props.data.description) && this.props.data.creatingProjectLast) {
        this.props.goto("/payment");
      } else if (this.props.validateAll(validationCallback, this.props.data.title, this.props.data.description)) {
        this.props.goto("/create/date");
      } else {
        alert("Check again : there is invalid inputs");
      }
    };

    let nextButton;

    if (this.props.data.creatingProjectLast) {
      nextButton = <button onClick={validator}>Next</button>
    } else {
      nextButton = <button onClick={validator}>Next</button>
    }

    let progress_bar_style = {
      background: "black",
      height: "3px",
      width: "0px"
    };

    return (
      <div>
        <h1>Create New Project</h1>
        <div>
          <label>Main Photo</label>
          <br />
          {/* Camera Use*/}
          <form className="upload_form"></form>
          <div className="preview"></div>
          <div className="progress_bar" style={progress_bar_style}></div>
          <label>Title</label>
          <br/>
          <input type="text" value={this.props.data.title} placeholder="title" onChange={this.props.handleChange.bind(null, "title")}/>
          <br/>
          <label>Description</label>
          <br/>
          <textarea value = {this.props.data.description} onChange={this.props.handleChange.bind(undefined,"description")} rows="6"/>
          <br/>
          <button onClick={() => this.props.goto("/select")}>Back</button>
          {nextButton}
        </div>
      </div>
    );
  }
}

export default CreateProject;
