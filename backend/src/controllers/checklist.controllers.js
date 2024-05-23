const checklistServices = require('../services/checklist.services.js');


const createChecklist = async (req, res) => {
	const user = req.user;
	const { boardId, listId, cardId } = req.params;
	const title = req.body.title;

	await checklistServices.createChecklist(cardId, listId, boardId, user, title, (error, result) => {
		if (error) return res.status(500).send(error);
		return res.status(200).send(result);
	});
};

const deleteChecklist = async (req, res) => {
	const user = req.user;
	const { boardId, listId, cardId, checklistId } = req.params;

	await checklistServices.deleteChecklist(cardId, listId, boardId, checklistId, user, (error, result) => {
		if (error) return res.status(500).send(error);
		return res.status(200).send(result);
	});
};

const addChecklistItem = async (req, res) => {
	const user = req.user;
	const { boardId, listId, cardId, checklistId } = req.params;
	const text = req.body.text;

	await checklistServices.addChecklistItem(cardId, listId, boardId, user, checklistId, text, (error, result) => {
		if (error) return res.status(500).send(error);
		return res.status(200).send(result);
	});
};

const setChecklistItemCompleted = async (req, res) => {
	const user = req.user;
	const { boardId, listId, cardId, checklistId, checklistItemId } = req.params;
	const completed = req.body.completed;

	await checklistServices.setChecklistItemCompleted(
		cardId,
		listId,
		boardId,
		user,
		checklistId,
		checklistItemId,
		completed,
		(error, result) => {
			if (error) return res.status(500).send(error);
			return res.status(200).send(result);
		}
	);
};

const setChecklistItemText = async (req, res) => {
	const user = req.user;
	const { boardId, listId, cardId, checklistId, checklistItemId } = req.params;
	const text = req.body.text;

	await checklistServices.setChecklistItemText(
		cardId,
		listId,
		boardId,
		user,
		checklistId,
		checklistItemId,
		text,
		(error, result) => {
			if (error) return res.status(500).send(error);
			return res.status(200).send(result);
		}
	);
};

const deleteChecklistItem = async (req, res) => {
	const user = req.user;
	const { boardId, listId, cardId, checklistId, checklistItemId } = req.params;

	await checklistServices.deleteChecklistItem(
		cardId,
		listId,
		boardId,
		user,
		checklistId,
		checklistItemId,
		(error, result) => {
			if (error) return res.status(500).send(error);
			return res.status(200).send(result);
		}
	);
};

module.exports={
    createChecklist,
    deleteChecklistItem,
    setChecklistItemText,
    setChecklistItemCompleted,
    addChecklistItem,
    deleteChecklist

    
}
