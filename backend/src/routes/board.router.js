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

module.exports= router

