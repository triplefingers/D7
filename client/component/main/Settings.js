import React, {Component} from "react";
import axios from "axios";
import Loading from "../subcomponents/Loading";

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    $.cloudinary.config({cloud_name: "daxutqqyt"});

    // Dynamically Attached
    $(".upload_form").append($.cloudinary.unsigned_upload_tag("mmbawtto",
      { cloud_name: "daxutqqyt" }));

    $(".cloudinary_fileupload").attr("accept", "image/*;capture=camera");

    $(".cloudinary_fileupload").unsigned_cloudinary_upload("mmbawtto", { cloud_name: "daxutqqyt", tags: "browser_uploads" })

    .bind("cloudinarydone", (e, data) => {
      publicIds.push(data.result.public_id);
      // some code to send new user data
      axios.post("/api/user", {
        // publicIds is an array and we need to return only one element
        userPhoto: window.publicIds.pop()
      })
      .then((res) => {
        console.log("User Profile Picture Changed ", res.data);
        this.props.fetchUser();
        $(".progress_bar").css("width", 0 + "%");

      })
      .catch((err) => {
        console.log("Error Occured while changing user profile picture");
      });
    })

    .bind("cloudinaryprogress", function(e, data) {
      $(".progress_bar").css("width",
        Math.round((data.loaded * 100.0) / data.total) + "%");
    });

    $("#userPhoto").on("click", (e) => {
      $(".cloudinary_fileupload").trigger("click");
    });
  }

  render() {
    if (this.props.data.user) {
      const userData = this.props.data.user;
      const userStat = this.props.data.user.userProjects;
      const transactions = this.props.data.user.transactions;

      const imageSrc = "http://res.cloudinary.com/daxutqqyt/image/upload/c_scale,w_200,h_200/v1467554303/" + userData.userPhoto + ".jpg";

      let transactionRows;

      transactionRows = transactions.map((transaction) => {
        return (
          <tr key={transaction.id}>
            <td>{transaction.date}</td>
            <td>{transaction.projectTitle}</td>
            <td>{transaction.amount}</td>
            <td>{transaction.status}</td>
          </tr>
        );
      });

      const progress_bar_style = {
        background: "skyblue",
        height: "5px",
        width: "0px"
      };

      return (
        <div className="text-center">
          <h1>Settings</h1>
          <div className="card">
            <div className="card-block">
              <img src={imageSrc} id="userPhoto" className="imageRadius" alt="profile_pic" />
              <div className="progress_bar" style={progress_bar_style}></div>
              <form className="userPhotoUpload upload_form"></form>
            </div>
            <div className="card-block">
              <h2>{userData.username}</h2>
              <h4 className="text-muted">{userData.email}</h4>
              <h4 className="text-muted">Success {userStat.success} | Ongoing {userStat.ongoing} | Fail {userStat.fail}</h4>
            </div>
          </div>
          <h2>Transaction History</h2>
          <div className="card card-block">
            <table style={{width: "100%"}} className="transactionTable">
              <thead>
                <tr>
                  <th className="thDate">Date</th>
                  <th>Project</th>
                  <th className="thAmount">Amount</th>
                  <th className="thStatus">Status</th>
                </tr>
              </thead>
              <tbody>
                {transactionRows}
              </tbody>
            </table>
          </div>
        </div>
      );
    } else {
      return <Loading />;
    }
  }
};

export default Settings;
