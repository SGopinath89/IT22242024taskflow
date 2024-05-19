const boardService = require('../services/board.services.js' );

// const create = async (req, res) => {
// 	try {
// 		const { title, backgroundImageLink } = req.body;

// 		if (!title || !backgroundImageLink) {
// 			return res.status(400).send({ message: 'Image Cannot be null' });
// 		}
// 		await boardService.create(req, (error, result) => {
// 			if (error) return res.status(500).json({message:error.message});
// 			result.__v = undefined;
// 			return res.status(201).send(result);
// 		});
// 	} catch (error) {
// 		return res.status(500).json({ message: error.message });
// 	}
// };

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
					return res.status(201).send(result);
		});
	} catch (error) {
		return res.status(500).send({message: error.message})
	}
}

const getAll = async (req, res) => {
	try {
	const userId = req.user._id;
	await boardService.getAll(userId, (err, result) => {
		if (err) return res.status(400).send(err);
		return res.status(200).send(result);
	});
	} catch (error) {
		return res.status(500).send({message: "An error occurred while fetching the boards.", error: error.message})
	}
	

	
};

const getById = async (req, res) => {

	try {
		const validate = req.user.boards.filter((board) => board === req.params.id);
	if (!validate)
		return res.status(400).send({ message: 'You are not authorized to view this board' });

	await boardService.getById(req.params.id, (error, result) => {
		if (error) return res.status(400).send(error);
	});
	} catch (error) {
		return res.status(500).send({message: "An error occurred while fetching the boards.", error: error.message})
	}
	
};

const getActivityById = async (req, res) => {
	try {
		const validate = req.user.boards.filter((board) => board === req.params.id);
		if (!validate)
			return res.status(400).send({ Message: 'You are not authorized to view this board' });
	
		await boardService.getActivityById(req.params.id, (err, result) => {
			if (err) return res.status(400).send(err);
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
			return res.status(400).send({ errMessage: 'You are not authorized to access this board' });

		const { boardId } = req.params;
		const { title } = req.body;
	
		await boardService.updateBoardTitle(boardId, title, req.user, (error, result) => {
			if (error) return res.status(400).send(error);
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
			return res.status(400).send({ errMessage: 'You are not authorized to access this board' });

		const { boardId } = req.params;
		const { description } = req.body;
	
		await boardService.updateBoardDescription(boardId, description, req.user, (error, result) => {
			if (error) return res.status(400).send(error);
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
			return res.status(400).send({ errMessage: 'You are not authorized to access this board' });

		const { boardId } = req.params;
		const { background, isImage } = req.body;

		await boardService.updateBackground(boardId, background, isImage, req.user, (error, result) => {
			if (error) return res.status(400).send(error);
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
			return res.status(400).send({ errMessage: 'You are not authorized to access this board' });
	
		const { boardId } = req.params;
		const { members } = req.body;
	
		await boardService.addMember(boardId, members, req.user, (error, result) => {
			if (error) return res.status(400).send({message:error.message});
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
};
