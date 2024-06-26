const labelServices = require('../services/label.services.js');

const createLabel = async (req, res) => {
	const user = req.user;
	const { boardId, listId, cardId } = req.params;
	const label = req.body;

	await labelServices.createLabel(cardId, listId, boardId, user, label, (error, result) => {
		if (error) return res.status(500).send(error);
		return res.status(200).send(result);
	});
};

const updateLabel = async (req, res) => {
	const user = req.user;
	const { boardId, listId, cardId, labelId } = req.params;
	const label = req.body;

	await labelServices.updateLabel(cardId, listId, boardId, labelId, user, label, (error, result) => {
		if (error) return res.status(500).send(error);
		return res.status(200).send(result);
	});
};

const deleteLabel = async (req, res) => {
	const user = req.user;
	const { boardId, listId, cardId, labelId } = req.params;

	

	await labelServices.deleteLabel(cardId, listId, boardId, labelId, user, (error, result) => {
		if (error) return res.status(500).send(error);
		return res.status(200).send(result);
	});
};

const updateLabelSelection = async (req, res) => {
	try {
	const user = req.user;
	const { boardId, listId, cardId, labelId } = req.params;
	const { selected } = req.body;

	if (!boardId || !listId || !cardId || !labelId) {
		return res.status(400).send({ message: 'Missing required parameters.' });
	}

	await labelServices.updateLabelSelection(cardId, listId, boardId, labelId, user, selected, (error, result) => {
		if (error) return res.status(500).send(error);
		return res.status(200).send(result);
	});
	} catch (error) {
		return res.status(500).send(error.message)
	}
	
};


module.exports={
    createLabel,
    updateLabel,
    deleteLabel,
    updateLabelSelection

}