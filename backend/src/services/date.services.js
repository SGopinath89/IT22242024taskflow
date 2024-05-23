const cardModel = require('../models/card.js');
const listModel = require('../models/list.js');
const boardModel = require('../models/board.js');
const userModel = require('../models/user.js');
const helperMethods = require('./helperMethod.js');


const updateStartDueDates = async (cardId, listId, boardId, user, startDate, dueDate, dueTime, callback) => {
	try {
		const card = await cardModel.findById(cardId);
		const list = await listModel.findById(listId);
		const board = await boardModel.findById(boardId);

		const validate = await helperMethods.validateCardOwners(card, list, board, user, false);
		if (!validate) {
			return res.status(400).send({ message: 'You are not authorized to update due date' });
		}

		card.date.startDate = startDate;
		card.date.dueDate = dueDate;
		card.date.dueTime = dueTime;
		if (dueDate === null) card.date.completed = false;
		await card.save();

		return callback(false, { message: 'Success!' });
	} catch (error) {
		return callback({ errMessage: 'Error updating due date ', details: error.message });
	}
};

const updateDateCompleted = async (cardId, listId, boardId, user, completed, callback) => {
	try {
		const card = await cardModel.findById(cardId);
		const list = await listModel.findById(listId);
		const board = await boardModel.findById(boardId);

		const validate = await helperMethods.validateCardOwners(card, list, board, user, false);
		if (!validate) {
			return res.status(400).send({ message: 'You are not authorized to update completed date' });
		}

		card.date.completed = completed;

		await card.save();

		board.activity.unshift({
			user: user._id,
			name: user.name,
			action: `marked the due date on ${card.title} ${completed ? 'complete' : 'uncomplete'}`,
			color: user.color,
		});
		board.save();

		return callback(false, { message: 'Success!' });
	} catch (error) {
		return callback({ errMessage: 'Error update date completed ', details: error.message });
	}
};

module.exports={
    updateStartDueDates,
    updateDateCompleted
}