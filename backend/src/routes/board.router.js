const express = require('express');
const boardController = require('../controllers/board.controllers.js');
const route = express.Router();
const {verifyToken}= require('../middleware/auth.middleware.js')


route.post('/create',verifyToken, boardController.create);
route.get('/',verifyToken, boardController.getAll);
route.get('/:id', verifyToken, boardController.getById);
route.get('/:id/activity',verifyToken, boardController.getActivityById);


route.post('/:boardId/add-member', verifyToken,boardController.addMember);

route.put('/:boardId/update-background', verifyToken,boardController.updateBackground);
route.put('/:boardId/update-board-description',verifyToken, boardController.updateBoardDescription);
route.put('/:boardId/update-board-title',verifyToken, boardController.updateBoardTitle);


module.exports = route;
