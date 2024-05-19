const listModel = require('../Models/listModel');
const boardModel = require('../Models/boardModel');
const cardModel = require('../Models/cardModel');

const create = async (model, user, callback) => {
	try {
		
		const tempList = await listModel(model);

		const newList = await tempList.save();

		const ownerBoard = await boardModel.findById(model.owner);
       
		ownerBoard.lists.push(newList.id);

		ownerBoard.activity.unshift({
			user: user._id,
			name: user.name,
			action: `added ${newList.title} to this board`,
			color: user.color,
		});

		ownerBoard.save();

		return callback(false, newList);
	} catch (error) {
		
		return callback({ errMessage: 'Something went wrong', details: error.message });
	}
};

const getAll = async (boardId, callback) => {
	try {
		
		let lists = await listModel
			.find({ owner: { $in: boardId } })
			.populate({ path: 'cards' }) /* { path: 'cards', select: 'title' }) */
			.exec();

		
		const board = await boardModel.findById(boardId);
		let responseObject = board.lists.map((listId) => {
			return lists.filter((listObject) => listObject._id.toString() === listId.toString())[0];
		});

		return callback(false, responseObject);
	} catch (error) {
		return callback({ errMessage: 'Something went wrong', details: error.message });
	}
};

