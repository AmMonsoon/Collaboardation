const User = require('./User');
const Project = require('./Project');
const Board = require('./Board');
const Task =  require('./Task')

User.hasMany(Project, {foreignKey: 'userId', onDelete: 'CASCADE'})
Project.belongsTo(User, {foreignKey: 'userId'})

Project.hasMany(Board, {foreignKey: 'projectId', onDelete: 'CASCADE'})
Board.belongsTo(Project, {foreignKey: 'projectId'})

Board.hasMany(Task, {foreignKey: 'boardId', onDelete: 'CASCADE'})
Task.belongsTo(Board, {foreignKey: 'boardId'})

module.exports = {User, Project, Board, Task}