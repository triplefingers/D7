import model from "../models";
import collection from "../collections";

const fetchAllProjects = (url, q, res)=>{
  // var { userId } = q;
  console.dir(collection.UserProjects);
  const result = [];
  let up = model.UserProject.where("userId", 1).fetchAll({withRelated: [
    "project"
  ]}).then((projects)=>{
    return projects.map((up)=>{
      console.log(">>>>>>>>>>>>>>>>>>>>>", up.id);
      // console.log(">>>>>>>>>>>>>>>>>>>>>", up.related("project").toJSON().title);
      let project = up.related("project").toJSON();
      return {
        id: up.id,
        title: project.title,
        description: project.description
      };
      // return up;
    });
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
