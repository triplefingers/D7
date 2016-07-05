import React, {Component} from "react";
import ActionBar from "../subcomponents/ActionBar";

class LeaveHistory extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    window.publicIds = [];

    console.log("ProjectDetail Mounted :)");

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
        $(".preview").append("<div id="+ data.result.public_id+"></div>");
        $("#"+data.result.public_id).append($.cloudinary.image(data.result.public_id,
          { format: data.result.format, version: data.result.version,
            crop: "fill", width: 300, height: 300}))
          .append("<button class="+data.result.public_id+">X</button>");
        console.log("Pushing new public ID");
        console.log("Uploaded image: ", data);
        publicIds.push(data.result.public_id);
        $(".progress_bar").css("width", 0 + "%");
      })

      .bind("cloudinaryprogress", function(e, data) {
        $(".progress_bar").css("width",
          Math.round((data.loaded * 100.0) / data.total) + "%");
      });


    });

    this.props._save({leaveHistoryInProgress: true});

    $( ".preview" ).on("click", "button", function() {
      var $previewId = $(this).attr("class");
      for(var i=0; i<publicIds.length; i++){
        if(publicIds[i]===$previewId){
          publicIds.splice(i, 1);
        }
      }
      $("#"+$previewId).remove();
    });
  }

  render() {

    let progress_bar_style = {
      background: "red",
      height: "20px",
      width: "0px"
    };

    return (
      <div>
        <h1>Leave History</h1>

        {/* Camera Use*/}
        <form className="upload_form"></form>
        <div className="preview"></div>
        <div className="progress_bar" style={progress_bar_style}></div>
        <br /><br /><br /><br /><br /><br />
        <textarea value = {this.props.data.text} onChange={this.props.handleChange.bind(null,"text")} rows="6"/>

        {/* Pass next url as props */}
        <ActionBar callback={this.props} nextUrl="/selectProject" />
      </div>
    );
  }
}

export default LeaveHistory;
