// const express= require('express')
// const router= express.Router();
// const validation = require('../middleware/validation.js')
// const tokenHandle = require('../middleware/auth.middleware.js')
// const boardController = require('../controllers/board.controllers.js')


// router.post('/',boardController.createBoard)

// router.get('/',tokenHandle,boardController.getAll)

// router.put('/',tokenHandle,boardController.updatePosition)

// router.get('/favourites',tokenHandle,boardController.getFavourites)

// router.put('/favourites',tokenHandle,boardController.updateFavouritePosition)

// router.get('/:boardId',
// // param('boardId').custom(value => {
// //     if (!validation.isObjectId(value)) {
// //       return Promise.reject('invalid id')
// //     } else return Promise.resolve()
// //   }),
// validation.validate,tokenHandle,boardController.getAll)

// router.put('/:boardId',validation.validate,tokenHandle,boardController.updateBoard)

// router.delete('/:boardId',validation.validate,tokenHandle,boardController.deleteBoard)

// module.exports= router



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
