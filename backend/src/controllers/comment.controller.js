const cardServices= require('../services/card.services.js');

const addComment= async(req,res)=>{
    const user= req.user;
    const {boardId, listId, cardId}= req.params;

    await cardServices.addComment(cardId,listId,boardId,user,req.body,(error,result)=>{
        if(error)
            return res.status(500).send({message:error.message})

        return res.status(200).send(result);
    }) 
}


module.exports={
    addComment
}