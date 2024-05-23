const cardModel = require('../models/card.js');
const listModel = require('../models/list.js');
const boardModel = require('../models/board.js');
const userModel = require('../models/user.js');
const helperMethods = require('./helperMethod.js');

const addAttachment = async (cardId, listId, boardId, user, link, name, callback) => {
	try {
		const card = await cardModel.findById(cardId);
		const list = await listModel.findById(listId);
		const board = await boardModel.findById(boardId);

		const validate = await helperMethods.validateCardOwners(card, list, board, user, false);
		if (!validate) {
			return res.status(400).send({ message: 'You are not authorized to add attachment' });
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
		return callback({ errMessage: 'Error adding an attachment', details: error.message });
	}
};

const deleteAttachment = async (cardId, listId, boardId, user, attachmentId, callback) => {
	try {
		const card = await cardModel.findById(cardId);
		const list = await listModel.findById(listId);
		const board = await boardModel.findById(boardId);

		const validate = await helperMethods.validateCardOwners(card, list, board, user, false);
		if (!validate) {
			return res.status(400).send({ message: 'You are not authorized to delete an  attachment' });
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
		return callback({ errMessage: 'Error deleting an attachment', details: error.message });
	}
};

const updateAttachment = async (cardId, listId, boardId, user, attachmentId, link, name, callback) => {
	try {
		const card = await cardModel.findById(cardId);
		const list = await listModel.findById(listId);
		const board = await boardModel.findById(boardId);

		const validate = await helperMethods.validateCardOwners(card, list, board, user, false);
		if (!validate) {
			return res.status(400).send({ message: 'You are not authorized to update the attachment' });
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
		return callback({ errMessage: 'Error updating an attachment', details: error.message });
	}
};

module.exports={
    addAttachment,
    updateAttachment,
    deleteAttachment
}