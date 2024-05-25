const cardModel = require('../models/card.js');
const listModel = require('../models/list.js');
const boardModel = require('../models/board.js');
const userModel = require('../models/user.js');
const helperMethods = require('./helperMethod.js');


const createLabel = async (cardId, listId, boardId, user, label, callback) => {
	try {
		const card = await cardModel.findById(cardId);
		const list = await listModel.findById(listId);
		const board = await boardModel.findById(boardId);

		const validate = await helperMethods.validateCardOwners(card, list, board, user, false);
		if (!validate) {return res.status(400).send({ message: 'You are not authorized to add label to the card' });}

		card.labels.unshift({
			text: label.text,
			color: label.color,
			backcolor: label.backColor,
			selected: true,
		});
		await card.save();

		const labelId = card.labels[0]._id;

		const labelDetails = {
            labelId: labelId,
            text: label.text,
            color: label.color,
			backcolor: label.backColor
        };

		return callback(false, labelDetails);
	} catch (error) {
		return callback({ errMessage: 'Error adding a label to the card', details: error.message });
	}
};

const updateLabel = async (cardId, listId, boardId, labelId, user, label, callback) => {
	try {
		const card = await cardModel.findById(cardId);
		const list = await listModel.findById(listId);
		const board = await boardModel.findById(boardId);

		const validate = await helperMethods.validateCardOwners(card, list, board, user, false);
		if (!validate) {return res.status(400).send({ message: 'You are not authorized to add label to the card' })}

		card.labels = card.labels.map((item) => {
			if (item._id.toString() === labelId.toString()) {
				item.text = label.text;
				item.color = label.color;
				item.backColor = label.backColor;
			}
			return item;
		});
		await card.save();

		const updatedLabel={
			labelId: labelId,
            text: label.text,
            color: label.color,
			backcolor: label.backColor
		}

		return callback(false, { message: 'Success!' ,updatedLabel});
	} catch (error) {
		return callback({ errMessage: 'Error updating a label in the card', details: error.message });
	}
};

const deleteLabel = async (cardId, listId, boardId, labelId, user, callback) => {
	try {
		const card = await cardModel.findById(cardId);
		const list = await listModel.findById(listId);
		const board = await boardModel.findById(boardId);

		const validate = await helperMethods.validateCardOwners(card, list, board, user, false);
		if (!validate) {
			return res.status(400).send({ message: 'You are not authorized to delete the label' });
		}

		

		// card.labels = card.labels.filter((label) => label._id.toString() !== labelId.toString());

		const labelIndex = card.labels.findIndex((label) => label._id.toString() === labelId.toString());
        if (labelIndex === -1) {
            return callback({ Message: 'Label not found in the card' });
        }

        card.labels.splice(labelIndex, 1);
		await card.save();

		

		return callback(false, { message: 'Success!' });
	} catch (error) {
		return callback({ errMessage: 'Error deleting a label in the card', details: error.message });
	}
};

const updateLabelSelection = async (cardId, listId, boardId, labelId, user, selected, callback) => {
	try {
		const card = await cardModel.findById(cardId);
		const list = await listModel.findById(listId);
		const board = await boardModel.findById(boardId);

		const validate = await helperMethods.validateCardOwners(card, list, board, user, false);
		if (!validate) {
			return res.status(400).send({ message: 'You are not authorized to access the label' });
		}

		card.labels = card.labels.map((item) => {
			if (item._id.toString() === labelId.toString()) {
				item.selected = selected;
			}
			return item;
		});
		await card.save();

		const updatedLabel={
			labelId: labelId,
            text: label.text,
            color: label.color,
			backcolor: label.backColor
		}

		return callback(false, { message: 'Success!' ,updatedLabel});
	} catch (error) {
		return callback({ errMessage: 'Error selecting a label in the card', details: error.message });
	}
};

module.exports={
    createLabel,
    updateLabel,
    deleteLabel,
    updateLabelSelection
}