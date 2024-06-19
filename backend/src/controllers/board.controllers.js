const boardService = require('../services/board.services.js' );
const boardModel = require('../models/board.js');
const board = require('../models/board.js');

const create= async (req,res) => {
	try {
		
		const {title,backgroundImageLink }=req.body;
		if(!(title && backgroundImageLink)){
			return res.status(400).send({ message: 'Image or title  Cannot be null' });		
		}

		await boardService.create(req, (error, result) => {
			if (error) 
				return res.status(500).send({message:error.message});
					result.__v = undefined;
					return res.status(200).send(result);
		});
	} catch (error) {
		return res.status(500).send({message: error.message})
	}
};

const getAll = async (req, res) => {
	try {
	const userId = req.user._id;
	await boardService.getAll(userId, (error, result) => {
		if (error) {
			if (error.message === 'User not found') {
				return res.status(400).send({ message: error.message });
			}
			return res.status(500).send({ message: 'An error  occurred while fetching the boards', error: error.message });
		}
		return res.status(200).send(result);
	});
	} catch (error) {
		return res.status(500).send({message: "An error occurred while fetching the boards.", error: error.message})
	}
	

	
};

const deleteBoard = async (req, res) => {
    try {
        const { id: boardId } = req.params;

	await boardService.deleteBoard(boardId,(error,result)=>{
		if(error) return res.status(500).send(error);
		return res.status(200).send(result);
	})
    
    } catch (error) {
        return res.status(500).json({ message: 'An error occurred while deleting the board', error: error.message });
    }
};

const getById = async (req, res) => {

	try {
		const { id: boardId } = req.params;
		if(!boardId){
			return res.status(400).send({message:"Missing Required Fields "});
		}
		const validate = req.user.boards.filter((board) => board === req.params.id);
		if (!validate)
			return res.status(401).send({ message: 'You are not authorized to view this board' });

	await boardService.getById(boardId, (error, result) => {
		if (error) return res.status(500).send({message:"An error occurred while fetching the boards.", error:error.message});
			return res.status(200).send(result);
	});
	} catch (error) {
			return res.status(500).send({message: "An error occurred while fetching the boards.", error: error.message})
	}
	
};

const getActivityById = async (req, res) => {
	try {
		const board= req.params.id;
		if(!board){
			return res.status(400).send({message:"Missing Required Fields "});
		}
		const validate = req.user.boards.filter((board) => board === req.params.id);
		if (!validate)
			return res.status(401).send({ Message: 'You are not authorized to view this board' });
	
		await boardService.getActivityById(board, (error, result) => {
			if (error) return res.status(500).send(error);
			return res.status(200).send(result);
		});
	} catch (error) {
		return res.status(500).send({message: "An error occurred while fetching the boards.", error: error.message})
	}
};

const updateBoardTitle = async (req, res) => {
	try {
		const validate = req.user.boards.filter((board) => board === req.params.id);
		if (!validate)
			return res.status(401).send({ errMessage: 'You are not authorized to access this board' });

		const { boardId } = req.params;
		const { title } = req.body;

		if(!boardId || !title){
			return res.status(400).send({message:"Missing Required Fields "});
		}
	
		await boardService.updateBoardTitle(boardId, title, req.user, (error, result) => {
			if (error) return res.status(500).send(error);
			return res.status(200).send(result);
		});
	} catch (error) {
		return res.status(500).send({message: "An error occurred while updating the board.", error: error.message})
	}
	
};

const updateBoardDescription = async (req, res) => {
	try {
		const validate = req.user.boards.filter((board) => board === req.params.id);
		if (!validate)
			return res.status(401).send({ errMessage: 'You are not authorized to access this board' });

		const { boardId } = req.params;
		const { description } = req.body;

		if(!boardId || !description){
			return res.status(400).send({message:"Missing Required Fields "});
		}
	
		await boardService.updateBoardDescription(boardId, description, req.user, (error, result) => {
			if (error) return res.status(500).send(error);
			return res.status(200).send(result);
		});
		} catch (error) {
		return res.status(500).send({message: "An error occurred while updating the board.", error: error.message})
	}

	
};

const updateBackground = async (req, res) => {
	try {
		const validate = req.user.boards.filter((board) => board === req.params.id);
		if (!validate)
			return res.status(401).send({ errMessage: 'You are not authorized to access this board' });

		const { boardId } = req.params;
		const { background, isImage } = req.body;

		if(!boardId || !background){
			return res.status(400).send({message:"Missing Required Fields "});
		}

		await boardService.updateBackground(boardId, background, isImage, req.user, (error, result) => {
			if (error) return res.status(500).send(error);
			return res.status(200).send(result);
		});
	} catch (error) {
		return res.status(500).send({message: "An error occurred while updating the boards.", error: error.message})
	}

	
};

const addMember = async (req, res) => {
	try {
		const validate = req.user.boards.filter((board) => board === req.params.id);
		if (!validate)
			return res.status(401).send({ errMessage: 'You are not authorized to access this board' });
	
		const { boardId } = req.params;
		const { members } = req.body;

		if(!members){
			return res.status(400).send({message:"Missing Required Fields "});
		}
	
		await boardService.addMember(boardId, members, req.user, (error, result) => {
			if (error) return res.status(500).send(error);
			return res.status(200).send(result);
		});
	} catch (error) {
		return res.status(500).send({message: "An error occurred while adding members.", error: error.message})
	}
};

module.exports = {
	create,
	getAll,
	getById,
	getActivityById,
	updateBoardTitle,
	updateBoardDescription,
	updateBackground,
	addMember,
	deleteBoard
};
