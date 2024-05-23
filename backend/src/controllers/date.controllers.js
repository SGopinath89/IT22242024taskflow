const dateController = require('../services/date.services.js');


const updateStartDueDates = async (req, res) => {
	const user = req.user;
	const { boardId, listId, cardId } = req.params;
	const {startDate, dueDate, dueTime} = req.body;

	await dateController.updateStartDueDates(
		cardId,
		listId,
		boardId,
		user,
		startDate,
		dueDate,
		dueTime,
		(error, result) => {
			if (error) return res.status(500).send(error);
			return res.status(200).send(result);
		}
	);
};

const updateDateCompleted = async (req, res) => {
	const user = req.user;
	const { boardId, listId, cardId } = req.params;
	const {completed} = req.body;

	await dateController.updateDateCompleted(
		cardId,
		listId,
		boardId,
		user,
		completed,
		(error, result) => {
			if (error) return res.status(500).send(error);
			return res.status(200).send(result);
		}
	);
};

module.exports={
    updateStartDueDates,
    updateDateCompleted
}