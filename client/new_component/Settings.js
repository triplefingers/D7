import React, {Component} from "react";
import axios from "axios";

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

   $(".cloudinary_fileupload").unsigned_cloudinary_upload("mmbawtto",
     { cloud_name: "daxutqqyt", tags: "browser_uploads" })

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
     })
   })

   .bind("cloudinaryprogress", function(e, data) {
     $(".progress_bar").css("width",
       Math.round((data.loaded * 100.0) / data.total) + "%");
   });

 }

 render() {
   if (this.props.data.user) {
     var userData = this.props.data.user;
     var userStat = this.props.data.user.userProjects;
     var transactions = this.props.data.user.transactions;
   }

   const imageSrc = "http://res.cloudinary.com/daxutqqyt/image/upload/c_scale,w_200/v1467554303/" + userData.userPhoto + ".jpg";

   let transactionRows;

   transactionRows = transactions.map((transaction) => {
     return (
       <tr>
         <td>{transaction.date}</td>
         <td>{transaction.projectTitle}</td>
         <td>{transaction.amount}</td>
         <td>{transaction.status}</td>
       </tr>
     );
   })

   const progress_bar_style = {
     background: "black",
     height: "5px",
     width: "0px"
   }

   return (
     <div>
       <h1>Settings</h1>
       <div>
         <img src={imageSrc} alt="profile_pic" />
         <div className="progress_bar" style={progress_bar_style}></div>
         <form className="upload_form"></form>
       </div>
       <h2>{userData.username}</h2>
       <h3>{userData.email}</h3>
       <h3>Success {userStat.success} | Ongoing {userStat.ongoing} | Fail {userStat.fail}</h3>
       <div>
         <h2>Transaction History</h2>
         <table style={{width: "100%"}}>
           <thead>
             <tr>
               <th>Date</th>
               <th>Project</th>
               <th>Amount</th>
               <th>Status</th>
             </tr>
           </thead>
           <tbody>
             {transactionRows}
           </tbody>
         </table>
       </div>
     </div>
   );
 }
}

export default Settings;
