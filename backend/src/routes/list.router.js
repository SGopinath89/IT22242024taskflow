const express = require('express');
const router = express.Router();
const listController = require('../controllers/list.controller.js');
const {verifyToken}= require('../middleware/auth.middleware.js')


router.post('/create', verifyToken,listController.create);
router.put('/:boardId/:listId/update-title',verifyToken, listController.updateListTitle);
router.get('/:id', verifyToken,listController.getAll);
router.delete('/:boardId/:listId', verifyToken,listController.deleteById);
router.post('/change-card-order', verifyToken,listController.updateCardOrder); //after creating card
router.post('/change-list-order', verifyToken,listController.updateListOrder); //to be check

module.exports = router;
