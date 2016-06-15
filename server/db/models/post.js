import db from '../config';
import UserProject from 'userProject';

const Post = db.Model.extend({
  tableName: 'Posts',
  hasTimestamps: true,
  userProject : ()=>this.belongsTo(UserProject, 'userProjectId'),
})

export default User;
