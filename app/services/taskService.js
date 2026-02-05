const {NotFoundError} = require("../errors/index")
const { Task } = require("../models/Index")

const taskService = {
    createTask: async ({title, description, position, dueDate, boardId}) => {
         const task = await Task.create({
            title,
            description,
            position,
            dueDate,
            boardId
        })
        return task;
    },
    getTasks: async({ boardId }) => {
        const tasks =  await tasks.findAll(
            { where: 
                { boardId }
            })
            return tasks
    },
    getTaskById: async({taskId}) => {
        const task = await Task.findByPk(taskId)
        if(!task) throw new NotFoundError("Task not found")
        return task
    },
    updateTask: async({taskId, updateFields}) => {
        const [rows , updatedTask] = await Task.update(updateFields , { 
            where: {
                id: taskId
            },
            returning: true
        })
        if(!updatedTask) throw new NotFoundError("Task not found")
        return updatedTask
    },
    deleteTask: async({taskId}) => {
        const deletedTask = await Task.destroy({ where: { id: taskId }  })
        if(!deletedTask) throw new NotFoundError("Task not found")
        return deletedTask
    }
}

module.exports = taskService;