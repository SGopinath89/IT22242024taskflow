const cardController = require('../controllers/card.controller.js'); //Card controllers
const commentController= require('../controllers/comment.controller.js') //Comment Controllers
const memberController= require('../controllers/member.controller.js') //Member Controller
const labelController= require('../controllers/label.controller.js') //label Controller
const attachmentController= require('../controllers/attachment.controllers.js') //attachment
const checklistController= require('../controllers/checklist.controllers.js') //attachment
const dateController= require('../controllers/date.controllers.js') //attachment

const express = require('express');
const router = express.Router();

//Card Routes
router.post('/create', cardController.create);
router.get('/:boardId/:listId/:cardId', cardController.getCard);
router.put('/:boardId/:listId/:cardId', cardController.update);
router.delete('/:boardId/:listId/:cardId/delete-card', cardController.deleteById);
router.put('/:boardId/:listId/:cardId/update-cover', cardController.updateCover);


//Comment Routes
router.post('/:boardId/:listId/:cardId/add-comment', commentController.addComment);
router.put('/:boardId/:listId/:cardId/:commentId', commentController.updateComment);
router.delete('/:boardId/:listId/:cardId/:commentId', commentController.deleteComment);


//member Routes
router.post('/:boardId/:listId/:cardId/add-member', memberController.addMember);
router.delete('/:boardId/:listId/:cardId/:memberId/delete-member', memberController.deleteMember);


//label Routes
router.post('/:boardId/:listId/:cardId/create-label', labelController.createLabel);
router.put('/:boardId/:listId/:cardId/:labelId/update-label', labelController.updateLabel);
router.put('/:boardId/:listId/:cardId/:labelId/update-label-selection', labelController.updateLabelSelection);
router.delete('/:boardId/:listId/:cardId/:labelId/delete-label', labelController.deleteLabel);



router.put('/:boardId/:listId/:cardId/update-cover', cardController.updateCover);
router.put('/:boardId/:listId/:cardId/:attachmentId/update-attachment', cardController.updateAttachment);
router.delete('/:boardId/:listId/:cardId/:attachmentId/delete-attachment', cardController.deleteAttachment);
router.post('/:boardId/:listId/:cardId/add-attachment', cardController.addAttachment);
router.put('/:boardId/:listId/:cardId/update-dates', cardController.updateStartDueDates);
router.put('/:boardId/:listId/:cardId/update-date-completed', cardController.updateDateCompleted);
router.delete('/:boardId/:listId/:cardId/:checklistId/:checklistItemId/delete-checklist-item', cardController.deleteChecklistItem);
router.put('/:boardId/:listId/:cardId/:checklistId/:checklistItemId/set-checklist-item-text', cardController.setChecklistItemText);
router.put('/:boardId/:listId/:cardId/:checklistId/:checklistItemId/set-checklist-item-completed', cardController.setChecklistItemCompleted);
router.post('/:boardId/:listId/:cardId/:checklistId/add-checklist-item', cardController.addChecklistItem);
router.delete('/:boardId/:listId/:cardId/:checklistId/delete-checklist', cardController.deleteChecklist);
router.post('/:boardId/:listId/:cardId/create-checklist', cardController.createChecklist);






module.exports = router;
