const taskService = require('../services/taskService')

const taskController = {
    createTask: async(req, res) => {
        const { boardId } = req.params
        const { title, description, position, dueDate } = req.body
        const task = await taskService.createTask({
            title,
            description,
            position,
            dueDate,
            boardId
        })

        res.status(201).json({
            success: true,
            message: "New Task Created",
            data: { task }
        })
    },
    getTasks: async(req, res) => {
        const { boardId } = req.params
        const tasks =  await taskService.getTasks({boardId})
        res.status(200).json(tasks)
    },
    getTaskById: async(req, res) => {
        const {taskId} = req.params
        const task = await taskService.getTaskById({taskId})
        res.status(200).json(task)
    },
    updateTask: async(req, res) => {
        const { taskId } = req.params
        const updatedTask =  await taskService.updateTask(
            {
            taskId,
            updateFields: req.body
            })
        res.status(200).json({
            message: "Task Updated Successfully",
            updatedTask
        })
    },
    deleteTask: async(req, res) => {
        const { taskId } = req.params
        await taskService.deleteTask({taskId})
        res.status(200).json({
            success: true,
            message: "Task Deleted",
            id: taskId})
    }
}

module.exports = taskController