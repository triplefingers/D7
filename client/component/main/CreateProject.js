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
        const imageSrc = "http://res.cloudinary.com/daxutqqyt/image/upload/c_scale,w_200,h_200/v1467554303/" + data.result.public_id + ".jpg";

        publicIds = [data.result.public_id];
        // publicIds.push(data.result.public_id);
        $(".progress_bar").css("width", 0 + "%");
        $("#placeholder").attr("src", imageSrc);
      })

      .bind("cloudinaryprogress", function(e, data) {
        $(".progress_bar").css("width",
          Math.round((data.loaded * 100.0) / data.total) + "%");
      });
    });

    this.props._save({leaveHistoryInProgress: true});

    $("#AddPhotos").on("click", (e) => {
      $(".cloudinary_fileupload").trigger("click");
    });
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
      nextButton = <li className="next"><a onClick={validator} >Next</a></li>
    } else {
      nextButton = <li className="next"><a onClick={validator}>Next</a></li>
    }

    let progress_bar_style = {
      background: "black",
      height: "3px",
      width: "0px"
    };

    return (
      <div className="container CreateProject">
        <h2>Create New Project</h2>
        <label>Main Photo</label>
         <div className="preview">
            <img id="placeholder" height="200" width="200" src="http://ingridwu.dmmdmcfatter.com/wp-content/uploads/2015/01/placeholder.png" />
         </div>
         <br />
         <img id="AddPhotos" src="http://www.clker.com/cliparts/A/P/L/b/V/G/blue-plus-sign-md.png" width="50" height="50" />
         <form className="upload_form"></form>
         <div className="progress_bar" style={progress_bar_style}></div>
        <form role="form">
          <div className="form-group">
            <label for="title">Title</label>
            <input type="text" className="form-control" id="title" value={this.props.data.title} onChange={this.props.handleChange.bind(null, "title")}/>
          </div>
          <div className="form-group">
            <label for="desc">Description</label>
            <textarea rows="6" className="form-control" id="desc" value = {this.props.data.description} onChange={this.props.handleChange.bind(undefined,"description")} />
          </div>
        </form>
        <ul className="pager">
          <li className="previous"><a onClick={() => this.props.goto("/select")}>Previous</a></li>
          {nextButton}
        </ul>
      </div>
    );
  }
}

export default CreateProject;
