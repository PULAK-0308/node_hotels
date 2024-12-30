const express = require('express')
const app = express()
const db=require('./db')
require("dotenv").config();
const passport=require('./auth');

const bodyParse=require('body-parser');
app.use(bodyParse.json());

//use of middleware function logRequest
const logRequest=(req,res,next)=>{
  console.log(`${new Date().toLocaleString()} Request made to : ${req.originalUrl}`);
  next();//iska matlab h ki humne function bana diya middleware iske bad koi middleware func h to execute karo nhi to server vala response ka kam karo
}
app.use(logRequest);//ye sare routes pe lag rha h middleware 



app.use(passport.initialize());
const LocalAuthMiddleware=passport.authenticate('local',{session:false});
app.get('/', function (req, res) {
  res.send('welcome to my hotel')
})

//import Person Router
const personRoutes=require('./routes/personRoutes');
app.use('/person',LocalAuthMiddleware,personRoutes);

//import menuItem Router
const menuItemRoutes=require('./routes/menuItemRoutes');
app.use('/menu',menuItemRoutes);

const PORT=process.env.PORT
app.listen(PORT,()=>{
    console.log("listening on port 3000");
})










