import React, {Component, cloneElement} from "react";

class RecordBox extends Component {
  constructor(props) {
    super(props);

    this.state = {};
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
        $(".preview").append("<div id="+ data.result.public_id+"></div>");
        $("#"+data.result.public_id).append($.cloudinary.image(data.result.public_id,
          { format: data.result.format, version: data.result.version,
            crop: "fill", width: 50, height: 50}))
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

      $( ".preview" ).on("click", "button", function() {
        var $previewId = $(this).attr("class");
        for(var i=0; i<publicIds.length; i++){
          if(publicIds[i]===$previewId){
            publicIds.splice(i, 1);
          }
        }
        $("#"+$previewId).remove();
      });
    });
  }

  render() {
    const { data, handleChange, goto } = this.props.data;

    const progress_bar_style = {
      background: "black",
      height: "5px",
      width: "0px"
    }

    return (
      <div>
        <textarea value={data.text} onChange={handleChange.bind(null, "text")} rows="2" placeholder="What did you do today?"/><br/>
        {/*<button>Add Photos</button>*/}

        <form className="upload_form">Add photos</form>
        <div className="preview"></div>
        <div className="progress_bar" style={progress_bar_style}></div>
        <button onClick={() => goto("/select")}>Post</button>
      </div>
    );
  }
}

export default RecordBox;
