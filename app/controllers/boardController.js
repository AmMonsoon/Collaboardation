const boardService = require('../services/boardService')


const boardController = {
    //CREATE BOARD
    createBoard: async(req, res) => {
        const projectId = req.record.id;
        const { title } = req.body;
         const board = await boardService.createBoard(projectId, title)
        res.status(201).json({
            success: true,
            message: "New Board Created",
            data: { board }
        })
    },
    //GET SPECIFIC BOARD
    getBoard: async(req, res) => {
        const boardId = req.record.id;
        const board = await boardService.getBoardById(boardId)
        res.status(200).json(board)
    },
    //GET ALL BOARDS BY PROJECT ID
    getAllBoards: async(req, res) => {
        const projectId = req.record.id
        const boards = await boardService.getBoards(projectId)
        res.status(200).json(boards)
    },
    //UPDATE A BOARD
    updateBoard: async(req, res) => {
        const boardId = req.record.id
        const updatedBoard =  await boardService.updateBoard(boardId, req.body)
        res.status(200).json({
            message: "Board Updated Successfully",
            updatedBoard
        })
    },
    //DELETE A BOARD
    deleteBoard: async(req, res) => {
        const boardId = req.record.id
        await boardService.deleteBoard(boardId)
        res.status(200).json({success: true, message: "Board Deleted", id: boardId})
    }
}

module.exports = boardController;