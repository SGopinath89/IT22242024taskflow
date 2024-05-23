const express= require('express');
// const { TokenExpiredError } = require('jsonwebtoken');
const app=express();
const cors = require('cors');
const unless = require('express-unless');


require('dotenv').config()



// const config = require('../backend/src/config/config.js');
const database= require('../backend/src/db/dbconfig.js');
const userRoute = require ('./src/routes/user.router.js');
const boardRoute= require('../backend/src/routes/board.router.js')
const auth = require('./src/middleware/auth.middleware.js');
const listRoute= require('../backend/src/routes/list.router.js')
const cardRoute= require('../backend/src/routes/card.router.js')

// const boardRoutes= require('../backend/src/routes/board.router.js')
// const sectionRoutes= require('../backend/src/routes/section.router.js');
const { verifyToken } = require('./src/middleware/auth.middleware.js')

const port = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));
// app.use(auth);

database.connectDB();



// app.use(
//     verifyToken.unless({
//         path: [
//             { url: '/user/login', methods: ['POST'] },
//             { url: '/user/register', methods: ['POST'] }
//         ],
//     })
// );

// app.use('/api/auth',authRoutes);
app.use('/board',boardRoute);
app.use('/user',userRoute);
app.use('/list',listRoute);
app.use('/card', cardRoute);




app.listen(port,()=>{
    console.log(`Server is up on port ${port}`);
});



//dashboard using react
//teams 
//file upload system

