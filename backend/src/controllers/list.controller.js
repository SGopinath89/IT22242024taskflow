const listService = require('../services/list.services.js');

const create = async (req, res) => {
	const { title, boardId } = req.body;

	if (!(title && boardId)) return res.status(400).send({ Message: 'Title cannot be empty' });

	const validate = req.user.boards.filter((board) => board === boardId);
	if (!validate)
		return res.status(401).send({ Message: 'You are not authorized to access  ' });

	await listService.create({ title: title, owner: boardId }, req.user, (error, result) => {
		if (error) return res.status(500).send(error);
		return res.status(200).send(result);
	});
};

const getAll = async (req, res) => {
	const boardId = req.params.id;

	if(!boardId){
		return res.status(400).send({ Message: 'Board Id not provided' });
	}

	const validate = req.user.boards.filter((board) => board === boardId);
	if (!validate)
		return res.status(401).send({ Message: 'You are not authorized to get list ' });

	await listService.getAll(boardId, (error, result) => {
		if (error) return res.status(500).send(error);
		return res.status(200).send(result);
	});
};

const deleteById = async (req, res) => {
	const { listId, boardId } = req.params;
	const user = req.user;

    if (!(listId && boardId)) return res.status(400).send({ Message: 'List or board undefined' });

	await listService.deleteById(listId, boardId, user, (error, result) => {
		if (error) return res.status(500).send(error);
		return res.status(200).send(result);
	});
};

const updateCardOrder = async (req, res) => {
	const { boardId, sourceId, destinationId, destinationIndex, cardId } = req.body;
	const user = req.user;

	if (!(boardId && sourceId && destinationId && cardId))
		return res.status(400).send({ Message: 'All parameters not provided' });

	const validate = user.boards.filter((board) => board === boardId);
	if (!validate) return res.status(403).send({ Message: 'You are not authorized to update Order' });

	await listService.updateCardOrder(boardId, sourceId, destinationId, destinationIndex, cardId, user, (error, result) => {
		if (error) return res.status(500).send(error);
		return res.status(200).send(result);
	});
};

const updateListOrder = async (req, res) => {
	const { boardId, sourceIndex, destinationIndex, listId } = req.body;
	const user = req.user;

	if (!(boardId && sourceIndex != undefined && destinationIndex != undefined && listId))
		return res.status(400).send({ Message: 'All parameters not provided' });

	const validate = user.boards.filter((board) => board === boardId);
	if (!validate) return res.status(403).send({ Message: 'You are not authorized update order' });

	await listService.updateListOrder(boardId, sourceIndex, destinationIndex, listId, (error, result) => {
		if (error) return res.status(500).send(error);
		return res.status(200).send(result);
	});
};

const updateListTitle = async (req, res) => {
	const { listId, boardId } = req.params;
	const user = req.user;
	const {title} = req.body;

	if (!(listId && boardId)) return res.status(400).send({ Message: 'List or board undefined' });

	await listService.updateListTitle(listId, boardId, user,title, (error, result) => {
		if (error) return res.status(500).send(error);
		return res.status(200).send(result);
	});
};


module.exports={
    create,
    getAll,
    deleteById,
    updateCardOrder,
    updateListOrder,
    updateListTitle
}
