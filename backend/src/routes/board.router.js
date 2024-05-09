const express= require('express')
const router= express.Router();
const validation = require('../middleware/validation.js')
const tokenHandle = require('../middleware/auth.middleware.js')
const boardController = require('../controllers/board.controllers.js')


router.post('/',tokenHandle,boardController.createBoard)

router.get('/',tokenHandle,boardController.getAll)

router.put('/',tokenHandle,boardController.updatePosition)

router.get('/favourites',tokenHandle,boardController.getFavourites)

router.put('/favourites',tokenHandle,boardController.updateFavouritePosition)

router.get('/:boardId',
// param('boardId').custom(value => {
//     if (!validation.isObjectId(value)) {
//       return Promise.reject('invalid id')
//     } else return Promise.resolve()
//   }),
validation.validate,tokenHandle,boardController.getAll)

router.put('/:boardId',validation.validate,tokenHandle,boardController.updateBoard)

router.delete('/:boardId',validation.validate,tokenHandle,boardController.deleteBoard)

module.exports= router

