const {NotFoundError} = require("../errors/index")
const { Board } = require("../models/Index")

const boardService = {
    createBoard: async ({projectId, title, description, position}) => {
         const board = await Board.create({
            projectId,
            title,
            description,
            position
        })
        return board;
    },
    getBoards: async(projectId) => {
        const boards =  await Board.findAll(
            { where: 
                { projectId }
            })
            return boards
    },
    getBoardById: async(boardId) => {
        const board = await Board.findByPk(boardId)
        if(!board) throw new NotFoundError("Board not found")
        return board
    },
    updateBoard: async(boardId, updateFields) => {
        const [rows , updatedBoard] = await Board.update(updateFields , { 
            where: {
                id: boardId
            },
            returning: true
        })
        if(!updatedBoard) throw new NotFoundError("Board not found")
        return updatedBoard
    },
    deleteBoard: async(boardId) => {
        const deletedBoard = await Board.destroy({ where: { id: boardId }  })
        if(!deletedBoard) throw new NotFoundError("Board not found")
        return deletedBoard
    }
}

module.exports = boardService;