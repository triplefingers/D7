import model from "../models";
import collection from "../collections";

const fetchAllProjects = (url, q, res)=>{
  // var { userId } = q;
  console.dir(collection.UserProjects);
  const result = [];
  let up = model.UserProject.where("userId", 1).fetchAll({withRelated: [
    "project"
  ]}).then((projects)=>{
    const result = {
      waiting: [],
      ongoing: [],
      complete: []
    };
    const today = new Date();
    projects.forEach((up)=>{
      console.log(">>>>>>>>>>>>>>>>>>>>>", up.id);
      let project = up.related("project").toJSON();
      up = up.toJSON();
      let startAt = up.startAt;
      console.log('STARTAT', startAt);
      console.log('UP.STARTAT', up.startAt);
      startAt =  new Date(startAt);
      let data = {
        id: up.id,
        title: project.title,
        description: project.description
      };

      /* Check Project status */
      console.log(today.valueOf());
      console.log(startAt.valueOf());
      let diff = today.valueOf() - startAt.valueOf();
      diff = Math.ceil(diff/(60*60*24*1000));
      console.log('DIFF', diff);
      if ( diff <= 0 ){
        result.waiting.push(data);
      } else if ( diff > 0 && diff <= 7 ){
        data.onDay = diff;
        result.ongoing.push(data);
      } else {
        result.complete.push(data);
      }
    });
    return result;
  }).then((data)=>res.status(200).send(data));

};

export default fetchAllProjects;


// new Book({'ISBN-13': '9780440180296'}).fetch({
//   withRelated: [
//     'genre', 'editions',
//     { chapters: function(query) { query.orderBy('chapter_number'); }}
//   ]
// }).then(function(book) {
//   console.log(book.related('genre').toJSON());
//   console.log(book.related('editions').toJSON());
//   console.log(book.toJSON());
// });
//
