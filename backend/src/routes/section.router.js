const express= require('express')
const router= express.Router();
const validation = require('../middleware/validation.js')
const tokenHandle = require('../middleware/auth.middleware.js')
const sectionController = require('../controllers/section.controllers.js')

router.post('/',
// param('boardId').custom(value => {
//     if (!validation.isObjectId(value)) {
//       return Promise.reject('invalid id')
//     } else return Promise.resolve()
//   }),
validation.validate,tokenHandle,sectionController.createSection)

router.put('/:sectionId',
// param('boardId').custom(value => {
//     if (!validation.isObjectId(value)) {
//       return Promise.reject('invalid board id')
//     } else return Promise.resolve()
//   }),
//   param('sectionId').custom(value => {
//     if (!validation.isObjectId(value)) {
//       return Promise.reject('invalid section id')
//     } else return Promise.resolve()
//   }),
validation.validate,tokenHandle,sectionController.updateSection)

router.delete('/:sectionId',validation.validate,tokenHandle,sectionController.deleteSection)

module.exports= router

