const express = require('express');
const boardController = require('../controllers/board.controllers.js');
const route = express.Router();
// const {verifyToken}= require('../middleware/auth.middleware.js')


route.post('/create', boardController.create);
route.get('/', boardController.getAll);
route.get('/:id', boardController.getById);
route.get('/:id/activity', boardController.getActivityById);


route.post('/:boardId/add-member',boardController.addMember);

route.put('/:boardId/update-background',boardController.updateBackground);
route.put('/:boardId/update-board-description', boardController.updateBoardDescription);
route.put('/:boardId/update-board-title', boardController.updateBoardTitle);


module.exports = route;
