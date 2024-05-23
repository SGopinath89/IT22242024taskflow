const cardModel = require('../models/card.js');
const listModel = require('../models/list.js');
const boardModel = require('../models/board.js');
const userModel = require('../models/user.js');
const helperMethods = require('./helperMethod.js');


//Card Services
const create = async (title, listId, boardId, user, callback) => {
	try {
		const list = await listModel.findById(listId);
		const board = await boardModel.findById(boardId);

		const validate = await helperMethods.validateCardOwners(null, list, board, user, true);
		if (!validate) return callback({ errMessage: 'You are not authorized to access this list or board' });

		const card = await cardModel({ title: title });
		card.owner = listId;
		card.activities.unshift({ text: `added this card to ${list.title}`, userName: user.name, color: user.color });
		card.labels = helperMethods.labelsSeed;
		await card.save();

		list.cards.push(card._id);
		await list.save();

		board.activity.unshift({
			user: user._id,
			name: user.name,
			action: `added ${card.title} to this board`,
			color: user.color,
		});
		await board.save();

		const result = await listModel.findById(listId).populate({ path: 'cards' }).exec();
		return callback(false, result);
	} catch (error) {
		return callback({ errMessage: 'Error while creating a card', details: error.message });
	}
};

const deleteById = async (cardId, listId, boardId, user, callback) => {
	try {
		
		const card = await cardModel.findById(cardId);
		const list = await listModel.findById(listId);
		const board = await boardModel.findById(boardId);
		
		const validate = await helperMethods.validateCardOwners(card, list, board, user, false);
		if (!validate) {
			return res.status(400).send({ message: 'You are not authorized to access the  board' });
		}

		const result = await cardModel.findByIdAndDelete(cardId);

		list.cards = list.cards.filter((tempCard) => tempCard.toString() !== cardId);
		await list.save();
		
		board.activity.unshift({
			user: user._id,
			name: user.name,
			action: `deleted ${result.title} from ${list.title}`,
			color: user.color,
		});
		await board.save();

		return callback(false, { message: 'Success' });
	} catch (error) {
		return callback({ errMessage: 'Error While Deleting a Card', details: error.message });
	}
};

const getCard = async (cardId, listId, boardId, user, callback) => {
	try {
		
		const card = await cardModel.findById(cardId);
		const list = await listModel.findById(listId);
		const board = await boardModel.findById(boardId);

		const validate = await helperMethods.validateCardOwners(card, list, board, user, false);
		if (!validate) {
			return res.status(400).send({ message: 'You are not authorized to access the Card' });
		}

		let returnObject = { ...card._doc, listTitle: list.title, listId: listId, boardId: boardId };

		return callback(false, returnObject);
	} catch (error) {
		return callback({ errMessage: 'Error while fetching card details', details: error.message });
	}
};

const update = async (cardId, listId, boardId, user, updatedObj, callback) => {
	try {
		
		const card = await cardModel.findById(cardId);
		const list = await listModel.findById(listId);
		const board = await boardModel.findById(boardId);

		
		const validate = await helperMethods.validateCardOwners(card, list, board, user, false);
		if (!validate) {
			return res.status(400).send({ message: 'You are not authorized to update the card' });
		}

		
		await card.updateOne(updatedObj);
		await card.save();

		return callback(false, { message: 'Success!' });
	} catch (error) {
		return callback({ errMessage: 'Error while updating card', details: error.message });
	}
};






//Members Services


const createLabel = async (cardId, listId, boardId, user, label, callback) => {
	try {
		const card = await cardModel.findById(cardId);
		const list = await listModel.findById(listId);
		const board = await boardModel.findById(boardId);

		const validate = await helperMethods.validateCardOwners(card, list, board, user, false);
		if (!validate) {
			errMessage: 'You dont have permission to add label this card';
		}

		card.labels.unshift({
			text: label.text,
			color: label.color,
			backcolor: label.backColor,
			selected: true,
		});
		await card.save();

		const labelId = card.labels[0]._id;

		return callback(false, { labelId: labelId });
	} catch (error) {
		return callback({ errMessage: 'Something went wrong', details: error.message });
	}
};

const updateLabel = async (cardId, listId, boardId, labelId, user, label, callback) => {
	try {
	
		const card = await cardModel.findById(cardId);
		const list = await listModel.findById(listId);
		const board = await boardModel.findById(boardId);

		const validate = await helperMethods.validateCardOwners(card, list, board, user, false);
		if (!validate) {
			errMessage: 'You dont have permission to update this card';
		}

		card.labels = card.labels.map((item) => {
			if (item._id.toString() === labelId.toString()) {
				item.text = label.text;
				item.color = label.color;
				item.backColor = label.backColor;
			}
			return item;
		});
		await card.save();

		return callback(false, { message: 'Success!' });
	} catch (error) {
		return callback({ errMessage: 'Something went wrong', details: error.message });
	}
};

const deleteLabel = async (cardId, listId, boardId, labelId, user, callback) => {
	try {
		const card = await cardModel.findById(cardId);
		const list = await listModel.findById(listId);
		const board = await boardModel.findById(boardId);

		const validate = await helperMethods.validateCardOwners(card, list, board, user, false);
		if (!validate) {
			errMessage: 'You dont have permission to delete this label';
		}

	
		card.labels = card.labels.filter((label) => label._id.toString() !== labelId.toString());
		await card.save();

		return callback(false, { message: 'Success!' });
	} catch (error) {
		return callback({ errMessage: 'Something went wrong', details: error.message });
	}
};

const updateLabelSelection = async (cardId, listId, boardId, labelId, user, selected, callback) => {
	try {
		
		const card = await cardModel.findById(cardId);
		const list = await listModel.findById(listId);
		const board = await boardModel.findById(boardId);

		
		const validate = await helperMethods.validateCardOwners(card, list, board, user, false);
		if (!validate) {
			errMessage: 'You dont have permission to update this card';
		}

		
		card.labels = card.labels.map((item) => {
			if (item._id.toString() === labelId.toString()) {
				item.selected = selected;
			}
			return item;
		});
		await card.save();

		return callback(false, { message: 'Success!' });
	} catch (error) {
		return callback({ errMessage: 'Something went wrong', details: error.message });
	}
};

const createChecklist = async (cardId, listId, boardId, user, title, callback) => {
	try {
		
		const card = await cardModel.findById(cardId);
		const list = await listModel.findById(listId);
		const board = await boardModel.findById(boardId);

		
		const validate = await helperMethods.validateCardOwners(card, list, board, user, false);
		if (!validate) {
			errMessage: 'You dont have permission to add Checklist this card';
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
		return callback({ errMessage: 'Something went wrong', details: error.message });
	}
};

const deleteChecklist = async (cardId, listId, boardId, checklistId, user, callback) => {
	try {
		
		const card = await cardModel.findById(cardId);
		const list = await listModel.findById(listId);
		const board = await boardModel.findById(boardId);

		
		const validate = await helperMethods.validateCardOwners(card, list, board, user, false);
		if (!validate) {
			errMessage: 'You dont have permission to delete this checklist';
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
		return callback({ errMessage: 'Something went wrong', details: error.message });
	}
};

const addChecklistItem = async (cardId, listId, boardId, user, checklistId, text, callback) => {
	try {
		
		const card = await cardModel.findById(cardId);
		const list = await listModel.findById(listId);
		const board = await boardModel.findById(boardId);

		const validate = await helperMethods.validateCardOwners(card, list, board, user, false);
		if (!validate) {
			errMessage: 'You dont have permission to add item this checklist';
		}

		card.checklists = card.checklists.map((list) => {
			if (list._id.toString() == checklistId.toString()) {
				list.items.push({ text: text });
			}
			return list;
		});
		await card.save();

		let checklistItemId = '';
		card.checklists = card.checklists.map((list) => {
			if (list._id.toString() == checklistId.toString()) {
				checklistItemId = list.items[list.items.length - 1]._id;
			}
			return list;
		});
		return callback(false, { checklistItemId: checklistItemId });
	} catch (error) {
		return callback({ errMessage: 'Something went wrong', details: error.message });
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
			errMessage: 'You dont have permission to set complete of this checklist item';
		}
		let clItem = '';
	
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
		return callback({ errMessage: 'Something went wrong', details: error.message });
	}
};

const setChecklistItemText = async (cardId, listId, boardId, user, checklistId, checklistItemId, text, callback) => {
	try {

		const card = await cardModel.findById(cardId);
		const list = await listModel.findById(listId);
		const board = await boardModel.findById(boardId);

		const validate = await helperMethods.validateCardOwners(card, list, board, user, false);
		if (!validate) {
			errMessage: 'You dont have permission to set text of this checklist item';
		}

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
		return callback({ errMessage: 'Something went wrong', details: error.message });
	}
};

const deleteChecklistItem = async (cardId, listId, boardId, user, checklistId, checklistItemId, callback) => {
	try {

		const card = await cardModel.findById(cardId);
		const list = await listModel.findById(listId);
		const board = await boardModel.findById(boardId);

		const validate = await helperMethods.validateCardOwners(card, list, board, user, false);
		if (!validate) {
			errMessage: 'You dont have permission to delete this checklist item';
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
		return callback({ errMessage: 'Something went wrong', details: error.message });
	}
};

const updateStartDueDates = async (cardId, listId, boardId, user, startDate, dueDate, dueTime, callback) => {
	try {

		const card = await cardModel.findById(cardId);
		const list = await listModel.findById(listId);
		const board = await boardModel.findById(boardId);

		const validate = await helperMethods.validateCardOwners(card, list, board, user, false);
		if (!validate) {
			errMessage: 'You dont have permission to update date of this card';
		}

		card.date.startDate = startDate;
		card.date.dueDate = dueDate;
		card.date.dueTime = dueTime;
		if (dueDate === null) card.date.completed = false;
		await card.save();
		return callback(false, { message: 'Success!' });
	} catch (error) {
		return callback({ errMessage: 'Something went wrong', details: error.message });
	}
};



const updateDateCompleted = async (cardId, listId, boardId, user, completed, callback) => {
	try {
		
		const card = await cardModel.findById(cardId);
		const list = await listModel.findById(listId);
		const board = await boardModel.findById(boardId);

		const validate = await helperMethods.validateCardOwners(card, list, board, user, false);
		if (!validate) {
			errMessage: 'You dont have permission to update date of this card';
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
		return callback({ errMessage: 'Something went wrong', details: error.message });
	}
};

const addAttachment = async (cardId, listId, boardId, user, link, name, callback) => {
	try {

		const card = await cardModel.findById(cardId);
		const list = await listModel.findById(listId);
		const board = await boardModel.findById(boardId);

		const validate = await helperMethods.validateCardOwners(card, list, board, user, false);
		if (!validate) {
			errMessage: 'You dont have permission to update date of this card';
		}

		
		const validLink = new RegExp(/^https?:\/\//).test(link) ? link : 'http://' + link;

		card.attachments.push({ link: validLink, name: name });
		await card.save();

		board.activity.unshift({
			user: user._id,
			name: user.name,
			action: `attached ${validLink} to ${card.title}`,
			color: user.color,
		});
		board.save();

		return callback(false, { attachmentId: card.attachments[card.attachments.length - 1]._id.toString() });
	} catch (error) {
		return callback({ errMessage: 'Something went wrong', details: error.message });
	}
};

const deleteAttachment = async (cardId, listId, boardId, user, attachmentId, callback) => {
	try {
		const card = await cardModel.findById(cardId);
		const list = await listModel.findById(listId);
		const board = await boardModel.findById(boardId);

		const validate = await helperMethods.validateCardOwners(card, list, board, user, false);
		if (!validate) {
			errMessage: 'You dont have permission to delete this attachment';
		}

		let attachmentObj = card.attachments.filter(
			(attachment) => attachment._id.toString() === attachmentId.toString()
		);

		card.attachments = card.attachments.filter(
			(attachment) => attachment._id.toString() !== attachmentId.toString()
		);
		await card.save();

		board.activity.unshift({
			user: user._id,
			name: user.name,
			action: `deleted the ${attachmentObj[0].link} attachment from ${card.title}`,
			color: user.color,
		});
		board.save();

		return callback(false, { message: 'Success!' });
	} catch (error) {
		return callback({ errMessage: 'Something went wrong', details: error.message });
	}
};

const updateAttachment = async (cardId, listId, boardId, user, attachmentId, link, name, callback) => {
	try {
		
		const card = await cardModel.findById(cardId);
		const list = await listModel.findById(listId);
		const board = await boardModel.findById(boardId);

		const validate = await helperMethods.validateCardOwners(card, list, board, user, false);
		if (!validate) {
			errMessage: 'You dont have permission to update attachment of this card';
		}

		card.attachments = card.attachments.map((attachment) => {
			if (attachment._id.toString() === attachmentId.toString()) {
				attachment.link = link;
				attachment.name = name;
			}
			return attachment;
		});

		await card.save();
		return callback(false, { message: 'Success!' });
	} catch (error) {
		return callback({ errMessage: 'Something went wrong', details: error.message });
	}
};

const updateCover = async (cardId, listId, boardId, user, color, isSizeOne, callback) => {
	try {
		const card = await cardModel.findById(cardId);
		const list = await listModel.findById(listId);
		const board = await boardModel.findById(boardId);

		const validate = await helperMethods.validateCardOwners(card, list, board, user, false);
		if (!validate) {
			errMessage: 'You dont have permission to update attachment of this card';
		}

		card.cover.color = color;
		card.cover.isSizeOne = isSizeOne;

		await card.save();
		return callback(false, { message: 'Success!' });
	} catch (error) {
		return callback({ errMessage: 'Something went wrong', details: error.message });
	}
};

module.exports = {
	create,
	update,
	getCard,
	addComment,
	deleteById,
	updateComment,
	deleteComment,
	addMember,
	deleteMember,
	createLabel,
	updateLabel,
	deleteLabel,
	updateLabelSelection,
	createChecklist,
	deleteChecklist,
	addChecklistItem,
	setChecklistItemCompleted,
	setChecklistItemText,
	deleteChecklistItem,
	updateStartDueDates,
	updateDateCompleted,
	addAttachment,
	deleteAttachment,
	updateAttachment,
	updateCover,
};
