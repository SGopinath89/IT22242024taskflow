const cardModel = require('../models/card.js');
const listModel = require('../models/list.js');
const boardModel = require('../models/board.js');
const userModel = require('../models/user.js');
const helperMethods = require('./helperMethod.js');


const createChecklist = async (cardId, listId, boardId, user, title, callback) => {
	try {
		const card = await cardModel.findById(cardId);
		const list = await listModel.findById(listId);
		const board = await boardModel.findById(boardId);

		const validate = await helperMethods.validateCardOwners(card, list, board, user, false);
		if (!validate) {
			return res.status(400).send({ message: 'You are not authorized to create a checklist' });
		}

		card.checklists.push({
			title: title,
		});
		await card.save();

		const checklistId = card.checklists[card.checklists.length - 1]._id;

		board.activity.unshift({
			user: user._id,
			name: user.name,
			action: `added '${title}' to ${card.title}`,
			color: user.color,
		});
		board.save();

		return callback(false, { checklistId: checklistId });
	} catch (error) {
		return callback({ errMessage: 'Error creating a checklist in the card', details: error.message });
	}
};

const deleteChecklist = async (cardId, listId, boardId, checklistId, user, callback) => {
	try {
		const card = await cardModel.findById(cardId);
		const list = await listModel.findById(listId);
		const board = await boardModel.findById(boardId);

		const validate = await helperMethods.validateCardOwners(card, list, board, user, false);
		if (!validate) {
			return res.status(400).send({ message: 'You are not authorized to delete a checklist' });
		}
		let cl = card.checklists.filter((l) => l._id.toString() === checklistId.toString());


        card.checklists = card.checklists.filter((list) => list._id.toString() !== checklistId.toString());
		await card.save();

		board.activity.unshift({
			user: user._id,
			name: user.name,
			action: `removed '${cl.title}' from ${card.title}`,
			color: user.color,
		});
		board.save();

		return callback(false, { message: 'Success!' });
	} catch (error) {
		return callback({ errMessage: 'Error deleting a checklist in the card', details: error.message });
	}
};

const addChecklistItem = async (cardId, listId, boardId, user, checklistId, text, callback) => {
	try {
		const card = await cardModel.findById(cardId);
		const list = await listModel.findById(listId);
		const board = await boardModel.findById(boardId);

		const validate = await helperMethods.validateCardOwners(card, list, board, user, false);
		if (!validate) {
			return res.status(400).send({ message: 'You are not authorized to add item to a checklist' });
		}

		card.checklists = card.checklists.map((list) => {
			if (list._id.toString() == checklistId.toString()) {
				list.items.push({ text: text });
			}
			return list;
		});
		await card.save();

		// Get to created ChecklistItem's id
		let checklistItemId = '';
		card.checklists = card.checklists.map((list) => {
			if (list._id.toString() == checklistId.toString()) {
				checklistItemId = list.items[list.items.length - 1]._id;
			}
			return list;
		});
		return callback(false, { checklistItemId: checklistItemId });
	} catch (error) {
		return callback({ errMessage: 'Error adding item to checklist in the card', details: error.message });
	}
};

const setChecklistItemCompleted = async (
	cardId,
	listId,
	boardId,
	user,
	checklistId,
	checklistItemId,
	completed,
	callback
) => {
	try {
		const card = await cardModel.findById(cardId);
		const list = await listModel.findById(listId);
		const board = await boardModel.findById(boardId);

		const validate = await helperMethods.validateCardOwners(card, list, board, user, false);
		if (!validate) {
			return res.status(400).send({ message: 'You are not authorized to set completed a checklist' });
		}
		let clItem = '';

		//Update completed of checklistItem
		card.checklists = card.checklists.map((list) => {
			if (list._id.toString() == checklistId.toString()) {
				list.items = list.items.map((item) => {
					if (item._id.toString() === checklistItemId) {
						item.completed = completed;
						clItem = item.text;
					}
					return item;
				});
			}
			return list;
		});
		await card.save();

		board.activity.unshift({
			user: user._id,
			name: user.name,
			action: completed
				? `completed '${clItem}' on ${card.title}`
				: `marked as uncompleted to '${clItem}' on ${card.title}`,
			color: user.color,
		});
		board.save();

		return callback(false, { message: 'Success!' });
	} catch (error) {
		return callback({ errMessage: 'Error setting completed in checklist in the card', details: error.message });
	}
};

const setChecklistItemText = async (cardId, listId, boardId, user, checklistId, checklistItemId, text, callback) => {
	try {
		const card = await cardModel.findById(cardId);
		const list = await listModel.findById(listId);
		const board = await boardModel.findById(boardId);

		const validate = await helperMethods.validateCardOwners(card, list, board, user, false);
		if (!validate) {
			return res.status(400).send({ message: 'You are not authorized to set text in a checklist' });
		}

		//Update text of checklistItem
		card.checklists = card.checklists.map((list) => {
			if (list._id.toString() == checklistId.toString()) {
				list.items = list.items.map((item) => {
					if (item._id.toString() === checklistItemId) {
						item.text = text;
					}
					return item;
				});
			}
			return list;
		});
		await card.save();
		return callback(false, { message: 'Success!' });
	} catch (error) {
		return callback({ errMessage: 'Error adding text  in checklist in the card', details: error.message });
	}
};

const deleteChecklistItem = async (cardId, listId, boardId, user, checklistId, checklistItemId, callback) => {
	try {
		const card = await cardModel.findById(cardId);
		const list = await listModel.findById(listId);
		const board = await boardModel.findById(boardId);

		const validate = await helperMethods.validateCardOwners(card, list, board, user, false);
		if (!validate) {
			return res.status(400).send({ message: 'You are not authorized to delete a item in checklist' });
		}

		card.checklists = card.checklists.map((list) => {
			if (list._id.toString() == checklistId.toString()) {
				list.items = list.items.filter((item) => item._id.toString() !== checklistItemId);
			}
			return list;
		});
		await card.save();
		return callback(false, { message: 'Success!' });
	} catch (error) {
		return callback({ errMessage: 'Error deleting a item in checklist in the card', details: error.message });
	}
};

module.exports={
    createChecklist,
    deleteChecklist,
    addChecklistItem,
    setChecklistItemCompleted,
    setChecklistItemText,
    deleteChecklistItem


}