const commentServices= require('../services/comment.services.js');

const addComment= async(req,res)=>{
    const user= req.user;
    const {boardId, listId, cardId}= req.params;

    await commentServices.addComment(cardId,listId,boardId,user,req.body,(error,result)=>{
        if(error)
            return res.status(500).send({message:error.message})

        return res.status(200).send(result);
    }) 
}

const updateComment= async(req,res)=>{
    const user= req.user;
    const {boardId, listId, cardId,commentId}= req.params;

    await commentServices.updateComment(cardId,listId,boardId,commentId,user,req.body,(error,result)=>{
        if(error)
            return res.status(500).send({message:error.message})

        return res.status(200).send(result);
    }) 
}

const deleteComment= async(req,res)=>{
    const user= req.user;
    const {boardId, listId, cardId,commentId}= req.params;

	await commentServices.deleteComment(cardId, listId, boardId, commentId, user, (error, result) => {
        if(error)
            return res.status(500).send({message:error.message})

        return res.status(200).send(result);
    }) 
}

const getComment = async (req, res) => {
    const { boardId, listId, cardId } = req.params;
    const user = req.user;

    await commentServices.getComments(cardId, listId, boardId, user, (error, comments) => {
        if (error) {
            return res.status(500).send({ message: error.errMessage, details: error.details });
        }
        
        return res.status(200).send( comments);
    });
};




module.exports={
    addComment,
    updateComment,
    deleteComment,
    getComment
    
}