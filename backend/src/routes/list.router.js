const express = require('express');
const router = express.Router();
const listController = require('../controllers/list.controller.js');
const {verifyToken}= require('../middleware/auth.middleware.js')


router.post('/create',listController.create);
router.put('/:boardId/:listId/update-title', listController.updateListTitle);
router.get('/:id', verifyToken,listController.getAll);
router.delete('/:boardId/:listId',listController.deleteById);
router.post('/change-card-order', listController.updateCardOrder); 
router.post('/change-list-order', listController.updateListOrder); 

module.exports = router;
