import React, {Component} from "react";

class Settings extends Component {
 constructor(props) {
   super(props);

   this.state = {};
 }

 componentDidMount() {

 }

 render() {
   if (this.props.data.user) {
     var userData = this.props.data.user;
     var userStat = this.props.data.user.userProjects;
     var transactions = this.props.data.user.transactions;
   }

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

   return (
     <div>
       <h1>Settings</h1>
       <p>
         <img src={userData.userPhoto} alt="profile_pic" />
       </p>
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
