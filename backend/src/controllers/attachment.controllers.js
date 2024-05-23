const attachmentServices = require('../services/attachment.services.js');


const addAttachment = async (req, res) => {
	const user = req.user;
	const { boardId, listId, cardId } = req.params;
	const {link,name} = req.body;

	await attachmentServices.addAttachment(
		cardId,
		listId,
		boardId,
		user,
		link,
		name,
		(error, result) => {
			if (error) return res.status(500).send(error);
			return res.status(200).send(result);
		}
	);
};

const deleteAttachment = async (req, res) => {
	const user = req.user;
	const { boardId, listId, cardId, attachmentId } = req.params;
	

	await attachmentServices.deleteAttachment(
		cardId,
		listId,
		boardId,
		user,
		attachmentId,
		(error, result) => {
			if (error) return res.status(500).send(error);
			return res.status(200).send(result);
		}
	);
};

const updateAttachment = async (req, res) => {
	const user = req.user;
	const { boardId, listId, cardId, attachmentId } = req.params;
	const {link,name} = req.body;
	

	await attachmentServices.updateAttachment(
		cardId,
		listId,
		boardId,
		user,
		attachmentId,
		link,
		name,
		(error, result) => {
			if (error) return res.status(500).send(error);
			return res.status(200).send(result);
		}
	);
};


module.exports={
    addAttachment,
    updateAttachment,
    deleteAttachment
}