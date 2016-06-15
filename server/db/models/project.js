import db from '../config';

const Project = db.Model.extend({
  tableName: 'Projects',
  hasTimestamps: true,
  defaults: {
    wish: 0,
  },
})

export default User;
