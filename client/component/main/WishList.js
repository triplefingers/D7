import React, {Component} from "react";

import MainProjectCard from "../cards/MainProjectCard";
import Loading from "../subcomponents/Loading";

class WishList extends Component {
 constructor(props) {
   super(props);
   this.state = {
   };
 }

 render() {
   let Contents;

   if (this.props.data.wishList) {
     const wishList = this.props.data.wishList;

     Contents = wishList.map((project) => {
         return <MainProjectCard key={project.id} goto={this.props.goto} fetchProjectDetail={this.props.fetchProjectDetail} data={project}/>
     });

     return (
       <div>
         <h1>Wish List</h1>
         {Contents}
       </div>
     );
   } else {
     return <Loading />;
   }
 }
}

export default WishList;
