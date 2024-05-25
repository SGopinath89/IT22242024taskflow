const express = require('express');
const app=express();
const route = express.Router();
const {verifyToken}= require('../middleware/auth.middleware.js')
const boardRoute= require('../routes/board.router.js')
const listRoute= require('../routes/list.router.js')
const cardRoute= require('../routes/card.router.js')
const userRoute= require('../routes/user.router.js')


route.use('/board',verifyToken,boardRoute);
route.use('/user',userRoute);
route.use('/list',verifyToken,listRoute);
route.use('/card', verifyToken,cardRoute);

module.exports = route;