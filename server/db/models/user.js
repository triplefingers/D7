import db from '../config';
import UserProject from 'userProject';

const User = db.Model.extend({
  tableName: 'Users',
  hasTimestamps: true,
  projects: ()=>this.hasMany(UserProject, 'userId'),
})

export default User;
