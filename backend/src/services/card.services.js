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



