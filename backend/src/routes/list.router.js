const express = require('express');
const router = express.Router();
const listController = require('../controllers/list.controller.js');

router.put('/:boardId/:listId/update-title', listController.updateListTitle);
router.post('/create', listController.create);
router.get('/:id', listController.getAll);

