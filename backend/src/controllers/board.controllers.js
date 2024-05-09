const Board = require('../models/board.js')
const Section = require('../models/section.js')
const Task = require('../models/task.js')

const createBoard = async(req,res)=>{
    try {
        const boardsCount = await Board.find().count()
        const board = await Board.create({
            user: req.user._id,
            position: boardsCount > 0 ? boardsCount : 0
    })
    res.status(201).json(board)
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: error.message
        })
    }
}


const getAll= async(req,res)=>{
    try {
        const boards= await Board.find({ user: req.user._id }).sort('-position')
        res.status(200).json(boards)
    } catch (error) {
        return res.status(500).json({
            message: error.message,
            success: false
        })
    }
}

const updatePosition= async(req, res)=>{
    const {boards}= req.body
    try {
        for(const key in boards.reverse()){
            const board= boards[key]
            await Board.findByIdAndUpdate(board.id,{
                $set:{ position:key}
            })
        }
        res.status(200).json('Updated')
    } catch (error) {
        return res.status(500).json({
            message: error.message,
            success: false
        })
    }
}

const getOne= async(req,res)=>{
    const {boardId}= req.params
    try {
        const board= await Board.findOne({user: req.user._id, _id:boardId})
        if(!board){
            return res.status(404).json('Board not found')
        }else{
            for(const section of sections){
                const tasks= await Task.find({section:section.id}).populate('section').sort('-position')
                section._doc.tasks = tasks
            }
            board._doc.sections = sections
            res.status(200).json(board)
        }
        
    } catch (error) {
        return res.status(500).json({
            message: error.message,
            success: false
        })
    }
}

const updateBoard= async(req,res)=>{
    const {boardId}=req.params
    const { title, description, favourite}= req.body

    try {
        if(title === ''){
            req.body.title='Untitled'
        }
        if(description === ''){
            req.body.description = 'Add description here'
        }
        const currentBoard = await Board.findById(boardId)
        if(!currentBoard){
            return res.status(404).json('Board not Found')
        }

        if(favourite !== undefined && currentBoard.favourite !== favourite){
            const favourite= await Board.find({user: currentBoard.user,favourite:true,_id:{$ne:boardId}}).sort('favouritePosition')
        if(favourite){
            req.body.favouritePosition = favourites.length > 0 ? favourites.length : 0
        }else{
            for(const key in favourite){
                const element = favourites[key]
                await Board.findByIdAndUpdate(element.id, { $set: { favouritePosition: key } })
            }
        }
        }
        const board = await Board.findByIdAndUpdate(boardId,{ $set: req.body })
        res.status(200).json(board,{ message: 'Board updated successfully', success: true });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
            success: false
        })
    }
}

const updateFavouritePosition= async(req,res)=>{
    const {boards}= req.body
    try {
        for(const key in boards.reverse()){
            const board= boards[key]
            await Board.findByIdAndUpdate(board.id,{$set: { favouritePosition:key }})
        }
        res.status(200).json('updated Favourite ')
    } catch (error) {
        return res.status(500).json({
            message: error.message,
            success: false
        })
    }
}

const getFavourites= async(req,res)=>{
    try {
        const favourites= await Board.find({user: req.user._id, favourite:true}).sort('-favouritePosition')
        res.status(200).json(favourites)
    } catch (error) {
        return res.status(500).json({
            message: error.message,
            success: false
        })
    }
}

const deleteBoard= async(req,res)=>{
    const {boardId}= req.params
    try {
        const sections = await Section.find({ board: boardId })
        for (const section of sections) {
            await Task.deleteMany({ section: section.id })
        }
            await Section.deleteMany({ board: boardId })
        const currentBoard = await Board.findById(boardId)
        if (currentBoard.favourite) {
            const favourites = await Board.find({
                user: currentBoard.user,
                favourite: true,
                _id: { $ne: boardId }
            }).sort('favouritePosition')

        for (const key in favourites) {
            const element = favourites[key]
            await Board.findByIdAndUpdate(
                element.id,
                { $set: { favouritePosition: key } }
            )
            }
        }
        await Board.deleteOne({ _id: boardId })

        const boards = await Board.find().sort('position')
        for (const key in boards) {
            const board = boards[key]
            await Board.findByIdAndUpdate(board.id,{ $set: { position: key } })
        }
        res.status(200).json({ message: 'Board deleted successfully', success: true })
    } catch (error) {
        return res.status(500).json({
            message: error.message,
            success: false
        })
    }
}




module.exports={
    createBoard,
    getAll,
    updatePosition,
    getOne,
    updateBoard,
    updateFavouritePosition,
    getFavourites,
    deleteBoard


}