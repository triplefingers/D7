import React, {Component} from "react";

class ProjectDetail extends Component {
  constructor(props) {
    super(props);
  };

  componentDidMount() {
    window.publicIds = [];

    console.log("ProjectDetail Mounted :)");

    $(document).ready(() => {

      console.log("jQuery Mounted");
      $.cloudinary.config({cloud_name: "daxutqqyt"});

      // Dynamically Attached
      $(".upload_form").append($.cloudinary.unsigned_upload_tag("mmbawtto",
        { cloud_name: "daxutqqyt" }));

      $(".cloudinary_fileupload").unsigned_cloudinary_upload("mmbawtto",
        { cloud_name: "daxutqqyt", tags: "browser_uploads" })

      .bind("cloudinarydone", function(e, data) {
        $(".preview").append($.cloudinary.image(data.result.public_id,
              { format: data.result.format, version: data.result.version,
                crop: "fill", width: 300, height: 300 }));
        console.log("Pushing new public ID");
        console.log("Uploaded image: ", data);
        publicIds.push(data.result.public_id);
      })

      .bind("cloudinaryprogress", function(e, data) {
        $(".progress_bar").css("width",
          Math.round((data.loaded * 100.0) / data.total) + "%");
      });
    });
  }

  render() {
    let id = this.props.queryData.id;
    let title = this.props.queryData.title;
    let onDay = this.props.queryData.onDay;
    let text = this.props.data.text;
    let publicIds = window.publicIds;

    let vaidationCallback = (item) => {
      if (item && (item !== "")) {
        return true;
      }
      return false;
    };

    let validator = () => {
      if (this.props.validateAll(vaidationCallback, id, text, onDay)) {
        console.log("validator activated");
        this.props.saveDayDetail(1, id, onDay, text, publicIds);
      } else {
        alert("Check again : there is invalid inputs");
      }
    };

    let progress_bar_style = {
      background: "black",
      height: "10px",
      width: "0px"
    };

    return (
      <div>
        <h3>{title}</h3>
        <h1>On Day {onDay}</h1>

        {/* Camera Use*/}
        <form className="upload_form"></form>
        <div className="preview"></div>
        <div className="progress_bar" style={progress_bar_style}></div>

        <textarea value = {this.props.data.text} onChange={this.props.handleChange.bind(null,"text")} rows="6"/>
        <br/>
        <button onClick={this.context.router.goBack.bind(this)}>Cancel</button>
        // have to edit userId
        <button onClick={validator}>Save</button>
      </div>
    );
  }
}


ProjectDetail.contextTypes = {
  router: () => React.PropTypes.func.isRequired
};

export default ProjectDetail;
