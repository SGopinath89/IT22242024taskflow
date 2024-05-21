const cardServices= require('../services/card.services.js');

const create= async(req,res)=>{
    const {title, listId,boardId}= req.body;
    const user= req.user;

    if(!(title && listId && boardId))
        return res.status(400).send({message:"missing fields"});

    await cardServices.create(title,listId, boardId, user,(error,result)=>{
        if(error){
            return res.status(500).send({message :error.message});
        }
        return res.status(201).send(result);
    })
}

const deleteById= async(req,res)=>{
    const user= req.user;
    const {boardId, listId, cardId}= req.params;

    await cardServices.deleteById(cardId,listId,boardId,user,(error,result)=>{
        if(error)
            return res.status(500).send({message:error.message})

        return res.status(200).send(result);
    })
}

const getCard= async(req,res)=>{
    const user= req.user;
    const {boardId, listId, cardId}= req.params;

    await cardServices.getCard(cardId,listId,boardId,user,(error,result)=>{
        if(error)
            return res.status(500).send({message:error.message})

        return res.status(200).send(result);
    })
}