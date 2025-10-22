const User = require('./user');
const Project = require('./project');

User.hasMany(Project, {foreignKey: 'userId', onDelete: 'CASCADE'})
Project.belongsTo(User, {foreignKey: 'userId'})


module.exports = {User, Project}