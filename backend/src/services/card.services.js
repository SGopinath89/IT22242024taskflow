const cardModel = require('../models/card.js');
const listModel = require('../models/list.js');
const boardModel = require('../models/board.js');
const userModel = require('../models/user.js');
const helperMethods = require('./helperMethod.js');

const create = async (title, listId, boardId, user, callback) => {
	try {
		const list = await listModel.findById(listId);
		const board = await boardModel.findById(boardId);

		const validate = await helperMethods.validateCardOwners(null, list, board, user, true);
		if (!validate) return callback({ errMessage: 'You dont have permission to add card to this list or board' });

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
		return callback({ errMessage: 'Something went wrong', details: error.message });
	}
};

const deleteById = async (cardId, listId, boardId, user, callback) => {
	try {
		
		const card = await cardModel.findById(cardId);
		const list = await listModel.findById(listId);
		const board = await boardModel.findById(boardId);
		
		const validate = await helperMethods.validateCardOwners(card, list, board, user, false);
		if (!validate) {
			errMessage: 'You dont have permission to update this card';
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
		return callback({ errMessage: 'Something went wrong', details: error.message });
	}
};


const getCard = async (cardId, listId, boardId, user, callback) => {
	try {
		
		const card = await cardModel.findById(cardId);
		const list = await listModel.findById(listId);
		const board = await boardModel.findById(boardId);

		const validate = await helperMethods.validateCardOwners(card, list, board, user, false);
		if (!validate) {
			errMessage: 'You dont have permission to update this card';
		}

		let returnObject = { ...card._doc, listTitle: list.title, listId: listId, boardId: boardId };

		return callback(false, returnObject);
	} catch (error) {
		return callback({ errMessage: 'Something went wrong', details: error.message });
	}
};

const update = async (cardId, listId, boardId, user, updatedObj, callback) => {
	try {
		
		const card = await cardModel.findById(cardId);
		const list = await listModel.findById(listId);
		const board = await boardModel.findById(boardId);

		
		const validate = await helperMethods.validateCardOwners(card, list, board, user, false);
		if (!validate) {
			errMessage: 'You dont have permission to update this card';
		}

		
		await card.updateOne(updatedObj);
		await card.save();

		return callback(false, { message: 'Success!' });
	} catch (error) {
		return callback({ errMessage: 'Something went wrong', details: error.message });
	}
};

const addComment = async (cardId, listId, boardId, user, body, callback) => {
	try {
		
		const card = await cardModel.findById(cardId);
		const list = await listModel.findById(listId);
		const board = await boardModel.findById(boardId);

		
		const validate = await helperMethods.validateCardOwners(card, list, board, user, false);
		if (!validate) {
			errMessage: 'You dont have permission to update this card';
		}

		
		card.activities.unshift({
			text: body.text,
			userName: user.name,
			isComment: true,
			color: user.color,
		});
		await card.save();

		
		board.activity.unshift({
			user: user._id,
			name: user.name,
			action: body.text,
			actionType: 'comment',
			cardTitle: card.title,
			color: user.color,
		});
		board.save();

		return callback(false, card.activities);
	} catch (error) {
		return callback({ errMessage: 'Something went wrong', details: error.message });
	}
};

const updateComment = async (cardId, listId, boardId, commentId, user, body, callback) => {
	try {
		
        
		const card = await cardModel.findById(cardId);
		const list = await listModel.findById(listId);
		const board = await boardModel.findById(boardId);
        
		const validate = await helperMethods.validateCardOwners(card, list, board, user, false);
		if (!validate) {
			errMessage: 'You dont have permission to update this card';
		}

		card.activities = card.activities.map((activity) => {
			if (activity._id.toString() === commentId.toString()) {
				if (activity.userName !== user.name) {
					return callback({ errMessage: "You can not edit the comment that you hasn't" });
				}
				activity.text = body.text;
			}
			return activity;
		});
		await card.save();


		board.activity.unshift({
			user: user._id,
			name: user.name,
			action: body.text,
			actionType: 'comment',
			edited: true,
			color: user.color,
			cardTitle: card.title,
		});
		board.save();

		return callback(false, { message: 'Success!' });
	} catch (error) {
		return callback({ errMessage: 'Something went wrong', details: error.message });
	}
};
