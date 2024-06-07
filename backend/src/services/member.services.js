const cardModel = require('../models/card.js');
const listModel = require('../models/list.js');
const boardModel = require('../models/board.js');
const userModel = require('../models/user.js');
const helperMethods = require('./helperMethod.js');

const addMember = async (cardId, listId, boardId, user, memberId, callback) => {
	try {
		
		// const card = await cardModel.findById(cardId);
		// const list = await listModel.findById(listId);
		// const board = await boardModel.findById(boardId);
		// const member = await userModel.findById(memberId);

		const card = await cardModel.findById(cardId);
		if (!card) {
			return callback({ errMessage: 'Card not found' });
		}

		const list = await listModel.findById(listId);
		if (!list) {
			return callback({ errMessage: 'List not found' });
		}

		const board = await boardModel.findById(boardId);
		if (!board) {
			return callback({ errMessage: 'Board not found' });
		}

		const member = await userModel.findById(memberId);
		if (!member) {
			return callback({ errMessage: 'Member not found' });
		}
		
		const validate = await helperMethods.validateCardOwners(card, list, board, user, false);
		if (!validate) {
			return res.status(400).send({ message: 'You are not authorized to add a member' });
		}

		
		card.members.unshift({
			user: member._id,
			name: member.name,
			color: member.color,
		});
		await card.save();

		
		board.activity.unshift({
			user: user._id,
			name: user.name,
			action: `added '${member.name}' to ${card.title}`,
			color: user.color,
		});
		board.save();

		return callback(false, { message: 'success' });
	} catch (error) {
		return callback({ errMessage: 'Error While adding a member', details: error.message });
	}
};


const deleteMember = async (cardId, listId, boardId, user, memberId, callback) => {
	try {
		const card = await cardModel.findById(cardId);
		const list = await listModel.findById(listId);
		const board = await boardModel.findById(boardId);


		const validate = await helperMethods.validateCardOwners(card, list, board, user, false);
		if (!validate) {
			return res.status(400).send({ message: 'You are not authorized to delete a member' });
		}

		card.members = card.members.filter((a) => a.user.toString() !== memberId.toString());
		await card.save();

		let action;
		if (user._id.toString() === memberId.toString()) {
			action = `left ${card.title}`;
		} else {
			const tempMember = await userModel.findById(memberId);
			if (!tempMember) {
				return callback({ message: 'Member not found' });
			}
			action = `removed '${tempMember.name}' from ${card.title}`;
		}

		board.activity.unshift({
			user: user._id,
			name: user.name,
			action,
			color: user.color,
		});
		await board.save();

		return callback(false, { message: 'success' });
	} catch (error) {
		return callback({ errMessage: 'Error While Deleting a member', details: error.message });
	}
};

module.exports={
    addMember,
    deleteMember
}