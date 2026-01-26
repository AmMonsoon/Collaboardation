const User = require('./user');
const Project = require('./project');
const Board = require('./board');

User.hasMany(Project, {foreignKey: 'userId', onDelete: 'CASCADE'})
Project.belongsTo(User, {foreignKey: 'userId'})

Project.hasMany(Board, {foreignKey: 'projectId', onDelete: 'CASCADE'})
Board.belongsTo(Project, {foreignKey: 'projectId'})

module.exports = {User, Project, Board}