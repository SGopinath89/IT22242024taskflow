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
router.get('/:boardId/:listId/:cardId',cardController.getCard);
router.put('/:boardId/:listId/:cardId', cardController.updateCard);
router.delete('/:boardId/:listId/:cardId/delete-card',cardController.deleteById);
router.put('/:boardId/:listId/:cardId/update-cover',cardController.updateCover);


//Comment Routes
router.post('/:boardId/:listId/:cardId/add-comment',commentController.addComment);
router.get('/:boardId/:listId/:cardId',commentController.getComment); //all the details are printing , only need comment details
router.put('/:boardId/:listId/:cardId/:commentId', commentController.updateComment);
router.delete('/:boardId/:listId/:cardId/:commentId', commentController.deleteComment);


//member Routes
router.post('/:boardId/:listId/:cardId/add-member',memberController.addMember); //Not working
router.delete('/:boardId/:listId/:cardId/:memberId/delete-member', memberController.deleteMember); //not working


//label Routes
router.post('/:boardId/:listId/:cardId/create-label', labelController.createLabel);
router.put('/:boardId/:listId/:cardId/:labelId/update-label', labelController.updateLabel);
router.put('/:boardId/:listId/:cardId/:labelId/update-label-selection', labelController.updateLabelSelection);  //Error
router.delete('/:boardId/:listId/:cardId/:labelId/delete-label', labelController.deleteLabel);

//attachment Routes
router.put('/:boardId/:listId/:cardId/:attachmentId/update-attachment', attachmentController.updateAttachment);
router.delete('/:boardId/:listId/:cardId/:attachmentId/delete-attachment', attachmentController.deleteAttachment);
router.post('/:boardId/:listId/:cardId/add-attachment', attachmentController.addAttachment);


//date Routes
router.put('/:boardId/:listId/:cardId/update-dates', dateController.updateStartDueDates);
router.put('/:boardId/:listId/:cardId/update-date-completed', dateController.updateDateCompleted);


//checklist Routes
router.post('/:boardId/:listId/:cardId/create-checklist', checklistController.createChecklist);
router.post('/:boardId/:listId/:cardId/:checklistId/add-checklist-item', checklistController.addChecklistItem);
router.put('/:boardId/:listId/:cardId/:checklistId/:checklistItemId/set-checklist-item-text', checklistController.setChecklistItemText);
router.put('/:boardId/:listId/:cardId/:checklistId/:checklistItemId/set-checklist-item-completed', checklistController.setChecklistItemCompleted);
router.delete('/:boardId/:listId/:cardId/:checklistId/:checklistItemId/delete-checklist-item', checklistController.deleteChecklistItem);
router.delete('/:boardId/:listId/:cardId/:checklistId/delete-checklist', checklistController.deleteChecklist);



module.exports = router;
