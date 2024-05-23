const listService = require('../services/list.services.js');

const create = async (req, res) => {
	const { title, boardId } = req.body;

	if (!(title && boardId)) return res.status(400).send({ errMessage: 'Title cannot be empty' });

	const validate = req.user.boards.filter((board) => board === boardId);
	if (!validate)
		return res.status(400).send({ Message: 'You are not authorized to access  ' });

	await listService.create({ title: title, owner: boardId }, req.user, (err, result) => {
		if (err) return res.status(500).send(err);
		return res.status(201).send(result);
	});
};





module.exports={
    create,
    getAll,
    deleteById
}
