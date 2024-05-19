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

const deleteById = async (listId, boardId, user, callback) => {
	try {
		
		const board = await boardModel.findById(boardId);

		const validate = board.lists.filter((list) => list.id === listId);
		if (!validate) return callback({ errMessage: 'List or board informations are wrong' });

		if (!user.boards.filter((board) => board === boardId))
			return callback({ errMessage: 'You cannot delete a list that does not hosted by your boards' });

		const result = await listModel.findByIdAndDelete(listId);

		board.lists = board.lists.filter((list) => list.toString() !== listId);

		board.activity.unshift({
			user: user._id,
			name: user.name,
			action: `deleted ${result.title} from this board`,
			color: user.color,
		});
		board.save();

		await cardModel.deleteMany({ owner: listId });

		return callback(false, result);
	} catch (error) {
		return callback({ errMessage: 'Something went wrong', details: error.message });
	}
};

const updateCardOrder = async (boardId, sourceId, destinationId, destinationIndex, cardId, user, callback) => {
	try {
		
		const board = await boardModel.findById(boardId);
		let validate = board.lists.filter((list) => list.id === sourceId);
		const validate2 = board.lists.filter((list) => list.id === destinationId);
		if (!validate || !validate2) return callback({ errMessage: 'List or board informations are wrong' });

		const sourceList = await listModel.findById(sourceId);
		validate = sourceList.cards.filter((card) => card._id.toString() === cardId);
		if (!validate) return callback({ errMessage: 'List or card informations are wrong' });

		sourceList.cards = sourceList.cards.filter((card) => card._id.toString() !== cardId);
		await sourceList.save();

		const card = await cardModel.findById(cardId);
		const destinationList = await listModel.findById(destinationId);
		const temp = Array.from(destinationList.cards);
		temp.splice(destinationIndex, 0, cardId);
		destinationList.cards = temp;
		await destinationList.save();

		if (sourceId !== destinationId)
			card.activities.unshift({
				text: `moved this card from ${sourceList.title} to ${destinationList.title}`,
				userName: user.name,
				color: user.color,
			});

		card.owner = destinationId;
		await card.save();

		return callback(false, { message: 'Success' });
	} catch (error) {
		return callback({ errMessage: 'Something went wrong', details: error.message });
	}
};