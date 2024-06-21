const memberServices= require('../services/member.services.js');



const addMember = async (req, res) => {
	const user = req.user;
	const { boardId, listId, cardId } = req.params;
	// const {memberId}= req.body;

	await memberServices.addMember(cardId, listId, boardId, user, req.body.memberId, (error, result) => {
		if (error) return res.status(500).send(error);
		return res.status(200).send(result);
	});
};

const deleteMember = async (req, res) => {
	const user = req.user;
	const { boardId, listId, cardId, memberId } = req.params;

	await memberServices.deleteMember(cardId, listId, boardId, user, memberId, (error, result) => {
		if (error) return res.status(500).send(error);
		return res.status(200).send(result);
	});
};


module.exports={
    addMember,
    deleteMember
}