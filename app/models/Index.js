const User = require('./user');
const Project = require('./project');
const Board = require('./board');
const Task =  require('./task')

User.hasMany(Project, {foreignKey: 'userId', onDelete: 'CASCADE'})
Project.belongsTo(User, {foreignKey: 'userId'})

Project.hasMany(Board, {foreignKey: 'projectId', onDelete: 'CASCADE'})
Board.belongsTo(Project, {foreignKey: 'projectId'})

Board.hasMany(Task, {foreignKey: 'boardId', onDelete: 'CASCADE'})
Task.belongsTo(Board, {foreignKey: 'boardId'})

module.exports = {User, Project, Board, Task}